import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { generateShareCode } from '@/lib/utils/share'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { leaveType, inputs, results } = body

    if (!leaveType || !inputs || !results) {
      return NextResponse.json(
        { error: 'Missing required fields: leaveType, inputs, results' },
        { status: 400 }
      )
    }

    const validLeaveTypes = ['maternity', 'paternity', 'childcare', 'spl', 'baby-bonus', 'childcare-subsidy', 'adoption', 'uicl', 'pay']
    if (!validLeaveTypes.includes(leaveType)) {
      return NextResponse.json(
        { error: 'Invalid leaveType' },
        { status: 400 }
      )
    }

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch {
              // Ignore in Server Components
            }
          },
        },
      }
    )

    const shareCode = generateShareCode(leaveType)

    const { data, error } = await supabase
      .from('leave_calculations')
      .insert({
        share_code: shareCode,
        leave_type: leaveType,
        inputs,
        results,
      })
      .select('share_code')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to save calculation' },
        { status: 500 }
      )
    }

    // Record analytics event (fire and forget)
    supabase
      .from('calculation_events')
      .insert({
        leave_type: leaveType,
        employment_type: inputs.employmentType ?? null,
        child_order: inputs.childOrder ?? null,
        citizenship: inputs.citizenship ?? inputs.babyCitizenship ?? null,
        has_salary: inputs.monthlySalary != null && inputs.monthlySalary > 0,
        result_shared: true,
      })
      .then(() => {})

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL ?? 'https://leavecalculator.sg'}/result/${data.share_code}`

    return NextResponse.json({ shareCode: data.share_code, shareUrl }, { status: 201 })
  } catch (err) {
    console.error('Share API error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

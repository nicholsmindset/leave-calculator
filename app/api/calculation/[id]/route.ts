import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const shareCode = params.id

  if (!shareCode || !/^[a-z]{2}\d{2}-[A-Z0-9]{6}$/.test(shareCode)) {
    return NextResponse.json(
      { error: 'Invalid share code format' },
      { status: 400 }
    )
  }

  try {
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

    const { data, error } = await supabase
      .from('leave_calculations')
      .select('share_code, leave_type, inputs, results, created_at, expires_at')
      .eq('share_code', shareCode)
      .single()

    if (error || !data) {
      return NextResponse.json(
        { error: 'Calculation not found' },
        { status: 404 }
      )
    }

    // Check if expired
    if (data.expires_at && new Date(data.expires_at) < new Date()) {
      return NextResponse.json(
        { error: 'This shared calculation has expired' },
        { status: 410 }
      )
    }

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('Calculation GET error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

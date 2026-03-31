import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const leaveTypeLabels: Record<string, { title: string; emoji: string; color: string }> = {
  maternity: { title: 'Maternity Leave', emoji: '👩', color: '#004d60' },
  paternity: { title: 'Paternity Leave', emoji: '👨', color: '#00677f' },
  spl: { title: 'Shared Parental Leave', emoji: '👪', color: '#006666' },
  childcare: { title: 'Childcare Leave', emoji: '👧', color: '#005566' },
  'baby-bonus': { title: 'Baby Bonus', emoji: '🍼', color: '#004d60' },
  'childcare-subsidy': { title: 'Childcare Subsidy', emoji: '🏫', color: '#00677f' },
  adoption: { title: 'Adoption Leave', emoji: '💝', color: '#006666' },
  uicl: { title: 'Infant Care Leave', emoji: '🍼', color: '#005566' },
  pay: { title: 'Leave Pay Calculator', emoji: '💰', color: '#004d60' },
  default: { title: 'Parental Leave Calculator', emoji: '👶', color: '#004d60' },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'default'
  const stat = searchParams.get('stat') ?? ''
  const year = searchParams.get('year') ?? '2026'
  const subtitle = searchParams.get('subtitle') ?? ''

  const info = leaveTypeLabels[type] ?? leaveTypeLabels.default

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          background: `linear-gradient(135deg, ${info.color} 0%, #00a896 100%)`,
          padding: '60px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Background pattern dots */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
          <div
            style={{
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '12px',
              padding: '8px 16px',
              color: 'white',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            leavecalculator.sg
          </div>
          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '12px',
              padding: '8px 16px',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '14px',
            }}
          >
            Singapore {year}
          </div>
        </div>

        {/* Emoji */}
        <div style={{ fontSize: '72px', marginBottom: '24px' }}>{info.emoji}</div>

        {/* Title */}
        <div
          style={{
            color: 'white',
            fontSize: '56px',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: '16px',
            maxWidth: '800px',
          }}
        >
          {info.title}
        </div>

        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              color: 'rgba(255,255,255,0.85)',
              fontSize: '24px',
              marginBottom: '32px',
              maxWidth: '700px',
            }}
          >
            {subtitle}
          </div>
        )}

        {/* Stat badge */}
        {stat && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: 'auto',
            }}
          >
            <div
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '16px',
                padding: '16px 28px',
                color: 'white',
                fontSize: '28px',
                fontWeight: 700,
              }}
            >
              {stat}
            </div>
          </div>
        )}

        {/* Bottom: Free tool badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '60px',
            background: 'rgba(255,255,255,0.2)',
            border: '1px solid rgba(255,255,255,0.4)',
            borderRadius: '50px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '18px',
            fontWeight: 600,
          }}
        >
          Free Calculator · Updated {year}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}

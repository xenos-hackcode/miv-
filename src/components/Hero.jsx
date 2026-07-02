import { useState } from 'react'
import { Play, ArrowDown, Calendar, Clock, ChevronUp } from 'lucide-react'

export default function Hero() {
  const [expanded, setExpanded] = useState(false)
  const [hovered, setHovered] = useState(false)

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        background: 'var(--hero-gradient)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 70,
      }}
    >
      {/* Animated background orbs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{
          position: 'absolute', top: '10%', left: '8%',
          width: 500, height: 500,
          background: 'var(--primary)',
          borderRadius: '50%', opacity: 0.12,
          filter: 'blur(90px)',
          animation: 'float 9s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', bottom: '15%', right: '6%',
          width: 350, height: 350,
          background: 'var(--accent)',
          borderRadius: '50%', opacity: 0.07,
          filter: 'blur(70px)',
          animation: 'float 7s 1.5s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          width: 600, height: 600,
          background: 'var(--primary-light)',
          borderRadius: '50%', opacity: 0.05,
          filter: 'blur(120px)',
          animation: 'float 12s 3s ease-in-out infinite',
        }} />
        {/* Grid overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }} />
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center', padding: '40px 24px' }}>

        {/* Welcome pill */}
        <div className="anim-fade-up" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'rgba(255,255,255,0.07)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 99, padding: '8px 22px',
          marginBottom: 40,
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', animation: 'float 2s infinite' }} />
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', fontWeight: 500, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            Welcome to Our Church Family
          </span>
        </div>

        {/* ── MIV / Full name expandable heading ── */}
        <div
          className="anim-fade-up-1"
          onClick={() => setExpanded(v => !v)}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            cursor: 'pointer',
            userSelect: 'none',
            position: 'relative',
            minHeight: 'clamp(120px, 22vw, 220px)',
            marginBottom: 16,
          }}
        >
          {/* MIV state */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.55s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)',
            opacity: expanded ? 0 : 1,
            transform: expanded ? 'scale(0.7) translateY(-24px)' : 'scale(1) translateY(0)',
            pointerEvents: expanded ? 'none' : 'auto',
          }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(72px, 18vw, 180px)',
              letterSpacing: hovered ? '0.35em' : '0.2em',
              transition: 'letter-spacing 0.5s ease',
              color: '#fff',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(212,175,55,0.25)',
            }}>
              MIV
            </h1>
            <p style={{
              fontSize: 11, letterSpacing: 3.5,
              color: 'var(--accent)', textTransform: 'uppercase',
              fontWeight: 700, marginTop: 10,
              opacity: hovered ? 1 : 0.5,
              transition: 'opacity 0.3s',
              animation: 'float 3s ease-in-out infinite',
            }}>
              ✦ tap to reveal our full name ✦
            </p>
          </div>

          {/* Full name state */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            transition: 'opacity 0.55s 0.12s ease, transform 0.6s 0.08s cubic-bezier(0.4,0,0.2,1)',
            opacity: expanded ? 1 : 0,
            transform: expanded ? 'scale(1) translateY(0)' : 'scale(0.82) translateY(22px)',
            pointerEvents: expanded ? 'auto' : 'none',
          }}>
            <h1 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(26px, 5.5vw, 66px)',
              color: '#fff', lineHeight: 1.15, marginBottom: 4,
            }}>
              Men of Issachar
            </h1>
            <h1 className="text-gold" style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(26px, 5.5vw, 66px)',
              lineHeight: 1.15,
            }}>
              Vision
            </h1>
            <button
              onClick={(e) => { e.stopPropagation(); setExpanded(false) }}
              style={{
                marginTop: 12, background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 99, padding: '5px 18px',
                color: 'rgba(255,255,255,0.6)', fontSize: 11,
                letterSpacing: 2, textTransform: 'uppercase',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
            >
              <ChevronUp size={12} /> collapse
            </button>
          </div>
        </div>

        {/* Tagline */}
        <p className="anim-fade-up-2" style={{
          fontSize: 'clamp(15px, 2.2vw, 20px)',
          color: 'rgba(255,255,255,0.65)',
          maxWidth: 540,
          margin: '0 auto 48px',
          lineHeight: 1.75,
        }}>
          A Spirit-filled church in Edinburgh — understanding the times and knowing what God's people should do.
          <br />
          <em style={{ color: 'var(--accent)', fontSize: '0.85em' }}>"...men who understood the times" — 1 Chronicles 12:32</em>
        </p>

        {/* CTA buttons */}
        <div className="anim-fade-up-3" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-accent" style={{ fontSize: 16, padding: '16px 36px' }} onClick={() => scrollTo('services')}>
            <Calendar size={18} /> Join Us Sunday
          </button>
          <button
            className="btn btn-outline"
            style={{ fontSize: 16, padding: '16px 36px', color: '#fff', borderColor: 'rgba(255,255,255,0.35)' }}
            onClick={() => scrollTo('sermons')}
          >
            <Play size={18} fill="currentColor" /> Watch a Sermon
          </button>
        </div>

        {/* Service time badges */}
        <div className="anim-fade-up-4" style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginTop: 52 }}>
          {[
            { icon: <Clock size={13} />, text: 'Sunday 12:30 PM' },
            { icon: <Clock size={13} />, text: 'Wednesday 6:30 PM (Zoom)' },
            { icon: <Clock size={13} />, text: 'Last Saturday Evangelism' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 99, padding: '8px 18px',
              backdropFilter: 'blur(8px)',
              fontSize: 13, color: 'rgba(255,255,255,0.65)',
              cursor: 'default',
              transition: 'background 0.2s, border-color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(212,175,55,0.4)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)' }}
            >
              <span style={{ color: 'var(--accent)' }}>{icon}</span>
              {text}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollTo('about')}
        style={{
          position: 'absolute', bottom: 30,
          left: '50%', transform: 'translateX(-50%)',
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)',
          cursor: 'pointer', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 6, fontSize: 11, letterSpacing: 2,
          textTransform: 'uppercase',
          animation: 'float 2.5s ease-in-out infinite',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.4)'}
      >
        <span>Scroll</span>
        <ArrowDown size={18} />
      </button>
    </section>
  )
}

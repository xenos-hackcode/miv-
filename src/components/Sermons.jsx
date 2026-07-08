import { useRef, useState } from 'react'
import { Play, Pause, Clock, User, ChevronRight, BookOpen, Volume2 } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const sermons = [
  { title: 'Choice of God: A Divine Intervention', series: 'Sunday Service', speaker: 'MIV Edinburgh', duration: '42 min', scripture: 'Genesis 24', file: '/sermons/choice-of-god-a-divine-intervention.m4a', featured: true },
  { title: "Faith in God's Character", series: 'Sunday Service', speaker: 'MIV Edinburgh', duration: '38 min', scripture: 'Hebrews 11:6', file: '/sermons/faith-in-gods-character.m4a' },
  { title: 'Go, Light Your World', series: 'Sunday Service', speaker: 'MIV Edinburgh', duration: '39 min', scripture: 'Matthew 5:14–16', file: '/sermons/go-light-your-world.m4a' },
  { title: 'Living and Walking by Faith', series: 'Bible Study', speaker: 'MIV Europe', duration: '63 min', scripture: '2 Corinthians 5:7', file: '/sermons/living-and-walking-by-faith.m4a' },
  { title: 'The Message', series: 'Mid Week Service', speaker: 'MIV Edinburgh', duration: '39 min', scripture: 'Romans 10:17', file: '/sermons/message.m4a' },
  { title: 'My Wife', series: 'Special Message', speaker: 'MIV Edinburgh', duration: '38 min', scripture: 'Proverbs 31:10', file: '/sermons/my-wife-message.m4a' },
  { title: 'The Word for Today', series: 'Sunday Service', speaker: 'Pastor Sunday Adedeji', duration: '20 min', scripture: '2 Timothy 4:2', file: '/sermons/pastor-sunday-adedeji.m4a' },
  { title: 'The Name of Jesus', series: 'Mid Week Service', speaker: 'MIV Edinburgh', duration: '32 min', scripture: 'Philippians 2:9–10', file: '/sermons/the-name-of-jesus.m4a' },
]

const allSeries = ['All', ...new Set(sermons.map(s => s.series))]

export default function Sermons() {
  const [activeSeries, setActiveSeries] = useState('All')
  const [playing, setPlaying] = useState(null)
  const [headerRef, headerIn] = useInView()
  const [contentRef, contentIn] = useInView()
  const audioRef = useRef(null)

  const featured = sermons[0]
  const rest = sermons.slice(1).filter(s => activeSeries === 'All' || s.series === activeSeries)

  const togglePlay = (sermon) => {
    const audio = audioRef.current
    if (!audio) return
    if (playing === sermon.title) {
      audio.pause()
      setPlaying(null)
      return
    }
    audio.src = sermon.file
    audio.play().catch(() => {})
    setPlaying(sermon.title)
  }

  return (
    <section id="sermons" className="section" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <audio ref={audioRef} onEnded={() => setPlaying(null)} />

        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 20, marginBottom: 40,
            opacity: headerIn ? 1 : 0, transform: headerIn ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div>
            <p className="section-label">The Word</p>
            <h2 className="section-title">Sermons & Messages</h2>
            <div className="divider" />
            <p className="section-subtitle">Listen, watch, and grow. Every message is available to revisit anytime.</p>
          </div>
        </div>

        {/* Series filter */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36,
          opacity: headerIn ? 1 : 0, transform: headerIn ? 'none' : 'translateY(14px)',
          transition: 'opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease',
        }}>
          {allSeries.map(s => (
            <button
              key={s}
              onClick={() => setActiveSeries(s)}
              style={{
                background: activeSeries === s ? 'var(--primary)' : 'var(--bg-card2)',
                color: activeSeries === s ? '#fff' : 'var(--text-muted)',
                border: `1.5px solid ${activeSeries === s ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 99, padding: '7px 16px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeSeries === s ? 'var(--glow)' : 'none',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        <div ref={contentRef}>
          {/* Featured sermon */}
          <div style={{
            background: 'var(--bg-card2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '32px 36px',
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: 28, alignItems: 'center', marginBottom: 28,
            opacity: contentIn ? 1 : 0,
            transform: contentIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}>
            <div>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span style={{ background: 'var(--accent)', color: '#000', borderRadius: 99, padding: '3px 12px', fontSize: 10, fontWeight: 800, letterSpacing: 1 }}>FEATURED</span>
                <span style={{ background: 'var(--bg-card)', color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 99, padding: '3px 12px', fontSize: 10, fontWeight: 600, letterSpacing: 0.5 }}>
                  {featured.series}
                </span>
                {playing === featured.title && (
                  <span style={{ background: '#10B98120', color: '#10B981', border: '1px solid #10B98144', borderRadius: 99, padding: '3px 12px', fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 5 }}>
                    <Volume2 size={10} /> NOW PLAYING
                  </span>
                )}
              </div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(18px, 3vw, 28px)', marginBottom: 14, lineHeight: 1.25 }}>{featured.title}</h3>
              <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', marginBottom: 20 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13.5 }}><User size={13} /> {featured.speaker}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13.5 }}><Clock size={13} /> {featured.duration}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 13.5 }}><BookOpen size={13} /> {featured.scripture}</span>
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button className="btn btn-accent" onClick={() => togglePlay(featured)}>
                  {playing === featured.title ? <Pause size={15} fill="currentColor" /> : <Play size={15} fill="currentColor" />}
                  {playing === featured.title ? 'Pause' : 'Listen Now'}
                </button>
              </div>
            </div>

            {/* Big play circle */}
            <button
              onClick={() => togglePlay(featured)}
              style={{
                width: 90, height: 90, borderRadius: '50%', border: 'none',
                background: playing === featured.title ? '#10B981' : 'var(--primary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: playing === featured.title ? '0 0 32px #10B98155' : 'var(--glow)',
                cursor: 'pointer', flexShrink: 0,
                transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                transform: playing === featured.title ? 'scale(1.08)' : 'scale(1)',
              }}
            >
              {playing === featured.title
                ? <Pause size={32} fill="#fff" color="#fff" />
                : <Play size={32} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
              }
            </button>
          </div>

          {/* Sermon list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rest.map((sermon, i) => {
              const { title, series, speaker, duration, scripture } = sermon
              const isPlaying = playing === title
              return (
                <div
                  key={title}
                  onClick={() => togglePlay(sermon)}
                  style={{
                    background: isPlaying ? 'var(--bg-card)' : 'var(--bg-card2)',
                    border: `1px solid ${isPlaying ? 'var(--primary-light)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius)',
                    padding: '16px 22px',
                    display: 'flex', alignItems: 'center', gap: 16,
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    boxShadow: isPlaying ? 'var(--glow)' : 'none',
                    opacity: contentIn ? 1 : 0,
                    transform: contentIn ? 'none' : 'translateY(20px)',
                    transitionDelay: `${(i + 1) * 0.08}s`,
                  }}
                  onMouseEnter={e => { if (!isPlaying) { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.background = 'var(--bg-card)' } }}
                  onMouseLeave={e => { if (!isPlaying) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card2)' } }}
                >
                  <div style={{
                    width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                    background: isPlaying ? '#10B981' : 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.3s',
                    boxShadow: isPlaying ? '0 0 20px #10B98155' : 'none',
                  }}>
                    {isPlaying
                      ? <Pause size={16} fill="#fff" color="#fff" />
                      : <Play size={16} fill="#fff" color="#fff" style={{ marginLeft: 2 }} />
                    }
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{speaker} · {scripture}</div>
                  </div>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexShrink: 0 }}>
                    {isPlaying && (
                      <span style={{ color: '#10B981', fontSize: 11, fontWeight: 700, letterSpacing: 1 }}>PLAYING</span>
                    )}
                    <span style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 99, padding: '3px 10px', fontSize: 11, color: 'var(--text-muted)', fontWeight: 600 }}>{series}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}><Clock size={11} /> {duration}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

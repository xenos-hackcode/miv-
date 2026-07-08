import { useState } from 'react'
import { Clock, MapPin, Calendar, Video, Users, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { useInView } from '../hooks/useInView'
import flierSunday from '../assets/flier-sunday.jpeg'
import flierMidweek from '../assets/flier-midweek.jpeg'
import outdoorAdvert from '../assets/outdoor-advert.jpg'
import rollUpBanner from '../assets/roll-up-banner.jpg'

const services = [
  {
    day: 'Sunday',
    icon: <Users size={28} />,
    color: 'var(--accent)',
    sessions: [
      {
        time: '12:30 PM – 3:00 PM',
        name: 'Sunday Worship Service',
        desc: 'Our main Sunday celebration service — Spirit-filled worship, powerful preaching from the Word, prayer, and fellowship. Come expecting an encounter with God.',
      },
    ],
    note: 'Gorgie Memorial Hall, 338 Gorgie Road, Edinburgh EH11 2RQ',
  },
  {
    day: 'Wednesday',
    icon: <Video size={28} />,
    color: '#3B82F6',
    sessions: [
      {
        time: '6:30 PM – 7:45 PM',
        name: 'Mid Week Service',
        desc: 'Our Wednesday mid-week service is held online via Zoom. Join us from anywhere for Bible teaching, prayer, and fellowship.',
      },
    ],
    note: '🔗 Join on Zoom every Wednesday at 6:30 PM',
    zoomLink: 'https://us06web.zoom.us/j/84517533113?pwd=dlN5VDBNMFROVkJ6c1BRSStQMDNTZz09',
    online: true,
  },
  {
    day: 'Last Saturday',
    icon: <MapPin size={28} />,
    color: '#10B981',
    sessions: [
      {
        time: 'Every Last Saturday of the Month',
        name: 'Evangelism Outreach',
        desc: 'Taking the Gospel to the streets. Every last Saturday we go out as a church to preach, pray, and reach the unreached. Come ready to serve and make an impact.',
      },
    ],
    note: 'Location announced each month — contact us for details',
  },
]

function ServiceCard({ day, icon, color, sessions, note, zoomLink, online, index, inView }) {
  const [open, setOpen] = useState(false)

  return (
    <div
      style={{
        background: 'var(--bg-card2)',
        border: `1px solid ${open ? color : 'var(--border)'}`,
        borderRadius: 'var(--radius)',
        overflow: 'hidden',
        transition: `border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.6s ${index * 0.12}s ease, transform 0.6s ${index * 0.12}s ease`,
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        boxShadow: open ? `0 8px 32px ${color}22` : 'none',
      }}
    >
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '24px 24px 20px', textAlign: 'left',
          display: 'flex', alignItems: 'center', gap: 16,
        }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: 12, flexShrink: 0,
          background: `${color}1A`, border: `1px solid ${color}33`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', color,
          transition: 'transform 0.3s',
          transform: open ? 'scale(1.1)' : 'scale(1)',
        }}>
          {icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, color: 'var(--text)' }}>{day}</h3>
            {online && (
              <span style={{ background: '#3B82F620', color: '#3B82F6', border: '1px solid #3B82F640', borderRadius: 99, padding: '2px 10px', fontSize: 10, fontWeight: 700, letterSpacing: 0.5 }}>
                ONLINE
              </span>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
            {sessions[0].time}
          </p>
        </div>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: open ? color : 'var(--bg-card)',
          border: `1px solid ${open ? color : 'var(--border)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: open ? '#000' : 'var(--text-muted)',
          transition: 'all 0.3s', flexShrink: 0,
        }}>
          {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
        </div>
      </button>

      <div style={{
        maxHeight: open ? '400px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{ padding: '0 24px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {sessions.map(({ time, name, desc }) => (
            <div key={time} style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 10, padding: '16px 18px',
              borderLeft: `3px solid ${color}`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                <Clock size={13} color={color} />
                <span style={{ fontWeight: 700, color, fontSize: 15 }}>{time}</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 6, color: 'var(--text)' }}>{name}</div>
              <div style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.65 }}>{desc}</div>
            </div>
          ))}
          {note && (
            <p style={{ fontSize: 13, color, fontWeight: 600, display: 'flex', alignItems: 'flex-start', gap: 6, lineHeight: 1.5 }}>
              <span style={{ flexShrink: 0 }}>ℹ</span> {note}
            </p>
          )}
          {zoomLink && (
            <a
              href={zoomLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#3B82F6', color: '#fff',
                padding: '10px 20px', borderRadius: 8,
                fontWeight: 700, fontSize: 14, textDecoration: 'none',
                alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              <ExternalLink size={15} /> Join Zoom Meeting
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ServiceTimes() {
  const [headerRef, headerIn] = useInView()
  const [cardsRef, cardsIn] = useInView()
  const [bannerRef, bannerIn] = useInView()
  const [fliersRef, fliersIn] = useInView()

  return (
    <section id="services" className="section" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        <div
          ref={headerRef}
          style={{
            textAlign: 'center', marginBottom: 56,
            opacity: headerIn ? 1 : 0, transform: headerIn ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label">Join Us</p>
          <h2 className="section-title">Service Times</h2>
          <div className="divider" style={{ margin: '18px auto 0' }} />
          <p className="section-subtitle" style={{ margin: '18px auto 0' }}>
            Click any service to see full details. All are welcome — wherever you are on your journey.
          </p>
        </div>

        <div ref={cardsRef} style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 56 }}>
          {services.map((s, i) => (
            <ServiceCard key={s.day} {...s} index={i} inView={cardsIn} />
          ))}
        </div>

        {/* Location banner */}
        <div
          ref={bannerRef}
          style={{
            background: 'var(--bg-card2)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '32px 36px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: 20,
            opacity: bannerIn ? 1 : 0, transform: bannerIn ? 'none' : 'translateY(20px)',
            transition: 'opacity 0.6s 0.2s ease, transform 0.6s 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div style={{
              width: 50, height: 50, borderRadius: 12,
              background: 'var(--primary)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', color: 'var(--accent)', flexShrink: 0,
            }}>
              <MapPin size={22} />
            </div>
            <div>
              <div style={{ fontFamily: 'Cinzel, serif', fontSize: 17, marginBottom: 4 }}>Gorgie Memorial Hall</div>
              <div style={{ color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.6 }}>
                338 Gorgie Road, Edinburgh, EH11 2RQ<br />
                <span style={{ fontSize: 13 }}>Sunday in-person · Wednesday online (Zoom)</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <a
              href="https://maps.google.com/?q=338+Gorgie+Road+Edinburgh+EH11+2RQ"
              target="_blank" rel="noopener noreferrer"
              className="btn btn-primary"
            >
              <MapPin size={15} /> Get Directions
            </a>
            <a href="https://wa.me/447565391361" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <Calendar size={15} /> WhatsApp Us
            </a>
          </div>
        </div>
        {/* Service Fliers */}
        <div
          ref={fliersRef}
          style={{
            marginTop: 56,
            opacity: fliersIn ? 1 : 0,
            transform: fliersIn ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label" style={{ textAlign: 'center', marginBottom: 8 }}>Service Fliers</p>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, textAlign: 'center', marginBottom: 28, color: 'var(--text)' }}>Join Us This Week</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="fliers-grid">
            {[
              { src: flierSunday, alt: 'Sunday Worship Service Flier', label: 'Sunday Service' },
              { src: flierMidweek, alt: 'Mid Week Bible Study & Prayer Flier', label: 'Mid Week Service' },
            ].map(({ src, alt, label }, i) => (
              <div
                key={label}
                style={{
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card2)',
                  opacity: fliersIn ? 1 : 0,
                  transform: fliersIn ? 'none' : 'translateY(28px)',
                  transition: `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                }}
              >
                <div style={{ height: 400, overflow: 'hidden' }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '14px 18px', fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promotional Materials */}
        <div style={{ marginTop: 56 }}>
          <p className="section-label" style={{ textAlign: 'center', marginBottom: 8 }}>Spread the Word</p>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, textAlign: 'center', marginBottom: 28, color: 'var(--text)' }}>Promotional Materials</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }} className="fliers-grid">
            {[
              { src: outdoorAdvert, alt: 'MIV Edinburgh Outdoor Advert', label: 'Outdoor Advert' },
              { src: rollUpBanner, alt: 'MIV Edinburgh Roll Up Banner', label: 'Roll Up Banner' },
            ].map(({ src, alt, label }, i) => (
              <div
                key={label}
                style={{
                  borderRadius: 'var(--radius)',
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  background: 'var(--bg-card2)',
                  transition: `opacity 0.55s ${i * 0.12}s ease, transform 0.55s ${i * 0.12}s ease`,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                }}
              >
                <div style={{ height: 400, overflow: 'hidden' }}>
                  <img
                    src={src}
                    alt={alt}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
                <div style={{ padding: '14px 18px', fontFamily: 'Cinzel, serif', fontSize: 14, fontWeight: 700, color: 'var(--text)', textAlign: 'center' }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 640px) {
          .fliers-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

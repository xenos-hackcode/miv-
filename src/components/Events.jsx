import { useState } from 'react'
import { Calendar, MapPin, Clock, ArrowRight, X } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const all = [
  {
    month: 'JUL', day: '25',
    title: 'Summer Family Outing',
    time: 'Time to be confirmed',
    location: 'Gorgie Memorial Hall, 338 Gorgie Road, Edinburgh EH11 2RQ',
    description: 'A fun family day out with BBQ, food, snacks, and games including table tennis — right at our church grounds. Just for fellowship and fun!',
    detail: 'Join us for a relaxed day of family fun — BBQ, food, snacks, and games including table tennis. It\'s simply a time of fellowship and fun for the whole church family, held at the same location as our Sunday services.',
    tag: 'Family', tagColor: '#10B981',
  },
  {
    month: 'TBC', day: '—',
    title: 'Community Prayer Walk',
    time: 'Date & time to be communicated',
    location: 'Meet at Gorgie Road',
    description: 'Walk through our neighbourhood in prayer, asking God\'s blessing on Edinburgh and the people of Gorgie.',
    detail: 'We walk through our neighbourhood in prayer, asking God\'s blessing on Edinburgh and the people of Gorgie. The date and time will be communicated soon — stay tuned.',
    tag: 'Outreach', tagColor: 'var(--accent)',
  },
  {
    month: 'TBC', day: '—',
    title: 'Youth Leadership Camp',
    time: 'Date to be communicated',
    location: 'To be announced',
    description: 'A camp dedicated to raising up the next generation of youth leaders — spiritually, mentally, and in career and leadership skills.',
    detail: 'MIV Edinburgh places much emphasis on the development of the youths spiritually, career wise, mentally and leadership skills. Join our amazing youths to experience life transforming sessions.',
    tag: 'Youth', tagColor: 'var(--primary-light)',
  },
  {
    month: 'TBC', day: '—',
    title: 'Family Healing Session',
    time: 'Date to be confirmed (2027 edition)',
    location: 'Gorgie Memorial Hall',
    description: 'Our yearly family healing conference — restoring marriages and reconciling families through the power of God\'s Word.',
    detail: 'This yearly conference (date to be confirmed) has impacted and transformed many families — renewing the relationship between husband and wife, and reconciling children to parents — through the servant of God, Rev Samson Ajetomobi. The 2027 edition date will be communicated. Don\'t miss it!',
    tag: 'Conference', tagColor: '#EC4899',
  },
]

const categories = ['All', ...new Set(all.map(e => e.tag))]

export default function Events() {
  const [activeTag, setActiveTag] = useState('All')
  const [selected, setSelected] = useState(null)
  const [headerRef, headerIn] = useInView()
  const [gridRef, gridIn] = useInView()

  const filtered = activeTag === 'All' ? all : all.filter(e => e.tag === activeTag)

  return (
    <section id="events" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
            flexWrap: 'wrap', gap: 20, marginBottom: 36,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <div>
            <p className="section-label">What's On</p>
            <h2 className="section-title">Upcoming Events</h2>
            <div className="divider" />
            <p className="section-subtitle">Stay connected. There is always something happening at MIV.</p>
          </div>
        </div>

        {/* Category filter */}
        <div style={{
          display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 36,
          opacity: headerIn ? 1 : 0,
          transform: headerIn ? 'none' : 'translateY(16px)',
          transition: 'opacity 0.5s 0.15s ease, transform 0.5s 0.15s ease',
        }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTag(cat)}
              style={{
                background: activeTag === cat ? 'var(--primary)' : 'var(--bg-card)',
                color: activeTag === cat ? '#fff' : 'var(--text-muted)',
                border: `1.5px solid ${activeTag === cat ? 'var(--primary)' : 'var(--border)'}`,
                borderRadius: 99, padding: '7px 18px', fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
                boxShadow: activeTag === cat ? 'var(--glow)' : 'none',
              }}
              onMouseEnter={e => { if (activeTag !== cat) { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--text)' } }}
              onMouseLeave={e => { if (activeTag !== cat) { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' } }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Events grid */}
        <div ref={gridRef} className="grid-3">
          {filtered.length === 0 && (
            <p style={{ color: 'var(--text-muted)', gridColumn: '1/-1', textAlign: 'center', padding: '40px 0' }}>
              No events in this category right now. Check back soon!
            </p>
          )}
          {filtered.map((event, i) => {
            const { month, day, title, time, location, description, tag, tagColor } = event
            return (
              <div
                key={title}
                className="card"
                style={{
                  display: 'flex', flexDirection: 'column',
                  cursor: 'pointer',
                  opacity: gridIn ? 1 : 0,
                  transform: gridIn ? 'none' : 'translateY(32px)',
                  transition: `opacity 0.55s ${i * 0.1}s ease, transform 0.55s ${i * 0.1}s ease`,
                }}
                onClick={() => setSelected(event)}
              >
                {/* Date + tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                  <div style={{
                    background: 'var(--primary)', borderRadius: 10,
                    padding: '8px 14px', textAlign: 'center', minWidth: 54,
                    boxShadow: 'var(--glow)',
                  }}>
                    <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', textTransform: 'uppercase' }}>{month}</div>
                    <div style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{day}</div>
                  </div>
                  <span style={{
                    background: `${tagColor}20`, color: tagColor,
                    border: `1px solid ${tagColor}44`,
                    borderRadius: 99, padding: '4px 12px',
                    fontSize: 11, fontWeight: 700, letterSpacing: 0.5,
                  }}>
                    {tag}
                  </span>
                </div>

                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 16.5, marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 5, marginBottom: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-muted)', fontSize: 13 }}>
                    <Clock size={12} /> {time}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'var(--text-muted)', fontSize: 13 }}>
                    <MapPin size={12} /> {location}
                  </div>
                </div>

                <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.65, flex: 1 }}>{description}</p>

                <button
                  className="btn btn-ghost"
                  style={{ marginTop: 16, padding: '7px 0', justifyContent: 'flex-start', color: tagColor, gap: 5, fontSize: 13, fontWeight: 700 }}
                  onClick={(e) => { e.stopPropagation(); setSelected(event) }}
                  onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                  onMouseLeave={e => e.currentTarget.style.gap = '5px'}
                >
                  Learn More <ArrowRight size={14} />
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Event detail modal */}
      {selected && (
        <>
          <div className="backdrop" onClick={() => setSelected(null)} />
          <div style={{
            position: 'fixed', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'min(520px, 92vw)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 32px',
            zIndex: 300,
            animation: 'fadeInUp 0.3s ease',
            boxShadow: 'var(--shadow-lg)',
            maxHeight: '85vh',
            overflowY: 'auto',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: selected.tagColor, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

            <button
              onClick={() => setSelected(null)}
              style={{
                position: 'absolute', top: 16, right: 16,
                width: 32, height: 32, borderRadius: '50%',
                background: 'var(--bg-card2)', border: '1px solid var(--border)',
                color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
            >
              <X size={15} />
            </button>

            <span style={{
              display: 'inline-block', background: `${selected.tagColor}20`, color: selected.tagColor,
              border: `1px solid ${selected.tagColor}44`, borderRadius: 99, padding: '4px 12px',
              fontSize: 11, fontWeight: 700, letterSpacing: 0.5, marginBottom: 14,
            }}>
              {selected.tag}
            </span>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 14 }}>{selected.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14 }}>
                <Clock size={14} /> {selected.time}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14 }}>
                <MapPin size={14} /> {selected.location}
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{selected.detail}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <a href="https://wa.me/447565391361" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                <Calendar size={15} /> Ask About This
              </a>
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

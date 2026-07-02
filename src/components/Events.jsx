import { useState } from 'react'
import { Calendar, MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const all = [
  { month: 'JUL', day: '06', title: 'Summer Family Fun Day', time: '12:00 PM – 5:00 PM', location: 'Church Grounds', description: 'An afternoon of games, food, live music, and fellowship for the whole family. Free entry for all.', tag: 'Family', tagColor: '#10B981' },
  { month: 'JUL', day: '13', title: 'Community Prayer Walk', time: '10:00 AM', location: 'Meet at Gorgie Road', description: 'Walk through our neighbourhood in prayer, asking God\'s blessing on Edinburgh and the people of Gorgie.', tag: 'Outreach', tagColor: 'var(--accent)' },
  { month: 'JUL', day: '20', title: 'Youth Leadership Camp', time: 'July 20–22', location: 'Loch Lomond Retreat', description: 'Three days of discipleship, outdoor activities, and leadership training for young people aged 14–24.', tag: 'Youth', tagColor: 'var(--primary-light)' },
  { month: 'AUG', day: '03', title: "Women's Brunch & Bible", time: '10:30 AM', location: 'Fellowship Hall', description: 'A special morning for the women of MIV — breakfast, teaching, and meaningful conversation.', tag: 'Women', tagColor: '#EC4899' },
  { month: 'AUG', day: '17', title: "Men's Breakfast & Testimony", time: '8:00 AM', location: 'Main Hall', description: 'Men gather over a hot breakfast to hear testimonies of God\'s faithfulness and build one another up.', tag: 'Men', tagColor: '#3B82F6' },
  { month: 'SEP', day: '07', title: 'Harvest Thanksgiving', time: '10:30 AM & 6:00 PM', location: 'Main Sanctuary', description: 'A special service of praise and gratitude. Bring non-perishables for our food drive.', tag: 'Worship', tagColor: 'var(--accent)' },
]

const categories = ['All', 'Family', 'Outreach', 'Youth', 'Women', 'Men', 'Worship']

export default function Events() {
  const [activeTag, setActiveTag] = useState('All')
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
          <button className="btn btn-outline" style={{ flexShrink: 0 }}>
            View All <ChevronRight size={15} />
          </button>
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
          {filtered.map(({ month, day, title, time, location, description, tag, tagColor }, i) => (
            <div
              key={title}
              className="card"
              style={{
                display: 'flex', flexDirection: 'column',
                opacity: gridIn ? 1 : 0,
                transform: gridIn ? 'none' : 'translateY(32px)',
                transition: `opacity 0.55s ${i * 0.1}s ease, transform 0.55s ${i * 0.1}s ease`,
              }}
            >
              {/* Date + tag */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                <div style={{
                  background: 'var(--primary)', borderRadius: 10,
                  padding: '8px 14px', textAlign: 'center', minWidth: 54,
                  boxShadow: 'var(--glow)',
                }}>
                  <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 2, color: 'var(--accent)', textTransform: 'uppercase' }}>{month}</div>
                  <div style={{ fontFamily: 'Cinzel, serif', fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>{day}</div>
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
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '5px'}
              >
                Learn More <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

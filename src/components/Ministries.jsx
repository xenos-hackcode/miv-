import { useState } from 'react'
import { Users, Baby, Heart, Globe, Music, BookOpen, Handshake, Star, ArrowRight, X } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const ministries = [
  { icon: <Baby size={26} />, title: "Children's Ministry", age: 'Ages 0–12', description: 'Fun, age-appropriate teaching that lays a strong foundation of faith for the youngest members of our church family.', color: '#F59E0B', detail: 'Our children\'s ministry runs every Sunday during the 10:30 AM service. We have trained volunteers who lead interactive Bible lessons, crafts, and worship for children from newborn to age 12. DBS-checked staff. Snacks provided.' },
  { icon: <Star size={26} />, title: 'Youth Ministry', age: 'Ages 13–25', description: 'A vibrant community where young people encounter God, build real friendships, and grow as disciples.', color: '#8B5CF6', detail: 'MIV Youth meets every Friday at 7PM. We do life together — worship, real talk, teaching, and adventures. Our leadership team is passionate about discipling the next generation. Summer camps and retreats run annually.' },
  { icon: <Heart size={26} />, title: "Women's Ministry", age: 'All Women', description: 'Empowering women through Bible study, mentoring, retreats, and community — growing in grace together.', color: '#EC4899', detail: 'Monthly women\'s brunches, weekly Bible study groups, and an annual women\'s retreat. We believe in women walking in their God-given calling, building one another up with wisdom and love.' },
  { icon: <Handshake size={26} />, title: "Men's Ministry", age: 'All Men', description: 'Building men of God through accountability, fellowship, discipleship, and practical service.', color: '#3B82F6', detail: 'Monthly men\'s breakfasts, accountability groups, and discipleship tracks. We equip men to lead well at home, work, and church. Annual men\'s retreat in the Scottish Highlands.' },
  { icon: <Globe size={26} />, title: 'Outreach & Missions', age: 'All Welcome', description: 'Taking the love of Christ into our community and across the globe — local food banks, international missions, and more.', color: '#10B981', detail: 'We run a weekly food bank at Gorgie Memorial Hall, partner with 12 mission nations, and send short-term teams annually. Local initiatives include street outreach, prison ministry, and refugee support.' },
  { icon: <Music size={26} />, title: 'Worship Team', age: 'All Musicians', description: 'Join our passionate team of singers and musicians who lead our congregation in heartfelt worship every Sunday.', color: 'var(--accent)', detail: 'We welcome singers, instrumentalists (guitar, keys, bass, drums), and sound/media volunteers. Rehearsals on Saturdays 10AM–12PM. Auditions available — speak to our worship leader after a Sunday service.' },
  { icon: <BookOpen size={26} />, title: 'Prayer Ministry', age: 'All Welcome', description: 'Interceding for our church, city, and nation — through weekly prayer meetings and a 24/7 online prayer chain.', color: '#EF4444', detail: 'Tuesday evening prayer meetings 7–8PM. We maintain a WhatsApp prayer chain for immediate needs. Monthly all-night prayer meetings. We believe prayer moves mountains and shapes nations.' },
  { icon: <Users size={26} />, title: 'Small Groups', age: 'All Ages', description: 'Connect in smaller settings throughout the week — life groups, Bible studies, and neighbourhood circles.', color: 'var(--primary-light)', detail: 'Over 15 small groups meeting across Edinburgh. Groups vary by stage of life, interest, and location. Find a group near you or start your own — speak to our small groups coordinator after a Sunday service.' },
]

function MinistryCard({ ministry, index, inView, onOpen }) {
  const { icon, title, age, description, color } = ministry
  return (
    <div
      onClick={() => onOpen(ministry)}
      className="card"
      style={{
        position: 'relative', overflow: 'hidden', cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(28px)',
        transition: `opacity 0.55s ${index * 0.07}s ease, transform 0.55s ${index * 0.07}s ease`,
      }}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: color, borderRadius: 'var(--radius) var(--radius) 0 0' }} />
      <div style={{ width: 52, height: 52, borderRadius: 12, background: `${color}1A`, border: `1px solid ${color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', color, marginBottom: 14 }}>
        {icon}
      </div>
      <div style={{ fontSize: 10, fontWeight: 800, color, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 5 }}>{age}</div>
      <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 15.5, marginBottom: 10, lineHeight: 1.3 }}>{title}</h3>
      <p style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.65 }}>{description}</p>
      <div style={{
        marginTop: 16, display: 'flex', alignItems: 'center', gap: 5,
        color, fontSize: 13, fontWeight: 700,
        transition: 'gap 0.2s',
      }}>
        Find Out More <ArrowRight size={13} />
      </div>
    </div>
  )
}

export default function Ministries() {
  const [selected, setSelected] = useState(null)
  const [headerRef, headerIn] = useInView()
  const [gridRef, gridIn] = useInView()
  const [ctaRef, ctaIn] = useInView()

  return (
    <section id="ministries" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div ref={headerRef} style={{
          textAlign: 'center', marginBottom: 56,
          opacity: headerIn ? 1 : 0, transform: headerIn ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <p className="section-label">Get Involved</p>
          <h2 className="section-title">Our Ministries</h2>
          <div className="divider" style={{ margin: '18px auto 0' }} />
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Click any ministry to learn more. There is a place for you here.
          </p>
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid-4">
          {ministries.map((m, i) => (
            <MinistryCard key={m.title} ministry={m} index={i} inView={gridIn} onOpen={setSelected} />
          ))}
        </div>

        {/* CTA banner */}
        <div ref={ctaRef} style={{
          marginTop: 60,
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)',
          borderRadius: 'var(--radius-lg)', padding: '44px 40px', textAlign: 'center',
          boxShadow: 'var(--shadow-lg)',
          opacity: ctaIn ? 1 : 0, transform: ctaIn ? 'none' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}>
          <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 26, color: '#fff', marginBottom: 12 }}>Not Sure Where to Start?</h3>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15.5, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
            Come along on a Sunday, introduce yourself, and our team will connect you to the right ministry.
          </p>
          <button className="btn btn-accent" style={{ padding: '14px 32px', fontSize: 16 }}>
            Visit Us This Sunday
          </button>
        </div>
      </div>

      {/* Ministry detail modal */}
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
            {/* Top bar */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: selected.color, borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }} />

            {/* Close */}
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

            <div style={{ width: 56, height: 56, borderRadius: 14, background: `${selected.color}1A`, border: `1px solid ${selected.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected.color, marginBottom: 18 }}>
              {selected.icon}
            </div>
            <div style={{ fontSize: 10, fontWeight: 800, color: selected.color, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>{selected.age}</div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 16 }}>{selected.title}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 28 }}>{selected.detail}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>Get Involved</button>
              <button className="btn btn-outline" onClick={() => setSelected(null)}>Close</button>
            </div>
          </div>
        </>
      )}
    </section>
  )
}

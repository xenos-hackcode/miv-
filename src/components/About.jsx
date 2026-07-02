import { Heart, Target, BookOpen, Users, Award, Globe, Quote } from 'lucide-react'
import { useInView, useCounter } from '../hooks/useInView'
import churchBuilding from '../assets/church-building.jpeg'
import pastorSunday from '../assets/pastor-sunday.jpeg'

const pillars = [
  { icon: <BookOpen size={26} />, title: 'Our Mission', body: 'To share the love of Christ by making disciples, building community, and serving our neighbours with compassion and grace.' },
  { icon: <Target size={26} />, title: 'Our Vision', body: 'A church where every person encounters God, finds belonging, and is equipped to impact the world for His glory.' },
  { icon: <Heart size={26} />, title: 'Our Values', body: 'Faith, Community, Service, Worship, and Growth — the foundations that guide everything we do as Men of Issachar Vision.' },
]

const stats = [
  { icon: <Users size={22} />, number: 20, suffix: '+', label: 'Members & Growing' },
  { icon: <Award size={22} />, number: 2, suffix: '', label: 'Lead Pastors' },
  { icon: <Globe size={22} />, number: 1, suffix: '', label: 'Edinburgh Base' },
  { icon: <Heart size={22} />, number: 52, suffix: '', label: 'Sundays a Year' },
]

function StatCard({ icon, number, suffix, label }) {
  const [ref, inView] = useInView()
  const count = useCounter(number, inView)
  return (
    <div ref={ref} className="card" style={{ textAlign: 'center', padding: '28px 20px' }}>
      <div style={{ color: 'var(--accent)', marginBottom: 12, display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 36, fontWeight: 700, color: 'var(--text)', lineHeight: 1 }}>
        {count}{suffix}
      </div>
      <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8, fontWeight: 500 }}>{label}</div>
    </div>
  )
}

export default function About() {
  const [headerRef, headerIn] = useInView()
  const [pillarsRef, pillarsIn] = useInView()
  const [storyRef, storyIn] = useInView()
  const [quoteRef, quoteIn] = useInView()
  const [buildingRef, buildingIn] = useInView()

  return (
    <section id="about" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            maxWidth: 600, marginBottom: 64,
            opacity: headerIn ? 1 : 0,
            transform: headerIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="section-label">Who We Are</p>
          <h2 className="section-title">A Family Built on Faith</h2>
          <div className="divider" />
          <p className="section-subtitle">
            Men of Issachar Vision (MIV) is a Spirit-filled church in Edinburgh with a bold mandate — to reawaken the church to its calling and to reach the unreached at all cost.
          </p>
        </div>

        {/* Mission / Vision / Values */}
        <div
          ref={pillarsRef}
          className="grid-3"
          style={{ marginBottom: 72 }}
        >
          {pillars.map(({ icon, title, body }, i) => (
            <div
              key={title}
              className="card"
              style={{
                opacity: pillarsIn ? 1 : 0,
                transform: pillarsIn ? 'none' : 'translateY(32px)',
                transition: `opacity 0.6s ${i * 0.15}s ease, transform 0.6s ${i * 0.15}s ease`,
              }}
            >
              <div className="icon-box">{icon}</div>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 20, marginBottom: 12 }}>{title}</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: 1.75, fontSize: 15 }}>{body}</p>
            </div>
          ))}
        </div>

        {/* Story + Stats */}
        <div
          ref={storyRef}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center',
            opacity: storyIn ? 1 : 0,
            transform: storyIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease',
          }}
        >
          {/* Story */}
          <div>
            <p className="section-label">Our Story</p>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(22px, 3.5vw, 34px)', marginBottom: 16, lineHeight: 1.25 }}>
              Rooted in the Word, <span className="text-gold">Reaching the World</span>
            </h2>
            <div className="divider" />
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 18, fontSize: 15 }}>
              Men of Issachar Vision (MIV) meets at Gorgie Memorial Hall in Edinburgh, led by Pastor Samson Ajetomobi and Pastor Stella Ajetomobi alongside Pastor Rufus Omolayo and Pastor Sunday Adedeji.
              We are a church that understands the times — grounded in the prophetic insight of the sons of Issachar who knew what God's people should do (1 Chronicles 12:32).
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>
              Our mandate is clear: to reawaken the church to its calling and to reach the unreached at all cost.
              Through Sunday worship, mid-week teaching, monthly evangelism, and community outreach,
              we are answering the call — right here in Edinburgh and beyond.
            </p>

            {/* Pastor Sunday photo card */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16,
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', padding: '16px',
              borderLeft: '3px solid var(--accent)',
            }}>
              <img
                src={pastorSunday}
                alt="Pastor Sunday Adedeji"
                style={{
                  width: 72, height: 72,
                  borderRadius: 10,
                  objectFit: 'cover',
                  objectPosition: 'top',
                  flexShrink: 0,
                  border: '2px solid var(--accent)',
                }}
              />
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontSize: 15, fontWeight: 700, color: 'var(--text)', marginBottom: 2 }}>
                  Pastor Sunday Adedeji
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--accent)', fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                  Associate Pastor · MIV Edinburgh
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  Preaching the Word with power and passion — equipping the church for kingdom impact.
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid-2" style={{ gap: 16 }}>
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>
        </div>

        {/* Church Building Image */}
        <div
          ref={buildingRef}
          style={{
            marginTop: 64,
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            position: 'relative',
            opacity: buildingIn ? 1 : 0,
            transform: buildingIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <img
            src={churchBuilding}
            alt="Men of Issachar Vision at Gorgie Memorial Hall, Edinburgh"
            style={{ width: '100%', maxHeight: 420, objectFit: 'cover', display: 'block' }}
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.75))',
            padding: '40px 32px 28px',
          }}>
            <div style={{ fontFamily: 'Cinzel, serif', fontSize: 'clamp(16px, 2.5vw, 22px)', color: '#fff', fontWeight: 700, marginBottom: 4 }}>
              Men of Issachar Vision
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', letterSpacing: 1 }}>
              Gorgie Memorial Hall · 338 Gorgie Road · Edinburgh EH11 2RQ
            </div>
          </div>
        </div>

        {/* Pastor's Quote + Bible Verse */}
        <div
          ref={quoteRef}
          style={{
            marginTop: 64,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(28px, 5vw, 56px)',
            textAlign: 'center',
            opacity: quoteIn ? 1 : 0,
            transform: quoteIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.7s 0.1s ease, transform 0.7s 0.1s ease',
          }}
        >
          <div style={{ color: 'var(--accent)', marginBottom: 20, display: 'flex', justifyContent: 'center' }}>
            <Quote size={36} />
          </div>
          <p style={{
            fontFamily: 'Cinzel, serif',
            fontSize: 'clamp(16px, 2.8vw, 22px)',
            color: 'var(--text)',
            lineHeight: 1.7,
            maxWidth: 760,
            margin: '0 auto 20px',
            fontStyle: 'italic',
          }}>
            Upon this mountain of Gorgie Memorial Community Hall the name of God shall be praised.
          </p>
          <div style={{
            width: 60, height: 2,
            background: 'var(--accent)',
            margin: '0 auto 24px',
            borderRadius: 2,
          }} />
          <p style={{
            color: 'var(--text-muted)',
            lineHeight: 1.85,
            fontSize: 'clamp(14px, 2vw, 16px)',
            maxWidth: 680,
            margin: '0 auto 20px',
          }}>
            "I give you the name Peter, a stone. And this rock will be the bedrock foundation on which I will build my church — my legislative assembly, and the power of death will not be able to overpower it!"
          </p>
          <a
            href="https://bible.com/bible/1849/mat.16.18.TPT"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              color: 'var(--accent)',
              fontWeight: 700,
              fontSize: 13.5,
              letterSpacing: 1,
              textDecoration: 'none',
              borderBottom: '1px solid var(--accent)',
              paddingBottom: 2,
            }}
          >
            Matthew 16:18 · The Passion Translation
          </a>
        </div>

      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div:nth-child(4) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

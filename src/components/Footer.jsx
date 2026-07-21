import { MapPin, Phone, PlayCircle, Camera, MessageCircle, ArrowUp } from 'lucide-react'
import logo from '../assets/logo.png'

const quickLinks = [
  { label: 'About Us', href: '#about' },
  { label: 'Service Times', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Sermons', href: '#sermons' },
  { label: 'Ministries', href: '#ministries' },
  { label: 'Give', href: '#give' },
  { label: 'Contact', href: '#contact' },
]

const socials = [
  { icon: <span style={{ fontWeight: 900, fontSize: 16, fontFamily: 'serif' }}>f</span>, href: 'https://www.facebook.com/profile.php?id=61575730827168', label: 'Facebook' },
  { icon: <PlayCircle size={18} />, href: '#', label: 'YouTube' },
  { icon: <Camera size={18} />, href: '#', label: 'Instagram' },
  { icon: <MessageCircle size={18} />, href: '#', label: 'X / Twitter' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer style={{
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
    }}>
      {/* Main footer content */}
      <div className="container" style={{ padding: '72px 24px 48px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 48 }}>
          {/* Brand column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <img
                src={logo}
                alt="MIV Logo"
                style={{
                  width: 56, height: 56,
                  borderRadius: '50%',
                  objectFit: 'contain',
                  background: '#fff',
                  flexShrink: 0,
                  boxShadow: 'var(--glow)',
                  border: '2px solid var(--accent)',
                }}
              />
              <div>
                <div style={{ fontFamily: 'Cinzel, serif', fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                  Men of Issachar Vision
                </div>
                <div style={{ fontSize: 11, color: 'var(--accent)', letterSpacing: 2.5, textTransform: 'uppercase', fontWeight: 600 }}>
                  MIV • Edinburgh
                </div>
              </div>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: 14.5, lineHeight: 1.8, marginBottom: 24, maxWidth: 280 }}>
              Reawakening the church to its calling and reaching the unreached at all cost.
              Spirit-filled. Word-grounded. Edinburgh-based.
            </p>

            {/* Contact mini */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: <MapPin size={14} />, text: '338 Gorgie Road, Edinburgh, EH11 2RQ' },
                { icon: <Phone size={14} />, text: '+44 7565 391361 (Pastor Sunday)' },
                { icon: <Phone size={14} />, text: '+44 7901 613720 (Pastor Rufus)' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', gap: 8, alignItems: 'flex-start', color: 'var(--text-muted)', fontSize: 13.5 }}>
                  <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: 2 }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 15, marginBottom: 20, color: 'var(--text)' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => scrollTo(href)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--text-muted)', fontSize: 14.5, padding: 0,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.target.style.color = 'var(--accent)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service times + socials */}
          <div>
            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 15, marginBottom: 20, color: 'var(--text)' }}>Service Times</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
              {[
                { day: 'Sunday', times: '12:30 PM – 3:00 PM (In-person)' },
                { day: 'Wednesday', times: '6:30 – 7:45 PM (Zoom — Mid Week)' },
                { day: 'Last Saturday', times: 'Evangelism Outreach' },
              ].map(({ day, times }) => (
                <div key={day}>
                  <div style={{ fontWeight: 600, fontSize: 13.5, color: 'var(--text)' }}>{day}</div>
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{times}</div>
                </div>
              ))}
            </div>

            <h4 style={{ fontFamily: 'Cinzel, serif', fontSize: 15, marginBottom: 14, color: 'var(--text)' }}>Follow Us</h4>
            <div style={{ display: 'flex', gap: 10 }}>
              {socials.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{
                    width: 38, height: 38, borderRadius: 8,
                    background: 'var(--bg-card2)',
                    border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--text-muted)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = 'var(--accent)'
                    e.currentTarget.style.borderColor = 'var(--accent)'
                    e.currentTarget.style.background = 'var(--primary)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'var(--text-muted)'
                    e.currentTarget.style.borderColor = 'var(--border)'
                    e.currentTarget.style.background = 'var(--bg-card2)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid var(--border)',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 12,
      }}>
        <div className="container" style={{ padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              © {new Date().getFullYear()} Men of Issachar Vision (MIV), Edinburgh. All rights reserved.
            </p>
            <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>
              Built by{' '}
              <a
                href="https://cedalstar.org"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--accent)', fontWeight: 600 }}
              >
                Cedal Star
              </a>
            </p>
          </div>
          <button
            onClick={scrollTop}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--primary)', border: 'none',
              borderRadius: 8, padding: '8px 14px',
              color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer',
              boxShadow: 'var(--glow)',
              transition: 'transform 0.2s, background 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-light)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.transform = '' }}
          >
            <ArrowUp size={14} /> Back to Top
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer .container > div { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          footer .container > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}

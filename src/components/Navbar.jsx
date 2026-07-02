import { useState, useEffect } from 'react'
import { Menu, X, Settings2 } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import logo from '../assets/logo.png'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Events', href: '#events' },
  { label: 'Sermons', href: '#sermons' },
  { label: 'Ministries', href: '#ministries' },
  { label: 'Give', href: '#give' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { setSettingsOpen } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [logoExpanded, setLogoExpanded] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    document.querySelectorAll('section[id]').forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleLink = (href) => {
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'var(--bg-nav)' : 'transparent',
        backdropFilter: scrolled ? 'blur(18px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 70 }}>

          {/* ── Logo / MIV toggle ── */}
          <button
            onClick={() => setLogoExpanded(v => !v)}
            title={logoExpanded ? 'Click to collapse' : 'Click to see full name'}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 10px 6px 0',
            }}
          >
            <img
              src={logo}
              alt="MIV Logo"
              style={{
                width: 44, height: 44,
                borderRadius: '50%',
                objectFit: 'contain',
                background: '#fff',
                flexShrink: 0,
                boxShadow: 'var(--glow)',
                border: '2px solid var(--accent)',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'rotate(5deg) scale(1.05)'}
              onMouseLeave={e => e.currentTarget.style.transform = ''}
            />

            <div style={{ textAlign: 'left', lineHeight: 1.2, overflow: 'hidden' }}>
              <div style={{
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                fontSize: logoExpanded ? 12 : 18,
                color: '#fff',
                letterSpacing: logoExpanded ? 0.5 : 4,
                transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                whiteSpace: 'nowrap',
              }}>
                {logoExpanded ? 'Men of Issachar Vision' : 'MIV'}
              </div>
              <div style={{
                fontSize: 10, color: 'var(--accent)',
                letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700,
                transition: 'all 0.3s',
                opacity: 0.9,
              }}>
                {logoExpanded ? 'Church · Edinburgh' : 'Edinburgh'}
              </div>
            </div>
          </button>

          {/* Desktop nav links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 2 }} className="desktop-nav">
            {links.map(link => {
              const active = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  style={{
                    background: 'none', border: 'none',
                    color: active ? 'var(--accent)' : 'rgba(255,255,255,0.65)',
                    fontSize: 13.5, fontWeight: 500, padding: '8px 13px', borderRadius: 8,
                    cursor: 'pointer',
                    borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                    transition: 'color 0.2s, border-color 0.2s, background 0.2s',
                  }}
                  onMouseEnter={e => { if (!active) { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' } }}
                  onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.background = 'none' } }}
                >
                  {link.label}
                </button>
              )
            })}
          </div>

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button
              onClick={() => setSettingsOpen(true)}
              title="Theme Settings"
              style={{
                width: 38, height: 38, borderRadius: 9,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent)'; e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(212,175,55,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              <Settings2 size={17} />
            </button>

            <button
              onClick={() => handleLink('#give')}
              className="btn btn-accent"
              style={{ padding: '9px 20px', fontSize: 13 }}
            >
              Give Now
            </button>

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="mobile-menu-btn"
              style={{
                display: 'none', width: 38, height: 38, borderRadius: 9,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: '#fff',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{
            background: 'var(--bg-nav)',
            backdropFilter: 'blur(18px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '14px 20px 22px',
            display: 'flex', flexDirection: 'column', gap: 4,
            animation: 'fadeInUp 0.25s ease',
          }}>
            {links.map(link => {
              const active = activeSection === link.href.slice(1)
              return (
                <button
                  key={link.href}
                  onClick={() => handleLink(link.href)}
                  style={{
                    background: active ? 'rgba(212,175,55,0.12)' : 'none',
                    border: 'none',
                    color: active ? 'var(--accent)' : 'rgba(255,255,255,0.75)',
                    fontSize: 16, fontWeight: 500, padding: '14px 16px',
                    borderRadius: 10, cursor: 'pointer', textAlign: 'left', width: '100%',
                    transition: 'all 0.2s',
                  }}
                >
                  {link.label}
                </button>
              )
            })}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </>
  )
}

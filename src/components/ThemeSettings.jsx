import { X, Palette, Check } from 'lucide-react'
import { useTheme, themes } from '../context/ThemeContext'

export default function ThemeSettings() {
  const { themeId, setThemeId, settingsOpen, setSettingsOpen } = useTheme()

  if (!settingsOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div className="backdrop" onClick={() => setSettingsOpen(false)} />

      {/* Panel */}
      <div style={{
        position: 'fixed',
        top: 0, right: 0, bottom: 0,
        width: 'min(320px, 100vw)',
        maxWidth: '100vw',
        background: 'var(--bg-card)',
        borderLeft: '1px solid var(--border)',
        zIndex: 300,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideInRight 0.3s ease',
        boxShadow: '-8px 0 48px rgba(0,0,0,0.5)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '24px 24px 20px',
          borderBottom: '1px solid var(--border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Palette size={20} color="var(--accent)" />
            <span style={{ fontFamily: 'Cinzel, serif', fontSize: 17, fontWeight: 700 }}>Appearance</span>
          </div>
          <button
            onClick={() => setSettingsOpen(false)}
            style={{
              width: 34, height: 34, borderRadius: 8,
              background: 'var(--bg-card2)', border: '1px solid var(--border)',
              color: 'var(--text-muted)', display: 'flex', alignItems: 'center',
              justifyContent: 'center', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {/* Theme section */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
              Colour Theme
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {Object.values(themes).map(theme => {
                const active = themeId === theme.id
                return (
                  <button
                    key={theme.id}
                    onClick={() => setThemeId(theme.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      background: active ? 'var(--bg-card2)' : 'transparent',
                      border: `1.5px solid ${active ? 'var(--primary-light)' : 'var(--border)'}`,
                      borderRadius: 10, padding: '12px 14px',
                      cursor: 'pointer', textAlign: 'left', width: '100%',
                      transition: 'all 0.2s',
                      boxShadow: active ? 'var(--glow)' : 'none',
                    }}
                  >
                    {/* Color swatches */}
                    <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                      {theme.preview.map((color, i) => (
                        <div key={i} style={{
                          width: 20, height: 20, borderRadius: '50%',
                          background: color,
                          border: '2px solid rgba(255,255,255,0.2)',
                          marginLeft: i > 0 ? -6 : 0,
                        }} />
                      ))}
                    </div>

                    <span style={{ flex: 1, fontWeight: 600, fontSize: 14, color: active ? 'var(--text)' : 'var(--text-muted)' }}>
                      {theme.name}
                    </span>

                    {active && (
                      <div style={{
                        width: 20, height: 20, borderRadius: '50%',
                        background: 'var(--primary)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Check size={11} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', margin: '28px 0' }} />

          {/* Info */}
          <div style={{
            background: 'var(--bg-card2)',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '16px',
          }}>
            <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>
              Your theme preference is saved automatically and will be remembered the next time you visit.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'center' }}>
            Men of Issachar Vision (MIV) — Edinburgh
          </p>
        </div>
      </div>
    </>
  )
}

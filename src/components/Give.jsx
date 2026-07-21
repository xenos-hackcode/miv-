import { Heart, Shield, Repeat, CreditCard, Smartphone, Building2, BookOpen } from 'lucide-react'
import { useState } from 'react'

const tiers = [
  { amount: '£10', label: 'Seed' },
  { amount: '£25', label: 'Grow' },
  { amount: '£50', label: 'Harvest' },
  { amount: '£100', label: 'Legacy' },
]

const methods = [
  { icon: <CreditCard size={22} />, title: 'Card / Online', desc: 'Securely give online anytime using any debit or credit card.' },
  { icon: <Repeat size={22} />, title: 'Standing Order', desc: 'Set up a regular monthly giving directly from your bank.' },
  { icon: <Building2 size={22} />, title: 'Bank Transfer', desc: 'Lloyds Bank · Name: Men of Issachar Vision · Sort Code: 30-99-50 · Acct No: 76862663' },
  { icon: <Smartphone size={22} />, title: 'Give in Church', desc: 'Use the card machine on Sundays — tap, insert, or contactless.' },
]

export default function Give() {
  const [selected, setSelected] = useState('£25')
  const [custom, setCustom] = useState('')
  const [freq, setFreq] = useState('one-off')

  return (
    <section id="give" className="section" style={{ background: 'var(--bg-card)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <p className="section-label">Stewardship</p>
          <h2 className="section-title">Give Generously</h2>
          <div className="divider" style={{ margin: '18px auto 0' }} />
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Your generosity fuels our mission. Every gift — large or small — makes a real difference in our church and community.
          </p>
        </div>

        {/* Scripture */}
        <div style={{
          background: 'var(--bg-card2)',
          border: '1px solid var(--border)',
          borderLeft: '4px solid var(--accent)',
          borderRadius: 'var(--radius)',
          padding: '24px 28px',
          marginBottom: 48,
          display: 'flex', gap: 16, alignItems: 'flex-start',
        }}>
          <BookOpen size={22} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div>
            <p style={{ color: 'var(--text)', fontSize: 17, fontStyle: 'italic', lineHeight: 1.7, marginBottom: 8 }}>
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion,
              for God loves a cheerful giver."
            </p>
            <p style={{ color: 'var(--accent)', fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>2 CORINTHIANS 9:7</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }}>
          {/* Giving widget */}
          <div style={{
            background: 'var(--bg-card2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)',
            padding: '36px 32px',
          }}>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, marginBottom: 28 }}>Online Giving</h3>

            {/* Frequency toggle */}
            <div style={{
              display: 'flex', background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 10, padding: 4, marginBottom: 28,
            }}>
              {['one-off', 'monthly'].map(f => (
                <button
                  key={f}
                  onClick={() => setFreq(f)}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 8, border: 'none', cursor: 'pointer',
                    background: freq === f ? 'var(--primary)' : 'transparent',
                    color: freq === f ? '#fff' : 'var(--text-muted)',
                    fontWeight: 600, fontSize: 14,
                    transition: 'all 0.2s',
                  }}
                >
                  {f === 'one-off' ? 'One-Off Gift' : 'Monthly Gift'}
                </button>
              ))}
            </div>

            {/* Amount tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 16 }}>
              {tiers.map(({ amount, label }) => (
                <button
                  key={amount}
                  onClick={() => { setSelected(amount); setCustom('') }}
                  style={{
                    background: selected === amount && !custom ? 'var(--primary)' : 'var(--bg-card)',
                    border: `2px solid ${selected === amount && !custom ? 'var(--primary)' : 'var(--border)'}`,
                    color: selected === amount && !custom ? '#fff' : 'var(--text)',
                    borderRadius: 10, padding: '16px 12px', cursor: 'pointer',
                    textAlign: 'center', fontWeight: 700,
                    transition: 'all 0.2s',
                    boxShadow: selected === amount && !custom ? 'var(--glow)' : 'none',
                  }}
                >
                  <div style={{ fontSize: 22, fontFamily: 'Cinzel, serif' }}>{amount}</div>
                  <div style={{ fontSize: 11, opacity: 0.75, marginTop: 2, letterSpacing: 1 }}>{label}</div>
                </button>
              ))}
            </div>

            {/* Custom amount */}
            <div className="form-group" style={{ marginBottom: 24 }}>
              <label>Custom Amount (£)</label>
              <input
                type="number"
                placeholder="Enter amount"
                value={custom}
                onChange={e => { setCustom(e.target.value); setSelected('') }}
                min="1"
              />
            </div>

            <button className="btn btn-accent" style={{ width: '100%', padding: '16px', fontSize: 16, justifyContent: 'center', marginBottom: 16 }}>
              <Heart size={18} fill="currentColor" />
              Give {custom ? `£${custom}` : selected} {freq === 'monthly' ? 'Monthly' : 'Now'}
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center' }}>
              <Shield size={13} color="var(--text-muted)" />
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Secure & encrypted · Receipts emailed automatically</span>
            </div>
          </div>

          {/* Ways to give */}
          <div>
            <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, marginBottom: 24 }}>Other Ways to Give</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {methods.map(({ icon, title, desc }) => (
                <div key={title} style={{
                  background: 'var(--bg-card2)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  padding: '20px 22px',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  transition: 'border-color var(--transition)',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 10,
                    background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)', flexShrink: 0,
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 4 }}>{title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 13.5, lineHeight: 1.6 }}>{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact to give */}
            <div style={{
              marginTop: 24,
              background: 'rgba(212,175,55,0.08)',
              border: '1px solid rgba(212,175,55,0.25)',
              borderRadius: 'var(--radius)',
              padding: '16px 20px',
            }}>
              <div style={{ fontWeight: 700, color: 'var(--accent)', marginBottom: 4, fontSize: 13 }}>💬 Questions about giving?</div>
              <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>
                Contact Pastor Sunday on <a href="https://wa.me/447565391361" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>+44 7565 391361</a> or
                Pastor Rufus on <a href="https://wa.me/447901613720" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)', fontWeight: 600 }}>+44 7901 613720</a>.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #give .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

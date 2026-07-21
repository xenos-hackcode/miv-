import { useState } from 'react'
import { MapPin, Phone, Clock, Send, CheckCircle, MessageCircle, Lock, MessageSquare, Mail } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const PASTORS = [
  { name: 'Pastor Sunday Adedeji', number: '447565391361', display: '+44 7565 391361' },
  { name: 'Pastor Rufus Omolayo', number: '447901613720', display: '+44 7901 613720' },
]

const EMAILS = [
  { label: 'General Enquiries', address: 'admin@mivedinburgh.org' },
]

const info = [
  {
    icon: <MapPin size={22} />,
    title: 'Address',
    lines: ['338 Gorgie Road', 'Edinburgh, EH11 2RQ', 'Scotland'],
    link: 'https://maps.google.com/?q=338+Gorgie+Road+Edinburgh+EH11+2RQ',
    linkLabel: 'Open in Maps',
  },
  {
    icon: <Phone size={22} />,
    title: 'Phone / WhatsApp',
    lines: ['+44 7565 391361', '+44 7901 613720'],
    link: 'https://wa.me/447565391361',
    linkLabel: 'WhatsApp Us',
  },
  {
    icon: <Mail size={22} />,
    title: 'Email',
    emails: EMAILS,
  },
  {
    icon: <Clock size={22} />,
    title: 'Service Times',
    lines: ['Sunday: 12:30 PM – 3:00 PM', 'Wednesday: 6:30 PM – 7:45 PM (Zoom)', 'Last Saturday: Evangelism Outreach'],
  },
]

function buildWhatsAppMessage(form, pastorName) {
  return encodeURIComponent(
    `Hello ${pastorName},\n\n` +
    `📋 *Message via MIV Website*\n\n` +
    `*From:* ${form.name}\n` +
    (form.phone ? `*Contact:* ${form.phone}\n` : '') +
    `*Subject:* ${form.subject}\n\n` +
    `${form.message}\n\n` +
    `━━━━━━━━━━━━━━━━━━\n` +
    `🏛️ *Men of Issachar Vision (MIV)*\n` +
    `_Gorgie Memorial Hall, Edinburgh_\n` +
    `_This message was sent from the MIV website._`
  )
}

function buildMailtoLink(form, email) {
  const subject = encodeURIComponent(form.subject || 'Message from MIV Website')
  const body = encodeURIComponent(
    `From: ${form.name}\n` +
    (form.phone ? `Contact: ${form.phone}\n` : '') +
    `\n${form.message}\n\n` +
    `——————————————\n` +
    `Men of Issachar Vision (MIV)\n` +
    `Gorgie Memorial Hall, Edinburgh\n` +
    `This message was sent from the MIV website.`
  )
  return `mailto:${email}?subject=${subject}&body=${body}`
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' })
  const [step, setStep] = useState('form') // 'form' | 'choose' | 'sent'
  const [sentVia, setSentVia] = useState('whatsapp')
  const [errors, setErrors] = useState({})
  const [headerRef, headerIn] = useInView()
  const [contentRef, contentIn] = useInView()

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(er => ({ ...er, [e.target.name]: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Please enter your name'
    if (!form.subject.trim()) e.subject = 'Please enter a subject'
    if (!form.message.trim()) e.message = 'Please enter your message'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) setStep('choose')
  }

  const handleSend = (pastor) => {
    const msg = buildWhatsAppMessage(form, pastor.name)
    window.open(`https://wa.me/${pastor.number}?text=${msg}`, '_blank')
    setSentVia('whatsapp')
    setStep('sent')
  }

  const handleEmailSend = (email) => {
    window.location.href = buildMailtoLink(form, email)
    setSentVia('email')
    setStep('sent')
  }

  const reset = () => {
    setForm({ name: '', phone: '', subject: '', message: '' })
    setStep('form')
    setErrors({})
  }

  return (
    <section id="contact" className="section" style={{ background: 'var(--bg)' }}>
      <div className="container">
        {/* Header */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center', marginBottom: 64,
            opacity: headerIn ? 1 : 0, transform: headerIn ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Contact Us</h2>
          <div className="divider" style={{ margin: '18px auto 0' }} />
          <p className="section-subtitle" style={{ margin: '20px auto 0' }}>
            Reach out with any questions, prayer requests, or to find out more about MIV. We'd love to hear from you.
          </p>
        </div>

        <div
          ref={contentRef}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 48, alignItems: 'start',
            opacity: contentIn ? 1 : 0, transform: contentIn ? 'none' : 'translateY(28px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          {/* Info column */}
          <div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 28 }}>
              {info.map(({ icon, title, lines, link, linkLabel, emails }) => (
                <div key={title} style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)', padding: '20px 22px',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                  transition: 'border-color var(--transition)',
                }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-light)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: 'var(--primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--accent)',
                  }}>
                    {icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>
                      {title}
                    </div>
                    {lines && lines.map(line => (
                      <div key={line} style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.65 }}>{line}</div>
                    ))}
                    {emails && emails.map(({ label, address }) => (
                      <div key={address} style={{ marginBottom: 4 }}>
                        <a href={`mailto:${address}`} style={{ fontSize: 14.5, color: 'var(--text)', lineHeight: 1.65, fontWeight: 600 }}>
                          {address}
                        </a>
                        <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>{label}</div>
                      </div>
                    ))}
                    {link && (
                      <a href={link} target="_blank" rel="noopener noreferrer"
                        style={{ display: 'inline-block', marginTop: 6, fontSize: 13, color: 'var(--accent)', fontWeight: 700 }}>
                        {linkLabel} →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius)', overflow: 'hidden', height: 200,
            }}>
              <iframe
                title="Men of Issachar Vision — Gorgie Memorial Hall"
                src="https://maps.google.com/maps?q=338+Gorgie+Road+Edinburgh+EH11+2RQ&output=embed"
                width="100%" height="100%"
                style={{ border: 0 }} loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form / Steps */}
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-lg)', padding: '36px 32px',
          }}>

            {/* ── STEP 1: Form ── */}
            {step === 'form' && (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, marginBottom: 4 }}>Send a Message</h3>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 4 }}>
                  Your message will be sent via WhatsApp to our pastoral team.
                </p>

                <div className="grid-2" style={{ gap: 14 }}>
                  <div className="form-group">
                    <label>Your Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. John Smith" />
                    {errors.name && <span style={{ color: '#EF4444', fontSize: 12 }}>{errors.name}</span>}
                  </div>
                  <div className="form-group">
                    <label>Phone / WhatsApp</label>
                    <input name="phone" value={form.phone} onChange={handleChange} placeholder="+44 7700 000000" />
                  </div>
                </div>

                <div className="form-group">
                  <label>Subject *</label>
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="How can we help?" />
                  {errors.subject && <span style={{ color: '#EF4444', fontSize: 12 }}>{errors.subject}</span>}
                </div>

                <div className="form-group">
                  <label>Message *</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    placeholder="Type your message, prayer request, or question here..."
                    rows={5}
                  />
                  {errors.message && <span style={{ color: '#EF4444', fontSize: 12 }}>{errors.message}</span>}
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', textAlign: 'right' }}>
                    {form.message.length} characters
                  </div>
                </div>

                {/* MIV footer preview */}
                <div style={{
                  background: 'var(--bg-card2)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '12px 16px',
                  display: 'flex', gap: 10, alignItems: 'flex-start',
                }}>
                  <Lock size={14} color="var(--accent)" style={{ flexShrink: 0, marginTop: 2 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: 0.5, marginBottom: 4 }}>AUTO-ADDED SIGNATURE (cannot be edited)</div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6, fontStyle: 'italic' }}>
                      🏛️ Men of Issachar Vision (MIV) · Gorgie Memorial Hall, Edinburgh · Sent from MIV website
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '15px', fontSize: 16 }}>
                  <Send size={17} /> Continue to Send
                </button>
              </form>
            )}

            {/* ── STEP 2: Choose pastor ── */}
            {step === 'choose' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, marginBottom: 8 }}>Who would you like to reach?</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>
                    Choose a pastor to message via WhatsApp, or send your message by email instead — either way, the MIV signature is already attached.
                  </p>
                </div>

                {/* Message preview */}
                <div style={{
                  background: 'var(--bg-card2)', border: '1px solid var(--border)',
                  borderRadius: 10, padding: '16px',
                }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>
                    Your message preview
                  </div>
                  <div style={{ fontSize: 13.5, color: 'var(--text)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                    <strong>From:</strong> {form.name}{'\n'}
                    {form.phone && <><strong>Contact:</strong> {form.phone}{'\n'}</>}
                    <strong>Subject:</strong> {form.subject}{'\n\n'}
                    {form.message}
                  </div>
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--accent)', fontStyle: 'italic' }}>
                    🏛️ Men of Issachar Vision (MIV) · Gorgie Memorial Hall, Edinburgh · Sent from MIV website
                  </div>
                </div>

                {/* Pastor buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {PASTORS.map(pastor => (
                    <button
                      key={pastor.number}
                      onClick={() => handleSend(pastor)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: 'var(--bg-card2)', border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius)', padding: '18px 20px',
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.background = '#25D36610' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card2)' }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                        background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <MessageCircle size={22} color="#fff" fill="#fff" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{pastor.name}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{pastor.display} · WhatsApp</div>
                      </div>
                      <div style={{ marginLeft: 'auto', fontSize: 22 }}>→</div>
                    </button>
                  ))}
                </div>

                {/* Divider */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-muted)', letterSpacing: 1, textTransform: 'uppercase' }}>Or by email</span>
                  <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
                </div>

                {/* Email buttons */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {EMAILS.map(email => (
                    <button
                      key={email.address}
                      onClick={() => handleEmailSend(email.address)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 16,
                        background: 'var(--bg-card2)', border: '1.5px solid var(--border)',
                        borderRadius: 'var(--radius)', padding: '18px 20px',
                        cursor: 'pointer', textAlign: 'left', width: '100%',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.background = 'var(--bg-card)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'var(--bg-card2)' }}
                    >
                      <div style={{
                        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                        background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Mail size={20} color="var(--accent)" />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text)' }}>{email.label}</div>
                        <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 2 }}>{email.address}</div>
                      </div>
                      <div style={{ marginLeft: 'auto', fontSize: 22 }}>→</div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setStep('form')}
                  className="btn btn-ghost"
                  style={{ justifyContent: 'center', color: 'var(--text-muted)' }}
                >
                  ← Go back and edit
                </button>
              </div>
            )}

            {/* ── STEP 3: Sent ── */}
            {step === 'sent' && (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ color: '#25D366', marginBottom: 18, display: 'flex', justifyContent: 'center' }}>
                  <CheckCircle size={60} />
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, marginBottom: 12 }}>
                  {sentVia === 'email' ? 'Email Opened!' : 'WhatsApp Opened!'}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>
                  {sentVia === 'email'
                    ? <>Your message has been prepared and your email app should have opened. Just press <strong>Send</strong> to complete.</>
                    : <>Your message has been prepared and WhatsApp should have opened. Just press <strong>Send</strong> in WhatsApp to complete.</>
                  }
                </p>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24 }}>
                  Want to reach someone else as well?
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                  {PASTORS.map(pastor => (
                    <button
                      key={pastor.number}
                      onClick={() => handleSend(pastor)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
                        background: '#25D36618', border: '1.5px solid #25D36644',
                        borderRadius: 'var(--radius)', padding: '12px 20px',
                        cursor: 'pointer', color: '#25D366', fontWeight: 700, fontSize: 14,
                        transition: 'all 0.2s',
                      }}
                    >
                      <MessageCircle size={17} /> Also message {pastor.name}
                    </button>
                  ))}
                  {EMAILS.map(email => (
                    <button
                      key={email.address}
                      onClick={() => handleEmailSend(email.address)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'center',
                        background: 'rgba(123,47,190,0.1)', border: '1.5px solid rgba(123,47,190,0.35)',
                        borderRadius: 'var(--radius)', padding: '12px 20px',
                        cursor: 'pointer', color: 'var(--primary-light)', fontWeight: 700, fontSize: 14,
                        transition: 'all 0.2s',
                      }}
                    >
                      <Mail size={17} /> Also email {email.label}
                    </button>
                  ))}
                </div>
                <button onClick={reset} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

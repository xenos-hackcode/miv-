import { createContext, useContext, useState, useEffect } from 'react'

export const themes = {
  purple: {
    id: 'purple',
    name: 'Royal Purple & Gold',
    preview: ['#4B0082', '#D4AF37'],
    vars: {
      '--primary': '#4B0082',
      '--primary-light': '#7B2FBE',
      '--primary-dark': '#2D0050',
      '--accent': '#D4AF37',
      '--accent-light': '#F0D060',
      '--bg': '#0F0F1A',
      '--bg-card': '#1A1A2E',
      '--bg-card2': '#221B3A',
      '--bg-nav': '#0A0A14EE',
      '--text': '#F0E6FF',
      '--text-muted': '#A090BB',
      '--border': '#2D1B4E',
      '--hero-gradient': 'linear-gradient(135deg, #0F0F1A 0%, #1A0035 50%, #0A0A14 100%)',
      '--glow': '0 0 40px rgba(75, 0, 130, 0.4)',
    },
  },
  blue: {
    id: 'blue',
    name: 'Deep Blue & Gold',
    preview: ['#1A3A6B', '#C8A951'],
    vars: {
      '--primary': '#1A3A6B',
      '--primary-light': '#2A5FAD',
      '--primary-dark': '#0F2444',
      '--accent': '#C8A951',
      '--accent-light': '#E8C97A',
      '--bg': '#EEF2FF',
      '--bg-card': '#FFFFFF',
      '--bg-card2': '#F0F4FF',
      '--bg-nav': '#0F2444EE',
      '--text': '#0F2444',
      '--text-muted': '#5A6A8A',
      '--border': '#C8D4F0',
      '--hero-gradient': 'linear-gradient(135deg, #0F2444 0%, #1A3A6B 50%, #0F2444 100%)',
      '--glow': '0 0 40px rgba(26, 58, 107, 0.3)',
    },
  },
  burgundy: {
    id: 'burgundy',
    name: 'Burgundy & Cream',
    preview: ['#800020', '#C8A951'],
    vars: {
      '--primary': '#800020',
      '--primary-light': '#A8003A',
      '--primary-dark': '#4A0012',
      '--accent': '#C8A951',
      '--accent-light': '#E8C97A',
      '--bg': '#1A0A0A',
      '--bg-card': '#2A1010',
      '--bg-card2': '#331515',
      '--bg-nav': '#0F0505EE',
      '--text': '#F5E6D3',
      '--text-muted': '#C0A090',
      '--border': '#3D1515',
      '--hero-gradient': 'linear-gradient(135deg, #1A0A0A 0%, #3A0010 50%, #1A0A0A 100%)',
      '--glow': '0 0 40px rgba(128, 0, 32, 0.4)',
    },
  },
  green: {
    id: 'green',
    name: 'Forest Green & Gold',
    preview: ['#1B4332', '#D4AF37'],
    vars: {
      '--primary': '#1B4332',
      '--primary-light': '#2D6A4F',
      '--primary-dark': '#0A1F17',
      '--accent': '#D4AF37',
      '--accent-light': '#F0D060',
      '--bg': '#0A1A0F',
      '--bg-card': '#142010',
      '--bg-card2': '#1A2E1F',
      '--bg-nav': '#050F07EE',
      '--text': '#E8F5E0',
      '--text-muted': '#90B09A',
      '--border': '#1B3A25',
      '--hero-gradient': 'linear-gradient(135deg, #0A1A0F 0%, #1B4332 50%, #0A1A0F 100%)',
      '--glow': '0 0 40px rgba(27, 67, 50, 0.5)',
    },
  },
  dark: {
    id: 'dark',
    name: 'Midnight Dark',
    preview: ['#1E1E2E', '#7C3AED'],
    vars: {
      '--primary': '#7C3AED',
      '--primary-light': '#9D5FF5',
      '--primary-dark': '#5B21B6',
      '--accent': '#F59E0B',
      '--accent-light': '#FCD34D',
      '--bg': '#0D0D0D',
      '--bg-card': '#1A1A1A',
      '--bg-card2': '#242424',
      '--bg-nav': '#050505EE',
      '--text': '#F3F4F6',
      '--text-muted': '#9CA3AF',
      '--border': '#2D2D2D',
      '--hero-gradient': 'linear-gradient(135deg, #0D0D0D 0%, #1E1E2E 50%, #0D0D0D 100%)',
      '--glow': '0 0 40px rgba(124, 58, 237, 0.4)',
    },
  },
  royalblue: {
    id: 'royalblue',
    name: 'Royal Blue & Gold',
    preview: ['#4169E1', '#D4AF37'],
    vars: {
      '--primary': '#4169E1',
      '--primary-light': '#6485E8',
      '--primary-dark': '#2A4DB5',
      '--accent': '#D4AF37',
      '--accent-light': '#F0D060',
      '--bg': '#07091A',
      '--bg-card': '#0E1330',
      '--bg-card2': '#141A3D',
      '--bg-nav': '#07091AEE',
      '--text': '#E8EEFF',
      '--text-muted': '#8A9BBF',
      '--border': '#1E2D5E',
      '--hero-gradient': 'linear-gradient(135deg, #07091A 0%, #0E1B4A 50%, #07091A 100%)',
      '--glow': '0 0 40px rgba(65, 105, 225, 0.45)',
    },
  },
  crimson: {
    id: 'crimson',
    name: 'Crimson & Gold',
    preview: ['#C41E3A', '#D4AF37'],
    vars: {
      '--primary': '#C41E3A',
      '--primary-light': '#E0364F',
      '--primary-dark': '#8B0F25',
      '--accent': '#D4AF37',
      '--accent-light': '#F0D060',
      '--bg': '#130408',
      '--bg-card': '#220812',
      '--bg-card2': '#2C0D18',
      '--bg-nav': '#0A0205EE',
      '--text': '#FFE8EC',
      '--text-muted': '#BF8A96',
      '--border': '#3D1020',
      '--hero-gradient': 'linear-gradient(135deg, #130408 0%, #3A0010 50%, #130408 100%)',
      '--glow': '0 0 40px rgba(196, 30, 58, 0.45)',
    },
  },
  light: {
    id: 'light',
    name: 'Clean Light',
    preview: ['#FFFFFF', '#2563EB'],
    vars: {
      '--primary': '#2563EB',
      '--primary-light': '#3B82F6',
      '--primary-dark': '#1D4ED8',
      '--accent': '#D97706',
      '--accent-light': '#F59E0B',
      '--bg': '#F9FAFB',
      '--bg-card': '#FFFFFF',
      '--bg-card2': '#F3F4F6',
      '--bg-nav': '#1E3A8AEE',
      '--text': '#111827',
      '--text-muted': '#6B7280',
      '--border': '#E5E7EB',
      '--hero-gradient': 'linear-gradient(135deg, #1E3A8A 0%, #2563EB 50%, #1E3A8A 100%)',
      '--glow': '0 0 40px rgba(37, 99, 235, 0.3)',
    },
  },
}

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(() => localStorage.getItem('church-theme') || 'royalblue')
  const [settingsOpen, setSettingsOpen] = useState(false)

  const theme = themes[themeId] || themes.royalblue

  useEffect(() => {
    const root = document.documentElement
    Object.entries(theme.vars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })
    localStorage.setItem('church-theme', themeId)
  }, [themeId, theme])

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId, theme, settingsOpen, setSettingsOpen }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)

import { useEffect, useRef, useState } from 'react'

export function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])

  return [ref, inView]
}

export function useCounter(end, active, duration = 1800) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    let raf
    const startTime = performance.now()
    const step = (now) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      setVal(Math.floor(eased * end))
      if (p < 1) raf = requestAnimationFrame(step)
      else setVal(end)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, end, duration])
  return val
}

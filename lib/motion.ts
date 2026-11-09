export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  expo: [0.87, 0, 0.13, 1],
} as const

export const spring = {
  snappy: { stiffness: 400, damping: 30 },
  soft: { stiffness: 120, damping: 20 },
} as const

export const duration = { micro: 0.18, ui: 0.35, reveal: 0.8, hero: 1.4, reduced: 0.3 } as const
export const stagger = 0.06
export const maxStagger = 0.5
export const staggerFor = (count: number) => Math.min(stagger, maxStagger / Math.max(1, count - 1))
export const smoothScrollDuration = 1.1

// GSAP accepts easing functions; solve the same cubic Bézier used by Framer Motion.
export function bezierEase([x1, y1, x2, y2]: readonly [number, number, number, number]) {
  const sample = (t: number, a: number, b: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t ** 2 * b + t ** 3
  return (progress: number) => {
    if (progress <= 0 || progress >= 1) return Math.max(0, Math.min(1, progress))
    let low = 0, high = 1
    for (let i = 0; i < 16; i++) {
      const mid = (low + high) / 2
      if (sample(mid, x1, x2) < progress) low = mid
      else high = mid
    }
    return sample((low + high) / 2, y1, y2)
  }
}

export const gsapEase = { out: bezierEase(ease.out), inOut: bezierEase(ease.inOut), expo: bezierEase(ease.expo) }

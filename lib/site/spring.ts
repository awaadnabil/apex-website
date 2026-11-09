type SpringConfig = { stiffness: number; damping: number }

/**
 * A small multi-value spring that runs its own rAF loop only while it is moving, then stops.
 * Used for DOM effects that must compose with GSAP's inline transforms (tilt, magnetic pull).
 */
export function createSpring(config: SpringConfig, size: number, onUpdate: (values: number[]) => void) {
  const value = new Array(size).fill(0)
  const velocity = new Array(size).fill(0)
  let target = new Array(size).fill(0)
  let frame = 0
  let last = 0

  const step = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 30)
    last = now
    let moving = false
    for (let i = 0; i < size; i++) {
      velocity[i] += (config.stiffness * (target[i] - value[i]) - config.damping * velocity[i]) * dt
      value[i] += velocity[i] * dt
      if (Math.abs(velocity[i]) > 0.001 || Math.abs(target[i] - value[i]) > 0.001) moving = true
    }
    if (!moving) for (let i = 0; i < size; i++) { value[i] = target[i]; velocity[i] = 0 }
    frame = moving ? requestAnimationFrame(step) : 0
    onUpdate(value)
  }

  return {
    set(next: number[]) {
      target = next
      if (!frame) {
        last = performance.now()
        frame = requestAnimationFrame(step)
      }
    },
    get settled() { return frame === 0 },
    stop() { cancelAnimationFrame(frame); frame = 0 },
  }
}

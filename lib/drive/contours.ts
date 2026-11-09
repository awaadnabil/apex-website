/** Deterministic topographic lines (same output on server and client). */
export function contourPaths(width: number, height: number, count: number, seed = 0) {
  const paths: string[] = []
  for (let k = 0; k < count; k++) {
    const y0 = ((k + 0.5) * height) / count
    let d = ''
    for (let x = 0; x <= width; x += 10) {
      const y =
        y0 +
        Math.sin(x * 0.02 + k * 0.9 + seed) * 14 +
        Math.sin(x * 0.05 + k * 1.7 + seed * 2) * 6
      d += `${x === 0 ? 'M' : 'L'}${x} ${y.toFixed(1)} `
    }
    paths.push(d.trim())
  }
  return paths
}

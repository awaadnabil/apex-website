export const hypercubeVertices = Array.from({ length: 16 }, (_, i) =>
  Array.from({ length: 4 }, (_, axis) => (i & (1 << axis) ? 1 : -1)),
)
export const hypercubeEdges = hypercubeVertices.flatMap((_, i) =>
  [0, 1, 2, 3].flatMap((axis) => i < (i ^ (1 << axis)) ? [[i, i ^ (1 << axis)]] : []),
)

export function rotate4D(vertex: number[], angles: number[]) {
  const v = [...vertex]
  for (let axis = 0; axis < 3; axis++) {
    const c = Math.cos(angles[axis]), s = Math.sin(angles[axis])
    // A genuine planar SO(4) rotation: the untouched coordinates retain their values.
    const a = v[axis], w = v[3]
    v[axis] = a * c - w * s
    v[3] = a * s + w * c
  }
  return v
}

export function project4D(vertex: number[], angles: number[]) {
  const v = rotate4D(vertex, angles)
  const perspective = 3.5 / (3.5 - v[3])
  return [v[0] * perspective, v[1] * perspective, v[2] * perspective]
}

export function shapePoint(shape: number, u: number, v: number): [number, number, number] {
  const a = u * Math.PI * 2, b = Math.acos(2 * v - 1)
  if (shape === 0) return [Math.sin(b) * Math.cos(a), Math.sin(b) * Math.sin(a), Math.cos(b)]
  if (shape === 1) {
    const r = 0.65 + 0.24 * Math.cos(3 * a)
    return [r * Math.cos(2 * a) + 0.12 * Math.cos(b * 2), r * Math.sin(2 * a), 0.5 * Math.sin(3 * a) + 0.12 * Math.sin(b * 2)]
  }
  if (shape === 2) {
    const h = 2 * v - 1, r = (1 - Math.abs(h)) * 0.8
    const corner = Math.floor(u * 4) * Math.PI / 2
    return [Math.cos(corner) * r, h * 1.8, Math.sin(corner) * r]
  }
  const side = u < 0.5 ? -1 : 1
  return [side * v, 1.2 - 2.2 * v, Math.sin(a * 4) * 0.2]
}

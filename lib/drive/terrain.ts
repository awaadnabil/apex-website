import * as THREE from 'three'

export const ROUTE_KM = 18.4
const ELEV_START_M = 210
const ELEV_SUMMIT_M = 1934

/** Layered dunes plus a ridge that rises ahead-left of the camera. */
export function terrainHeight(x: number, z: number) {
  let h =
    Math.sin(x * 0.075) * 1.5 +
    Math.sin(z * 0.11 + x * 0.045) * 1.15 +
    Math.sin(x * 0.21 + z * 0.17) * 0.45 +
    Math.sin(x * 0.53 - z * 0.41) * 0.14

  const ridgeOffset = x + 14 + z * 0.1
  const rise = Math.min(1, Math.max(0, (-z - 4) / 40))
  h += Math.exp(-(ridgeOffset * ridgeOffset) / 160) * rise * 15
  return h
}

const ROUTE_XZ: [number, number][] = [
  [6, 12],
  [3, 8],
  [-2, 5],
  [0, -2],
  [4, -8],
  [1, -15],
  [-4, -21],
  [-8, -28],
  [-10, -35],
  [-11, -42],
]

export function buildRoute() {
  const flat = new THREE.CatmullRomCurve3(
    ROUTE_XZ.map(([x, z]) => new THREE.Vector3(x, 0, z)),
    false,
    'centripetal',
  )
  const samples = flat
    .getSpacedPoints(320)
    .map((p) => new THREE.Vector3(p.x, terrainHeight(p.x, p.z) + 0.4, p.z))

  let minY = Infinity
  for (const p of samples) minY = Math.min(minY, p.y)
  const summitY = samples[samples.length - 1].y

  return {
    curve: new THREE.CatmullRomCurve3(samples, false, 'centripetal'),
    minY,
    summitY,
  }
}

/**
 * Mutable, render-free bridge between the WebGL scene and DOM overlays.
 * Written inside useFrame / pointer handlers, read inside rAF loops.
 */
export const driveState = {
  progress: 0,
  headY: 0,
  minY: 0,
  summitY: 1,
  pointerX: 0,
  pointerY: 0,
  tiltActive: false,
  tiltX: 0,
  tiltY: 0,
}

export function elevationMeters(y: number) {
  const span = driveState.summitY - driveState.minY || 1
  const t = Math.min(1, Math.max(0, (y - driveState.minY) / span))
  return ELEV_START_M + t * (ELEV_SUMMIT_M - ELEV_START_M)
}

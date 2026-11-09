'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { buildRoute, driveState, terrainHeight } from '@/lib/drive/terrain'

const ROUTE_DRAW_SECONDS = 6
const ROUTE_START_DELAY = 0.9
const TUBULAR_SEGMENTS = 640

const terrainVertex = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormal;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    vNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`

const terrainFragment = /* glsl */ `
  uniform float uTime;
  uniform vec3 uFog;
  uniform vec3 uAmber;
  uniform vec3 uIce;
  varying vec3 vWorld;
  varying vec3 vNormal;

  float contour(float v, float width) {
    float d = max(fwidth(v), 1e-4);
    float f = abs(fract(v - 0.5) - 0.5) / d;
    return 1.0 - clamp(f / width, 0.0, 1.0);
  }

  void main() {
    vec3 n = normalize(vNormal);
    float diffuse = clamp(dot(n, normalize(vec3(-0.5, 0.75, 0.35))), 0.0, 1.0);
    float rim = pow(1.0 - clamp(n.y, 0.0, 1.0), 2.0);
    vec3 col = mix(vec3(0.022, 0.030, 0.050), vec3(0.075, 0.100, 0.155), diffuse);
    col += uIce * rim * 0.07;

    float h = vWorld.y + 4.0;
    float minor = contour(h / 0.55, 1.0);
    float major = contour(h / 2.75, 1.35);
    col += uIce * minor * 0.11;
    col += uIce * major * 0.40;

    float sweep = vWorld.x * 0.55 + vWorld.z * 0.84;
    float s = mod(sweep + uTime * 5.5, 110.0) - 55.0;
    float scan = exp(-(s * s) / 9.0);
    col += uAmber * scan * (0.05 + minor * 0.35 + major * 0.6);

    float dist = length(vWorld - cameraPosition);
    float fog = 1.0 - exp(-pow(dist * 0.0125, 1.8));
    col = mix(col, uFog, clamp(fog, 0.0, 1.0));

    gl_FragColor = vec4(col, 1.0);
  }
`

/** Shader works directly in sRGB so the fog matches the page's #05070c exactly. */
function srgb(hex: string) {
  return new THREE.Color(hex).convertLinearToSRGB()
}

function Terrain({ reduced }: { reduced: boolean }) {
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(140, 140, 220, 220)
    g.rotateX(-Math.PI / 2)
    const pos = g.attributes.position
    for (let i = 0; i < pos.count; i++) {
      pos.setY(i, terrainHeight(pos.getX(i), pos.getZ(i)))
    }
    g.computeVertexNormals()
    return g
  }, [])

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: terrainVertex,
        fragmentShader: terrainFragment,
        uniforms: {
          uTime: { value: reduced ? 22 : 0 },
          uFog: { value: srgb('#05070c') },
          uAmber: { value: srgb('#ffb547') },
          uIce: { value: srgb('#cfe3ff') },
        },
      }),
    [reduced],
  )

  useEffect(
    () => () => {
      geometry.dispose()
      material.dispose()
    },
    [geometry, material],
  )

  useFrame((_, delta) => {
    if (!reduced) material.uniforms.uTime.value += delta
  })

  return <mesh geometry={geometry} material={material} />
}

function makeHaloTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 128
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.22, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 128, 128)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function additive(color: string, opacity: number) {
  return new THREE.MeshBasicMaterial({
    color,
    opacity,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  })
}

function Route({ reduced }: { reduced: boolean }) {
  const { curve, minY, summitY } = useMemo(buildRoute, [])

  const tubes = useMemo(
    () => [
      { geo: new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, 0.055, 8, false), radial: 8, mat: additive('#ffd27a', 1) },
      { geo: new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, 0.22, 10, false), radial: 10, mat: additive('#ff9a2e', 0.34) },
      { geo: new THREE.TubeGeometry(curve, TUBULAR_SEGMENTS, 0.55, 10, false), radial: 10, mat: additive('#ff9a2e', 0.06) },
    ],
    [curve],
  )

  const headMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#fff1d6' }), [])
  const haloTex = useMemo(makeHaloTexture, [])
  const haloMat = useMemo(
    () =>
      new THREE.SpriteMaterial({
        map: haloTex,
        color: '#ffb547',
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    [haloTex],
  )

  const head = useRef<THREE.Group>(null)
  const halo = useRef<THREE.Sprite>(null)
  const startedAt = useRef<number | null>(null)

  useEffect(() => {
    driveState.minY = minY
    driveState.summitY = summitY
    return () => {
      for (const t of tubes) {
        t.geo.dispose()
        t.mat.dispose()
      }
      headMat.dispose()
      haloMat.dispose()
      haloTex.dispose()
    }
  }, [minY, summitY, tubes, headMat, haloMat, haloTex])

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (startedAt.current === null) startedAt.current = t

    const raw = reduced
      ? 1
      : Math.min(1, Math.max(0, (t - startedAt.current - ROUTE_START_DELAY) / ROUTE_DRAW_SECONDS))
    const progress = 1 - Math.pow(1 - raw, 3)
    driveState.progress = progress

    const segments = Math.floor(progress * TUBULAR_SEGMENTS)
    for (const tube of tubes) tube.geo.setDrawRange(0, segments * tube.radial * 6)

    if (head.current) {
      head.current.visible = progress > 0.002
      const point = curve.getPointAt(Math.max(0.0001, progress))
      head.current.position.copy(point)
      driveState.headY = point.y
    }
    if (halo.current) {
      const pulse = reduced ? 1 : 1 + Math.sin(t * 3.2) * 0.2
      halo.current.scale.setScalar(2.3 * pulse)
      haloMat.opacity = reduced ? 0.6 : 0.55 + Math.sin(t * 3.2) * 0.15
    }
  })

  return (
    <group>
      {tubes.map((tube, i) => (
        <mesh key={i} geometry={tube.geo} material={tube.mat} renderOrder={2} />
      ))}
      <group ref={head}>
        <mesh material={headMat}>
          <sphereGeometry args={[0.14, 20, 20]} />
        </mesh>
        <sprite ref={halo} material={haloMat} renderOrder={3} />
      </group>
    </group>
  )
}

function CameraRig({ reduced }: { reduced: boolean }) {
  const camera = useThree((s) => s.camera)
  const target = useMemo(() => new THREE.Vector3(-3, 2.6, -18), [])
  const eased = useRef({ x: 0, y: 0 })

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime
    const inX = driveState.tiltActive ? driveState.tiltX : driveState.pointerX
    const inY = driveState.tiltActive ? driveState.tiltY : driveState.pointerY
    const k = 1 - Math.exp(-delta * 2.4)
    eased.current.x += (inX - eased.current.x) * k
    eased.current.y += (inY - eased.current.y) * k

    const driftX = reduced ? 0 : Math.sin(t * 0.07) * 1.6
    const driftY = reduced ? 0 : Math.sin(t * 0.11) * 0.35
    const driftZ = reduced ? 0 : Math.sin(t * 0.05) * 1.2

    camera.position.set(
      1.5 + driftX + eased.current.x * 2.4,
      6.2 + driftY + eased.current.y * 1.0,
      25 - driftZ,
    )
    camera.lookAt(target)
  })

  return null
}

export default function TerrainScene({
  reduced,
  active,
}: {
  reduced: boolean
  active: boolean
}) {
  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={reduced ? 'demand' : active ? 'always' : 'never'}
      camera={{ fov: 48, near: 0.1, far: 220, position: [1.5, 6.2, 25] }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor('#05070c')}
      style={{ pointerEvents: 'none' }}
    >
      <Terrain reduced={reduced} />
      <Route reduced={reduced} />
      <CameraRig reduced={reduced} />
    </Canvas>
  )
}

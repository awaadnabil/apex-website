'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment, Float, Lightformer, PerformanceMonitor } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { spring } from '@/lib/motion'

export type StageSignals = {
  /** 0 while the hero fills the screen, 1 once it has scrolled out */
  heroProgress: number
  pointer: { x: number; y: number }
  /** the fixed wrapper around the canvas; it fades as the camera leaves the hero */
  stage: HTMLElement | null
}

const BG = '#080808'
const INK = new THREE.Color('#eef2f4')
const TEAL = new THREE.Color('#00c8c8')
const CHROMATIC_OFFSET = new THREE.Vector2(0.0006, 0.0006)

const particleVertex = /* glsl */ `
  attribute float seed;
  uniform float time;
  uniform float pixelRatio;
  uniform float size;
  varying float vSeed;
  varying float vFade;
  void main() {
    vec3 p = position;
    float t = time * (0.035 + seed * 0.03);
    p.x += sin(t + seed * 6.2831) * 0.45;
    p.y += cos(t * 0.8 + seed * 12.566) * 0.3;
    p.z += sin(t * 0.6 + seed * 3.14) * 0.35;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    float depth = -mv.z;
    gl_PointSize = size * pixelRatio * (0.6 + seed) * (6.0 / max(depth, 0.35));
    // particles fade as the camera passes them, so the push never fills the screen with dots
    vFade = smoothstep(0.2, 2.2, depth) * (1.0 - smoothstep(14.0, 20.0, depth));
    vSeed = seed;
  }
`
const particleFragment = /* glsl */ `
  uniform vec3 ink;
  uniform vec3 teal;
  varying float vSeed;
  varying float vFade;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    // one particle in eight is accent and bright enough to cross the bloom threshold
    bool accent = fract(vSeed * 8.0) < 0.125;
    vec3 color = accent ? teal * 1.6 : ink;
    gl_FragColor = vec4(color, alpha * vFade * (accent ? 0.9 : 0.42));
  }
`

function Particles({ count, reduced }: { count: number; reduced: boolean }) {
  const pixelRatio = useThree((s) => s.viewport.dpr)
  const { positions, seeds } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const seeds = new Float32Array(count)
    let state = 7
    const random = () => ((state = (state * 16807) % 2147483647) - 1) / 2147483646
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (random() - 0.5) * 18
      positions[i * 3 + 1] = (random() - 0.5) * 11
      positions[i * 3 + 2] = -14 + random() * 18
      seeds[i] = random()
    }
    return { positions, seeds }
  }, [count])
  const uniforms = useMemo(() => ({
    time: { value: 0 },
    pixelRatio: { value: pixelRatio },
    size: { value: 2.2 },
    ink: { value: INK },
    teal: { value: TEAL },
  }), [pixelRatio])
  useFrame(({ clock }) => {
    if (!reduced) uniforms.time.value = clock.elapsedTime
  })
  return (
    <points frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-seed" args={[seeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        vertexShader={particleVertex}
        fragmentShader={particleFragment}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Forms sit in the margins around the copy and the art frame, placed in fractions of the visible plane. */
const FORMS = [
  { kind: 'knot', at: [0.43, 0.36, -1.5], scale: 0.42, speed: 1.1, rotation: 0.6 },
  { kind: 'ico', at: [-0.4, -0.38, -0.8], scale: 0.38, speed: 0.8, rotation: 0.9 },
  { kind: 'torus', at: [0.06, 0.3, -6], scale: 0.6, speed: 0.65, rotation: 0.4 },
] as const
/** On a phone the copy fills the top and the art frame the bottom: the forms peek in at the edges between. */
const MOBILE_FORMS = [
  { kind: 'knot', at: [0.56, 0.04, -1.5], scale: 0.3, speed: 1.1, rotation: 0.6 },
  { kind: 'ico', at: [-0.56, -0.08, -0.8], scale: 0.26, speed: 0.8, rotation: 0.9 },
] as const

function ChromeForms({ mobile }: { mobile: boolean }) {
  const viewport = useThree((s) => s.viewport)
  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: INK,
    metalness: 1,
    roughness: 0.15,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [180, 620],
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), [])
  useEffect(() => () => material.dispose(), [material])
  return (
    <>
      {(mobile ? MOBILE_FORMS : FORMS).map((form) => {
        // the visible plane widens with distance from the camera (z = 6)
        const depthScale = (6 - form.at[2]) / 6
        const position: [number, number, number] = [
          form.at[0] * viewport.width * depthScale,
          form.at[1] * viewport.height * depthScale,
          form.at[2],
        ]
        return (
          <Float key={form.kind} speed={form.speed} rotationIntensity={form.rotation} floatIntensity={0.6} floatingRange={[-0.08, 0.08]}>
            <mesh position={position} scale={form.scale} material={material}>
              {form.kind === 'knot' && <torusKnotGeometry args={[1, 0.32, mobile ? 96 : 180, mobile ? 12 : 24]} />}
              {form.kind === 'ico' && <icosahedronGeometry args={[1, 0]} />}
              {form.kind === 'torus' && <torusGeometry args={[1, 0.08, 16, mobile ? 64 : 128]} />}
            </mesh>
          </Float>
        )
      })}
    </>
  )
}

/** Spring the camera toward the pointer (max 4°) and push it forward as the hero scrolls away. */
function CameraRig({ signals, parallax }: { signals: StageSignals; parallax: boolean }) {
  const camera = useThree((s) => s.camera)
  const state = useRef({ x: 0, y: 0, vx: 0, vy: 0 })
  useFrame((_, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30)
    const s = state.current
    const max = THREE.MathUtils.degToRad(4)
    const tx = parallax ? signals.pointer.x * max : 0
    const ty = parallax ? signals.pointer.y * max : 0
    s.vx += (spring.soft.stiffness * (tx - s.x) - spring.soft.damping * s.vx) * dt
    s.vy += (spring.soft.stiffness * (ty - s.y) - spring.soft.damping * s.vy) * dt
    s.x += s.vx * dt
    s.y += s.vy * dt
    const p = signals.heroProgress
    camera.position.z = 6 - p * 7
    camera.rotation.set(-s.y, -s.x, 0)
    if (signals.stage) signals.stage.style.opacity = String(1 - THREE.MathUtils.smoothstep(p, 0.3, 0.95))
  })
  return null
}

export default function HeroScene({
  signals,
  mobile,
  active,
  onReady,
}: {
  signals: StageSignals
  mobile: boolean
  active: boolean
  onReady: () => void
}) {
  // 2: full · 1: fewer particles, no postprocessing · 0: a still frame
  const [tier, setTier] = useState(mobile ? 1 : 2)
  const count = mobile ? 800 : tier === 2 ? 4000 : 2000
  const frameloop = !active ? 'never' : tier === 0 ? 'demand' : 'always'

  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={frameloop}
      camera={{ position: [0, 0, 6], fov: 50, near: 0.1, far: 40 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.setClearColor(BG, 1)
        requestAnimationFrame(onReady)
      }}
      aria-hidden="true"
    >
      <PerformanceMonitor
        onDecline={() => setTier((t) => Math.max(0, t - 1))}
        flipflops={3}
        onFallback={() => setTier(0)}
      />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#eef2f4" position={[0, 4, -2]} scale={[10, 1.4, 1]} />
        <Lightformer form="rect" intensity={4} color="#00c8c8" position={[-5, 0, 1]} rotation-y={Math.PI / 2} scale={[8, 1, 1]} />
        <Lightformer form="ring" intensity={2} color="#00c8c8" position={[4, -2, 3]} scale={2} />
        <Lightformer form="rect" intensity={1.2} color="#9aa4ab" position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <Particles count={count} reduced={tier === 0} />
      <ChromeForms mobile={mobile} />
      <CameraRig signals={signals} parallax={!mobile} />
      {tier === 2 && !mobile && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={0.6} luminanceThreshold={0.8} luminanceSmoothing={0.2} mipmapBlur />
          <ChromaticAberration offset={CHROMATIC_OFFSET} radialModulation={false} modulationOffset={0} />
          <Noise opacity={0.03} />
          <Vignette offset={0.3} darkness={0.55} />
        </EffectComposer>
      )}
    </Canvas>
  )
}

'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, PerspectiveCamera, shaderMaterial, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { hypercubeEdges, hypercubeVertices, project4D, shapePoint } from '@/lib/site/dimension-math'

export type JourneyState = { progress: number[]; scroll: number; active: number; reduced: boolean; mobile: boolean }
export const journey: JourneyState = { progress: [0, 0, 0, 0], scroll: 0, active: -1, reduced: false, mobile: false }
const TEAL = '#00c8c8'
const INK = '#eef2f4'

const FlowMaterial = shaderMaterial({ time: 0, intensity: 0.12, tint: new THREE.Color(TEAL) },
  `varying vec2 vUv; void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,
  `varying vec2 vUv; uniform float time; uniform float intensity; uniform vec3 tint;
   float hash(vec3 p){p=fract(p*.3183099+vec3(.1,.2,.3));p*=17.;return fract(p.x*p.y*p.z*(p.x+p.y+p.z));}
   float noise(vec3 p){vec3 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z);}
   void main(){vec3 p=vec3(vUv*4.,time*.08);vec3 q=vec3(noise(p),noise(p+3.),noise(p+7.));float n=noise(p+q*3.);float edge=smoothstep(.75,.1,length(vUv-.5));gl_FragColor=vec4(tint,n*edge*intensity);}`,
)
const FoldMaterial = shaderMaterial({ map: null as THREE.Texture | null, fold: 0, opacity: 0 },
  `varying vec2 vUv; uniform float fold; void main(){vUv=uv;vec3 p=position;float a=fold*(uv.x-.5)*3.14;p.z+=sin(a)*2.;p.x*=cos(a*.5);gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
  `varying vec2 vUv;uniform sampler2D map;uniform float opacity;void main(){vec3 c=texture2D(map,vUv).rgb;float scan=.9+.1*sin(vUv.y*900.);gl_FragColor=vec4(c*scan,opacity);}`,
)

function Flow({ index }: { index: number }) {
  const material = useMemo(() => new FlowMaterial(), [])
  useEffect(() => () => material.dispose(), [material])
  useFrame(({ clock }) => {
    material.time = journey.reduced ? 0 : clock.elapsedTime
    material.intensity = 0.12 + Math.sin(journey.progress[index] * Math.PI) * 0.1
  })
  return <mesh position={[0, 0, -4]}><planeGeometry args={[24, 18]} /><primitive object={material} attach="material" transparent depthWrite={false} /></mesh>
}

function Tesseract() {
  const positions = useMemo(() => new Float32Array(hypercubeEdges.length * 6), [])
  const attribute = useRef<THREE.BufferAttribute>(null)
  const group = useRef<THREE.Group>(null)
  useFrame(() => {
    const p = journey.reduced ? 0.8 : journey.progress[1]
    const angles = [p * Math.PI * 2, p * Math.PI * 1.5, p * Math.PI]
    const projected = hypercubeVertices.map(v => project4D(v, angles))
    hypercubeEdges.forEach(([a, b], i) => {
      positions.set(projected[a], i * 6)
      positions.set(projected[b], i * 6 + 3)
    })
    if (attribute.current) attribute.current.needsUpdate = true
    if (group.current) group.current.rotation.set(0.25, 0.3 + p * 0.5, 0.12)
  })
  return <group ref={group} scale={0.95}>
    <lineSegments frustumCulled={false}>
      <bufferGeometry><bufferAttribute ref={attribute} attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
      <lineBasicMaterial color={TEAL} transparent opacity={0.9} toneMapped={false} />
    </lineSegments>
    {!journey.mobile && <mesh scale={0.65}>
      <boxGeometry />
      <MeshTransmissionMaterial resolution={128} samples={4} thickness={0.7} roughness={0.12} transmission={1} chromaticAberration={0.025} color={INK} background={new THREE.Color('#121518')} />
    </mesh>}
  </group>
}

function Tunnel() {
  const rings = useRef<THREE.Group>(null)
  useFrame(({ camera }) => {
    const p = journey.reduced ? 1 : journey.progress[0]
    camera.position.z = 8 - p * 12
    rings.current?.children.forEach((ring, i) => {
      ring.rotation.z = p * (i % 2 ? 1 : -1) * Math.PI
    })
  })
  return <group ref={rings}>
    {Array.from({ length: 20 }, (_, i) => <mesh key={i} position={[0, 0, -i * 3]} rotation={[0, 0, i * 0.12]}>
      <torusGeometry args={[3.6, 0.013, 4, journey.mobile ? 32 : 80]} />
      <meshBasicMaterial color={i % 3 ? TEAL : INK} transparent opacity={0.4 - i * 0.013} />
    </mesh>)}
  </group>
}

function Morph() {
  const count = journey.mobile ? 700 : 2400
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const targets = useMemo(() => Array.from({ length: 4 }, (_, shape) => {
    const target = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) target.set(shapePoint(shape, (i * 0.61803398875) % 1, i / (count - 1)), i * 3)
    return target
  }), [count])
  const attribute = useRef<THREE.BufferAttribute>(null)
  const points = useRef<THREE.Points>(null)
  useFrame(() => {
    const p = (journey.reduced ? 1 : journey.progress[2]) * 3
    const from = Math.min(2, Math.floor(p)), mix = THREE.MathUtils.smoothstep(p - from, 0, 1)
    for (let i = 0; i < positions.length; i++) positions[i] = THREE.MathUtils.lerp(targets[from][i], targets[from + 1][i], mix) * 1.8
    if (attribute.current) attribute.current.needsUpdate = true
    if (points.current) points.current.rotation.y = p * 0.5
  })
  return <points ref={points} frustumCulled={false}>
    <bufferGeometry><bufferAttribute ref={attribute} attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial color={TEAL} size={journey.mobile ? 0.04 : 0.025} transparent opacity={0.85} depthWrite={false} />
  </points>
}

function Fold({ index }: { index: number }) {
  const texture = useTexture('/img/standin-riders-mountain-640.webp')
  const material = useMemo(() => new FoldMaterial(), [])
  useEffect(() => () => material.dispose(), [material])
  useFrame(() => {
    const p = journey.reduced ? 0 : Math.max(0, (journey.progress[index] - 0.84) / 0.16)
    material.map = texture
    material.fold = p * 1.5
    material.opacity = Math.sin(p * Math.PI) * 0.32
  })
  return <mesh position={[0, 0, -1]}><planeGeometry args={[10, 6, 48, 16]} /><primitive object={material} attach="material" transparent side={THREE.DoubleSide} depthWrite={false} /></mesh>
}

export function Accent({ order }: { order: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  useFrame(() => {
    if (mesh.current) mesh.current.rotation.set(0.3, journey.reduced ? 0.6 : journey.scroll * 0.0004 + order, 0.5)
  })
  return <><PerspectiveCamera makeDefault position={[0, 0, 5]} /><mesh ref={mesh}>
    <icosahedronGeometry args={[1.1, 0]} /><meshBasicMaterial color={TEAL} wireframe transparent opacity={0.28} />
  </mesh></>
}

export function ChapterScene({ index }: { index: number }) {
  return <>
    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={48} near={0.1} far={100} />
    <ambientLight intensity={0.6} /><pointLight position={[4, 3, 4]} color={TEAL} intensity={20} />
    {!journey.mobile && !journey.reduced && <Flow index={index} />}
    {index === 0 ? <Tunnel /> : index === 1 ? <Tesseract /> : index === 2 ? <Morph /> : <group position={[0, 0, -3]}><mesh rotation={[Math.PI / 2, 0, 0]}><torusGeometry args={[4, 0.018, 4, 100]} /><meshBasicMaterial color={TEAL} transparent opacity={0.3} /></mesh></group>}
    {!journey.mobile && !journey.reduced && <Fold index={index} />}
  </>
}

export function SharedParticles() {
  const count = journey.mobile ? 180 : 600
  const positions = useMemo(() => new Float32Array(count * 3), [count])
  const attribute = useRef<THREE.BufferAttribute>(null)
  useFrame(() => {
    const index = Math.max(0, journey.active)
    const p = journey.reduced ? 1 : journey.progress[index]
    for (let i = 0; i < count; i++) {
      const u = (i * 0.61803398875) % 1, v = i / count
      const a = shapePoint(index, u, v), b = shapePoint(Math.min(3, index + 1), u, v)
      const spread = journey.active < 0 ? 12 : 5
      positions[i * 3] = THREE.MathUtils.lerp(a[0], b[0], p) * spread
      positions[i * 3 + 1] = THREE.MathUtils.lerp(a[1], b[1], p) * spread
      positions[i * 3 + 2] = ((i * 0.713 + (journey.reduced ? 0 : journey.scroll * 0.002)) % 18) - 12
    }
    if (attribute.current) attribute.current.needsUpdate = true
  })
  return <><PerspectiveCamera makeDefault position={[0, 0, 8]} /><points frustumCulled={false}>
    <bufferGeometry><bufferAttribute ref={attribute} attach="attributes-position" args={[positions, 3]} /></bufferGeometry>
    <pointsMaterial size={0.018} color={INK} transparent opacity={0.22} depthWrite={false} />
  </points></>
}

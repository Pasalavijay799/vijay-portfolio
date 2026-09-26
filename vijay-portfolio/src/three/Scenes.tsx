import { useEffect, useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { ContactShadows, Environment, Float, Lightformer, OrbitControls, AdaptiveDpr } from '@react-three/drei'
import * as THREE from 'three'
import { ExplodeProvider } from './parts'
import { SBCBoard, NPUModule, NRFBoard, BOARD_COMPONENTS } from './boards'
import { LAB_BOARDS } from './labBoards'

/** Studio lighting built from Lightformers — no HDR download needed. */
function Studio() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 9, 4]} intensity={1.6} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-6, 4, -3]} intensity={0.5} color="#7fd3ff" />
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} position={[0, 6, 0]} rotation-x={Math.PI / 2} scale={[12, 12, 1]} />
        <Lightformer intensity={1.2} position={[-6, 2, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} color="#9cf5c7" />
        <Lightformer intensity={1.4} position={[6, 2, -2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} color="#ffd9a0" />
        <Lightformer intensity={0.6} position={[0, 1, 8]} scale={[10, 3, 1]} />
      </Environment>
    </>
  )
}

/* ------------------------------ HERO ------------------------------ */
function HeroRig({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ pointer }, dt) => {
    if (!ref.current) return
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.2)
    const targetY = pointer.x * 0.35 + scroll * 0.9
    const targetX = -pointer.y * 0.15 + scroll * 0.25
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 3, dt)
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 3, dt)
    ref.current.position.y = THREE.MathUtils.damp(ref.current.position.y, -scroll * 1.5, 4, dt)
  })
  return <group ref={ref}>{children}</group>
}

/** NPU module that "docks" onto the SBC on load, then hovers. */
function DockingNPU() {
  const ref = useRef<THREE.Group>(null)
  const t0 = useRef<number | null>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    if (t0.current === null) t0.current = clock.elapsedTime
    const t = Math.min((clock.elapsedTime - t0.current) / 2.2, 1)
    const e = 1 - Math.pow(1 - t, 3)
    ref.current.position.set(THREE.MathUtils.lerp(-6, -2.2, e), THREE.MathUtils.lerp(4, 1.9, e) + Math.sin(clock.elapsedTime * 1.3) * 0.08, THREE.MathUtils.lerp(-1, -1.2, e))
    ref.current.rotation.set(THREE.MathUtils.lerp(0.8, 0.18, e), THREE.MathUtils.lerp(-1.2, 0.35, e), THREE.MathUtils.lerp(0.4, -0.08, e))
  })
  return (
    <group ref={ref} scale={0.9}>
      <NPUModule />
    </group>
  )
}

export function HeroScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      frameloop={active ? 'always' : 'never'}
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [0, 8.5, 14], fov: 34 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <AdaptiveDpr pixelated />
      <Studio />
      <HeroRig>
        <group rotation={[0, -0.45, 0]} position={[0.6, 0, 0]}>
          <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
            <SBCBoard />
          </Float>
          <DockingNPU />
          <Float speed={1.6} rotationIntensity={0.4} floatIntensity={0.8}>
            <group position={[3.6, 1.6, -4.4]} rotation={[0.3, -0.6, 0.15]} scale={0.7}>
              <NRFBoard />
            </group>
          </Float>
        </group>
      </HeroRig>
      <ContactShadows position={[0, -1.4, 0]} opacity={0.45} scale={22} blur={2.6} far={5} color="#000" />
    </Canvas>
  )
}

/* ------------------------------ LAB ------------------------------ */
function ExplodeDriver({ target, value }: { target: number; value: React.MutableRefObject<number> }) {
  useFrame((_, dt) => {
    value.current = THREE.MathUtils.damp(value.current, target, 4, dt)
  })
  return null
}

function SpinIn({ id, children }: { id: string; children: ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  const start = useRef(0)
  useEffect(() => {
    start.current = performance.now()
  }, [id])
  useFrame(() => {
    if (!ref.current) return
    const t = Math.min((performance.now() - start.current) / 700, 1)
    const e = 1 - Math.pow(1 - t, 3)
    ref.current.scale.setScalar(0.6 + 0.4 * e)
    ref.current.rotation.y = (1 - e) * -1.2
  })
  return <group ref={ref}>{children}</group>
}

export function LabScene({ boardId, exploded, active = true }: { boardId: string; exploded: boolean; active?: boolean }) {
  const explode = useRef(0)
  const board = LAB_BOARDS.find((b) => b.id === boardId) ?? LAB_BOARDS[0]
  const Comp = BOARD_COMPONENTS[board.id]
  return (
    <Canvas frameloop={active ? 'always' : 'never'} shadows dpr={[1, 1.75]} camera={{ position: [0, 7, 10], fov: 36 }} gl={{ antialias: true, alpha: true }}>
      <AdaptiveDpr pixelated />
      <Studio />
      <ExplodeDriver target={exploded ? 1 : 0} value={explode} />
      <ExplodeProvider value={explode}>
        <SpinIn id={board.id}>
          <group scale={board.scale} key={board.id}>
            <Comp />
          </group>
        </SpinIn>
      </ExplodeProvider>
      <ContactShadows position={[0, -0.4, 0]} opacity={0.5} scale={16} blur={2.4} far={4} />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={!exploded}
        autoRotateSpeed={0.8}
        minPolarAngle={0.3}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}

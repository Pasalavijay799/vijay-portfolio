/*
 * Procedural PCB part kit — every board is built from these primitives,
 * so no external .glb models or network assets are needed.
 * Units: 1 = 1 cm. Board top surface sits at y = 0.
 */
import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useRef, type ReactNode } from 'react'
import { useFrame } from '@react-three/fiber'
import { Line, Html } from '@react-three/drei'
import * as THREE from 'three'

/* ---------------- materials ---------------- */
export const MAT = {
  mask: new THREE.MeshStandardMaterial({ color: '#0c3b2a', roughness: 0.55, metalness: 0.1 }),
  maskEdge: new THREE.MeshStandardMaterial({ color: '#0a2c20', roughness: 0.7 }),
  maskBlue: new THREE.MeshStandardMaterial({ color: '#1b4a9c', roughness: 0.5, metalness: 0.1 }),
  maskBlueEdge: new THREE.MeshStandardMaterial({ color: '#12336d', roughness: 0.7 }),
  copper: new THREE.MeshStandardMaterial({ color: '#d9a64e', roughness: 0.28, metalness: 1 }),
  gold: new THREE.MeshStandardMaterial({ color: '#e8c25a', roughness: 0.22, metalness: 1 }),
  silver: new THREE.MeshStandardMaterial({ color: '#c7ccd2', roughness: 0.25, metalness: 1 }),
  steel: new THREE.MeshStandardMaterial({ color: '#8d949c', roughness: 0.35, metalness: 1 }),
  chip: new THREE.MeshStandardMaterial({ color: '#141516', roughness: 0.45, metalness: 0.2 }),
  plastic: new THREE.MeshStandardMaterial({ color: '#1b1c1e', roughness: 0.6 }),
  plasticWhite: new THREE.MeshStandardMaterial({ color: '#e9e6df', roughness: 0.5 }),
  ceramic: new THREE.MeshStandardMaterial({ color: '#b58a5a', roughness: 0.5 }),
  button: new THREE.MeshStandardMaterial({ color: '#2a2b2e', roughness: 0.5 }),
}

/* ---------------- explode context ---------------- */
// `explode` is a ref (0..1) so animating it never re-renders React.
type ExplodeCtx = { explode: React.MutableRefObject<number> }
const Ctx = createContext<ExplodeCtx | null>(null)

export function ExplodeProvider({ value, children }: { value: React.MutableRefObject<number>; children: ReactNode }) {
  return <Ctx.Provider value={{ explode: value }}>{children}</Ctx.Provider>
}

/** Wraps a part; when exploded it rises by `lift` cm. */
export function Layer({ lift = 0, position = [0, 0, 0], children, label, labelSide = 'right' }: {
  lift?: number
  position?: [number, number, number]
  children: ReactNode
  label?: string
  labelSide?: 'left' | 'right'
}) {
  const ctx = useContext(Ctx)
  const ref = useRef<THREE.Group>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  useFrame(() => {
    const e = ctx?.explode.current ?? 0
    if (ref.current) ref.current.position.y = position[1] + e * lift
    if (labelRef.current) labelRef.current.style.opacity = String(Math.max(0, (e - 0.55) / 0.45))
  })
  return (
    <group ref={ref} position={position}>
      {children}
      {label && (
        <Html position={[0, 0.5, 0]} center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
          <div ref={labelRef} className={`part-label ${labelSide}`} style={{ opacity: 0 }}>
            {label}
          </div>
        </Html>
      )}
    </group>
  )
}

/* ---------------- silkscreen (canvas texture, offline) ---------------- */
const SILK_PX_PER_CM = 64
export const SILK_FONT = '"JetBrains Mono", monospace'

function paintSilk(t: THREE.CanvasTexture, draw: (ctx: CanvasRenderingContext2D, s: number) => void) {
  const c = t.image as HTMLCanvasElement
  const ctx = c.getContext('2d')!
  ctx.clearRect(0, 0, c.width, c.height)
  ctx.strokeStyle = 'rgba(235,240,235,0.85)'
  ctx.fillStyle = 'rgba(235,240,235,0.9)'
  ctx.lineWidth = 2
  draw(ctx, SILK_PX_PER_CM)
  t.needsUpdate = true
}

export function useSilkscreen(w: number, d: number, draw: (ctx: CanvasRenderingContext2D, s: number) => void) {
  const drawRef = useRef(draw)
  drawRef.current = draw
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = Math.round(w * SILK_PX_PER_CM)
    c.height = Math.round(d * SILK_PX_PER_CM)
    const t = new THREE.CanvasTexture(c)
    t.anisotropy = 8
    t.colorSpace = THREE.SRGBColorSpace
    paintSilk(t, drawRef.current)
    return t
  }, [w, d])
  useEffect(() => {
    // The web font may not be loaded on first paint — redraw once it is.
    let live = true
    document.fonts?.load(`500 16px ${SILK_FONT}`).then(() => live && paintSilk(tex, drawRef.current), () => {})
    return () => {
      live = false
      tex.dispose()
    }
  }, [tex])
  return tex
}

/* ---------------- substrate ---------------- */
/** `holes`: true = one per corner, or explicit (x, z) centres. */
export function Substrate({ w, d, t = 0.16, radius = 0.3, holes = true, silk, mask = 'green' }: {
  w: number; d: number; t?: number; radius?: number; holes?: boolean | [number, number][]; silk?: THREE.Texture; mask?: 'green' | 'blue'
}) {
  const inset = 0.35
  const holePts = useMemo<[number, number][]>(
    () => (Array.isArray(holes) ? holes : holes ? [[-1, -1], [1, -1], [-1, 1], [1, 1]].map(([sx, sz]) => [sx * (w / 2 - inset), sz * (d / 2 - inset)]) : []),
    [holes, w, d],
  )
  const geo = useMemo(() => {
    const shape = new THREE.Shape()
    const x = -w / 2, z = -d / 2, r = radius
    shape.moveTo(x + r, z)
    shape.lineTo(x + w - r, z)
    shape.quadraticCurveTo(x + w, z, x + w, z + r)
    shape.lineTo(x + w, z + d - r)
    shape.quadraticCurveTo(x + w, z + d, x + w - r, z + d)
    shape.lineTo(x + r, z + d)
    shape.quadraticCurveTo(x, z + d, x, z + d - r)
    shape.lineTo(x, z + r)
    shape.quadraticCurveTo(x, z, x + r, z)
    for (const [hx, hz] of holePts) {
      const h = new THREE.Path()
      h.absarc(hx, hz, 0.14, 0, Math.PI * 2, true)
      shape.holes.push(h)
    }
    const g = new THREE.ExtrudeGeometry(shape, { depth: t, bevelEnabled: false, curveSegments: 16 })
    g.rotateX(Math.PI / 2) // extrude downward from y=0
    return g
  }, [w, d, t, radius, holePts])

  return (
    <group>
      <mesh geometry={geo} material={mask === 'blue' ? [MAT.maskBlue, MAT.maskBlueEdge] : [MAT.mask, MAT.maskEdge]} castShadow receiveShadow />
      {silk && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <planeGeometry args={[w, d]} />
          <meshBasicMaterial map={silk} transparent depthWrite={false} />
        </mesh>
      )}
      {holePts.map(([hx, hz], i) => (
        <mesh key={i} position={[hx, 0.003, hz]} rotation={[-Math.PI / 2, 0, 0]} material={mask === 'blue' ? MAT.silver : MAT.gold}>
          <ringGeometry args={[0.14, 0.24, 24]} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------------- chips ---------------- */
export function Chip({ w, d, h = 0.12, pins = 0, pinSides = 4, heatspreader = false, marking = true }: {
  w: number; d: number; h?: number; pins?: number; pinSides?: 2 | 4; heatspreader?: boolean; marking?: boolean
}) {
  const pinGeo = useMemo(() => new THREE.BoxGeometry(0.035, 0.03, 0.12), [])
  const pinsArr = useMemo(() => {
    const out: { p: [number, number, number]; r: number }[] = []
    if (!pins) return out
    const sides = pinSides === 4 ? [0, 1, 2, 3] : [1, 3]
    for (const s of sides) {
      const len = s % 2 === 0 ? w : d
      for (let i = 0; i < pins; i++) {
        const t = (i + 0.5) / pins - 0.5
        const a = t * len * 0.86
        if (s === 0) out.push({ p: [a, 0.02, -d / 2 - 0.05], r: 0 })
        if (s === 2) out.push({ p: [a, 0.02, d / 2 + 0.05], r: 0 })
        if (s === 1) out.push({ p: [w / 2 + 0.05, 0.02, a], r: Math.PI / 2 })
        if (s === 3) out.push({ p: [-w / 2 - 0.05, 0.02, a], r: Math.PI / 2 })
      }
    }
    return out
  }, [pins, pinSides, w, d])

  return (
    <group>
      <mesh position={[0, h / 2, 0]} material={MAT.chip} castShadow>
        <boxGeometry args={[w, h, d]} />
      </mesh>
      {heatspreader && (
        <mesh position={[0, h + 0.02, 0]} material={MAT.steel} castShadow>
          <boxGeometry args={[w * 0.82, 0.04, d * 0.82]} />
        </mesh>
      )}
      {marking && !heatspreader && (
        <mesh position={[-w / 2 + 0.14, h + 0.001, -d / 2 + 0.14]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.05, 16]} />
          <meshStandardMaterial color="#2c2e30" />
        </mesh>
      )}
      {pinsArr.map((pn, i) => (
        <mesh key={i} geometry={pinGeo} material={MAT.silver} position={pn.p} rotation={[0, pn.r, 0]} />
      ))}
    </group>
  )
}

/* ---------------- pin header ---------------- */
export function Header({ cols, rows = 1, pitch = 0.254, pinH = 0.6, female = false }: {
  cols: number; rows?: number; pitch?: number; pinH?: number; female?: boolean
}) {
  const w = cols * pitch, d = rows * pitch
  const count = cols * rows
  const pinRef = useRef<THREE.InstancedMesh>(null)
  useLayoutEffect(() => {
    if (!pinRef.current) return
    const m = new THREE.Matrix4()
    let k = 0
    for (let c = 0; c < cols; c++)
      for (let r = 0; r < rows; r++) {
        m.makeTranslation((c + 0.5) * pitch - w / 2, pinH / 2, (r + 0.5) * pitch - d / 2)
        pinRef.current.setMatrixAt(k++, m)
      }
    pinRef.current.instanceMatrix.needsUpdate = true
  }, [cols, rows, pitch, pinH, w, d])
  return (
    <group>
      <mesh position={[0, female ? 0.25 : 0.125, 0]} material={MAT.plastic} castShadow>
        <boxGeometry args={[w, female ? 0.5 : 0.25, d]} />
      </mesh>
      {!female && (
        <instancedMesh ref={pinRef} args={[undefined, undefined, count]} material={MAT.gold} castShadow>
          <boxGeometry args={[0.064, pinH, 0.064]} />
        </instancedMesh>
      )}
    </group>
  )
}

/* ---------------- connectors ---------------- */
export function USBA({ rot = 0 }: { rot?: number }) {
  return (
    <group rotation={[0, rot, 0]}>
      <mesh position={[0, 0.8, 0]} material={MAT.silver} castShadow>
        <boxGeometry args={[1.75, 1.6, 1.45]} />
      </mesh>
      {[0.42, 1.18].map((y) => (
        <mesh key={y} position={[0.88, y, 0]} material={MAT.plastic}>
          <boxGeometry args={[0.02, 0.5, 1.2]} />
        </mesh>
      ))}
    </group>
  )
}
export function RJ45() {
  return (
    <group>
      <mesh position={[0, 0.68, 0]} material={MAT.silver} castShadow>
        <boxGeometry args={[2.1, 1.36, 1.6]} />
      </mesh>
      <mesh position={[1.06, 0.6, 0]} material={MAT.plastic}>
        <boxGeometry args={[0.02, 0.8, 1.1]} />
      </mesh>
    </group>
  )
}
export function SmallPort({ w = 0.9, h = 0.32, d = 0.75 }: { w?: number; h?: number; d?: number }) {
  return (
    <mesh position={[0, h / 2, 0]} material={MAT.silver} castShadow>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  )
}
export function FPC({ w = 1.6 }: { w?: number }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} material={MAT.plasticWhite} castShadow>
        <boxGeometry args={[w, 0.24, 0.45]} />
      </mesh>
      <mesh position={[0, 0.26, -0.1]} material={MAT.plastic}>
        <boxGeometry args={[w * 0.96, 0.05, 0.2]} />
      </mesh>
    </group>
  )
}
export function Shield({ w, d, h = 0.28 }: { w: number; d: number; h?: number }) {
  return (
    <mesh position={[0, h / 2, 0]} material={MAT.steel} castShadow>
      <boxGeometry args={[w, h, d]} />
    </mesh>
  )
}
export function Button({ size = 0.6 }: { size?: number }) {
  return (
    <group>
      <mesh position={[0, 0.12, 0]} material={MAT.silver} castShadow>
        <boxGeometry args={[size, 0.24, size]} />
      </mesh>
      <mesh position={[0, 0.3, 0]} material={MAT.button}>
        <cylinderGeometry args={[size * 0.28, size * 0.28, 0.14, 20]} />
      </mesh>
    </group>
  )
}
export function CoinCell({ r = 1.0 }: { r?: number }) {
  return (
    <group>
      <mesh position={[0, 0.18, 0]} material={MAT.plastic} castShadow>
        <cylinderGeometry args={[r + 0.12, r + 0.12, 0.36, 40]} />
      </mesh>
      <mesh position={[0, 0.39, 0]} material={MAT.silver}>
        <cylinderGeometry args={[r, r, 0.08, 40]} />
      </mesh>
    </group>
  )
}
export function Passive({ w = 0.2, d = 0.1, h = 0.07, kind = 'cap' }: { w?: number; d?: number; h?: number; kind?: 'cap' | 'res' }) {
  return (
    <group>
      <mesh position={[0, h / 2, 0]} material={kind === 'cap' ? MAT.ceramic : MAT.chip}>
        <boxGeometry args={[w * 0.6, h, d]} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[(s * w * 0.4), h / 2, 0]} material={MAT.silver}>
          <boxGeometry args={[w * 0.2, h * 1.02, d * 1.02]} />
        </mesh>
      ))}
    </group>
  )
}

/** Scatter of 0402-style passives within a rect. Deterministic. */
export function PassiveField({ x, z, w, d, n = 14, seed = 1 }: { x: number; z: number; w: number; d: number; n?: number; seed?: number }) {
  const items = useMemo(() => {
    let s = seed * 9301
    const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280)
    return Array.from({ length: n }, () => ({
      p: [x + (rnd() - 0.5) * w, 0, z + (rnd() - 0.5) * d] as [number, number, number],
      r: rnd() > 0.5 ? Math.PI / 2 : 0,
      k: rnd() > 0.45 ? ('cap' as const) : ('res' as const),
    }))
  }, [x, z, w, d, n, seed])
  return (
    <group>
      {items.map((it, i) => (
        <group key={i} position={it.p} rotation={[0, it.r, 0]}>
          <Passive kind={it.k} />
        </group>
      ))}
    </group>
  )
}

/* ---------------- LED (blinks) ---------------- */
export function LED({ color = '#3ee08f', rate = 1.2, phase = 0 }: { color?: string; rate?: number; phase?: number }) {
  const ref = useRef<THREE.MeshStandardMaterial>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const on = Math.sin(clock.elapsedTime * rate * Math.PI * 2 + phase) > 0.1
    ref.current.emissiveIntensity = THREE.MathUtils.lerp(ref.current.emissiveIntensity, on ? 4 : 0.15, 0.25)
  })
  return (
    <mesh position={[0, 0.05, 0]}>
      <boxGeometry args={[0.16, 0.1, 0.08]} />
      <meshStandardMaterial ref={ref} color={color} emissive={color} emissiveIntensity={1} toneMapped={false} />
    </mesh>
  )
}

/* ---------------- slide switch ---------------- */
export function SlideSwitch({ w = 0.55, d = 0.25 }: { w?: number; d?: number }) {
  return (
    <group>
      <mesh position={[0, 0.1, 0]} material={MAT.steel} castShadow>
        <boxGeometry args={[w, 0.2, d]} />
      </mesh>
      <mesh position={[-w * 0.2, 0.25, 0]} material={MAT.plastic}>
        <boxGeometry args={[w * 0.22, 0.12, d * 0.5]} />
      </mesh>
    </group>
  )
}

/* ---------------- 2.4 GHz radio waves (BLE advertising) ---------------- */
/** Rings that expand from an antenna and fade out. Mutates refs only. */
export function RadioWaves({ color = '#4da3ff', count = 3, maxR = 2.6, period = 2.4 }: {
  color?: string; count?: number; maxR?: number; period?: number
}) {
  const rings = useRef<(THREE.Mesh | null)[]>([])
  const mats = useMemo(
    () => Array.from({ length: count }, () => new THREE.MeshBasicMaterial({ color, transparent: true, side: THREE.DoubleSide, depthWrite: false, toneMapped: false })),
    [color, count],
  )
  useEffect(() => () => mats.forEach((m) => m.dispose()), [mats])
  useFrame(({ clock }) => {
    rings.current.forEach((m, i) => {
      if (!m) return
      const t = ((clock.elapsedTime / period + i / count) % 1)
      const r = 0.25 + t * maxR
      m.scale.set(r, r, r)
      mats[i].opacity = 0.55 * (1 - t) * Math.min(1, t * 6)
    })
  })
  return (
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {mats.map((mat, i) => (
        <mesh key={i} ref={(el) => { rings.current[i] = el }} material={mat}>
          <ringGeometry args={[0.96, 1, 64]} />
        </mesh>
      ))}
    </group>
  )
}

/* ---------------- traces with travelling signal pulses ---------------- */
export type Path = [number, number][] // (x,z) points on board surface

export function Traces({ paths, color = '#3ee08f', lineColor = '#b8893f', pulses = true, speed = 0.35, width = 1.4 }: {
  paths: Path[]; color?: string; lineColor?: string; pulses?: boolean; speed?: number; width?: number
}) {
  const curves = useMemo(
    () =>
      paths.map((p) => {
        const pts = p.map(([x, z]) => new THREE.Vector3(x, 0.006, z))
        const c = new THREE.CurvePath<THREE.Vector3>()
        for (let i = 0; i < pts.length - 1; i++) c.add(new THREE.LineCurve3(pts[i], pts[i + 1]))
        return { pts, curve: c }
      }),
    [paths],
  )
  const pulseRef = useRef<THREE.InstancedMesh>(null)
  const tmp = useMemo(() => new THREE.Object3D(), [])
  useFrame(({ clock }) => {
    if (!pulses || !pulseRef.current) return
    curves.forEach(({ curve }, i) => {
      const t = (clock.elapsedTime * speed + i * 0.37) % 1
      const p = curve.getPointAt(t)
      tmp.position.set(p.x, 0.03, p.z)
      const s = 0.6 + 0.4 * Math.sin(t * Math.PI)
      tmp.scale.setScalar(s)
      tmp.updateMatrix()
      pulseRef.current!.setMatrixAt(i, tmp.matrix)
    })
    pulseRef.current.instanceMatrix.needsUpdate = true
  })
  return (
    <group>
      {curves.map(({ pts }, i) => (
        <Line key={i} points={pts} color={lineColor} lineWidth={width} transparent opacity={0.55} />
      ))}
      {pulses && (
        <instancedMesh ref={pulseRef} args={[undefined, undefined, curves.length]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color={color} toneMapped={false} />
        </instancedMesh>
      )}
    </group>
  )
}

/** Manhattan-style route helper: a → corner → b */
export const route = (a: [number, number], b: [number, number], bendFirstX = true): Path =>
  bendFirstX ? [a, [b[0], a[1]], b] : [a, [a[0], b[1]], b]

/*
 * Generic, unbranded boards modelled on hardware Vijay works with.
 * Each board uses <Layer lift> so the Hardware Lab can "explode" it.
 */
import {
  Substrate, Chip, Header, USBA, RJ45, SmallPort, FPC, Shield, Button, SlideSwitch,
  LED, RadioWaves, Traces, PassiveField, Layer, useSilkscreen, route, MAT, SILK_FONT, type Path,
} from './parts'
import type { LabBoardId } from './labBoards'

/* helper: canvas coord from board coord */
const cx = (x: number, w: number, s: number) => (x + w / 2) * s
const cz = (z: number, d: number, s: number) => (z + d / 2) * s

function silkText(ctx: CanvasRenderingContext2D, text: string, x: number, y: number, size: number, align: CanvasTextAlign = 'left') {
  ctx.font = `500 ${size}px ${SILK_FONT}`
  ctx.textAlign = align
  ctx.fillText(text, x, y)
}
function silkBox(ctx: CanvasRenderingContext2D, x: number, z: number, w: number, d: number, bw: number, bd: number, s: number) {
  ctx.strokeRect(cx(x - w / 2, bw, s), cz(z - d / 2, bd, s), w * s, d * s)
}

/* ============ Single-board computer (Pi-class, ARM64) ============ */
export function SBCBoard({ traces = true }: { traces?: boolean }) {
  const W = 8.5, D = 5.6
  const silk = useSilkscreen(W, D, (ctx, s) => {
    silkBox(ctx, -1.2, 0.2, 1.8, 1.8, W, D, s)
    silkBox(ctx, 0.75, 0.2, 1.5, 1.2, W, D, s)
    silkText(ctx, 'SBC-5  ARM64', cx(-3.9, W, s), cz(2.0, D, s), 20)
    silkText(ctx, 'VKP · REV 1.2', cx(-3.9, W, s), cz(2.3, D, s), 14)
    silkText(ctx, 'GPIO', cx(-0.65, W, s), cz(-1.75, D, s), 14, 'center')
    silkText(ctx, 'PCIe', cx(-3.6, W, s), cz(-0.9, D, s), 12, 'center')
    silkText(ctx, 'PWR', cx(-3.2, W, s), cz(1.95, D, s) + 6, 12, 'center')
  })
  const paths: Path[] = [
    route([-0.3, 0.2], [0.0, 0.2]),
    route([-1.2, -0.7], [-1.9, -2.0], false),
    route([-0.8, -0.7], [-0.4, -2.0], false),
    route([-0.4, -0.7], [0.9, -2.0], false),
    route([1.5, 0.5], [2.9, -1.9]),
    route([1.5, 0.9], [2.9, 0.0]),
    route([2.3, 1.1], [2.6, 1.9], false),
    route([-1.2, 1.1], [-1.9, 2.3], false),
    route([-1.6, 1.1], [-0.6, 2.3], false),
    route([-2.1, 0.2], [-3.5, 0.2]),
    route([-3.2, 2.2], [-2.6, 1.0], false),
  ]
  return (
    <group>
      <Substrate w={W} d={D} silk={silk} />
      {traces && <Traces paths={paths} />}
      <Layer lift={1.6} position={[-1.2, 0, 0.2]} label="ARM64 SoC">
        <Chip w={1.5} d={1.5} h={0.14} heatspreader />
      </Layer>
      <Layer lift={1.2} position={[0.75, 0, 0.2]} label="LPDDR4X">
        <Chip w={1.3} d={1.0} h={0.1} />
      </Layer>
      <Layer lift={1.0} position={[2.2, 0, 0.6]} label="I/O Controller" labelSide="left">
        <Chip w={0.9} d={0.9} h={0.1} pins={8} />
      </Layer>
      <Layer lift={0.7} position={[-0.65, 0, -2.3]} label="40-pin GPIO">
        <Header cols={20} rows={2} />
      </Layer>
      <Layer lift={0.9} position={[3.55, 0, -1.9]} label="USB 3.0" labelSide="left">
        <USBA />
      </Layer>
      <Layer lift={0.9} position={[3.55, 0, 0.0]}>
        <USBA />
      </Layer>
      <Layer lift={0.9} position={[3.3, 0, 1.9]} label="Gigabit Ethernet" labelSide="left">
        <RJ45 />
      </Layer>
      <Layer lift={0.5} position={[-3.2, 0, 2.45]}>
        <SmallPort w={0.9} h={0.32} d={0.75} />
      </Layer>
      {[-1.9, -0.6].map((x) => (
        <Layer key={x} lift={0.5} position={[x, 0, 2.5]}>
          <SmallPort w={0.75} h={0.3} d={0.65} />
        </Layer>
      ))}
      <Layer lift={0.6} position={[-3.6, 0, -0.3]} label="PCIe FPC">
        <group rotation={[0, Math.PI / 2, 0]}><FPC w={1.4} /></group>
      </Layer>
      <Layer lift={0.4} position={[1.0, 0, 1.9]}>
        <group rotation={[0, 0, 0]}><FPC w={1.6} /></group>
      </Layer>
      <PassiveField x={0.1} z={1.2} w={2.2} d={0.6} n={16} seed={3} />
      <PassiveField x={-2.6} z={-0.9} w={0.8} d={1.4} n={10} seed={7} />
      <PassiveField x={1.2} z={-1.0} w={1.4} d={0.6} n={10} seed={11} />
      <group position={[-3.9, 0, 1.3]}><LED color="#3ee08f" rate={1.4} /></group>
      <group position={[-3.9, 0, 1.55]}><LED color="#ff4d4d" rate={0.4} phase={1} /></group>
    </group>
  )
}

/* ============ ESP32 DevKit ============ */
export function ESP32Board({ traces = true }: { traces?: boolean }) {
  const W = 5.4, D = 2.8
  const silk = useSilkscreen(W, D, (ctx, s) => {
    silkText(ctx, 'ESP32-DEVKIT', cx(-1.9, W, s), cz(0.1, D, s), 16)
    silkText(ctx, 'EN', cx(-2.1, W, s), cz(-0.3, D, s), 12, 'center')
    silkText(ctx, 'BOOT', cx(-2.1, W, s), cz(0.35, D, s), 12, 'center')
  })
  const paths: Path[] = [
    route([-1.2, 0], [0.0, 0]),
    route([-0.6, 0.3], [0.3, 0.7], false),
    route([-2.3, 0], [-1.45, 0]),
    route([0.5, -0.7], [0.2, -1.05], false),
    route([1.4, 0.7], [1.2, 1.05], false),
  ]
  return (
    <group>
      <Substrate w={W} d={D} radius={0.15} silk={silk} />
      {traces && <Traces paths={paths} speed={0.5} />}
      {/* module carrier */}
      <Layer lift={0.5} position={[1.25, 0, 0]}>
        <mesh position={[0, 0.04, 0]} material={MAT.chip} castShadow>
          <boxGeometry args={[2.55, 0.08, 1.8]} />
        </mesh>
        {/* antenna meander */}
        <group position={[0.95, 0.085, 0]}>
          {Array.from({ length: 6 }).map((_, i) => (
            <mesh key={i} position={[-0.25 + i * 0.1, 0, 0]} material={MAT.gold}>
              <boxGeometry args={[0.03, 0.005, 1.3]} />
            </mesh>
          ))}
        </group>
      </Layer>
      <Layer lift={1.3} position={[0.8, 0.08, 0]} label="Wi-Fi/BLE SoC (shielded)">
        <Shield w={1.6} d={1.6} h={0.26} />
      </Layer>
      <Layer lift={0.6} position={[0, 0, -1.15]} label="GPIO ×38">
        <Header cols={19} rows={1} />
      </Layer>
      <Layer lift={0.6} position={[0, 0, 1.15]}>
        <Header cols={19} rows={1} />
      </Layer>
      <Layer lift={0.4} position={[-2.35, 0, 0]} label="micro-USB">
        <SmallPort w={0.6} h={0.3} d={0.8} />
      </Layer>
      <Layer lift={0.8} position={[-1.2, 0, 0]} label="USB-UART">
        <Chip w={0.5} d={0.5} h={0.09} pins={5} />
      </Layer>
      <Layer lift={0.5} position={[-0.6, 0, 0.3]}>
        <Chip w={0.35} d={0.25} h={0.12} pins={2} pinSides={2} />
      </Layer>
      <group position={[-2.1, 0, -0.62]}><Button size={0.45} /></group>
      <group position={[-2.1, 0, 0.62]}><Button size={0.45} /></group>
      <group position={[-0.6, 0, -0.55]}><LED color="#ff4d4d" rate={0} /></group>
      <group position={[-0.3, 0, -0.55]}><LED color="#4da3ff" rate={2.2} /></group>
      <PassiveField x={-0.8} z={0.6} w={0.8} d={0.3} n={6} seed={5} />
    </group>
  )
}

/* ============ nRF5340 DK-style BLE dev board ============ */
// Layout follows the real DK (blue mask, Arduino headers, interface MCU on the left,
// radio + PCB antenna on the right) but stays unbranded. 1 unit ≈ 1.6 cm of the real board.
export function NRFBoard({ traces = true }: { traces?: boolean }) {
  const W = 8.4, D = 3.8
  const holes: [number, number][] = [[-3.3, -1.45], [1.25, -1.45], [-0.25, -0.55], [-0.25, 1.1], [-3.3, 1.2]]
  const silk = useSilkscreen(W, D, (ctx, s) => {
    silkText(ctx, 'nRF5340 DK', cx(3.0, W, s), cz(0.55, D, s), 17)
    silkText(ctx, 'BLE 5.3 · 2.4 GHz', cx(3.0, W, s), cz(0.8, D, s), 11)
    ;['1', '2', '3', '4'].forEach((t, i) => silkText(ctx, `Button ${t}`, cx(2.52 + (i % 2) * 0.62, W, s), cz(1.3 + Math.floor(i / 2) * 0.5, D, s) - 20, 10, 'center'))
    ;['1', '2', '3', '4'].forEach((t, i) => silkText(ctx, `LED${t}`, cx(3.12 + (i % 2) * 0.5, W, s) + 12, cz(-1.55 + Math.floor(i / 2) * 0.3, D, s) + 4, 9))
    silkText(ctx, 'nRF USB', cx(2.3, W, s), cz(-1.35, D, s), 10, 'center')
    silkText(ctx, 'RESET', cx(0.3, W, s), cz(1.3, D, s) - 4, 10, 'center')
    silkText(ctx, 'TRACE', cx(0.55, W, s), cz(-0.25, D, s), 10, 'center')
    silkText(ctx, 'nRF power source', cx(-2.85, W, s), cz(-0.15, D, s), 9, 'center')
    silkText(ctx, 'Power', cx(-3.9, W, s), cz(1.2, D, s), 10, 'center')
    silkText(ctx, 'Debug out', cx(-3.75, W, s), cz(-1.5, D, s), 9, 'center')
    silkText(ctx, 'External supply', cx(-3.55, W, s), cz(0.75, D, s), 9, 'center')
    ;['P0.12', 'P0.14', 'P0.16', 'P0.18', 'P0.20', 'P0.22', 'P0.24', 'P0.26', 'P0.28', 'P0.30'].forEach((t, i) =>
      silkText(ctx, t, cx(1.28, W, s), cz(-1.3 + i * 0.2, D, s) + 4, 8, 'right'))
    silkBox(ctx, 2.9, -0.25, 1.5, 1.45, W, D, s) // radio module outline
    silkBox(ctx, 0.55, 0.05, 0.75, 0.35, W, D, s) // trace pads
  })
  const paths: Path[] = [
    route([-1.2, 0.35], [2.45, -0.25]), // interface MCU → radio
    route([2.95, -0.25], [3.85, -0.25]), // radio → antenna
    route([-3.95, 0.0], [-2.05, 0.35]), // USB → interface MCU
    route([2.7, 0.0], [2.5, 0.55], false), // radio → QSPI flash
    route([2.9, -0.5], [3.3, -1.25], false), // radio → LEDs
    route([2.7, 0.0], [2.8, 1.1], false), // radio → buttons
    route([-1.6, -0.1], [-1.6, -0.85], false), // MCU → P1 header
  ]
  return (
    <group>
      <Substrate w={W} d={D} radius={0.18} mask="blue" holes={holes} silk={silk} />
      {traces && <Traces paths={paths} color="#9fd4ff" lineColor="#7fa6e6" speed={0.55} />}

      {/* radio: SoC + flash + PCB antenna */}
      <Layer lift={2.0} position={[2.7, 0, -0.25]} label="nRF5340 · dual Cortex-M33" labelSide="left">
        <Chip w={0.55} d={0.55} h={0.08} pins={8} />
      </Layer>
      <Layer lift={1.1} position={[2.5, 0, 0.55]}>
        <Chip w={0.4} d={0.3} h={0.08} pins={4} pinSides={2} />
      </Layer>
      <Layer lift={0.9} position={[3.85, 0, -0.25]} label="2.4 GHz PCB antenna">
        {Array.from({ length: 7 }).map((_, i) => (
          <mesh key={i} position={[(i - 3) * 0.07, 0.004, 0]} material={MAT.gold}>
            <boxGeometry args={[0.03, 0.006, 1.1]} />
          </mesh>
        ))}
        <group position={[0, 0.25, 0]}><RadioWaves /></group>
      </Layer>

      {/* interface MCU (on-board debugger) */}
      <Layer lift={1.3} position={[-1.6, 0, 0.35]} label="Interface MCU (debugger)">
        <Chip w={0.85} d={0.85} h={0.1} pins={14} />
      </Layer>

      {/* Arduino-style headers */}
      <Layer lift={0.55} position={[-2.35, 0, -1.72]} label="Arduino headers" labelSide="left">
        <Header cols={8} rows={1} pitch={0.2} female />
      </Layer>
      <Layer lift={0.55} position={[-0.85, 0, -1.72]}><Header cols={6} rows={1} pitch={0.2} female /></Layer>
      <Layer lift={0.55} position={[0.5, 0, -1.72]}><Header cols={6} rows={1} pitch={0.2} female /></Layer>
      <Layer lift={0.55} position={[-2.0, 0, 1.6]}><Header cols={6} rows={1} pitch={0.2} female /></Layer>
      <Layer lift={0.55} position={[-0.75, 0, 1.6]}><Header cols={5} rows={1} pitch={0.2} female /></Layer>
      <Layer lift={0.45} position={[-1.95, 0, -1.0]}>
        <Header cols={12} rows={2} pitch={0.2} pinH={0.4} />
      </Layer>
      <Layer lift={0.45} position={[1.55, 0, -0.4]}>
        <group rotation={[0, Math.PI / 2, 0]}><Header cols={10} rows={2} pitch={0.2} pinH={0.4} /></group>
      </Layer>
      {[-1.25, -0.95, -0.65].map((z) => (
        <group key={z} position={[-3.6, 0, z]}><Header cols={2} rows={1} pitch={0.2} pinH={0.35} /></group>
      ))}

      {/* USB, switches, buttons */}
      <Layer lift={0.7} position={[2.3, 0, -1.7]} label="nRF USB">
        <SmallPort w={0.55} h={0.22} d={0.45} />
      </Layer>
      <Layer lift={0.7} position={[-3.95, 0, 0]}>
        <SmallPort w={0.45} h={0.22} d={0.55} />
      </Layer>
      <group position={[-3.9, 0, 1.55]}><SlideSwitch /></group>
      <group position={[-2.85, 0, -0.45]}><SlideSwitch w={0.5} d={0.22} /></group>
      <group position={[0.3, 0, 1.55]}><Button size={0.4} /></group>
      <Layer lift={0.6} position={[2.8, 0, 1.35]} label="Buttons ×4">
        {[0, 1, 2, 3].map((i) => (
          <group key={i} position={[-0.3 + (i % 2) * 0.62, 0, -0.25 + Math.floor(i / 2) * 0.5]}><Button size={0.4} /></group>
        ))}
      </Layer>
      {/* LED1-4 chase in sequence, like the DK's blinky demo */}
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[3.12 + (i % 2) * 0.5, 0, -1.55 + Math.floor(i / 2) * 0.3]}>
          <LED color="#3ee08f" rate={0.6} phase={-i * (Math.PI / 2)} />
        </group>
      ))}
      <group position={[1.95, 0, 1.5]}><FPC w={0.45} /></group>

      <PassiveField x={2.9} z={-0.85} w={1.0} d={0.25} n={8} seed={17} />
      <PassiveField x={-1.6} z={1.05} w={1.4} d={0.35} n={10} seed={19} />
      <PassiveField x={-2.9} z={0.4} w={0.6} d={0.6} n={6} seed={31} />
      <PassiveField x={0.6} z={0.6} w={0.8} d={0.4} n={8} seed={37} />
    </group>
  )
}

/* ============ M.2 NPU accelerator module ============ */
export function NPUModule({ traces = true }: { traces?: boolean }) {
  const W = 4.2, D = 2.2
  const silk = useSilkscreen(W, D, (ctx, s) => {
    silkText(ctx, 'NPU · M.2 2242', cx(0.5, W, s), cz(0.85, D, s), 13)
  })
  const paths: Path[] = [
    route([-0.3, 0], [-1.7, 0]),
    route([-0.3, 0.4], [-1.7, 0.6]),
    route([-0.3, -0.4], [-1.7, -0.6]),
    route([0.9, 0.3], [1.4, 0.6], false),
  ]
  return (
    <group>
      <Substrate w={W} d={D} t={0.1} radius={0.08} holes={false} silk={silk} />
      {/* gold edge fingers */}
      {Array.from({ length: 22 }).map((_, i) => (
        <mesh key={i} position={[-W / 2 + 0.25, 0.003, -0.9 + i * 0.086]} rotation={[-Math.PI / 2, 0, 0]} material={MAT.gold}>
          <planeGeometry args={[0.4, 0.05]} />
        </mesh>
      ))}
      {traces && <Traces paths={paths} color="#f5b942" speed={0.9} />}
      <Layer lift={1.3} position={[0.3, 0, 0]} label="NPU die">
        <Chip w={1.25} d={1.25} h={0.12} heatspreader />
      </Layer>
      <Layer lift={0.7} position={[1.45, 0, -0.35]} label="PMIC" labelSide="left">
        <Chip w={0.45} d={0.45} h={0.08} pins={4} />
      </Layer>
      <PassiveField x={1.4} z={0.35} w={0.9} d={0.5} n={8} seed={23} />
      <PassiveField x={-1.0} z={0.75} w={1.2} d={0.3} n={6} seed={29} />
    </group>
  )
}

/** 3D component for each Hardware Lab entry (metadata lives in labBoards.ts). */
export const BOARD_COMPONENTS: Record<LabBoardId, (p: { traces?: boolean }) => JSX.Element> = {
  nrf: NRFBoard,
  sbc: SBCBoard,
  npu: NPUModule,
  esp32: ESP32Board,
}

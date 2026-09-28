/*
 * Hardware Lab metadata. Kept free of three.js imports so the page can read it
 * without pulling the 3D bundle into the initial load.
 */
export type LabBoardId = 'nrf' | 'sbc' | 'npu' | 'esp32'

export type LabBoard = {
  id: LabBoardId
  name: string
  kicker: string
  blurb: string
  specs: string[]
  usedIn: string[]
  accent: string
  scale: number
}

export const LAB_BOARDS: LabBoard[] = [
  {
    id: 'nrf',
    name: 'nRF5340 BLE Board',
    kicker: 'Wireless · Real-time',
    blurb: 'Dual-core BLE SoC behind my 1 kHz vibration monitor.',
    specs: ['1 kHz sampling', 'Custom BLE GATT service', 'Low-latency streaming firmware', 'Board bring-up & debug'],
    usedIn: ['Wireless Vibration Monitoring', 'IIT Tirupati internship'],
    accent: '#4da3ff',
    scale: 0.88,
  },
  {
    id: 'sbc',
    name: 'ARM64 Single-Board Computer',
    kicker: 'Linux · Edge compute',
    blurb: 'Runs the ISRO Random Position Machine controller.',
    specs: ['ARM64 Linux', 'PID motor control with encoder feedback', 'TCP/IP link to the embedded hardware', '40-pin GPIO'],
    usedIn: ['ISRO RPM Control System', 'IIT Tirupati internship'],
    accent: '#3ee08f',
    scale: 0.68,
  },
  {
    id: 'npu',
    name: 'M.2 NPU Accelerator',
    kicker: 'On-device AI',
    blurb: 'Where on-device models get deployed and benchmarked.',
    specs: ['PCIe Gen3 M.2', 'Quantized model deployment', 'Operator placement across devices'],
    usedIn: ['GlassData — on-device ML'],
    accent: '#f5b942',
    scale: 1.2,
  },
  {
    id: 'esp32',
    name: 'ESP32 DevKit',
    kicker: 'Wi-Fi · BLE · Prototyping',
    blurb: 'Prototyping MCU for wearables — ECG capture & anomaly detection.',
    specs: ['Dual-core Xtensa', 'Wi-Fi + BLE', 'ADC signal acquisition'],
    usedIn: ['LifeBand MAA', 'Obstacle-avoidance robot'],
    accent: '#ff7a59',
    scale: 1.1,
  },
]

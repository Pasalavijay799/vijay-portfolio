// Single source of truth for all portfolio content.
// Edit text here — components only render this data.
// Style: short, scannable points. One idea per line, lead with the result.

export const profile = {
  name: 'Vijay Kumar Pasala',
  shortName: 'Vijay',
  role: 'Embedded Systems & Robotics Engineer',
  rotatingRoles: [
    'Embedded Firmware',
    'Robotics & ROS2',
    'On-Device AI',
    'Real-Time Control',
  ],
  tagline: 'Firmware on the metal. Control loops that hold. AI that runs on the device.',
  location: 'Kadapa, Andhra Pradesh, India',
  email: 'pasalavijaykumar04@gmail.com',
  // Anything set here ships in the public JS bundle — leave empty to keep the number private.
  phone: '',
  photo: '/profile.jpg', // drop your photo at public/profile.jpg (square, >= 800px)
  resume: '/Vijay_Kumar_Pasala_Resume.pdf',
  socials: {
    github: 'https://github.com/Pasalavijay799',
    linkedin: 'https://www.linkedin.com/in/vijay-kumar-pasala-127904270/',
  },
  stats: [
    { value: '1 kHz', label: 'BLE IMU streaming on nRF5340' },
    { value: '6-DOF', label: 'Collaborative arm control' },
    { value: '<1 s', label: 'Vision safety-stop latency' },
    { value: '8.0', label: 'B.Tech CGPA, RGUKT RK Valley' },
  ],
}

export type FocusIcon = 'cpu' | 'bot' | 'brain' | 'globe'

export const about = {
  lead: 'ECE undergrad at RGUKT RK Valley, building where embedded hardware, robotics and AI meet.',
  now: 'Embedded Engineer @ GlassData · ex-Research Intern @ IIT Tirupati',
  focus: [
    { icon: 'cpu' as FocusIcon, title: 'Embedded firmware', detail: 'C · RTOS · BLE · UART' },
    { icon: 'bot' as FocusIcon, title: 'Robotics & control', detail: 'ROS2 · 6-DOF arms · PID' },
    { icon: 'brain' as FocusIcon, title: 'On-device AI', detail: 'Wake-word · Vision · Local LLMs' },
    { icon: 'globe' as FocusIcon, title: 'Full-stack', detail: 'Node · PostgreSQL · Flutter' },
  ],
}

export type Experience = {
  role: string
  org: string
  team: string
  period: string
  current?: boolean
  points: string[]
  tags: string[]
}

export const experience: Experience[] = [
  {
    role: 'Embedded Engineer',
    org: 'GlassData',
    team: 'Ambient sensing · On-device ML',
    period: '2026 — Present',
    current: true,
    points: [
      'Wake-word ML deployed on an ambient-sensing board',
      'DSP pre-processing + data-driven accuracy tuning',
      'Master–slave UART protocol to a companion MCU',
      'Vision pipeline as a second sensing modality',
    ],
    tags: ['Embedded C', 'On-Device ML', 'UART', 'DSP'],
  },
  {
    role: 'Research Intern',
    org: 'IIT Tirupati',
    team: 'Robotics & Embedded Systems Lab · IISER–ISRO',
    period: 'Jan 2026 — Jul 2026',
    points: [
      '1 kHz BLE IMU streaming on nRF5340 (custom GATT)',
      'nRF board bring-up & hardware/firmware debug',
      'JAKA Zu5 6-DOF arm — real-time control',
      'ISRO Random Position Machine over TCP/IP',
    ],
    tags: ['nRF5340', 'BLE/GATT', 'ROS2', 'JAKA SDK', 'TCP/IP'],
  },
]

export type Project = {
  title: string
  subtitle: string
  year: string
  /** One line — what it is. */
  summary: string
  /** 2–3 crisp outcomes. */
  highlights: string[]
  /** Headline number shown as a badge. */
  metric: { value: string; label: string }
  /** Block diagram: data flows left → right. */
  flow: string[]
  tags: string[]
  board: BoardKind // which icon / accent represents it
  featured?: boolean
  links?: { label: string; href: string }[]
  /** Screenshots shown in a browser frame (files in public/projects/). */
  gallery?: { src: string; label: string; url: string }[]
}

export type BoardKind = 'sbc' | 'mcu' | 'nrf' | 'arm' | 'web' | 'vision'

export const projects: Project[] = [
  {
    title: 'ECE Department Portal',
    subtitle: 'Full-stack · In production',
    year: '2025',
    summary: 'Official ECE portal at RGUKT RK Valley — used daily by HOD, faculty, students & alumni.',
    highlights: ['Live attendance tracking', 'Instant rescheduling + push alerts', 'Role-based access for 4 user types'],
    metric: { value: 'Live', label: 'in production' },
    flow: ['Browser', 'API', 'Postgres', 'Alerts'],
    tags: ['Node.js', 'Express.js', 'PostgreSQL'],
    board: 'web',
    featured: true,
    links: [{ label: 'Live site', href: 'https://ece.rguktrkv.ac.in' }],
    gallery: [
      { src: '/projects/ece-home-dark.jpg', label: 'Home · dark', url: 'https://ece.rguktrkv.ac.in' },
      { src: '/projects/ece-home.jpg', label: 'Home · light', url: 'https://ece.rguktrkv.ac.in' },
      { src: '/projects/ece-login.jpg', label: 'Sign in', url: 'https://ece.rguktrkv.ac.in/login' },
      { src: '/projects/ece-academic.jpg', label: 'Academic portal', url: 'https://ece.rguktrkv.ac.in/academic-portal' },
    ],
  },
  {
    title: 'Collaborative Robotic Arm',
    subtitle: 'Voice · Safety · Simulation',
    year: '2026',
    summary: 'Voice-controlled 6-DOF arm with a vision safety stop.',
    highlights: ['Speech → local LLM → motion commands', 'Person in zone → arm pauses', 'Same code: Gazebo sim ↔ real arm'],
    metric: { value: '<1 s', label: 'safety stop' },
    flow: ['Voice', 'LLM', 'ROS2', 'Arm'],
    tags: ['ROS2', 'C++', 'Python', 'OpenCV'],
    board: 'arm',
    featured: true,
  },
  {
    title: 'Wireless Vibration Monitor',
    subtitle: 'nRF5340 · BLE',
    year: '2026',
    summary: 'Real-time accelerometer streaming over BLE for vibration analysis.',
    highlights: ['Custom BLE GATT service', 'Low-latency streaming firmware'],
    metric: { value: '1 kHz', label: 'sampling' },
    flow: ['IMU', 'nRF5340', 'BLE GATT', 'Host'],
    tags: ['nRF5340', 'BLE', 'Embedded C'],
    board: 'nrf',
    featured: true,
  },
  {
    title: 'ISRO RPM Controller',
    subtitle: 'Microgravity research',
    year: '2026',
    summary: 'Closed-loop stepper control for a Random Position Machine.',
    highlights: ['Encoder feedback + tuned PID', 'Live UI for RPM & gains'],
    metric: { value: 'PID', label: 'closed loop' },
    flow: ['Pi UI', 'TCP/IP', 'Driver', 'Motor'],
    tags: ['Raspberry Pi', 'PID', 'Python'],
    board: 'sbc',
  },
  {
    title: 'ZED 2i Object Localization',
    subtitle: 'Depth vision',
    year: '2026',
    summary: 'Stereo depth → object XYZ in the robot base frame.',
    highlights: ['DINO object detection', 'Pixel ↔ depth matching'],
    metric: { value: 'XYZ', label: '3D position' },
    flow: ['ZED 2i', 'DINO', 'Depth', 'Robot'],
    tags: ['Python', 'ZED 2i', 'DINO'],
    board: 'vision',
  },
  {
    title: 'EyeNtra',
    subtitle: 'AI eye diagnostics',
    year: '2025',
    summary: 'Strabismus screening from corneal reflex & pupil tracking.',
    highlights: ['Sub-mm eye metrics via REST', 'Field-tested at Aravind Eye Hospital'],
    metric: { value: '<1 mm', label: 'precision' },
    flow: ['Camera', 'OpenCV', 'REST', 'App'],
    tags: ['OpenCV', 'Flutter', 'REST'],
    board: 'vision',
  },
  {
    title: 'LifeBand MAA',
    subtitle: 'Wearable health',
    year: '2025',
    summary: 'Wearable ECG monitor + local LLM that explains readings.',
    highlights: ['National winner — Hack the Flame', 'LoRA fine-tuned on-device model'],
    metric: { value: '#1', label: 'Hack the Flame' },
    flow: ['ECG', 'ESP32', 'Detect', 'LLM'],
    tags: ['ESP32', 'DSP', 'LoRA'],
    board: 'mcu',
  },
]

export type SkillIcon = 'code' | 'cpu' | 'radio' | 'bot' | 'wave' | 'eye' | 'wrench'

export const skills: { group: string; icon: SkillIcon; items: string[] }[] = [
  { group: 'Languages', icon: 'code', items: ['C', 'C++', 'Embedded C', 'Python', 'JavaScript'] },
  { group: 'Embedded', icon: 'cpu', items: ['nRF5340', 'ESP32', 'Raspberry Pi', 'ChibiOS/RT', 'DMA', 'Interrupts'] },
  { group: 'Protocols', icon: 'radio', items: ['BLE / GATT', 'UART', 'SPI', 'I²C', 'TCP/IP'] },
  { group: 'Robotics', icon: 'bot', items: ['ROS2', 'Gazebo', 'Isaac Sim', 'Kinematics', 'Motion planning'] },
  { group: 'Signals & Control', icon: 'wave', items: ['PID', 'Sensor fusion', 'Filtering', 'Anomaly detection'] },
  { group: 'Vision & AI', icon: 'eye', items: ['OpenCV', 'MediaPipe', 'Local LLMs', 'LoRA', 'Speech-to-text'] },
  { group: 'Web & Tools', icon: 'wrench', items: ['Node.js', 'PostgreSQL', 'Flutter', 'Linux', 'Git', 'Docker', 'KiCad'] },
]

export const achievements = [
  { title: 'Hack the Flame', badge: 'National Winner', detail: 'LifeBand MAA', year: '2026' },
  { title: 'Astronics 6.0', badge: 'College Winner', detail: 'Obstacle-avoidance robot', year: '' },
  { title: 'Peekuthon', badge: 'Shortlisted', detail: 'LifeBand MAA — top national entries', year: '' },
  { title: 'HackerRank', badge: 'Certified', detail: 'Problem Solving (Intermediate)', year: '2024' },
]

export const education = [
  { school: 'RGUKT RK Valley', degree: 'B.Tech · ECE', period: '2023 — 2027', score: 'CGPA 8.0' },
  { school: 'RGUKT RK Valley', degree: 'PUC', period: '2021 — 2023', score: 'CGPA 9.63' },
]

export const workshops = [
  {
    title: '5G Hands-on Workshop — IIT Tirupati',
    detail: 'Deployed a full 5G network (OpenAirInterface + Docker) — UE ↔ gNodeB, throughput analysis.',
  },
]

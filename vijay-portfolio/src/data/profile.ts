// Single source of truth for all portfolio content.
// Edit text here — components only render this data.

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
  tagline:
    'I build systems that work on real hardware — firmware on the metal, control loops that hold their setpoint, and AI that runs on the device.',
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

export const about = [
  'Electronics and Communication Engineering undergraduate at RGUKT RK Valley working where embedded hardware, robotics and AI meet.',
  'Currently an Embedded Engineer at GlassData, writing C firmware that runs wake-word models on an ambient-sensing board. Before that I was a Research Intern at IIT Tirupati’s Robotics & Embedded Systems Lab, working on a JAKA Zu5 collaborative arm, a 1 kHz BLE vibration-monitoring system and a microgravity Random Position Machine.',
  'I’m comfortable across the stack — from register-level firmware and PID tuning to Python/C++ tooling, ROS2, computer vision and deploying local models. I care about systems that work in the real world, not only in simulation.',
]

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
    team: 'Ambient Sensing / On-Device ML',
    period: '2026 — Present',
    current: true,
    points: [
      'Developing embedded C firmware to deploy wake-word detection models on an ambient-sensing board.',
      'Implementing signal-preprocessing stages and improving model accuracy through data-driven testing across many flashing cycles.',
      'Designed a master–slave UART protocol between the sensing board and a companion controller for synchronized data exchange.',
      'Prototyping a vision-based detection pipeline as a secondary sensing modality alongside the audio path.',
    ],
    tags: ['Embedded C', 'On-Device ML', 'UART', 'DSP'],
  },
  {
    role: 'Research Intern',
    org: 'IIT Tirupati',
    team: 'Robotics & Embedded Systems Lab · IISER–ISRO collaboration',
    period: 'Jan 2026 — Jul 2026',
    points: [
      'Brought up and debugged an nRF-based embedded board — hardware and firmware issues during integration.',
      'Real-time control and integration of a JAKA Zu5 6-DOF collaborative robotic arm for lab experiments.',
      'Built a Random Position Machine (RPM) — a microgravity simulation system linking embedded hardware and control software over TCP/IP.',
      'Implemented a 1 kHz data-acquisition system on the nRF5340 with a custom BLE GATT service for high-frequency IMU streaming.',
    ],
    tags: ['nRF5340', 'BLE/GATT', 'ROS2', 'JAKA SDK', 'TCP/IP'],
  },
]

export type Project = {
  title: string
  subtitle: string
  year: string
  description: string
  highlights: string[]
  tags: string[]
  board: BoardKind // which 3D board / icon represents it
  featured?: boolean
  links?: { label: string; href: string }[]
  /** Screenshots shown in a browser frame (files in public/projects/). */
  gallery?: { src: string; label: string; url: string }[]
}

export type BoardKind = 'sbc' | 'mcu' | 'nrf' | 'arm' | 'web' | 'vision'

export const projects: Project[] = [
  {
    title: 'ECE Branch Web Portal',
    subtitle: 'Full-stack · In production',
    year: '2025',
    description:
      'The official department portal for ECE at RGUKT RK Valley, with role-based access for HOD, faculty, students and alumni.',
    highlights: [
      'Live attendance monitoring for students',
      'On-the-fly class rescheduling for faculty',
      'Instant push notifications on every schedule change',
    ],
    tags: ['Node.js', 'Express.js', 'PostgreSQL', 'Full-Stack'],
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
    title: 'Collaborative Robotic Arm System',
    subtitle: 'Voice · Safety · Simulation',
    year: '2026',
    description:
      'One-click switch between a Gazebo-simulated ROS2 environment and a real 6-DOF arm over TCP/IP, sharing the same control logic.',
    highlights: [
      'Local voice-to-action pipeline: speech-to-text + LLM → structured motion commands',
      'OpenCV / pose-estimation safety zone pauses the arm when a person enters',
      'Sub-second stop latency, validated through repeated trials',
    ],
    tags: ['ROS2', 'C++', 'Python', 'Gazebo', 'OpenCV', 'JAKA SDK'],
    board: 'arm',
    featured: true,
  },
  {
    title: 'Wireless Vibration Monitoring',
    subtitle: 'nRF5340 · BLE',
    year: '2026',
    description:
      'A 1 kHz real-time acquisition system streaming accelerometer data wirelessly for vibration analysis.',
    highlights: [
      'Custom BLE GATT service for high-frequency streaming',
      'Firmware tuned for low latency under continuous sensor load',
    ],
    tags: ['nRF5340', 'BLE/GATT', 'Embedded C', 'IMU'],
    board: 'nrf',
    featured: true,
  },
  {
    title: 'ISRO RPM Control System',
    subtitle: 'Microgravity cell monitoring',
    year: '2026',
    description:
      'Closed-loop stepper-motor RPM control for microgravity research at IIT Tirupati, monitoring cell behaviour in rotating environments.',
    highlights: [
      'Encoder feedback with Ziegler–Nichols-tuned PID',
      'Live desktop UI for RPM, set-points and PID gains — no code changes needed',
    ],
    tags: ['Raspberry Pi', 'PID', 'Stepper Motors', 'Python', 'Real-Time'],
    board: 'sbc',
  },
  {
    title: 'Object Localization with ZED 2i',
    subtitle: 'Depth vision · Kinematics',
    year: '2026',
    description:
      'Computed X, Y, Z of objects from ZED 2i stereo depth and mapped them into the robot-base frame.',
    highlights: [
      'DINO models for object detection',
      'Pixel ↔ depth matching for exact base-to-object distance',
    ],
    tags: ['Python', 'ZED 2i', 'DINO', 'Kinematics'],
    board: 'vision',
  },
  {
    title: 'EyeNtra',
    subtitle: 'AI strabismus diagnostics',
    year: '2025',
    description:
      'OpenCV pipeline detecting eye misalignment from corneal reflex and pupil tracking, with a Flutter front-end for clinicians.',
    highlights: [
      'Sub-millimetre corneal-reflex and pupil metrics via REST API',
      'Field-tested at Aravind Eye Hospital — refinement ongoing',
    ],
    tags: ['OpenCV', 'Flutter', 'Deep Learning', 'REST'],
    board: 'vision',
  },
  {
    title: 'LifeBand MAA',
    subtitle: 'Wearable health + local LLM',
    year: '2025 — Present',
    description:
      'Wearable ECG and heart-rate monitor with real-time filtering and anomaly detection, plus a fine-tuned local model that explains readings in plain language.',
    highlights: [
      'National winner — Hack the Flame',
      'On-device inference pipeline, LoRA fine-tuned model',
    ],
    tags: ['Embedded C', 'Signal Processing', 'LoRA', 'ESP32'],
    board: 'mcu',
  },
]

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming', items: ['C', 'C++', 'Embedded C', 'Python', 'JavaScript'] },
  {
    group: 'Embedded & Real-Time',
    items: ['Firmware Deployment', 'GPIO / Interrupts', 'PWM / Timers', 'DMA', 'Multithreading', 'ChibiOS/RT'],
  },
  {
    group: 'Boards',
    items: ['nRF5340', 'ESP32', 'Raspberry Pi', 'Arduino', 'Teensy', 'Ambient-Sensing Boards'],
  },
  { group: 'Protocols', items: ['BLE / GATT', 'UART', 'SPI', 'I²C', 'TCP/IP', 'HTTP / REST'] },
  {
    group: 'Robotics',
    items: ['ROS2', '6-DOF Arm Control', 'Motion Planning', 'Kinematics', 'Gazebo', 'Isaac Sim'],
  },
  {
    group: 'Signals & Control',
    items: ['PID / Tracking Loops', 'Sensor Fusion', 'Filtering', 'Anomaly Detection', 'Encoder / IMU / ECG'],
  },
  {
    group: 'Vision & AI',
    items: ['OpenCV', 'MediaPipe', 'Object Detection', 'Local LLMs', 'LoRA Fine-Tuning', 'Speech-to-Text'],
  },
  {
    group: 'Web & Tools',
    items: ['Node.js', 'Express.js', 'PostgreSQL', 'Flutter', 'Linux', 'Git', 'Docker', 'KiCad'],
  },
]

export const achievements = [
  { title: 'Hack the Flame', badge: 'National Winner', detail: 'LifeBand MAA — AI-powered wearable health monitoring', year: '2026' },
  { title: 'Astronics 6.0', badge: 'College Winner', detail: 'Obstacle-avoidance robotics project', year: '' },
  { title: 'Peekuthon', badge: 'Shortlisted', detail: 'LifeBand MAA — among top national entries', year: '' },
  { title: 'HackerRank', badge: 'Certified', detail: 'Problem Solving (Intermediate)', year: '2024' },
]

export const education = [
  { school: 'RGUKT RK Valley', degree: 'B.Tech, Electronics & Communication Engineering', period: '2023 — 2027', score: 'CGPA 8.0' },
  { school: 'RGUKT RK Valley', degree: 'Pre-University Course (PUC)', period: '2021 — 2023', score: 'CGPA 9.63' },
]

export const workshops = [
  {
    title: '5G Hands-on Workshop — IIT Tirupati',
    detail:
      'Deployed a full 5G network from scratch with OpenAirInterface in Docker; integrated UE with gNodeB and analysed throughput and bandwidth allocation.',
  },
]

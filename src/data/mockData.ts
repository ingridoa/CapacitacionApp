import { UserProfile, Course, ModuleItem, ChatMessage, AreaDistribution } from '../types';

export const INGRID_USER: UserProfile = {
  id: 'user-ingrid',
  name: 'Ingrid Oyarzún',
  role: 'colaborador',
  roleTitle: 'Especialista Senior Legal & Compliance',
  department: 'Legal & Compliance Corporativo',
  company: 'Banco de Chile',
  email: 'ingrid.oa@gmail.com',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATGOlC7pL5379f_o1Sd6a93WSxqUfnZe0-eZlu5Jsk0DaLCe1nLSjxnQje5_VUDExgShdlxoCHkdFLD-AuXxr1gKohnbkLapi0mYpV2b7Snu9Glq03M_0cqvPiGNIFc6tLDFFcUFT3Wy_B5xPT4-6Cw0Mi1wXG-QZaNMFPMnXls7DT6SAaYg3uAfFICbhpUH28J1wK1UYzSKKCzvA27-IunSIOXXJ9wcu2vu94H92knoLq0wLCRPCI',
  annualProgress: 68,
  certifiedHours: 24,
  targetHours: 32,
  completedCourses: 3,
  inProgressCourses: 1,
};

export const EDUARDO_ADMIN: UserProfile = {
  id: 'admin-eduardo',
  name: 'Eduardo Peña',
  role: 'admin',
  roleTitle: 'Director de Capacitación & Desarrollo TI',
  department: 'Gerencia de Talento & Formación',
  company: 'Viatech Soluciones Educativas / Aprende Empresas',
  email: 'eduardo.pena@viatechcapacita.cl',
  avatarUrl: '',
  annualProgress: 100,
  certifiedHours: 64,
  targetHours: 60,
  completedCourses: 18,
  inProgressCourses: 2,
};

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-1',
    code: 'LPDP-2026-CL',
    title: 'Nueva Ley de Protección de Datos Personales N° 21.719 en Chile',
    category: 'Compliance & Legal',
    description: 'Marco legal sancionatorio, derechos ARCO ampliados y adecuación tecnológica obligatoria para empresas de servicios corporativos.',
    status: 'publicado',
    mandatory: true,
    mandatoryLabel: 'Obligatorio SENCE',
    progressPercent: 75,
    rating: 4.9,
    reviewCount: 310,
    durationHours: 16,
    durationLabel: '16 hrs cronológicas',
    modulesCount: 4,
    videosCount: 8,
    quizzesCount: 3,
    enrolledCount: 820,
    connectedUsers: 94,
    activeUsers24h: 612,
    senceCode: '#4892-CL',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByaxIrUar3Dl-UH4Wkbi_zB-d0NU0Ro42Kte0HuW4yXERZrE3fmNhWPrbBC2L_kgFW0BMYwAO0D_JDMs4xIxFii28fA4zMPzwdLB7JRT7UlrD4UNi0WYBNdRAFqNtPTioetBK1zwAVRpvGkuR4X1oVdNknMw3tcgD4F0a-kFWWpwPpXiK5p75Fyx37Id1hv1EjS9ngPnjcFKeEGj4M1s3cBVyFBXBNW1Cvu98cRlYPQr3f_A55DbYs',
    instructor: {
      name: 'Dr. Roberto Valenzuela',
      title: 'Especialista en Derecho Digital & RGPD',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAGAMdlLy9zkTqx99rCzOhafnjJByI_aXcwVsXWfbAdBHmI1Wg6omw38BFtVuKTeD2HmkPjKc43B56c5jiUGYYj3nGA2taV49qYRUjFwK0FIHw2xAJj4YH_e-Wi3HNcMhfFZgdq276JdNuE9RXnxiBj7s9GLU5z1pF2bz6VXxF47USzbhcP3snSuTMFOPpFgJUTuCdAPGuLZeR45ZTZ-UsHSq3IizfckoM_d92DhdmHK3jpHwpt64RU'
    },
    deadline: '31 de Marzo, 2025',
    completedCount: 820,
    totalTargetCount: 1240,
    affinityPercent: 99
  },
  {
    id: 'course-2',
    code: 'CS-2025-A',
    title: 'Ciberseguridad: Prevención de Phishing y Ransomware',
    category: 'Seguridad TI',
    description: 'Protocolos de ingeniería social, gestión de accesos corporativos y respuesta ágil ante incidentes de fuga de datos.',
    status: 'publicado',
    mandatory: true,
    mandatoryLabel: 'Seguridad TI',
    progressPercent: 0,
    rating: 4.8,
    reviewCount: 420,
    durationHours: 8,
    durationLabel: '8 hrs pedagógicas',
    modulesCount: 5,
    videosCount: 14,
    quizzesCount: 5,
    enrolledCount: 420,
    connectedUsers: 58,
    activeUsers24h: 340,
    senceCode: '#9821-CS',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9W82wCzDOHVLg57u6GqghkIL571Qt1lcAo8D-i5aRuy7UkA1eQD5gBGHYQ0sM9TS_ZLHbsaBS7rP9-zMqKp2ViiMpH0xdtnPkiP-ezUbGlU8FeMwEWWn_KvW8HWvd2mqVbEiQbyssSf2byWRSLNrx1zragS8lhfuxXbVRmkoaMwIDMnK-kGBk6AIxIIs0rVPN1Ew8A5FKxiuZo7QBW-vrL1KhD_8S_OaL8RXseyycZ98ALfSm4nEz',
    deadline: '12 días restantes',
    affinityPercent: 95
  },
  {
    id: 'course-3',
    code: 'TF-2026-CL',
    title: 'Gestión Tributaria y Reforma Fiscal 2026',
    category: 'Finanzas & Tributario',
    description: 'Análisis aplicado de auditorías fiscales, deducción corporativa y nuevos criterios del SII para empresas multinacionales.',
    status: 'publicado',
    mandatory: true,
    mandatoryLabel: 'Obligatorio SII',
    progressPercent: 65,
    rating: 4.9,
    reviewCount: 142,
    durationHours: 12,
    durationLabel: '12 hrs pedagógicas',
    modulesCount: 4,
    videosCount: 9,
    quizzesCount: 4,
    enrolledCount: 650,
    connectedUsers: 46,
    activeUsers24h: 480,
    senceCode: '#3144-TF',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDaAH1DOizGGKZ5l9eab_I89YaM2n3hSt5cTUn7GeDFy_J4mqQ8OcuhdUJX1fW523qw21bHk3_VbHJhhvXNcG_PxUNgyW4JfbSrXyeMYXuza_k8B5xkyuR_K1TFFwECmRZhb5HAGreyAlUmZfGE-cI2LlCpPJfGq5GpX_9E6tZNvItY0jVqVZaM-1pR0cmY1H4TX-_EQC4LD_CUyHG6faiEB0YtH0EirPlgB4jCQCSC0f5brvpIoW4m',
    affinityPercent: 98
  },
  {
    id: 'course-4',
    code: 'AG-2025-L',
    title: 'Liderazgo y Gestión de Equipos Ágiles',
    category: 'Metodologías Ágiles',
    description: '4 videos pendientes de validación técnica antes de publicación a nivel nacional. Marcos Scrum y Kanban para líderes de proyecto.',
    status: 'borrador',
    progressPercent: 80,
    rating: 4.7,
    reviewCount: 95,
    durationHours: 6,
    durationLabel: '6 hrs lectivas',
    modulesCount: 3,
    videosCount: 10,
    quizzesCount: 2,
    enrolledCount: 280,
    connectedUsers: 18,
    activeUsers24h: 195,
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvLV9StykDM035xLQHp_O20vNWThSzbnXDkooKurIRkvl72LLyG0S72BrzyI5TiUBZrDLArNBTDJnv3aLh6tBXXhSpDXAUG5erYnIwBj59M0P4g8RpH6URis3naf_bnkChSVaObhGS2ecc8jxUZMbCeh5iz4KiLOlTSNOi87XHbAF8yvrjNHhwyVamZGPfyJCDyYFPSVO6NzSuD_XS7eA4m1qOFryUlfxThVDpgHApNnDah69H5baY',
    affinityPercent: 88
  },
  {
    id: 'course-5',
    code: 'ISO-27001-R',
    title: 'Gobernanza Digital y Gestión de Riesgos Operacionales',
    category: 'Auditoría & Calidad',
    description: 'Estructuración de matrices de riesgos basadas en frameworks ISO 27001 y NIST para directorios y gerencias de control interno.',
    status: 'publicado',
    progressPercent: 100,
    rating: 4.9,
    reviewCount: 420,
    durationHours: 10,
    durationLabel: '10 hrs cátedra',
    modulesCount: 4,
    videosCount: 12,
    quizzesCount: 4,
    enrolledCount: 780,
    connectedUsers: 22,
    activeUsers24h: 213,
    senceCode: '#1099-ISO',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfIAmZdZnBwG1Ge9KocsLeTotZTvKl9iwiE0cVDCLF51SVnoXyXsD0QFxxDky_fG9RWeET_z4r9UKOmi70BHcjsDd258kbfep5A0x7XE0TYH2eoRYIfvGCV9h9iIi9IpyOeZqma_uPnv2v16unWJ5CLccjbd4Z6vwW44QXep9X1twBM2-sZMMU-rm8aJ6XcexZmipdSYFaykai3R3ImQD0yIx0bSVfTKYxpHYv3dLEzZdpCIOYc9dD',
    affinityPercent: 92
  }
];

export const INITIAL_MODULES: ModuleItem[] = [
  {
    id: 'mod-1',
    title: 'Fundamentos y Ámbito de Aplicación',
    status: 'completed',
    badge: 'Módulo 1 • Finalizado',
    lessons: [
      { id: 'l-1-1', number: '1.1', title: 'Introducción a la privacidad corporativa', duration: '18 min', status: 'completed' },
      { id: 'l-1-2', number: '1.2', title: 'Actores clave y normativas vigentes', duration: '25 min', status: 'completed' }
    ]
  },
  {
    id: 'mod-2',
    title: 'Principios Rectores y Derechos del Titular',
    status: 'completed',
    badge: 'Módulo 2 • Finalizado',
    lessons: [
      { id: 'l-2-1', number: '2.1', title: 'Consentimiento explícito e informado', duration: '30 min', status: 'completed' },
      { id: 'l-2-2', number: '2.2', title: 'Gestión de solicitudes ARCO', duration: '22 min', status: 'completed' }
    ]
  },
  {
    id: 'mod-3',
    title: 'Medidas de Seguridad y Notificación de Brechas',
    status: 'active',
    badge: 'Módulo 3 • En curso actual',
    lessons: [
      { id: 'l-3-1', number: '3.1', title: 'Evaluación de impacto en la protección (EIPD)', duration: '15 min', status: 'completed' },
      { id: 'l-3-2', number: '3.2', title: 'Transferencias Internacionales de Datos y Régimen Sancionatorio', duration: '22 min', status: 'active' },
      { id: 'l-3-3', number: '3.3', title: 'Protocolo ante fuga o brecha de seguridad', duration: '28 min', status: 'pending' }
    ]
  },
  {
    id: 'mod-4',
    title: 'Evaluación Final y Certificación Oficial',
    status: 'locked',
    badge: 'Módulo 4 • Bloqueado',
    lessons: [
      { id: 'l-4-1', number: '4.1', title: 'Examen de Certificación Normativa SENCE', duration: '45 min', status: 'pending' }
    ]
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    author: 'Carlos Mendoza',
    initials: 'CM',
    role: 'student',
    timestamp: 'Hace 15m',
    question: '¿Las transferencias intra-grupo hacia servidores en EE.UU. requieren siempre la cláusula contractual estándar (SCC) actualizada?',
    answer: {
      author: 'Dr. Roberto Valenzuela (Docente)',
      text: 'Correcto, tras la invalidación del Privacy Shield es imperativo acompañarlas con el test TIA (Transfer Impact Assessment).',
      verified: true
    }
  },
  {
    id: 'msg-2',
    author: 'Valeria Castro',
    initials: 'VC',
    role: 'student',
    timestamp: 'Hace 42m',
    question: '¿Cuál es el plazo perentorio para notificar a la Agencia de Protección de Datos en caso de incidente crítico?',
    answer: {
      author: 'Dr. Roberto Valenzuela (Docente)',
      text: 'El plazo máximo regulatorio es de 72 horas desde que se toma conocimiento fehaciente del incidente.',
      verified: true
    }
  }
];

export const INITIAL_AREAS: AreaDistribution[] = [
  {
    id: 'area-1',
    name: 'Área Comercial y Ventas',
    collaboratorsCount: 340,
    locationsCount: 8,
    activeRate: 92,
    checked: true,
    notes: '340 colaboradores asignados • 8 sedes'
  },
  {
    id: 'area-2',
    name: 'Tecnología e Infraestructura TI',
    collaboratorsCount: 180,
    criticality: 'Obligatoriedad Crítica',
    activeRate: 100,
    checked: true,
    notes: '180 colaboradores • Obligatoriedad Crítica'
  },
  {
    id: 'area-3',
    name: 'Operaciones & Logística',
    collaboratorsCount: 720,
    notes: '720 colaboradores • Turnos rotativos',
    activeRate: 64,
    checked: true
  }
];

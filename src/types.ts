export type AppView = 
  | 'login'
  | 'qr-sync'
  | 'dashboard'
  | 'catalogo'
  | 'leccion'
  | 'certificados'
  | 'admin'
  | 'perfil';

export type UserRole = 'colaborador' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  roleTitle: string;
  department: string;
  company: string;
  email: string;
  avatarUrl: string;
  annualProgress: number; // percentage, e.g. 68
  certifiedHours: number;
  targetHours: number;
  completedCourses: number;
  inProgressCourses: number;
}

export interface LessonItem {
  id: string;
  number: string;
  title: string;
  duration: string;
  status: 'completed' | 'active' | 'pending';
}

export interface ModuleItem {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'locked';
  badge: string;
  lessons: LessonItem[];
}

export interface ChatMessage {
  id: string;
  author: string;
  initials: string;
  role: 'student' | 'instructor';
  timestamp: string;
  question: string;
  answer?: {
    author: string;
    text: string;
    verified: boolean;
  };
}

export interface Course {
  id: string;
  code: string;
  title: string;
  category: string;
  description: string;
  status: 'publicado' | 'borrador' | 'en_revision';
  mandatory?: boolean;
  mandatoryLabel?: string;
  progressPercent: number;
  rating?: number;
  reviewCount?: number;
  durationHours: number;
  durationLabel: string;
  modulesCount: number;
  videosCount: number;
  quizzesCount?: number;
  enrolledCount: number;
  connectedUsers?: number;
  activeUsers24h?: number;
  senceCode?: string;
  coverImage: string;
  instructor?: {
    name: string;
    title: string;
    avatar: string;
  };
  deadline?: string;
  completedCount?: number;
  totalTargetCount?: number;
  affinityPercent?: number;
}

export interface AreaDistribution {
  id: string;
  name: string;
  collaboratorsCount: number;
  locationsCount?: number;
  criticality?: string;
  notes?: string;
  activeRate: number;
  checked: boolean;
}

export type UserRole = 'patient' | 'doctor' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  createdAt: string;
}

export interface Patient extends User {
  role: 'patient';
  dateOfBirth?: string;
  address?: string;
  medicalHistory?: string[];
}

export interface Doctor extends User {
  role: 'doctor';
  specialization: string;
  experience: number;
  qualification: string;
  hospital: string;
  location: string;
  fee: number;
  rating: number;
  reviewCount: number;
  bio: string;
  availability: DoctorAvailability[];
  isApproved: boolean;
}

export interface DoctorAvailability {
  day: string;
  slots: TimeSlot[];
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBooked: boolean;
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  status: AppointmentStatus;
  reason: string;
  notes?: string;
  prescription?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  pendingAppointments: number;
  todayAppointments: number;
  revenue: number;
}

import type { User, Doctor, Patient, Appointment, Review, Notification } from '@/types';
import initialData from '@/data/initial-data.json';

const STORAGE_KEYS = {
  USERS: 'medibook_users',
  CURRENT_USER: 'medibook_current_user',
  APPOINTMENTS: 'medibook_appointments',
  REVIEWS: 'medibook_reviews',
  NOTIFICATIONS: 'medibook_notifications',
  INITIALIZED: 'medibook_initialized',
} as const;

// Generic storage helpers
function getItem<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value));
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// User Management
export function getUsers(): User[] {
  return getItem<User[]>(STORAGE_KEYS.USERS, []);
}

export function getDoctors(): Doctor[] {
  return getUsers().filter((u): u is Doctor => u.role === 'doctor');
}

export function getApprovedDoctors(): Doctor[] {
  return getDoctors().filter(d => d.isApproved);
}

export function getPatients(): Patient[] {
  return getUsers().filter((u): u is Patient => u.role === 'patient');
}

export function getUserById(id: string): User | undefined {
  return getUsers().find(u => u.id === id);
}

export function getDoctorById(id: string): Doctor | undefined {
  return getDoctors().find(d => d.id === id);
}

export function addUser(user: User): void {
  const users = getUsers();
  users.push(user);
  setItem(STORAGE_KEYS.USERS, users);
}

export function updateUser(updatedUser: User): void {
  const users = getUsers();
  const index = users.findIndex(u => u.id === updatedUser.id);
  if (index !== -1) {
    users[index] = updatedUser;
    setItem(STORAGE_KEYS.USERS, users);
  }
}

export function deleteUser(id: string): void {
  const users = getUsers().filter(u => u.id !== id);
  setItem(STORAGE_KEYS.USERS, users);
}

// Auth Management
export function getCurrentUser(): User | null {
  return getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
}

export function setCurrentUser(user: User | null): void {
  setItem(STORAGE_KEYS.CURRENT_USER, user);
}

export function login(email: string, password: string): User | null {
  const users = getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    setCurrentUser(user);
    return user;
  }
  return null;
}

export function logout(): void {
  setCurrentUser(null);
}

export function register(userData: Omit<User, 'id' | 'createdAt'>): User {
  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  addUser(newUser);
  setCurrentUser(newUser);
  return newUser;
}

// Appointment Management
export function getAppointments(): Appointment[] {
  return getItem<Appointment[]>(STORAGE_KEYS.APPOINTMENTS, []);
}

export function getAppointmentsByPatient(patientId: string): Appointment[] {
  return getAppointments().filter(a => a.patientId === patientId);
}

export function getAppointmentsByDoctor(doctorId: string): Appointment[] {
  return getAppointments().filter(a => a.doctorId === doctorId);
}

export function getAppointmentById(id: string): Appointment | undefined {
  return getAppointments().find(a => a.id === id);
}

export function addAppointment(appointment: Omit<Appointment, 'id' | 'createdAt'>): Appointment {
  const appointments = getAppointments();
  const newAppointment: Appointment = {
    ...appointment,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  appointments.push(newAppointment);
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  return newAppointment;
}

export function updateAppointment(updatedAppointment: Appointment): void {
  const appointments = getAppointments();
  const index = appointments.findIndex(a => a.id === updatedAppointment.id);
  if (index !== -1) {
    appointments[index] = updatedAppointment;
    setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
  }
}

export function deleteAppointment(id: string): void {
  const appointments = getAppointments().filter(a => a.id !== id);
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);
}

// Review Management
export function getReviews(): Review[] {
  return getItem<Review[]>(STORAGE_KEYS.REVIEWS, []);
}

export function getReviewsByDoctor(doctorId: string): Review[] {
  return getReviews().filter(r => r.doctorId === doctorId);
}

export function addReview(review: Omit<Review, 'id' | 'createdAt'>): Review {
  const reviews = getReviews();
  const newReview: Review = {
    ...review,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  reviews.push(newReview);
  setItem(STORAGE_KEYS.REVIEWS, reviews);
  
  // Update doctor rating
  const doctorReviews = getReviewsByDoctor(review.doctorId);
  const avgRating = doctorReviews.reduce((sum, r) => sum + r.rating, 0) / doctorReviews.length;
  const doctor = getDoctorById(review.doctorId);
  if (doctor) {
    const updatedDoctor: Doctor = { ...doctor, rating: avgRating, reviewCount: doctorReviews.length };
    updateUser(updatedDoctor);
  }
  
  return newReview;
}

// Notification Management
export function getNotifications(userId: string): Notification[] {
  return getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, [])
    .filter(n => n.userId === userId);
}

export function addNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Notification {
  const notifications = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  const newNotification: Notification = {
    ...notification,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };
  notifications.push(newNotification);
  setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  return newNotification;
}

export function markNotificationRead(id: string): void {
  const notifications = getItem<Notification[]>(STORAGE_KEYS.NOTIFICATIONS, []);
  const index = notifications.findIndex(n => n.id === id);
  if (index !== -1) {
    notifications[index].isRead = true;
    setItem(STORAGE_KEYS.NOTIFICATIONS, notifications);
  }
}

// Initialize data from JSON file
export function initializeSampleData(): void {
  // Check if data already exists
  const users = getUsers();
  const hasData = users.length > 0;
  
  if (hasData) return;

  const now = new Date().toISOString();
  
  // Create doctors from JSON
  const doctors: Doctor[] = initialData.doctors.map(doc => ({
    ...doc,
    role: 'doctor' as const,
    createdAt: now,
  }));

  // Create patients from JSON
  const patients: Patient[] = initialData.patients.map(patient => ({
    ...patient,
    role: 'patient' as const,
    createdAt: now,
  }));

  // Create admin from JSON
  const admin: User = {
    ...initialData.admin,
    role: 'admin' as const,
    createdAt: now,
  };

  // Combine all users
  const allUsers: User[] = [...doctors, ...patients, admin];
  setItem(STORAGE_KEYS.USERS, allUsers);

  // Create appointments with proper dates (relative to current date)
  const today = new Date();
  const appointments: Appointment[] = initialData.appointments.map((apt, index) => {
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + index + 1); // Spread appointments over coming days
    
    return {
      ...apt,
      status: apt.status as Appointment['status'],
      date: appointmentDate.toISOString().split('T')[0],
      createdAt: now,
    };
  });
  setItem(STORAGE_KEYS.APPOINTMENTS, appointments);

  // Create reviews from JSON
  const reviews: Review[] = initialData.reviews.map(review => ({
    ...review,
    createdAt: now,
  }));
  setItem(STORAGE_KEYS.REVIEWS, reviews);
}

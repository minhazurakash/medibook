import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, User, FileText, Star, X, CheckCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByPatient, updateAppointment, getApprovedDoctors } from '@/lib/storage';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { toast } from 'sonner';
import type { Appointment } from '@/types';

export default function PatientDashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login?redirect=/dashboard');
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (user) {
      setAppointments(getAppointmentsByPatient(user.id));
    }
  }, [user]);

  const handleCancelAppointment = (id: string) => {
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      updateAppointment({ ...apt, status: 'cancelled' });
      setAppointments(getAppointmentsByPatient(user!.id));
      toast.success('Appointment cancelled');
    }
  };

  const upcomingAppointments = appointments.filter(a => a.status !== 'cancelled' && a.status !== 'completed');
  const pastAppointments = appointments.filter(a => a.status === 'completed' || a.status === 'cancelled');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground">Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container py-8">
          {/* Welcome */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground">Manage your appointments and health records</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                  <p className="text-sm text-muted-foreground">Upcoming</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{pastAppointments.filter(a => a.status === 'completed').length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingAppointments.filter(a => a.status === 'pending').length}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{appointments.length}</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList>
              <TabsTrigger value="appointments">My Appointments</TabsTrigger>
              <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              {/* Upcoming */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Upcoming Appointments</h2>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map((apt) => (
                      <Card key={apt.id}>
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                {apt.doctorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{apt.doctorName}</h3>
                                <p className="text-sm text-muted-foreground">{apt.reason}</p>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {new Date(apt.date).toLocaleDateString()}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {apt.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {getStatusBadge(apt.status)}
                              {apt.status !== 'cancelled' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleCancelAppointment(apt.id)}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardContent className="p-8 text-center">
                      <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-semibold mb-2">No upcoming appointments</h3>
                      <p className="text-muted-foreground mb-4">Book an appointment with a doctor</p>
                      <Button asChild>
                        <Link to="/doctors">Find Doctors</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Past */}
              {pastAppointments.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold mb-4">Past Appointments</h2>
                  <div className="space-y-4">
                    {pastAppointments.map((apt) => (
                      <Card key={apt.id} className="opacity-75">
                        <CardContent className="p-4">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                              <div className="h-14 w-14 rounded-xl bg-muted flex items-center justify-center text-muted-foreground font-bold">
                                {apt.doctorName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{apt.doctorName}</h3>
                                <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                  <span>{new Date(apt.date).toLocaleDateString()}</span>
                                  <span>{apt.time}</span>
                                </div>
                              </div>
                            </div>
                            {getStatusBadge(apt.status)}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="doctors">
              <div className="grid md:grid-cols-2 gap-6">
                {getApprovedDoctors().slice(0, 4).map((doctor) => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
              <div className="text-center mt-6">
                <Button asChild>
                  <Link to="/doctors">View All Doctors</Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}

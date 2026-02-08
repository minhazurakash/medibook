import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  Heart, Calendar, Clock, Users, DollarSign, Star, Settings, LogOut,
  CheckCircle, XCircle, AlertCircle, Menu, X
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getAppointmentsByDoctor, updateAppointment, updateUser, getCurrentUser } from '@/lib/storage';
import { toast } from 'sonner';
import type { Appointment, Doctor } from '@/types';
import { Link } from 'react-router-dom';

export default function DoctorPanel() {
  const { user, isAuthenticated, isLoading, logout, updateUserState } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Profile form state
  const [profile, setProfile] = useState({
    name: '',
    specialization: '',
    qualification: '',
    experience: 0,
    hospital: '',
    location: '',
    fee: 100,
    bio: '',
  });

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'doctor')) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  useEffect(() => {
    if (user && user.role === 'doctor') {
      const doctor = user as Doctor;
      setAppointments(getAppointmentsByDoctor(user.id));
      setProfile({
        name: doctor.name || '',
        specialization: doctor.specialization || '',
        qualification: doctor.qualification || '',
        experience: doctor.experience || 0,
        hospital: doctor.hospital || '',
        location: doctor.location || '',
        fee: doctor.fee || 100,
        bio: doctor.bio || '',
      });
    }
  }, [user]);

  const handleAppointmentAction = (id: string, status: 'confirmed' | 'cancelled' | 'completed') => {
    const apt = appointments.find(a => a.id === id);
    if (apt) {
      updateAppointment({ ...apt, status });
      setAppointments(getAppointmentsByDoctor(user!.id));
      toast.success(`Appointment ${status}`);
    }
  };

  const handleProfileSave = () => {
    if (user && user.role === 'doctor') {
      const updatedDoctor: Doctor = {
        ...(user as Doctor),
        ...profile,
      };
      updateUser(updatedDoctor);
      updateUserState(updatedDoctor);
      toast.success('Profile updated successfully');
    }
  };

  const doctor = user as Doctor;
  const todayAppointments = appointments.filter(
    a => a.date === new Date().toISOString().split('T')[0] && a.status !== 'cancelled'
  );
  const pendingAppointments = appointments.filter(a => a.status === 'pending');
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><AlertCircle className="h-3 w-3" />Pending</Badge>;
      case 'confirmed':
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle className="h-3 w-3" />Confirmed</Badge>;
      case 'completed':
        return <Badge variant="outline" className="gap-1"><CheckCircle className="h-3 w-3" />Completed</Badge>;
      case 'cancelled':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex bg-secondary/30">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r transform transition-transform duration-200 lg:relative lg:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Heart className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">Doctor Panel</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'dashboard', icon: Calendar, label: 'Dashboard' },
              { id: 'appointments', icon: Clock, label: 'Appointments' },
              { id: 'profile', icon: Settings, label: 'Profile' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {doctor?.name?.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{doctor?.name}</p>
                <p className="text-xs text-muted-foreground truncate">{doctor?.specialization}</p>
              </div>
            </div>
            {!doctor?.isApproved && (
              <Badge variant="secondary" className="w-full justify-center mb-2">Pending Approval</Badge>
            )}
            <Button variant="outline" size="sm" className="w-full gap-2" onClick={logout}>
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-card border-b px-4 py-3 flex items-center gap-4 lg:hidden">
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <span className="font-semibold">Doctor Panel</span>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Welcome, {doctor?.name?.split(' ')[0]}</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{todayAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Today</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <AlertCircle className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{pendingAppointments.length}</p>
                      <p className="text-sm text-muted-foreground">Pending</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{appointments.length}</p>
                      <p className="text-sm text-muted-foreground">Total</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <Star className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{doctor?.rating?.toFixed(1) || '0.0'}</p>
                      <p className="text-sm text-muted-foreground">Rating</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Today's Appointments */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  {todayAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {todayAppointments.map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {apt.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{apt.patientName}</h3>
                              <p className="text-sm text-muted-foreground">{apt.time} - {apt.reason}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {getStatusBadge(apt.status)}
                            {apt.status === 'pending' && (
                              <>
                                <Button size="sm" onClick={() => handleAppointmentAction(apt.id, 'confirmed')}>
                                  Confirm
                                </Button>
                                <Button size="sm" variant="outline" onClick={() => handleAppointmentAction(apt.id, 'cancelled')}>
                                  Decline
                                </Button>
                              </>
                            )}
                            {apt.status === 'confirmed' && (
                              <Button size="sm" variant="outline" onClick={() => handleAppointmentAction(apt.id, 'completed')}>
                                Complete
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No appointments today</p>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">All Appointments</h1>
              <Tabs defaultValue="pending">
                <TabsList>
                  <TabsTrigger value="pending">Pending ({pendingAppointments.length})</TabsTrigger>
                  <TabsTrigger value="confirmed">Confirmed ({confirmedAppointments.length})</TabsTrigger>
                  <TabsTrigger value="all">All ({appointments.length})</TabsTrigger>
                </TabsList>
                
                {['pending', 'confirmed', 'all'].map((tab) => (
                  <TabsContent key={tab} value={tab} className="space-y-4">
                    {appointments
                      .filter(a => tab === 'all' ? true : a.status === tab)
                      .map((apt) => (
                        <Card key={apt.id}>
                          <CardContent className="p-4">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                                  {apt.patientName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </div>
                                <div>
                                  <h3 className="font-semibold">{apt.patientName}</h3>
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
                                {apt.status === 'pending' && (
                                  <>
                                    <Button size="sm" onClick={() => handleAppointmentAction(apt.id, 'confirmed')}>
                                      Confirm
                                    </Button>
                                    <Button size="sm" variant="destructive" onClick={() => handleAppointmentAction(apt.id, 'cancelled')}>
                                      Decline
                                    </Button>
                                  </>
                                )}
                                {apt.status === 'confirmed' && (
                                  <Button size="sm" onClick={() => handleAppointmentAction(apt.id, 'completed')}>
                                    Complete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6 max-w-2xl">
              <h1 className="text-2xl font-bold">Profile Settings</h1>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Full Name</Label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Specialization</Label>
                      <Input
                        value={profile.specialization}
                        onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Qualification</Label>
                      <Input
                        value={profile.qualification}
                        onChange={(e) => setProfile({ ...profile, qualification: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Experience (years)</Label>
                      <Input
                        type="number"
                        value={profile.experience}
                        onChange={(e) => setProfile({ ...profile, experience: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Hospital/Clinic</Label>
                      <Input
                        value={profile.hospital}
                        onChange={(e) => setProfile({ ...profile, hospital: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Consultation Fee ($)</Label>
                    <Input
                      type="number"
                      value={profile.fee}
                      onChange={(e) => setProfile({ ...profile, fee: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Bio</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      rows={4}
                    />
                  </div>
                  <Button onClick={handleProfileSave}>Save Changes</Button>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
    </div>
  );
}

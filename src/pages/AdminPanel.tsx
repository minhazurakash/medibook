import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart, Users, UserCheck, Calendar, DollarSign, TrendingUp,
  CheckCircle, XCircle, Search, Menu, X, LogOut, Settings, LayoutDashboard
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getUsers, getDoctors, getPatients, getAppointments, updateUser, deleteUser } from '@/lib/storage';
import { toast } from 'sonner';
import type { Doctor, User, Appointment } from '@/types';

export default function AdminPanel() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [patients, setPatients] = useState<User[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/login');
    }
  }, [isLoading, isAuthenticated, user, navigate]);

  useEffect(() => {
    setDoctors(getDoctors());
    setPatients(getPatients());
    setAppointments(getAppointments());
  }, []);

  const handleApproveDoctor = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      const approvedDoctor: Doctor = { ...doctor, isApproved: true };
      updateUser(approvedDoctor);
      setDoctors(getDoctors());
      toast.success(`${doctor.name} has been approved`);
    }
  };

  const handleRejectDoctor = (doctorId: string) => {
    const doctor = doctors.find(d => d.id === doctorId);
    if (doctor) {
      deleteUser(doctorId);
      setDoctors(getDoctors());
      toast.success(`${doctor.name} has been removed`);
    }
  };

  const pendingDoctors = doctors.filter(d => !d.isApproved);
  const approvedDoctors = doctors.filter(d => d.isApproved);
  const totalRevenue = appointments.filter(a => a.status === 'completed').length * 150;
  const todayAppointments = appointments.filter(
    a => a.date === new Date().toISOString().split('T')[0]
  );

  const filteredDoctors = doctors.filter(d =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    d.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPatients = patients.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              <span className="font-bold">Admin Panel</span>
            </Link>
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setIsSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'doctors', icon: UserCheck, label: 'Doctors' },
              { id: 'patients', icon: Users, label: 'Patients' },
              { id: 'appointments', icon: Calendar, label: 'Appointments' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === item.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.id === 'doctors' && pendingDoctors.length > 0 && (
                  <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {pendingDoctors.length}
                  </Badge>
                )}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                AD
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user?.name}</p>
                <p className="text-xs text-muted-foreground">Administrator</p>
              </div>
            </div>
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
          <span className="font-semibold">Admin Panel</span>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Dashboard Overview</h1>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <UserCheck className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{approvedDoctors.length}</p>
                      <p className="text-sm text-muted-foreground">Doctors</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                      <Users className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{patients.length}</p>
                      <p className="text-sm text-muted-foreground">Patients</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{appointments.length}</p>
                      <p className="text-sm text-muted-foreground">Appointments</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">${totalRevenue}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Pending Approvals */}
              {pendingDoctors.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Badge variant="destructive">{pendingDoctors.length}</Badge>
                      Pending Doctor Approvals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {pendingDoctors.map((doctor) => (
                      <div key={doctor.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-muted-foreground">{doctor.specialization} • {doctor.email}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApproveDoctor(doctor.id)}>
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectDoctor(doctor.id)}>
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Today's Appointments ({todayAppointments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {todayAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {todayAppointments.slice(0, 5).map((apt) => (
                        <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{apt.patientName} → {apt.doctorName}</p>
                            <p className="text-sm text-muted-foreground">{apt.time} • {apt.reason}</p>
                          </div>
                          <Badge variant={apt.status === 'confirmed' ? 'default' : 'secondary'}>
                            {apt.status}
                          </Badge>
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

          {activeTab === 'doctors' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Manage Doctors</h1>
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search doctors..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="approved">
                <TabsList>
                  <TabsTrigger value="approved">Approved ({approvedDoctors.length})</TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending 
                    {pendingDoctors.length > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {pendingDoctors.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="approved" className="space-y-4">
                  {filteredDoctors.filter(d => d.isApproved).map((doctor) => (
                    <Card key={doctor.id}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div>
                              <h3 className="font-semibold">{doctor.name}</h3>
                              <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                              <p className="text-xs text-muted-foreground">{doctor.email} • ${doctor.fee}/visit</p>
                            </div>
                          </div>
                          <Badge className="bg-success text-success-foreground">Approved</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="pending" className="space-y-4">
                  {pendingDoctors.length > 0 ? (
                    pendingDoctors.map((doctor) => (
                      <Card key={doctor.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center text-warning font-bold">
                                {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{doctor.name}</h3>
                                <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                                <p className="text-xs text-muted-foreground">{doctor.email}</p>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" onClick={() => handleApproveDoctor(doctor.id)}>
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleRejectDoctor(doctor.id)}>
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center text-muted-foreground">
                        No pending approvals
                      </CardContent>
                    </Card>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeTab === 'patients' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">Manage Patients</h1>

              <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="space-y-4">
                {filteredPatients.map((patient) => (
                  <Card key={patient.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground font-bold">
                          {patient.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold">{patient.name}</h3>
                          <p className="text-sm text-muted-foreground">{patient.email}</p>
                          <p className="text-xs text-muted-foreground">Joined: {new Date(patient.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'appointments' && (
            <div className="space-y-6">
              <h1 className="text-2xl font-bold">All Appointments</h1>

              <div className="space-y-4">
                {appointments.map((apt) => (
                  <Card key={apt.id}>
                    <CardContent className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{apt.patientName}</span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-semibold">{apt.doctorName}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{apt.reason}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                            <span>{new Date(apt.date).toLocaleDateString()}</span>
                            <span>{apt.time}</span>
                          </div>
                        </div>
                        <Badge variant={
                          apt.status === 'confirmed' ? 'default' :
                          apt.status === 'completed' ? 'outline' :
                          apt.status === 'cancelled' ? 'destructive' : 'secondary'
                        }>
                          {apt.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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

import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Star, MapPin, Clock, GraduationCap, Building, ChevronLeft, CheckCircle } from 'lucide-react';
import { getDoctorById, getReviewsByDoctor, getCurrentUser, addAppointment, initializeSampleData } from '@/lib/storage';
import { toast } from 'sonner';
import type { Doctor, Review } from '@/types';

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
];

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [reason, setReason] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    initializeSampleData();
    if (id) {
      const doc = getDoctorById(id);
      if (doc) {
        setDoctor(doc);
        setReviews(getReviewsByDoctor(id));
      }
    }
  }, [id]);

  const handleBook = () => {
    const user = getCurrentUser();
    if (!user) {
      toast.error('Please login to book an appointment');
      navigate('/login?redirect=/doctors/' + id);
      return;
    }

    if (!selectedDate || !selectedTime) {
      toast.error('Please select date and time');
      return;
    }

    if (!doctor) return;

    addAppointment({
      patientId: user.id,
      patientName: user.name,
      doctorId: doctor.id,
      doctorName: doctor.name,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      status: 'pending',
      reason: reason || 'General consultation',
    });

    toast.success('Appointment booked successfully!');
    setIsBookingOpen(false);
    navigate('/dashboard');
  };

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Doctor not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        <div className="container py-8">
          <Button variant="ghost" className="gap-2 mb-6" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Doctor Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="glass-card p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary font-bold text-3xl shrink-0">
                    {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h1 className="text-2xl font-bold">{doctor.name}</h1>
                          {doctor.isApproved && (
                            <CheckCircle className="h-5 w-5 text-success" />
                          )}
                        </div>
                        <p className="text-primary font-medium">{doctor.specialization}</p>
                      </div>
                      <div className="flex items-center gap-1 bg-warning/10 px-3 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-warning text-warning" />
                        <span className="font-semibold">{doctor.rating.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground">({doctor.reviewCount})</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <GraduationCap className="h-4 w-4" />
                        {doctor.qualification}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {doctor.experience} years experience
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="h-4 w-4" />
                        {doctor.hospital}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {doctor.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">About</h3>
                  <p className="text-muted-foreground">{doctor.bio}</p>
                </div>
              </div>

              {/* Reviews */}
              <div className="glass-card p-6">
                <h3 className="font-semibold mb-4">Patient Reviews ({reviews.length})</h3>
                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-4 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{review.patientName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < review.rating ? 'fill-warning text-warning' : 'text-muted'}`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-8">No reviews yet</p>
                )}
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 sticky top-24">
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-primary">${doctor.fee}</div>
                  <p className="text-sm text-muted-foreground">per consultation</p>
                </div>

                <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full" size="lg">
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Book Appointment with {doctor.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Select Date</label>
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => date < new Date() || date.getDay() === 0}
                          className="rounded-md border"
                        />
                      </div>

                      {selectedDate && (
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Time</label>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.map((time) => (
                              <Button
                                key={time}
                                variant={selectedTime === time ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedTime(time)}
                              >
                                {time}
                              </Button>
                            ))}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="text-sm font-medium mb-2 block">Reason for visit</label>
                        <Textarea
                          placeholder="Briefly describe your symptoms or reason..."
                          value={reason}
                          onChange={(e) => setReason(e.target.value)}
                        />
                      </div>

                      <Button className="w-full" onClick={handleBook} disabled={!selectedDate || !selectedTime}>
                        Confirm Booking - ${doctor.fee}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Instant confirmation
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Free cancellation
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-success" />
                    Secure payment
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

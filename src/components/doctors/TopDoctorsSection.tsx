import { DoctorCard } from './DoctorCard';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getApprovedDoctors } from '@/lib/storage';

export function TopDoctorsSection() {
  const doctors = getApprovedDoctors().slice(0, 4);

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="container relative">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              Top Rated
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Top Rated <span className="text-primary">Doctors</span>
            </h2>
            <p className="text-muted-foreground">
              Consult with the best doctors from various specializations
            </p>
          </div>
          <Button variant="outline" className="hidden md:flex gap-2 group hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all" asChild>
            <Link to="/doctors">
              View All
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {doctors.map((doctor, index) => (
            <div 
              key={doctor.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

        {doctors.length === 0 && (
          <div className="text-center py-12 glass-card">
            <p className="text-muted-foreground mb-4">No doctors available yet.</p>
            <Button asChild>
              <Link to="/register">Join as a Doctor</Link>
            </Button>
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Button variant="outline" className="gap-2 group" asChild>
            <Link to="/doctors">
              View All Doctors
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

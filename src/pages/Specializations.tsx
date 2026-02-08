import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from 'react-router-dom';
import { 
  Heart, Brain, Eye, Bone, Baby, Stethoscope, Pill, Activity,
  Smile, Ear, Wind, Droplets, Scissors, Syringe, Microscope, HeartPulse
} from 'lucide-react';

const specializations = [
  { icon: Heart, name: 'Cardiology', description: 'Heart and cardiovascular system specialists', doctors: 45 },
  { icon: Brain, name: 'Neurology', description: 'Brain, spine, and nervous system experts', doctors: 32 },
  { icon: Eye, name: 'Ophthalmology', description: 'Eye care and vision specialists', doctors: 28 },
  { icon: Bone, name: 'Orthopedics', description: 'Bone, joint, and muscle specialists', doctors: 38 },
  { icon: Baby, name: 'Pediatrics', description: 'Children and adolescent healthcare', doctors: 52 },
  { icon: Stethoscope, name: 'General Medicine', description: 'Primary care and general health', doctors: 67 },
  { icon: Pill, name: 'Dermatology', description: 'Skin, hair, and nail specialists', doctors: 41 },
  { icon: Activity, name: 'Physiotherapy', description: 'Physical rehabilitation experts', doctors: 35 },
  { icon: Smile, name: 'Dentistry', description: 'Oral health and dental care', doctors: 48 },
  { icon: Ear, name: 'ENT', description: 'Ear, nose, and throat specialists', doctors: 29 },
  { icon: Wind, name: 'Pulmonology', description: 'Respiratory and lung specialists', doctors: 24 },
  { icon: Droplets, name: 'Nephrology', description: 'Kidney and urinary system experts', doctors: 22 },
  { icon: Scissors, name: 'Surgery', description: 'General and specialized surgeons', doctors: 56 },
  { icon: Syringe, name: 'Endocrinology', description: 'Hormone and metabolic specialists', doctors: 18 },
  { icon: Microscope, name: 'Pathology', description: 'Diagnostic lab specialists', doctors: 15 },
  { icon: HeartPulse, name: 'Emergency Medicine', description: '24/7 emergency care doctors', doctors: 42 },
];

const Specializations = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-10" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Medical <span className="text-primary">Specializations</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find the right specialist for your healthcare needs. Browse our comprehensive 
                list of medical specializations and connect with expert doctors.
              </p>
            </div>
          </div>
        </section>

        {/* Specializations Grid */}
        <section className="py-16">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {specializations.map((spec, index) => (
                <Link
                  key={spec.name}
                  to={`/doctors?specialization=${encodeURIComponent(spec.name)}`}
                  className="group glass-card p-6 hover:shadow-lg hover:-translate-y-2 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <spec.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {spec.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">{spec.description}</p>
                  <div className="text-xs font-medium text-primary">{spec.doctors} Doctors Available</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Help Section */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="glass-card p-12 text-center">
              <h2 className="text-2xl font-bold text-foreground mb-4">Not Sure Which Specialist You Need?</h2>
              <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                Start with a General Medicine consultation. Our doctors can help diagnose 
                your condition and refer you to the right specialist if needed.
              </p>
              <Link
                to="/doctors?specialization=General Medicine"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Book General Consultation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Specializations;

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Search, Calendar, UserCheck, Video, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Search for Doctors',
    description: 'Browse our extensive network of verified doctors by specialty, location, or name. Read patient reviews and check doctor profiles.',
    features: ['Filter by specialization', 'View ratings & reviews', 'Check availability'],
  },
  {
    number: '02',
    icon: Calendar,
    title: 'Book Appointment',
    description: 'Select your preferred date and time slot. Choose between in-person visits or online consultations.',
    features: ['Real-time availability', 'Flexible scheduling', 'Instant confirmation'],
  },
  {
    number: '03',
    icon: UserCheck,
    title: 'Get Confirmation',
    description: 'Receive instant confirmation via email and SMS. Get reminders before your appointment.',
    features: ['Email confirmation', 'SMS reminders', 'Calendar sync'],
  },
  {
    number: '04',
    icon: Video,
    title: 'Meet Your Doctor',
    description: 'Visit the clinic or connect online for your consultation. Access your medical records anytime.',
    features: ['In-person or video', 'Digital prescriptions', 'Follow-up support'],
  },
];

const HowItWorks = () => {
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
                How <span className="text-primary">MediBook</span> Works
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Booking a doctor's appointment has never been easier. Follow these 
                simple steps to get started with your healthcare journey.
              </p>
              <Button size="lg" className="gap-2" asChild>
                <Link to="/doctors">
                  Find a Doctor Now
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="py-16">
          <div className="container">
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className={`grid md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  <div className={`space-y-6 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="inline-flex items-center gap-3">
                      <span className="text-5xl font-bold text-primary/20">{step.number}</span>
                      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                        <step.icon className="h-7 w-7 text-primary" />
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{step.title}</h2>
                    <p className="text-muted-foreground">{step.description}</p>
                    <ul className="space-y-2">
                      {step.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-success" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="glass-card p-8 aspect-square flex items-center justify-center">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
                        <step.icon className="h-32 w-32 text-primary relative z-10" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="glass-card p-12 text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of patients who trust MediBook for their healthcare needs. 
                Book your first appointment in under 2 minutes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="gap-2" asChild>
                  <Link to="/register">
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/doctors">Browse Doctors</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;

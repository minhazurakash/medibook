import { Calendar, Shield, Clock, CreditCard, MessageCircle, Star, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: Calendar,
    title: 'Easy Scheduling',
    description: 'Book appointments with just a few clicks. Choose your preferred date and time.',
    color: 'from-primary/20 to-primary/5',
  },
  {
    icon: Shield,
    title: 'Verified Doctors',
    description: 'All our doctors are thoroughly verified with valid certifications and experience.',
    color: 'from-success/20 to-success/5',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Access healthcare services anytime. Our platform is available round the clock.',
    color: 'from-info/20 to-info/5',
  },
  {
    icon: CreditCard,
    title: 'Secure Payments',
    description: 'Multiple payment options with bank-grade security for your transactions.',
    color: 'from-warning/20 to-warning/5',
  },
  {
    icon: MessageCircle,
    title: 'Online Consultation',
    description: 'Connect with doctors through video calls from the comfort of your home.',
    color: 'from-accent/20 to-accent/5',
  },
  {
    icon: Star,
    title: 'Patient Reviews',
    description: 'Read genuine reviews from patients to choose the best doctor for you.',
    color: 'from-primary/20 to-primary/5',
  },
];

export function FeaturesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-secondary/30 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Why Choose Us
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose <span className="text-primary">MediBook?</span>
          </h2>
          <p className="text-muted-foreground">
            We provide a comprehensive healthcare platform that makes booking appointments 
            simple, secure, and convenient.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative glass-card p-6 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Gradient on Hover */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              
              <div className="relative z-10">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  {feature.title}
                  <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-primary" />
                </h3>
                
                <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-150" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

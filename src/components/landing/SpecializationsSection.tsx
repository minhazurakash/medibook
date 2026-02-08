import { Heart, Brain, Eye, Bone, Baby, Stethoscope, Pill, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const specializations = [
  { icon: Heart, name: 'Cardiology', doctors: 45, color: 'from-red-500/20 to-red-500/5', iconColor: 'text-red-500' },
  { icon: Brain, name: 'Neurology', doctors: 32, color: 'from-purple-500/20 to-purple-500/5', iconColor: 'text-purple-500' },
  { icon: Eye, name: 'Ophthalmology', doctors: 28, color: 'from-blue-500/20 to-blue-500/5', iconColor: 'text-blue-500' },
  { icon: Bone, name: 'Orthopedics', doctors: 38, color: 'from-orange-500/20 to-orange-500/5', iconColor: 'text-orange-500' },
  { icon: Baby, name: 'Pediatrics', doctors: 52, color: 'from-pink-500/20 to-pink-500/5', iconColor: 'text-pink-500' },
  { icon: Stethoscope, name: 'General Medicine', doctors: 67, color: 'from-primary/20 to-primary/5', iconColor: 'text-primary' },
  { icon: Pill, name: 'Dermatology', doctors: 41, color: 'from-green-500/20 to-green-500/5', iconColor: 'text-green-500' },
  { icon: Activity, name: 'Physiotherapy', doctors: 35, color: 'from-cyan-500/20 to-cyan-500/5', iconColor: 'text-cyan-500' },
];

export function SpecializationsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full text-primary text-sm font-medium mb-4">
            Specializations
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Browse by <span className="text-primary">Specialization</span>
          </h2>
          <p className="text-muted-foreground">
            Find the right specialist for your needs from our wide range of medical expertise.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {specializations.map((spec, index) => (
            <Link
              key={spec.name}
              to={`/doctors?specialization=${spec.name}`}
              className="group relative p-6 rounded-2xl border bg-card overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 hover:border-primary/50"
              style={{ animationDelay: `${index * 0.05}s` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Gradient */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${spec.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />

              <div className="relative z-10 text-center">
                <div className={`h-16 w-16 rounded-2xl bg-gradient-to-br ${spec.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <spec.icon className={`h-8 w-8 ${spec.iconColor}`} />
                </div>
                
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors duration-300">
                  {spec.name}
                </h3>
                
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-primary">{spec.doctors}</span> Doctors
                </p>
              </div>

              {/* Shine Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/specializations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary/10 text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
          >
            View All Specializations
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

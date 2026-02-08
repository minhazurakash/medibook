import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Shield, Users, Award, Target, Eye } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: 'Patient-Centered Care',
    description: 'We put patients at the center of everything we do, ensuring accessible and personalized healthcare.',
  },
  {
    icon: Shield,
    title: 'Trust & Security',
    description: 'Your health data is protected with bank-grade security and strict privacy protocols.',
  },
  {
    icon: Users,
    title: 'Expert Network',
    description: 'We partner only with verified, board-certified healthcare professionals.',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Continuous monitoring ensures the highest standards of medical care.',
  },
];

const team = [
  { name: 'Dr. Robert Anderson', role: 'Founder & CEO', image: 'RA' },
  { name: 'Sarah Mitchell', role: 'Chief Medical Officer', image: 'SM' },
  { name: 'David Kim', role: 'CTO', image: 'DK' },
  { name: 'Jennifer Lee', role: 'Head of Operations', image: 'JL' },
];

const About = () => {
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
                About <span className="text-primary">MediBook</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                We're on a mission to make quality healthcare accessible to everyone. 
                Founded in 2020, MediBook has grown to become one of the most trusted 
                healthcare booking platforms, connecting millions of patients with 
                top-rated doctors.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-8 group hover:shadow-lg transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Target className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  To democratize healthcare by providing a seamless platform that connects 
                  patients with qualified doctors, making appointment booking effortless, 
                  transparent, and accessible to all.
                </p>
              </div>
              <div className="glass-card p-8 group hover:shadow-lg transition-all duration-300">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Eye className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground">
                  To become the world's most trusted healthcare platform, where every person 
                  can find the right doctor, book appointments instantly, and receive 
                  exceptional medical care.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: '500+', label: 'Verified Doctors' },
                { value: '50K+', label: 'Happy Patients' },
                { value: '100K+', label: 'Appointments' },
                { value: '98%', label: 'Satisfaction Rate' },
              ].map((stat, index) => (
                <div 
                  key={stat.label} 
                  className="text-center p-6 rounded-2xl bg-card border hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Our Core Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div
                  key={value.title}
                  className="glass-card p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="h-7 w-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl font-bold text-foreground text-center mb-4">Leadership Team</h2>
            <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Meet the passionate individuals driving MediBook's mission to transform healthcare.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={member.name}
                  className="glass-card p-6 text-center group hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center mx-auto mb-4 text-primary font-bold text-xl group-hover:scale-110 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;

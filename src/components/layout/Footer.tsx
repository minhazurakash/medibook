import { Link } from 'react-router-dom';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">MediBook</span>
            </Link>
            <p className="text-sm opacity-80 max-w-xs">
              Your trusted partner in healthcare. Book appointments with verified doctors easily and efficiently.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, index) => (
                <a 
                  key={index}
                  href="#" 
                  className="h-10 w-10 rounded-full bg-background/10 flex items-center justify-center opacity-60 hover:opacity-100 hover:bg-primary hover:scale-110 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/doctors', label: 'Find Doctors' },
                { to: '/specializations', label: 'Specializations' },
                { to: '/how-it-works', label: 'How It Works' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.to}>
                  <Link 
                    to={link.to} 
                    className="opacity-60 hover:opacity-100 hover:text-primary inline-flex items-center gap-1 group transition-all duration-200"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* For Patients & Doctors */}
          <div>
            <h4 className="font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/register', label: 'Register as Patient' },
                { to: '/register', label: 'Join as Doctor' },
                { to: '/faq', label: 'FAQ' },
                { to: '/privacy', label: 'Privacy Policy' },
                { to: '/terms', label: 'Terms & Conditions' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to} 
                    className="opacity-60 hover:opacity-100 hover:text-primary inline-flex items-center gap-1 group transition-all duration-200"
                  >
                    {link.label}
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm opacity-80">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                <span>123 Healthcare Ave, Medical City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 shrink-0" />
                <span>support@medibook.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm opacity-60">
          <p>© {currentYear} MediBook. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:opacity-100 hover:text-primary transition-all">Privacy Policy</Link>
            <Link to="/terms" className="hover:opacity-100 hover:text-primary transition-all">Terms of Service</Link>
            <Link to="/faq" className="hover:opacity-100 hover:text-primary transition-all">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

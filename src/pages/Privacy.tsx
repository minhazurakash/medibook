import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Shield } from 'lucide-react';

const Privacy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 gradient-hero opacity-10" />
          <div className="container relative">
            <div className="max-w-3xl mx-auto text-center animate-slide-up">
              <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Privacy <span className="text-primary">Policy</span>
              </h1>
              <p className="text-muted-foreground">Last updated: February 2026</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="container max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Personal identification information (name, email, phone number)</li>
                  <li>Health-related information for appointment booking</li>
                  <li>Payment information for transactions</li>
                  <li>Communications between you and healthcare providers</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. How We Use Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Facilitate appointment booking and healthcare services</li>
                  <li>Send appointment reminders and health-related notifications</li>
                  <li>Process payments and prevent fraud</li>
                  <li>Improve our services and user experience</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>With healthcare providers you choose to book appointments with</li>
                  <li>With service providers who assist in our operations</li>
                  <li>When required by law or to protect our rights</li>
                  <li>With your explicit consent</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement industry-standard security measures to protect your personal 
                  information. This includes encryption, secure servers, and regular security 
                  audits. However, no method of transmission over the Internet is 100% secure, 
                  and we cannot guarantee absolute security.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Your Rights</h2>
                <p className="text-muted-foreground mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Access your personal information</li>
                  <li>Correct inaccurate information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Cookies and Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience, analyze 
                  usage, and assist in our marketing efforts. You can control cookie preferences 
                  through your browser settings.
                </p>
              </div>

              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Us</h2>
                <p className="text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="text-primary mt-2">privacy@medibook.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

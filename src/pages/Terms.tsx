import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FileText } from 'lucide-react';

const Terms = () => {
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
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Terms & <span className="text-primary">Conditions</span>
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
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing or using MediBook, you agree to be bound by these Terms and Conditions. 
                  If you do not agree to all the terms and conditions, you must not use our services.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground">
                  MediBook is an online platform that connects patients with healthcare providers. 
                  We facilitate appointment booking but do not provide medical services directly. 
                  All medical services are provided by independent healthcare professionals.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts</h2>
                <p className="text-muted-foreground mb-4">
                  When you create an account with us, you must:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the security of your password</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Booking and Cancellation</h2>
                <p className="text-muted-foreground mb-4">
                  When booking appointments:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>You agree to provide accurate health information</li>
                  <li>Cancellations should be made at least 24 hours in advance</li>
                  <li>Repeated no-shows may result in account restrictions</li>
                  <li>Refunds are subject to individual doctor policies</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Healthcare Disclaimer</h2>
                <p className="text-muted-foreground">
                  MediBook does not provide medical advice, diagnosis, or treatment. All content 
                  is for informational purposes only. Always seek the advice of qualified healthcare 
                  providers with any questions regarding medical conditions. Never disregard 
                  professional medical advice because of something you read on MediBook.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">6. User Conduct</h2>
                <p className="text-muted-foreground mb-4">
                  You agree not to:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2">
                  <li>Use the service for any unlawful purpose</li>
                  <li>Impersonate any person or entity</li>
                  <li>Submit false or misleading information</li>
                  <li>Interfere with the proper functioning of the service</li>
                  <li>Attempt to access unauthorized areas of the platform</li>
                </ul>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Intellectual Property</h2>
                <p className="text-muted-foreground">
                  All content on MediBook, including text, graphics, logos, and software, is the 
                  property of MediBook or its licensors and is protected by intellectual property 
                  laws. You may not reproduce, distribute, or create derivative works without 
                  explicit permission.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  MediBook shall not be liable for any indirect, incidental, special, consequential, 
                  or punitive damages resulting from your use of the service. Our liability is 
                  limited to the amount paid for the services in question.
                </p>
              </div>

              <div className="glass-card p-8 mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">9. Modifications</h2>
                <p className="text-muted-foreground">
                  We reserve the right to modify these Terms at any time. Changes will be effective 
                  immediately upon posting. Your continued use of the service after changes 
                  constitutes acceptance of the modified Terms.
                </p>
              </div>

              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
                <p className="text-muted-foreground">
                  For any questions regarding these Terms and Conditions, please contact us at:
                </p>
                <p className="text-primary mt-2">legal@medibook.com</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HelpCircle, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    category: 'Getting Started',
    questions: [
      {
        question: 'How do I create an account on MediBook?',
        answer: 'Creating an account is simple! Click on "Get Started" or "Sign Up" button, fill in your basic details like name, email, and phone number, and you\'re ready to book appointments.',
      },
      {
        question: 'Is MediBook free to use for patients?',
        answer: 'Yes! Creating an account and browsing doctors is completely free. You only pay the consultation fee directly to the doctor when you book an appointment.',
      },
      {
        question: 'How do I find the right doctor for my needs?',
        answer: 'Use our search and filter options to find doctors by specialization, location, ratings, and availability. You can also read patient reviews to make an informed decision.',
      },
    ],
  },
  {
    category: 'Booking Appointments',
    questions: [
      {
        question: 'How do I book an appointment?',
        answer: 'Simply search for a doctor, select your preferred date and time slot from their availability, confirm your booking, and you\'ll receive an instant confirmation.',
      },
      {
        question: 'Can I reschedule or cancel my appointment?',
        answer: 'Yes, you can reschedule or cancel appointments from your dashboard. Please note that some doctors may have cancellation policies, so check the details before canceling.',
      },
      {
        question: 'Will I get a reminder before my appointment?',
        answer: 'Yes, we send email and SMS reminders 24 hours and 1 hour before your scheduled appointment to ensure you don\'t miss it.',
      },
    ],
  },
  {
    category: 'Payments & Fees',
    questions: [
      {
        question: 'How do I pay for my consultation?',
        answer: 'Payment is typically made at the time of consultation. Some doctors may require advance payment which you can make through our secure payment gateway.',
      },
      {
        question: 'What payment methods are accepted?',
        answer: 'We accept all major credit/debit cards, UPI, net banking, and digital wallets. All transactions are secured with bank-grade encryption.',
      },
      {
        question: 'Can I get a refund if I cancel my appointment?',
        answer: 'Refund policies vary by doctor. Generally, cancellations made 24 hours before the appointment are eligible for a full refund. Check the specific doctor\'s policy for details.',
      },
    ],
  },
  {
    category: 'For Doctors',
    questions: [
      {
        question: 'How can I join MediBook as a doctor?',
        answer: 'Click on "Join as Doctor" and fill out the registration form with your credentials, qualifications, and documents. Our team will verify your information and activate your profile.',
      },
      {
        question: 'How long does the verification process take?',
        answer: 'Typically, the verification process takes 2-3 business days. We verify your medical license, qualifications, and credentials to ensure patient safety.',
      },
      {
        question: 'How do I manage my availability and appointments?',
        answer: 'Once verified, you can access your Doctor Panel to set your availability, manage appointments, view patient history, and update your profile.',
      },
    ],
  },
];

const FAQ = () => {
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
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Find answers to common questions about MediBook. Can't find what you're 
                looking for? Contact our support team.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Sections */}
        <section className="py-16">
          <div className="container max-w-4xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.category} className="mb-12">
                <h2 className="text-2xl font-bold text-foreground mb-6">{category.category}</h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, index) => (
                    <AccordionItem 
                      key={index} 
                      value={`${categoryIndex}-${index}`}
                      className="glass-card px-6 border-none"
                    >
                      <AccordionTrigger className="text-left font-medium hover:text-primary hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 bg-secondary/30">
          <div className="container">
            <div className="glass-card p-12 text-center max-w-2xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">Still Have Questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help. Reach out to us and we'll get back to you 
                as soon as possible.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link to="/contact">Contact Support</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:support@medibook.com">Email Us</a>
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

export default FAQ;

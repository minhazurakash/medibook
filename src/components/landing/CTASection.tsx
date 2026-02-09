import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const benefits = [
  "Instant appointment booking",
  "Verified & certified doctors",
  "24/7 customer support",
  "Secure online payments",
];

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />

          {/* Floating shapes */}
          {/* <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/20 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 right-20 w-12 h-12 border-2 border-white/20 rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }} /> */}

          <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-white/90 text-sm font-medium backdrop-blur">
                <Sparkles className="h-4 w-4" />
                Join 50,000+ Happy Patients
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Ready to Take Control of Your Health?
              </h2>

              <p className="text-lg text-white/80">
                Join thousands of patients who trust MediBook for their
                healthcare needs. Book your first appointment today.
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <CheckCircle className="h-5 w-5 text-white" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-end space-y-4">
              <div className="glass-card p-8 bg-white/10 backdrop-blur-md border-white/20 w-full max-w-sm">
                <h3 className="text-xl font-semibold text-white mb-4 text-center">
                  Get Started Now
                </h3>
                <div className="space-y-3">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full gap-2 group"
                    asChild
                  >
                    <Link to="/register">
                      Create Free Account
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-transparent border-white/30 text-white hover:bg-white/10 hover:text-white"
                    asChild
                  >
                    <Link to="/doctors">Browse Doctors</Link>
                  </Button>
                </div>
                <p className="text-center text-white/60 text-sm mt-4">
                  No credit card required
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

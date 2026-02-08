import {
  Search,
  Calendar,
  CheckCircle,
  ArrowRight,
  Play,
  Users,
  Award,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero opacity-5" />
      <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[80px] animate-pulse-slow" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

      <div className="container relative py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-fade-in border border-primary/20">
              <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
              Trusted by 50,000+ patients
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight animate-slide-up">
              Your Health,{" "}
              <span className="text-transparent bg-clip-text gradient-primary">
                Our Priority
              </span>
            </h1>

            <p
              className="text-lg text-muted-foreground max-w-lg animate-slide-up"
              style={{ animationDelay: "0.1s" }}
            >
              Book appointments with verified doctors instantly. Access quality
              healthcare from the comfort of your home with our seamless booking
              platform.
            </p>

            {/* Search Box */}
            <div
              className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl shadow-lg border hover:shadow-xl transition-shadow duration-300 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search doctors, specializations..."
                  className="pl-10 border-0 bg-transparent focus-visible:ring-0 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button
                size="lg"
                className="gap-2 shadow-glow hover:shadow-none transition-all"
                asChild
              >
                <Link
                  to={`/doctors${searchQuery ? `?search=${searchQuery}` : ""}`}
                >
                  Find Doctors
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Quick Actions */}
            <div
              className="flex flex-wrap gap-3 animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary/5 hover:border-primary transition-all"
                asChild
              >
                <Link to="/how-it-works">
                  <Play className="h-4 w-4" />
                  How It Works
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 hover:bg-primary/5 hover:border-primary transition-all"
                asChild
              >
                <Link to="/specializations">View All Specializations</Link>
              </Button>
            </div>

            {/* Stats */}
            <div
              className="grid grid-cols-3 gap-4 pt-6 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              {[
                { value: "500+", label: "Expert Doctors", icon: Users },
                { value: "50K+", label: "Happy Patients", icon: Award },
                { value: "24/7", label: "Support", icon: Shield },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="group p-4 rounded-xl bg-card/50 border hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 cursor-default"
                >
                  <stat.icon className="h-5 w-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            <div className="relative z-10 animate-fade-in">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=700&fit=crop"
                alt="Doctor consultation"
                className="rounded-3xl shadow-2xl object-cover aspect-[4/5] hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Floating Cards */}
            <div className="absolute z-50 -left-8 top-20 glass-card p-4 animate-float shadow-xl">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-success/20 flex items-center justify-center">
                  <Calendar className="h-6 w-6 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Easy Booking</div>
                  <div className="text-xs text-muted-foreground">
                    Book in 2 minutes
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute z-50 -right-4 bottom-32 glass-card p-4 animate-float shadow-xl"
              style={{ animationDelay: "1s" }}
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Verified Doctors</div>
                  <div className="text-xs text-muted-foreground">
                    100% Certified
                  </div>
                </div>
              </div>
            </div>

            <div
              className="absolute right-20 top-8 glass-card p-3 animate-float shadow-lg"
              style={{ animationDelay: "2s" }}
            >
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {["bg-primary", "bg-accent", "bg-success"].map((bg, i) => (
                    <div
                      key={i}
                      className={`h-8 w-8 rounded-full ${bg} border-2 border-background flex items-center justify-center text-xs text-white font-medium`}
                    >
                      {["JD", "SM", "RK"][i]}
                    </div>
                  ))}
                </div>
                <div className="text-xs">
                  <div className="font-semibold">500+ Reviews</div>
                  <div className="text-muted-foreground">This month</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce hidden lg:block">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
}

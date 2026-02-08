import { Star, MapPin, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import type { Doctor } from '@/types';

interface DoctorCardProps {
  doctor: Doctor;
  compact?: boolean;
}

export function DoctorCard({ doctor, compact = false }: DoctorCardProps) {
  return (
    <div className="group glass-card overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
      <div className={`p-${compact ? '4' : '6'}`}>
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative">
            <div className={`${compact ? 'h-16 w-16' : 'h-20 w-20'} rounded-2xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center text-primary font-bold text-xl group-hover:scale-105 transition-transform duration-300`}>
              {doctor.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
            {doctor.isApproved && (
              <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-success rounded-full flex items-center justify-center ring-2 ring-background">
                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors duration-300">
              {doctor.name}
            </h3>
            <p className="text-sm text-primary font-medium">{doctor.specialization}</p>
            <p className="text-xs text-muted-foreground">{doctor.qualification}</p>
            
            {!compact && (
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
                  <Clock className="h-3 w-3" />
                  {doctor.experience} years
                </span>
                <span className="flex items-center gap-1 bg-secondary/50 px-2 py-1 rounded-full">
                  <MapPin className="h-3 w-3" />
                  {doctor.location}
                </span>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="text-right">
            <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-full">
              <Star className="h-4 w-4 fill-warning text-warning" />
              <span className="font-semibold text-sm">{doctor.rating.toFixed(1)}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{doctor.reviewCount} reviews</p>
          </div>
        </div>

        {!compact && (
          <>
            <p className="text-sm text-muted-foreground mt-4 line-clamp-2">{doctor.bio}</p>

            <div className="flex items-center justify-between mt-4 pt-4 border-t">
              <div>
                <span className="text-2xl font-bold text-primary">${doctor.fee}</span>
                <span className="text-sm text-muted-foreground"> / consultation</span>
              </div>
              <Button asChild className="gap-2 group/btn shadow-glow hover:shadow-none transition-all">
                <Link to={`/doctors/${doctor.id}`}>
                  Book Now
                  <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </>
        )}

        {compact && (
          <div className="flex items-center justify-between mt-4">
            <Badge variant="secondary" className="text-primary font-semibold">${doctor.fee}</Badge>
            <Button size="sm" variant="outline" asChild className="gap-1 group/btn hover:bg-primary hover:text-primary-foreground transition-all">
              <Link to={`/doctors/${doctor.id}`}>
                View
                <ArrowRight className="h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

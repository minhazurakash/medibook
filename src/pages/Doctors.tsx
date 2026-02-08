import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DoctorCard } from '@/components/doctors/DoctorCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { getApprovedDoctors } from '@/lib/storage';
import type { Doctor } from '@/types';

const specializations = [
  'All Specializations',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Neurologist',
  'General Medicine',
];

export default function Doctors() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [specialization, setSpecialization] = useState(searchParams.get('specialization') || '');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setDoctors(getApprovedDoctors());
  }, []);

  useEffect(() => {
    let filtered = doctors;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (d) =>
          d.name.toLowerCase().includes(query) ||
          d.specialization.toLowerCase().includes(query) ||
          d.location.toLowerCase().includes(query)
      );
    }

    if (specialization && specialization !== 'All Specializations') {
      filtered = filtered.filter((d) => d.specialization === specialization);
    }

    setFilteredDoctors(filtered);
  }, [doctors, searchQuery, specialization]);

  const clearFilters = () => {
    setSearchQuery('');
    setSpecialization('');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-secondary/30">
        {/* Search Header */}
        <div className="bg-background border-b">
          <div className="container py-8">
            <h1 className="text-3xl font-bold mb-2">Find Doctors</h1>
            <p className="text-muted-foreground mb-6">
              Search and book appointments with verified healthcare professionals
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search by name, specialization, or location..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={specialization} onValueChange={setSpecialization}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="All Specializations" />
                </SelectTrigger>
                <SelectContent>
                  {specializations.map((spec) => (
                    <SelectItem key={spec} value={spec}>
                      {spec}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                className="gap-2 md:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </div>

            {(searchQuery || specialization) && (
              <div className="flex items-center gap-2 mt-4">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {searchQuery && (
                  <Button variant="secondary" size="sm" className="gap-1 h-7" onClick={() => setSearchQuery('')}>
                    Search: {searchQuery}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                {specialization && specialization !== 'All Specializations' && (
                  <Button variant="secondary" size="sm" className="gap-1 h-7" onClick={() => setSpecialization('')}>
                    {specialization}
                    <X className="h-3 w-3" />
                  </Button>
                )}
                <Button variant="ghost" size="sm" className="h-7" onClick={clearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="container py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 && 's'} found
            </p>
          </div>

          {filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No doctors found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

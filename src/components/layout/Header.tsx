import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, LogOut, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();

  const getDashboardLink = () => {
    if (!user) return '/login';
    switch (user.role) {
      case 'doctor': return '/doctor-panel';
      case 'admin': return '/admin-panel';
      default: return '/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg gradient-primary group-hover:shadow-glow transition-all duration-300">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">MediBook</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <Link to="/" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200">
            Home
          </Link>
          
          {/* Explore Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200">
              Explore
              <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              <DropdownMenuItem asChild>
                <Link to="/doctors" className="w-full cursor-pointer">Find Doctors</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/specializations" className="w-full cursor-pointer">Specializations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/how-it-works" className="w-full cursor-pointer">How It Works</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link to="/about" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200">
            About
          </Link>
          <Link to="/contact" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-lg transition-all duration-200">
            Contact
          </Link>
        </nav>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button variant="ghost" size="sm" asChild className="gap-2 hover:bg-primary/5">
                <Link to={getDashboardLink()}>
                  <User className="h-4 w-4" />
                  {user?.name}
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={logout} className="gap-2 hover:border-destructive hover:text-destructive">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hover:bg-primary/5">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className="shadow-glow hover:shadow-none transition-shadow">
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background animate-slide-down">
          <nav className="container flex flex-col gap-1 py-4">
            <Link to="/" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/doctors" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>Find Doctors</Link>
            <Link to="/specializations" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>Specializations</Link>
            <Link to="/how-it-works" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
            <Link to="/about" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/contact" className="px-4 py-3 text-sm font-medium rounded-lg hover:bg-primary/5" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            <div className="flex gap-2 pt-4 mt-2 border-t">
              {isAuthenticated ? (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  </Button>
                  <Button className="flex-1" onClick={() => { logout(); setIsMenuOpen(false); }}>Logout</Button>
                </>
              ) : (
                <>
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button className="flex-1" asChild>
                    <Link to="/register" onClick={() => setIsMenuOpen(false)}>Get Started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

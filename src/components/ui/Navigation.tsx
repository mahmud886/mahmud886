'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled
          ? 'bg-surface/80 backdrop-blur-md border-b border-surface-hover shadow-lg py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-primary z-50">
          <span className="text-secondary">I</span>M.
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-secondary',
                pathname === item.path ? 'text-secondary' : 'text-text-main'
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/contact"
            className="px-5 py-2 text-sm font-medium bg-primary hover:bg-primary-dark text-white rounded-full transition-colors"
          >
            Let's Talk
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          className="md:hidden z-50 text-text-main hover:text-secondary transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            'fixed inset-0 bg-surface flex flex-col justify-center items-center space-y-8 transition-transform duration-300 ease-in-out md:hidden z-40',
            isOpen ? 'translate-x-0' : 'translate-x-full'
          )}
        >
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                'text-2xl font-bold transition-colors',
                pathname === item.path ? 'text-secondary' : 'text-text-main'
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

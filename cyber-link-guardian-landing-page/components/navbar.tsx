'use client';

import React from "react"

import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleNavClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary rounded-lg px-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">CG</span>
            </div>
            <span className="font-bold text-foreground hidden sm:inline">
              CyberLink Guardian
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#about" 
              className="text-foreground hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              tabIndex={0}
            >
              About us
            </a>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Desktop CTA */}
            <a
              href="#scanner"
              className="hidden md:inline-block px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
            >
              Start Investigation
            </a>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-muted transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div
            id="mobile-nav"
            className="md:hidden pb-4 space-y-3 border-t border-border pt-4"
            onKeyDown={handleNavClick}
            role="navigation"
          >
            <a
              href="#about"
              className="block text-foreground hover:text-primary transition-colors py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsOpen(false)}
              tabIndex={0}
            >
              About us
            </a>
            <a
              href="#scanner"
              className="block w-full px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors text-center focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => setIsOpen(false)}
            >
              Start Investigation
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

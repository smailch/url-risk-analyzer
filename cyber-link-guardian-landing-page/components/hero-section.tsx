'use client';

import React from "react"

import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, Loader } from 'lucide-react';

interface HeroSectionProps {
  onAnalysisComplete?: (result: AnalysisResult) => void;
}

interface AnalysisResult {
  url: string;
  error?: string;
  [key: string]: unknown;
}

export function HeroSection({ onAnalysisComplete }: HeroSectionProps) {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string>('');

  const announceMessage = (message: string) => {
    setAnnouncement(message);
    setTimeout(() => setAnnouncement(''), 3000);
  };

  const handleScan = async () => {
    if (!url.trim()) {
      const errorMsg = 'Please enter a valid URL to analyze.';
      setError(errorMsg);
      announceMessage(errorMsg);
      return;
    }

    setIsLoading(true);
    setError(null);
    announceMessage('Starting URL analysis...');

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: url.trim() }),
      });

      if (!response.ok) {
        throw new Error(`Analysis failed: ${response.statusText}`);
      }

      const data = await response.json();
      announceMessage('URL analysis complete. Results are displayed below.');
      
      if (onAnalysisComplete) {
        onAnalysisComplete({ url: url.trim(), ...data });
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to analyze URL. Please try again.';
      setError(errorMsg);
      announceMessage(`Error: ${errorMsg}`);
      console.error('[v0] Analysis error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading) {
      handleScan();
    }
  };

  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden" id="scanner" aria-label="URL Analysis Scanner">
      {/* Live region for screen reader announcements */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-50"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Main headline */}
        <div className="text-center space-y-6 mb-12">
          <h1 className="font-pixel text-2xl sm:text-3xl text-foreground leading-tight text-balance mb-8">
            Suspicious link?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent block mt-4">
              Hold our coffee, we'll inspect it.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            The AI-powered URL Security Checker. Detect malicious, phishing, and cloaked links instantly using
            <span className="text-accent font-semibold"> cross-verified intelligence.</span>
          </p>
        </div>

        {/* URL Input Section */}
        <div className="space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="space-y-3"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <label htmlFor="url-input" className="sr-only">
                  Enter URL to analyze
                </label>
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" aria-hidden="true">
                  <Search size={20} />
                </div>
                <input
                  id="url-input"
                  type="url"
                  placeholder="Paste any URL... https://example.com"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  aria-label="URL to analyze"
                  aria-describedby="url-hint"
                  className="w-full pl-12 pr-4 py-3 sm:py-4 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all font-mono text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 sm:py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-primary flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader size={20} className="animate-spin" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  'Start Investigation'
                )}
              </button>
            </div>

            {/* Error message */}
            {error && (
              <div
                className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive rounded-lg"
                role="alert"
              >
                <AlertCircle size={20} className="text-destructive flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-destructive">Analysis Error</p>
                  <p className="text-sm text-destructive/80 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Helper text */}
            <p id="url-hint" className="text-xs sm:text-sm text-muted-foreground text-center">
              Press <kbd className="px-2 py-1 rounded border border-border bg-card mx-1">Enter</kbd> to scan or click the button
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { StatusIndicator } from '@/components/status-indicator';
import { HeroSection } from '@/components/hero-section';
import { SecurityResults } from '@/components/security-results';
import { DetailedAnalysis } from '@/components/detailed-analysis';

interface AnalysisData {
  url: string;
  error?: string;
  [key: string]: unknown;
}

export default function Home() {
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);

  const handleAnalysisComplete = (result: AnalysisData) => {
    setAnalysisData(result);
    setIsScanning(false);
    // Scroll to results
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      resultsSection?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleScan = (url: string) => {
    setScannedUrl(url);
    setIsScanning(true);
    // Simulate scan logic here
    setTimeout(() => {
      handleAnalysisComplete({ url });
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <StatusIndicator />
      
      {/* Hero Section */}
      <HeroSection onAnalysisComplete={handleAnalysisComplete} />

      {/* Security Results and Analysis - Only show after scan */}
      {analysisData && (
        <section id="results-section" role="region" aria-label="Analysis Results">
          <SecurityResults isLoading={isScanning} data={analysisData} />
          <DetailedAnalysis isLoading={isScanning} data={analysisData} />
        </section>
      )}

      {/* About Section */}
      {!analysisData && (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30" id="about">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row items-center gap-12">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img
                  src="/smail-profile.jpg"
                  alt="Smail Chemlali - Full-Stack Developer"
                  className="w-64 h-64 rounded-xl object-cover border-2 border-primary/30 shadow-lg hover:border-primary/60 transition-colors"
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
                    Smail Chemlali
                  </h2>
                  <p className="text-xl sm:text-2xl text-primary font-semibold mb-4">
                    Full-Stack Developer & Software Engineer Student
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    I'm a passionate software engineering student at ESPRIT, specializing in full-stack web development. I love building creative, efficient, and scalable solutions that make a real impact.
                  </p>
                </div>

                {/* Skills/Tech */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground">Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'Node.js', 'TypeScript', 'Web Security', 'Full-Stack', 'API Design'].map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/30 hover:border-primary/60 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Links */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <a
                    href="#"
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="#"
                    className="px-6 py-2 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    Email
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Stay Safe Online
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Protect yourself from malicious links and phishing attacks with CyberLink Guardian's advanced threat intelligence.
          </p>
          <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors">
            Start Your Free Scan Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Follow</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">LinkedIn</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-muted-foreground">© 2024 CyberLink Guardian. All rights reserved.</p>
            <p className="text-muted-foreground mt-4 sm:mt-0">Protecting the internet, one link at a time.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

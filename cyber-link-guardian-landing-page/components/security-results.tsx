'use client';

import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';

export interface SecuritySource {
  id: string;
  name: string;
  icon: string;
  status: 'clean' | 'suspicious' | 'malicious' | 'error';
  details: string;
}

const MOCK_SOURCES: SecuritySource[] = [
  {
    id: 'virustotal',
    name: 'VirusTotal',
    icon: 'VT',
    status: 'clean',
    details: 'Malicious: 0, Suspicious: 0, Undetected: 87',
  },
  {
    id: 'google-safe',
    name: 'Google Safe Browsing',
    icon: 'GSB',
    status: 'clean',
    details: 'No threats detected',
  },
  {
    id: 'alienvault',
    name: 'AlienVault OTX',
    icon: 'OTX',
    status: 'suspicious',
    details: 'Suspicious: 1, Recent activity detected',
  },
];

function getStatusIcon(status: string) {
  switch (status) {
    case 'clean':
      return <CheckCircle2 className="w-5 h-5 text-green-500" />;
    case 'suspicious':
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    case 'malicious':
      return <XCircle className="w-5 h-5 text-red-500" />;
    case 'error':
      return <AlertCircle className="w-5 h-5 text-gray-500" />;
    default:
      return null;
  }
}

function getStatusBadgeColor(status: string) {
  switch (status) {
    case 'clean':
      return 'bg-green-500/10 text-green-400';
    case 'suspicious':
      return 'bg-yellow-500/10 text-yellow-400';
    case 'malicious':
      return 'bg-red-500/10 text-red-400';
    case 'error':
      return 'bg-gray-500/10 text-gray-400';
    default:
      return '';
  }
}

function getStatusLabel(status: string) {
  switch (status) {
    case 'clean':
      return 'Clean';
    case 'suspicious':
      return 'Suspicious';
    case 'malicious':
      return 'Malicious';
    case 'error':
      return 'Error';
    default:
      return '';
  }
}

interface SecurityResultsProps {
  sources?: SecuritySource[];
  isLoading?: boolean;
  data?: Record<string, unknown>;
}

export function SecurityResults({ sources = MOCK_SOURCES, isLoading = false, data }: SecurityResultsProps) {
  // Only show supported sources from backend response if available
  let filteredSources = sources;
  if (data && Array.isArray(data.sources)) {
    filteredSources = data.sources.filter((source: any) =>
      ['virustotal', 'google-safe', 'alienvault'].includes(source.id)
    );
  }
  // Remove/hide unsupported sources from UI: Only these three are shown, rest are ignored.

  // Determine global decision and color
  let decisionLevel = data?.final_decision?.level || null;
  let decisionLabel = '';
  let decisionColor = '';
  switch (decisionLevel) {
    case 'safe':
      decisionLabel = 'Safe';
      decisionColor = 'bg-green-500/10 text-green-600 border-green-500';
      break;
    case 'suspect':
      decisionLabel = 'Suspect';
      decisionColor = 'bg-yellow-400/10 text-yellow-700 border-yellow-400';
      break;
    case 'malicious':
      decisionLabel = 'Malicious';
      decisionColor = 'bg-red-500/10 text-red-600 border-red-500';
      break;
    default:
      decisionLabel = '';
      decisionColor = '';
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card/50" aria-label="Security source results">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Security Source Results
          </h2>
          <p className="text-muted-foreground">
            Threat intelligence verified across multiple databases and providers.
          </p>
          {decisionLabel && (
            <div className={`mt-4 mb-2 flex items-center justify-start gap-3`}>
              <span className={`px-5 py-2 rounded-lg border text-lg font-bold shadow-sm ${decisionColor}`}
                role="status" aria-label={`Global decision: ${decisionLabel}`}>
                {decisionLabel}
              </span>
            </div>
          )}
          {data?.url && (
            <p className="text-sm text-muted-foreground mt-3" role="status">
              Analyzed URL: <code className="bg-background px-2 py-1 rounded text-accent break-all">{String(data.url)}</code>
            </p>
          )}
        </div>

        {/* Results Table/Cards */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-border/30 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto">
              <table className="w-full" role="table" aria-label="Security source analysis results">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground" scope="col">Source</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground" scope="col">Status</th>
                    <th className="text-left py-4 px-4 font-semibold text-muted-foreground" scope="col">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSources.map((source, index) => (
                    <tr
                      key={source.id}
                      className={`border-b border-border/50 hover:bg-background/50 transition-colors focus-within:ring-2 focus-within:ring-primary ${
                        index === filteredSources.length - 1 ? 'border-b-0' : ''
                      }`}
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary" aria-hidden="true">
                            {source.icon}
                          </div>
                          <span className="font-medium text-foreground">{source.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span aria-hidden="true">{getStatusIcon(source.status)}</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor(source.status)}`}>
                            {getStatusLabel(source.status)}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">{source.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="sm:hidden space-y-3">
              {filteredSources.map((source) => (
                <div key={source.id} className="border border-border rounded-lg p-4 bg-background">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                        {source.icon}
                      </div>
                      <span className="font-medium text-foreground">{source.name}</span>
                    </div>
                    {getStatusIcon(source.status)}
                  </div>
                  <div className="mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusBadgeColor(source.status)}`}>
                      {getStatusLabel(source.status)}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{source.details}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export function getSafetyScore(decision: string): { value: number; color: string } {
  switch (decision) {
    case "safe":
      return { value: 92, color: "text-green-500" };
    case "suspect":
      return { value: 55, color: "text-yellow-500" };
    case "malicious":
      return { value: 17, color: "text-red-500" };
    default:
      return { value: 0, color: "text-gray-400" };
  }
}


import { useState } from 'react';
import { ChevronDown, Check, X } from 'lucide-react';

export interface AnalysisRule {
  id: string;
  name: string;
  status: 'matched' | 'not-matched' | 'failed';
  reasoning: string;
}

const MOCK_RULES: AnalysisRule[] = [
  {
    id: 'https',
    name: 'HTTPS Protocol',
    status: 'matched',
    reasoning: 'URL uses secure HTTPS protocol, indicating encrypted connection.',
  },
  {
    id: 'domain-age',
    name: 'Domain Age',
    status: 'matched',
    reasoning: 'Domain registered 5+ years ago. Established domain with longer history.',
  },
  {
    id: 'url-length',
    name: 'URL Length',
    status: 'matched',
    reasoning: 'URL length is reasonable (45 characters). Suspicious URLs often exceed 75 characters.',
  },
  {
    id: 'suspicious-keywords',
    name: 'Suspicious Keywords',
    status: 'matched',
    reasoning: 'No phishing indicators or suspicious keywords detected in URL.',
  },
  {
    id: 'ip-address',
    name: 'Direct IP Address',
    status: 'matched',
    reasoning: 'Domain name used instead of raw IP address, indicating legitimate hosting.',
  },
  {
    id: 'url-encoding',
    name: 'URL Encoding Anomalies',
    status: 'not-matched',
    reasoning: 'Unusual encoding patterns detected but within acceptable range.',
  },
  {
    id: 'reputation-score',
    name: 'Domain Reputation Score',
    status: 'matched',
    reasoning: 'Positive reputation score from multiple sources. Trust score: 92/100.',
  },
  {
    id: 'recent-registration',
    name: 'Recent Registration Detection',
    status: 'matched',
    reasoning: 'Domain was not recently registered. Registered on: 2019-03-15.',
  },
];

function getRuleIcon(status: string) {
  if (status === 'matched') {
    return <Check className="w-5 h-5 text-green-500" />;
  } else if (status === 'failed') {
    return <X className="w-5 h-5 text-red-500" />;
  }
  return <X className="w-5 h-5 text-yellow-500" />;
}

function getRuleColor(status: string) {
  if (status === 'matched') {
    return 'border-green-500/20 bg-green-500/5';
  } else if (status === 'failed') {
    return 'border-red-500/20 bg-red-500/5';
  }
  return 'border-yellow-500/20 bg-yellow-500/5';
}

interface DetailedAnalysisProps {
  rules?: AnalysisRule[];
  isLoading?: boolean;
  data?: Record<string, unknown>;
}

interface RuleItemProps {
  rule: AnalysisRule;
}

function RuleItem({ rule }: RuleItemProps) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-lg ${getRuleColor(rule.status)}`}>
      <div className="flex items-center space-x-4">
        {getRuleIcon(rule.status)}
        <div>
          <h3 className="text-lg font-semibold text-foreground">{rule.name}</h3>
          <p className="text-sm text-muted-foreground">{rule.reasoning}</p>
        </div>
      </div>
    </div>
  );
}

export function DetailedAnalysis({ rules = MOCK_RULES, isLoading = false, data }: DetailedAnalysisProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8" aria-label="Detailed security analysis">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Detailed Analysis
          </h2>
          <p className="text-muted-foreground">
            Heuristics and detailed reasoning for this URL assessment. Each rule is evaluated against our security algorithms.
          </p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full p-4 rounded-lg bg-background/50 border border-border"
        >
          <div className="flex items-center space-x-4">
            <ChevronDown
              size={20}
              className={`text-muted-foreground flex-shrink-0 transition-transform ${
                isOpen ? 'transform rotate-180' : ''
              }`}
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-foreground">Toggle Analysis</h3>
          </div>
        </button>

        {/* Rules List */}
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-border/30 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : isOpen && (
          <div className="space-y-3">
            {rules.map((rule) => (
              <RuleItem key={rule.id} rule={rule} />
            ))}
          </div>
        )}
        

        {/* Summary Section */}
        {!isLoading && (
          <div className="mt-8 border border-accent/30 bg-accent/5 rounded-lg p-6" role="region" aria-label="Overall security assessment summary">
            <h3 className="text-xl font-semibold text-foreground mb-2">Overall Assessment</h3>
            <p className="text-muted-foreground mb-4">
              Based on the heuristics analysis and security source verification:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Safety Score</div>
                {(() => { 
                  const decision = data?.final_decision?.level as string | undefined;
                  const { value, color } = getSafetyScore(decision ?? "");
                  return (
                    <div className={`text-3xl font-bold ${color}`} role="status" aria-label="Safety score">{value}/100</div>
                  );
                })()}
              </div>
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Risk Level</div>
                {(() => {
                  const decision = data?.final_decision?.level as string | undefined;
                  let label = 'Unknown';
                  let color = 'text-gray-400';
                  switch (decision) {
                    case 'safe':
                      label = 'Very Low';
                      color = 'text-green-500';
                      break;
                    case 'suspect':
                      label = 'Moderate';
                      color = 'text-yellow-500';
                      break;
                    case 'malicious':
                      label = 'High';
                      color = 'text-red-500';
                      break;
                  }
                  return (
                    <div className={`text-lg font-semibold ${color}`} role="status" aria-label="Risk level">{label}</div>
                  );
                })()}
              </div>
              <div className="bg-background/50 border border-border rounded-lg p-4">
                <div className="text-sm text-muted-foreground mb-1">Recommendation</div>
                {(() => {
                  const decision = data?.final_decision?.level as string | undefined;
                  let label = 'No Recommendation';
                  let color = 'text-gray-400';
                  switch (decision) {
                    case 'safe':
                      label = 'Safe to Visit';
                      color = 'text-green-500';
                      break;
                    case 'suspect':
                      label = 'Proceed with Caution';
                      color = 'text-yellow-500';
                      break;
                    case 'malicious':
                      label = 'Do Not Visit';
                      color = 'text-red-500';
                      break;
                  }
                  return (
                    <div className={`text-lg font-semibold ${color}`} role="status" aria-label="Safety recommendation">{label}</div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

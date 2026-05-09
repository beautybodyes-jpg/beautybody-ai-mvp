export type Severity = "excellent" | "good" | "fair" | "attention" | "priority";

export interface SkinParameter {
  id: string;
  name: string;
  description: string;
  weight: number;
  score: number;
  severity: Severity;
  icon: string;
  tip: string;
}

export interface Treatment {
  id: string;
  name: string;
  description: string;
  duration: string;
  priceRange: string;
  category: string;
  targetParameters: string[];
  minScoreTrigger: number;
}

export interface AnalysisResult {
  id: string;
  overallScore: number;
  skinAge: number;
  chronologicalAge: number;
  parameters: SkinParameter[];
  priorityConcern: SkinParameter;
  topStrength: SkinParameter;
  recommendations: Treatment[];
  createdAt: string;
  isSimulation: true;
}

export interface UserSession {
  ageRange: string;
  skinType: string;
  consentGiven: boolean;
  consentVersion: string;
}

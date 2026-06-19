export interface Vaccine {
  id: string;
  name: string;
  description: string;
  diseasePrevented: string[];
  recommendedAge: string; // e.g., "2 months", "6 months"
  minimumAge?: string;
  maximumAge?: string;
  notes?: string;
}

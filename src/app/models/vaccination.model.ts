export type VaccinationStatus = 'applied' | 'pending' | 'overdue' | 'missed';

export interface Vaccination {
  id: string;
  childId: string;
  vaccineId: string;
  vaccine: {name: string; description: string};
  status: VaccinationStatus;
  scheduledDate: Date;
  appliedDate?: Date;
  location?: string; // e.g., "Health Center", "Hospital"
  lotNumber?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

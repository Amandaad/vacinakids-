export interface Vaccine {
  id: string;
  name: string;
  description: string;
  diseasePrevention: string;
  idadeMeses: number;
  scheduledDate?: string;
  appliedDate?: string;
  location?: string;
  batchNumber?: string;
  status: 'aplicada' | 'pendente' | 'atrasada';
}
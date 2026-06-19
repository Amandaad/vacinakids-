export interface Child {
  id: string;
  responsavelId: string;
  name: string;
  birthDate: string;
  gender: string;
  weight?: number;
  height?: number;
  photo?: string;
  vaccinesApplied: number;
  vaccinesPending: number;
  vaccinesOverdue: number;
}
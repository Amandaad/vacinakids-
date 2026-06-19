import { Child } from '../models/child.model';
import { Vaccine } from '../models/vaccine.model';
import { Campaign } from '../models/campaign';

export const SAMPLE_CHILDREN: Child[] = [
  {
    id: 'c1',
    responsavelId: 'r1',
    name: 'Pedro Silva',
    birthDate: '2023-06-15',
    gender: 'masculino',
    weight: 14.2,
    height: 95,
    photo: '',
    vaccinesApplied: 12,
    vaccinesPending: 0,
    vaccinesOverdue: 0
  },
  {
    id: 'c2',
    responsavelId: 'r1',
    name: 'Maria Silva',
    birthDate: '2021-04-10',
    gender: 'feminino',
    weight: 18.1,
    height: 110,
    photo: '',
    vaccinesApplied: 12,
    vaccinesPending: 1,
    vaccinesOverdue: 1
  }
];

export const SAMPLE_VACCINES: Vaccine[] = [
  {
    id: 'v1',
    name: 'BCG',
    description: 'Vacina BCG',
    diseasePrevention: 'Tuberculose',
    idadeMeses: 0,
    appliedDate: '2024-02-10',
    status: 'aplicada'
  },
  {
    id: 'v2',
    name: 'Hepatite B',
    description: 'Hepatite B',
    diseasePrevention: 'Hepatite B',
    idadeMeses: 0,
    appliedDate: '2024-02-10',
    status: 'aplicada'
  },
  {
    id: 'v3',
    name: 'Tríplice Viral',
    description: 'Tríplice Viral',
    diseasePrevention: 'Sarampo/Caxumba/Rubéola',
    idadeMeses: 36,
    scheduledDate: '2026-07-01',
    status: 'pendente'
  },
  {
    id: 'v4',
    name: 'Febre Amarela',
    description: 'Febre Amarela',
    diseasePrevention: 'Febre Amarela',
    idadeMeses: 60,
    scheduledDate: '2026-06-12',
    status: 'atrasada'
  }
];

export const SAMPLE_CAMPAIGNS: Campaign[] = [
  {
    id: 'camp1',
    titulo: 'Campanha Influenza 2026',
    descricao: 'Vacinação contra Influenza para crianças',
    publico: '6 meses a 5 anos',
    inicio: new Date('2026-05-01'),
    fim: new Date('2026-08-31')
  }
];

export function getVaccinesForChild(childId: string): Vaccine[] {
  // Simple mapping: Pedro (c1) has applied vaccines and pending none; Maria (c2) has one pending and one overdue
  if (childId === 'c1') {
    return SAMPLE_VACCINES.filter(v => v.status === 'aplicada');
  }
  if (childId === 'c2') {
    return SAMPLE_VACCINES;
  }
  return [];
}

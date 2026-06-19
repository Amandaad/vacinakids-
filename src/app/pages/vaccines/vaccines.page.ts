import { Component, OnInit } from '@angular/core';
import { VaccineService } from '../../services/vaccine.service';
import { Vaccine } from '../../models/vaccine.model';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.page.html',
  styleUrls: ['./vaccines.page.scss']
})
export class VaccinesComponent implements OnInit {
  vaccines: Vaccine[] = [];
  isLoading: boolean = false;
  selectedVaccine: Vaccine | null = null;

  constructor(private vaccineService: VaccineService) {}

  ngOnInit() {
    this.loadVaccines();
  }

  loadVaccines() {
    this.isLoading = true;
    this.vaccineService.getVaccines().subscribe(
      (vaccines: Vaccine[]) => {
        this.vaccines = vaccines;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar vacinas:', error);
        this.isLoading = false;
      }
    );
  }

  selectVaccine(vaccine: Vaccine) {
    this.selectedVaccine = this.selectedVaccine?.id === vaccine.id ? null : vaccine;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'aplicada':
        return '#ABC270';
      case 'pendente':
        return '#FEC868';
      case 'atrasada':
        return '#FDA769';
      default:
        return '#473C33';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'aplicada':
        return '✔';
      case 'pendente':
        return '⏳';
      case 'atrasada':
        return '❌';
      default:
        return '?';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'aplicada':
        return 'Aplicada';
      case 'pendente':
        return 'Prevista';
      case 'atrasada':
        return 'Atrasada';
      default:
        return 'Desconhecido';
    }
  }

  groupVaccinesByStatus() {
    const grouped: any = {
      aplicada: [],
      pendente: [],
      atrasada: []
    };

    this.vaccines.forEach((vaccine) => {
      if (grouped[vaccine.status]) {
        grouped[vaccine.status].push(vaccine);
      }
    });

    return grouped;
  }
}

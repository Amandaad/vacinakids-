import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChildService } from '../../services/child.service';
import { VaccineService } from '../../services/vaccine.service';
import { Child } from '../../models/child.model';
import { Vaccine } from '../../models/vaccine.model';

@Component({
  selector: 'app-child-details',
  templateUrl: './child-details.page.html',
  styleUrls: ['./child-details.page.scss']
})
export class ChildDetailsComponent implements OnInit {
  child: Child | null = null;
  vaccines: Vaccine[] = [];
  isLoading: boolean = false;
  childId: string = '';

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private vaccineService: VaccineService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.childId = params['id'];
      this.loadChildDetails();
    });
  }

  loadChildDetails() {
    this.isLoading = true;
    this.childService.getChild(this.childId).subscribe(
      (child: Child) => {
        this.child = child;
        this.loadChildVaccines();
      },
      (error) => {
        console.error('Erro ao carregar criança:', error);
        this.isLoading = false;
      }
    );
  }

  loadChildVaccines() {
    this.vaccineService.getChildVaccines(this.childId).subscribe(
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

  calculateAge(birthDate: string): string {
    const birth = new Date(birthDate);
    const today = new Date();
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    if (years === 0) {
      return `${months} meses`;
    } else if (years === 1) {
      return `1 ano e ${months} meses`;
    } else {
      return `${years} anos e ${months} meses`;
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
}

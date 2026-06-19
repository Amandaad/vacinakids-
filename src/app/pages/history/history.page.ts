import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { VaccineService } from '../../services/vaccine.service';
import { Child } from '../../models/child.model';
import { Vaccine } from '../../models/vaccine.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss']
})
export class HistoryComponent implements OnInit {
  children: Child[] = [];
  selectedChild: Child | null = null;
  vaccineHistory: any[] = [];
  isLoading: boolean = false;
  groupedByYear: any = {};

  constructor(
    private childService: ChildService,
    private vaccineService: VaccineService
  ) {}

  ngOnInit() {
    this.loadChildren();
  }

  loadChildren() {
    this.childService.getChildren().subscribe(
      (children: Child[]) => {
        this.children = children;
        if (children.length > 0) {
          this.selectChildAndLoadHistory(children[0]);
        }
      },
      (error) => {
        console.error('Erro ao carregar crianças:', error);
      }
    );
  }

  selectChildAndLoadHistory(child: Child) {
    this.selectedChild = child;
    this.loadVaccineHistory(child.id);
  }

  loadVaccineHistory(childId: string) {
    this.isLoading = true;
    this.vaccineService.getChildVaccines(childId).subscribe(
      (vaccines: Vaccine[]) => {
        this.vaccineHistory = vaccines.filter(v => v.appliedDate);
        this.groupVaccinesByYear();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar histórico de vacinas:', error);
        this.isLoading = false;
      }
    );
  }

  groupVaccinesByYear() {
    this.groupedByYear = {};

    this.vaccineHistory.forEach((vaccine) => {
      if (vaccine.appliedDate) {
        const year = new Date(vaccine.appliedDate).getFullYear();
        if (!this.groupedByYear[year]) {
          this.groupedByYear[year] = [];
        }
        this.groupedByYear[year].push(vaccine);
      }
    });
  }

  getYearKeys(): number[] {
    return Object.keys(this.groupedByYear)
      .map(Number)
      .sort((a, b) => b - a);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'aplicada':
        return '#ABC270';
      default:
        return '#473C33';
    }
  }
}

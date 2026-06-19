import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { VaccineService } from '../../services/vaccine.service';
import { Child } from '../../models/child.model';
import { Vaccine } from '../../models/vaccine.model';

interface OverdueEntry {
  child: Child;
  vaccine: Vaccine;
  scheduledDate?: string;
  daysOverdue: number;
}

@Component({
  selector: 'app-pendencias',
  templateUrl: './pendencias.page.html',
  styleUrls: ['./pendencias.page.scss']
})
export class PendenciasPage implements OnInit {
  entries: OverdueEntry[] = [];
  isLoading = false;

  constructor(
    private childService: ChildService,
    private vaccineService: VaccineService
  ) {}

  ngOnInit() {
    this.loadOverdues();
  }

  loadOverdues() {
    this.isLoading = true;
    this.entries = [];
    this.childService.getChildren().subscribe((children: Child[]) => {
      children.forEach((child) => {
        this.vaccineService.getChildVaccines(child.id).subscribe((vaccines: Vaccine[]) => {
          const overdue = vaccines.filter(v => v.status === 'atrasada');
          overdue.forEach(v => {
            const days = this.calculateDaysOverdue(v.scheduledDate || '');
            this.entries.push({ child, vaccine: v, scheduledDate: v.scheduledDate, daysOverdue: days });
          });
        });
      });
      // Small timeout to allow inner subscriptions to populate entries
      setTimeout(() => { this.isLoading = false; }, 200);
    }, (err) => {
      console.error('Erro ao carregar crianças:', err);
      this.isLoading = false;
    });
  }

  calculateDaysOverdue(dateStr: string): number {
    if (!dateStr) return 0;
    const scheduled = new Date(dateStr);
    const today = new Date();
    const diff = today.getTime() - scheduled.getTime();
    return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
  }

  markApplied(entry: OverdueEntry) {
    this.vaccineService.applyVaccine(entry.child.id, entry.vaccine.id).subscribe((updated) => {
      // Update UI: remove the entry from pendencies
      this.entries = this.entries.filter(e => !(e.child.id === entry.child.id && e.vaccine.id === entry.vaccine.id));
      // adjust child counters locally
      if (entry.child.vaccinesOverdue > 0) entry.child.vaccinesOverdue -= 1;
      entry.child.vaccinesApplied += 1;
    }, (err) => {
      console.error('Erro ao registrar aplicação:', err);
    });
  }
}

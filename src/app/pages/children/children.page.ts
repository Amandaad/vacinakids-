import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { Child } from '../../models/child.model';

@Component({
  selector: 'app-children',
  templateUrl: './children.page.html',
  styleUrls: ['./children.page.scss']
})
export class ChildrenComponent implements OnInit {
  children: Child[] = [];
  isLoading: boolean = false;
  showAddForm: boolean = false;

  constructor(private childService: ChildService) {}

  ngOnInit() {
    this.loadChildren();
  }

  loadChildren() {
    this.isLoading = true;
    this.childService.getChildren().subscribe(
      (children: Child[]) => {
        this.children = children;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar crianças:', error);
        this.isLoading = false;
      }
    );
  }

  getStatusColor(child: Child): string {
    if (child.vaccinesOverdue > 0) {
      return '#FDA769';
    } else if (child.vaccinesPending > 0) {
      return '#FEC868';
    }
    return '#ABC270';
  }

  getStatusText(child: Child): string {
    if (child.vaccinesOverdue > 0) {
      return `${child.vaccinesOverdue} atrasada(s)`;
    } else if (child.vaccinesPending > 0) {
      return `${child.vaccinesPending} pendente(s)`;
    }
    return 'Em dia';
  }

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  calculateAge(birthDate: string): string {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    return `${years} anos`;
  }
}


import { Component, OnInit } from '@angular/core';
import { ChildService } from '../../services/child.service';
import { CampaignService } from '../../services/campaign.service';
import { Child } from '../../models/child.model';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit {
  children: Child[] = [];
  activeCampaigns: Campaign[] = [];
  selectedChild: Child | null = null;
  parentName: string = 'Amanda';
  familyName: string = 'Silva';

  constructor(
    private childService: ChildService,
    private campaignService: CampaignService
  ) {}

  ngOnInit() {
    this.loadChildren();
    this.loadActiveCampaigns();
  }

  loadChildren() {
    this.childService.getChildren().subscribe(
      (children: Child[]) => {
        this.children = children;
        if (children.length > 0) {
          this.selectedChild = children[0];
        }
      },
      (error) => {
        console.error('Erro ao carregar crianças:', error);
      }
    );
  }

  loadActiveCampaigns() {
    this.campaignService.getActiveCampaigns().subscribe(
      (campaigns: Campaign[]) => {
        this.activeCampaigns = campaigns;
      },
      (error) => {
        console.error('Erro ao carregar campanhas:', error);
      }
    );
  }

  selectChild(child: Child) {
    this.selectedChild = child;
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

  getTotalPendencies(): number {
    return this.children.reduce((total, child) => {
      return total + (child.vaccinesPending + child.vaccinesOverdue);
    }, 0);
  }
}

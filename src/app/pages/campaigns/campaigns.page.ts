import { Component, OnInit } from '@angular/core';
import { CampaignService } from '../../services/campaign.service';
import { Campaign } from '../../models/campaign';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.page.html',
  styleUrls: ['./campaigns.page.scss']
})
export class CampaignsComponent implements OnInit {
  campaigns: Campaign[] = [];
  activeCampaigns: Campaign[] = [];
  isLoading: boolean = false;
  selectedCampaign: Campaign | null = null;

  constructor(private campaignService: CampaignService) {}

  ngOnInit() {
    this.loadCampaigns();
  }

  loadCampaigns() {
    this.isLoading = true;
    this.campaignService.getCampaigns().subscribe(
      (campaigns: Campaign[]) => {
        this.campaigns = campaigns;
        this.activeCampaigns = campaigns.filter(c => this.isCampaignActive(c));
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar campanhas:', error);
        this.isLoading = false;
      }
    );
  }

  isCampaignActive(campaign: Campaign): boolean {
    const today = new Date();
    const start = new Date(campaign.inicio);
    const end = new Date(campaign.fim);
    return today >= start && today <= end;
  }

  selectCampaign(campaign: Campaign) {
    this.selectedCampaign = this.selectedCampaign?.id === campaign.id ? null : campaign;
  }

  getCampaignStatus(campaign: Campaign): string {
    if (this.isCampaignActive(campaign)) {
      return 'Ativa';
    }
    const today = new Date();
    const start = new Date(campaign.inicio);
    return today < start ? 'Próxima' : 'Finalizada';
  }

  getCampaignStatusColor(campaign: Campaign): string {
    if (this.isCampaignActive(campaign)) {
      return '#ABC270';
    }
    const today = new Date();
    const start = new Date(campaign.inicio);
    return today < start ? '#FEC868' : '#ddd';
  }
}

import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './dashboard-redirect.component.html',
  styleUrls: ['./dashboard-redirect.component.scss']
})
export class DashboardRedirectComponent implements OnInit {

  constructor(private dashboardService: DashboardService, private router: Router) { }

  async ngOnInit() {
    const { data: panels, count } = await this.dashboardService.fetchDashboardPanels();

    if (count > 0) {
      this.router.navigate(['dashboard', panels[0]._id]);
    }

    // TODO: Create the flow to create a panel
  }

}

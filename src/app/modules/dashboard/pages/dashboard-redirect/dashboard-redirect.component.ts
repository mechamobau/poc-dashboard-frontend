import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { NewPanelComponent } from '../../components/new-panel/new-panel.component';

export enum DASHBOARD_STATUS {
  LOADING = 'LOADING',
  NO_PANELS = 'NO_PANELS',
  REDIRECT = 'REDIRECT'
}

@Component({
  templateUrl: './dashboard-redirect.component.html',
  styleUrls: ['./dashboard-redirect.component.scss']
})
export class DashboardRedirectComponent implements OnInit {
  dashboardStatusEnum = DASHBOARD_STATUS;

  dashboardStatus = DASHBOARD_STATUS.LOADING;

  isLoading = this.dashboardStatus === DASHBOARD_STATUS.LOADING;

  constructor(private dashboardService: DashboardService, private router: Router,public dialog: MatDialog) { }

  async ngOnInit() {
    const { data: panels, count } = await this.dashboardService.fetchDashboardPanels();

    if (count > 0) {
      this.dashboardStatus = DASHBOARD_STATUS.REDIRECT;
      this.router.navigate(['dashboard', panels[0]._id]);
    }

    this.dashboardStatus = DASHBOARD_STATUS.NO_PANELS;
    // TODO: Create the flow to create a panel
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewPanelComponent, {
      width: '500px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        const { data: { _id } } = await this.dashboardService.fetchNewDashboardPanel({ name })

        this.router.navigate(['dashboard', _id]);
      }
    });
  }

}

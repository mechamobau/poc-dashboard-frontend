import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import ICardOption from '../../models/CardOption';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public panelId: number;

  public gridOptions: GridsterConfig;

  public cardOptions: ICardOption[] = [
    {
      label: 'Excluir card',
      action: () => {}
    }
  ];

  public loadedComponent = false;

  public dashboardItems: Array<GridsterItem>;

  constructor(private router: Router, private route: ActivatedRoute, private dashboard: DashboardService) { }

  async ngOnInit() {
    this.gridOptions = {
      dashboard: this.dashboard,
      loadedComponent: this.loadedComponent,
      minCols: 8,
      minRows: 5,
      maxRows: 5,
      draggable: {
        enabled: true,
      },
      resizable: {
        enabled: true,
      },
    };


    this.loadedComponent = true;

    this.route.params.subscribe(async ({panel_id}) => {
      this.panelId = panel_id;

      const { data } = await this.dashboard.fetchDashboardPanelCards(panel_id);

      this.dashboardItems = data.map(({coord_x, coord_y, height, width, ...item}) => ({
        x: coord_x,
        y: coord_y,
        cols: width,
        rows: height,
        ...item
      }));
    });


  }

  public itemChange({ _id, cols, rows, x, y, title }: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.warn('change', this.loadedComponent);

    this.dashboard.fetchUpdateDashboardCard(this.panelId, _id, {
      coord_x: x,
      coord_y: y,
      width: cols,
      height: rows,
      title,
    });

    console.info('itemChanged', { _id, cols, rows, x, y, title }, itemComponent);
  }

  public itemResize({ _id, cols, rows, x, y, title }: GridsterItem, itemComponent: GridsterItemComponentInterface) {
    console.warn('resize', this.loadedComponent);

    this.dashboard.fetchUpdateDashboardCard(this.panelId, _id, {
      coord_x: x,
      coord_y: y,
      width: cols,
      height: rows,
      title
    });

    console.info('itemResize', { _id, cols, rows, x, y, title }, itemComponent);
  }


  public logout() {
    localStorage.removeItem('token');

    this.router.navigate(['auth/signin']);
  }


  // changedOptions() {
  //   this.options.api.optionsChanged();
  // }

  // removeItem(item) {
  //   this.dashboardWrapper.splice(this.dashboardWrapper.indexOf(item), 1);
  // }

  // addItem(item) {
  //   this.dashboardWrapper.push(item);
  // }


}

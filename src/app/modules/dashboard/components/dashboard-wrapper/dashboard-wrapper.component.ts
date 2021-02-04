import { Component, OnInit, Input } from '@angular/core';

import { GridsterItem, GridsterConfig } from 'angular-gridster2';
import { ICardOption } from '../dashboard-card/dashboard-card.component';
import { DashboardService } from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-wrapper',
  templateUrl: './dashboard-wrapper.component.html',
  styleUrls: ['./dashboard-wrapper.component.scss'],
})
export class DashboardWrapperComponent implements OnInit {
  @Input('card-options') cardOptions: ICardOption[];

  public options: GridsterConfig;

  public dashboardWrapper: Array<GridsterItem>;

  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResize', item, itemComponent);
  }

  constructor(private dashboard: DashboardService) {}

  async ngOnInit() {
    this.options = {
      itemChangeCallback: DashboardWrapperComponent.itemChange,
      itemResizeCallback: DashboardWrapperComponent.itemResize,
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

    this.dashboardWrapper = [
      { cols: 2, rows: 1, y: 0, x: 0, title: 'a' },
      { cols: 2, rows: 2, y: 0, x: 2, title: 'b' },
    ];
  }

  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboardWrapper.splice(this.dashboardWrapper.indexOf(item), 1);
  }

  addItem(item) {
    this.dashboardWrapper.push(item);
  }
}

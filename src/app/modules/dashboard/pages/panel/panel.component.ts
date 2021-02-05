import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GridsterConfig, GridsterItem, GridsterItemComponentInterface } from 'angular-gridster2';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import ICardOption from '../../models/CardOption';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material/dialog';
import { NewCardComponent } from '../../components/new-card/new-card.component';
import IDashboardPanel from '../../models/DashboardPanel';
import { MatSelectChange } from '@angular/material/select';
import { NewPanelComponent } from '../../components/new-panel/new-panel.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public panelId: number;

  public panels: IDashboardPanel[];

  public gridOptions: GridsterConfig;

  public cardOptions: ICardOption[];

  public loadedComponent = false;

  public dashboardItems: Array<GridsterItem>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dashboardService: DashboardService,
    public dialog: MatDialog) { }

  async ngOnInit() {
    this.gridOptions = {
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

    this.cardOptions = [];

    const { data:_panels } = await this.dashboardService.fetchDashboardPanels();
    this.panels = _panels;

    this.loadedComponent = true;

    this.route.params.subscribe(async ({panel_id}) => {
      this.panelId = panel_id;

      const { data } = await this.dashboardService.fetchDashboardPanelCards(panel_id);

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

    this.dashboardService.fetchUpdateDashboardCard(this.panelId, _id, {
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

    this.dashboardService.fetchUpdateDashboardCard(this.panelId, _id, {
      coord_x: x,
      coord_y: y,
      width: cols,
      height: rows,
      title
    });

    console.info('itemResize', { _id, cols, rows, x, y, title }, itemComponent);
  }

  public async itemDelete(cardId: number) {
    const cardIndex = this.dashboardItems.findIndex(({ _id }) => _id === cardId);

    await this.dashboardService.fetchDeleteDashboardCard(this.panelId, cardId);

    this.dashboardItems.splice(cardIndex, 1);
  }


  public logout() {
    localStorage.removeItem('token');

    this.router.navigate(['auth/signin']);
  }

  public openCardDialog(): void {
    const dialogRef = this.dialog.open(NewCardComponent, {
      width: '500px',
      data: {title: ''}
    });

    dialogRef.afterClosed().subscribe(async title => {
      if (title) {

        const { data: card } = await this.dashboardService.fetchNewDashboardCard(this.panelId, {
          title,
          coord_x: 0,
          coord_y: 0,
          height: 1,
          width: 2
        })

        this.dashboardItems.push({
          cols: card.width,
          rows: card.height,
          x: card.coord_x,
          y: card.coord_y,
          ...card
        });


      }
    });
  }

  public openPanelDialog(): void {
    const dialogRef = this.dialog.open(NewPanelComponent, {
      width: '500px',
      data: {name: ''}
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        const { data: { _id } } = await this.dashboardService.fetchNewDashboardPanel({ name });

        this.panels.push({_id, name});

        this.router.navigate(['dashboard', _id]);
      }
    });
  }


  public onSelectChange(event: MatSelectChange) {
    if (event.value !== this.panelId) {
      this.router.navigate(['dashboard', event.value]);
    }
  }

  // changedOptions() {
  //   this.options.api.optionsChanged();
  // }

  // addItem(item) {
  //   this.dashboardWrapper.push(item);
  // }


}

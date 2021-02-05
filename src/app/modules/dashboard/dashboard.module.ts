import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { PanelComponent } from './pages/panel/panel.component';
import { DashboardWrapperComponent } from './components/dashboard-wrapper/dashboard-wrapper.component';
import { GridsterModule } from 'angular-gridster2';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { DashboardRedirectComponent } from './pages/dashboard-redirect/dashboard-redirect.component';
import { DashboardService } from './services/dashboard/dashboard.service';
import { NewPanelComponent } from './components/new-panel/new-panel.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { NewCardComponent } from './components/new-card/new-card.component';

@NgModule({
  entryComponents: [NewPanelComponent, NewCardComponent],
  declarations: [PanelComponent, DashboardWrapperComponent, DashboardCardComponent, DashboardRedirectComponent, NewPanelComponent, NewCardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    GridsterModule,
    FormsModule,
    MatSelectModule
  ],
  providers: [
    DashboardService,
    { provide: MAT_DIALOG_DATA, useValue: {} },
    { provide: MatDialogRef, useValue: {} },
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ]
})
export class DashboardModule { }

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

import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { DashboardRedirectComponent } from './pages/dashboard-redirect/dashboard-redirect.component';
import { DashboardService } from './services/dashboard/dashboard.service';

@NgModule({
  declarations: [PanelComponent, DashboardWrapperComponent, DashboardCardComponent, DashboardRedirectComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    GridsterModule
  ],
  providers: [
    DashboardService
  ]
})
export class DashboardModule { }

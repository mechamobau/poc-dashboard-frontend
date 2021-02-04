import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';
import { DashboardRedirectComponent } from './pages/dashboard-redirect/dashboard-redirect.component';


const routes: Routes = [
  {
    path: "",
    component: DashboardRedirectComponent,
  },
  {
    path: ":panel_id",
    component: PanelComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

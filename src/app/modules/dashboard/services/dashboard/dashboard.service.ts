import { Injectable } from '@angular/core';
import { GridsterItem } from 'angular-gridster2';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IDashboardCard {
  _id: number;
  coord_x: number;
  coord_y: number;
  height: number;
  title: string;
  width: number;
}

interface IDashboardPanel {
  _id: number;
  name: string;
}

interface APIResponse<T> {
  data?: T;
  count?: number;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  public fetchDashboardPanelCards(panelId: string) {
    return this.http.get<APIResponse<IDashboardCard[]>>(`${environment.serverUrl}/panel/${panelId}/cards/`).toPromise();
  }

  public fetchDashboardPanels() {
    return this.http.get<APIResponse<IDashboardPanel[]>>(`${environment.serverUrl}/panel/`).toPromise();
  }



}

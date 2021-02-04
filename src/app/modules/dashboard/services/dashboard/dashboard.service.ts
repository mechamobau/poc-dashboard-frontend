import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import IDashboardCard from '../../models/DashboardCard';
import IDashboardPanel from '../../models/DashboardPanel';

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

  public fetchUpdateDashboardCard(panelId: number, cardId: number, newPosition: Exclude<IDashboardCard, '_id'>) {
    return this.http.put<APIResponse<IDashboardCard>>(`${environment.serverUrl}/panel/${panelId}/cards/${cardId}`, newPosition).toPromise();
  }


}

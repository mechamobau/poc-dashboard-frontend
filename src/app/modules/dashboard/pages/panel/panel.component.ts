import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICardOption } from '../../components/dashboard-card/dashboard-card.component';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {

  public cardOptions: ICardOption[] = [
    {
      label: 'Excluir card',
      action: () => {}
    }
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public logout() {
    localStorage.removeItem('token');

    this.router.navigate(['auth/signin']);
  }


}

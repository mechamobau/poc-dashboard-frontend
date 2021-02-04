import { Component, OnInit, Input } from '@angular/core';

export interface ICardOption {
  label: string,
  action: () => void
}

@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input('title') title: string;
  @Input('options') options?: Array<ICardOption>;

  constructor() { }

  ngOnInit() {
  }

}

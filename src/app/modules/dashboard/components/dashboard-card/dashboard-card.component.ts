import { Component, OnInit, Input } from '@angular/core';
import ICardOption from '../../models/CardOption';
@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() title: string;
  @Input() options?: Array<ICardOption>;

  constructor() { }

  ngOnInit() {
  }

}

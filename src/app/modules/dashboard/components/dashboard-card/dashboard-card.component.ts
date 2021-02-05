import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import ICardOption from '../../models/CardOption';
@Component({
  selector: 'dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent implements OnInit {

  @Input() cardId: number;
  @Input() title: string;
  @Input() options?: Array<ICardOption>;

  @Output() onDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  deleteCard(cardId: number) {
    this.onDelete.emit(cardId);
  }

}

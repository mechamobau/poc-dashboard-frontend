import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IDashboardCard from '../../models/DashboardCard';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.scss']
})
export class NewCardComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pick<IDashboardCard, 'title'>, public dialogRef: MatDialogRef<NewCardComponent>) { }

  ngOnInit() {
  }

  public onNoClick() {
    this.dialogRef.close();
  }
}

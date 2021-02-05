import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import IDashboardPanel from '../../models/DashboardPanel';

@Component({
  selector: 'app-new-panel',
  templateUrl: './new-panel.component.html',
  styleUrls: ['./new-panel.component.scss']
})
export class NewPanelComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Pick<IDashboardPanel, 'name'>, public dialogRef: MatDialogRef<NewPanelComponent>) { }

  ngOnInit() {
  }

  public onNoClick() {
    this.dialogRef.close();
  }

}

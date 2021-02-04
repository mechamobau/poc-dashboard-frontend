import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

import {
  GridsterItem,
  GridsterConfig,
  GridsterItemComponentInterface,
} from "angular-gridster2";
import ICardOption from "../../models/CardOption";

@Component({
  selector: "app-dashboard-wrapper",
  templateUrl: "./dashboard-wrapper.component.html",
  styleUrls: ["./dashboard-wrapper.component.scss"],
})
export class DashboardWrapperComponent implements OnInit {
  public _gridOptionsComponent: GridsterConfig;

  @Input() cardOptions: ICardOption[];
  @Input() gridOptions: Exclude<
    GridsterConfig,
    "itemChangeCallback" | "itemResizeCallback"
  >;
  @Input() dashboardItems: Array<GridsterItem>;

  @Output() itemChange = new EventEmitter<{
    item: GridsterItem;
    itemComponent: GridsterItemComponentInterface;
  }>();
  @Output() itemResize = new EventEmitter<{
    item: GridsterItem;
    itemComponent: GridsterItemComponentInterface;
  }>();

  constructor() {}

  ngOnInit() {

    this._gridOptionsComponent = {
      itemChangeCallback: (
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface
      ) => {
        if (this.itemChange) {
          this.itemChange.emit({ item, itemComponent });
        }
      },
      itemResizeCallback: (
        item: GridsterItem,
        itemComponent: GridsterItemComponentInterface
      ) => {
        if (this.itemResize) {
          this.itemResize.emit({ item, itemComponent });
        }
      },
      ...this.gridOptions,
    };
  }
}

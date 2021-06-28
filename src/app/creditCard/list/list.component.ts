import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Credit } from '../credit.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  tableBody: Credit[] = [];
  constructor(private _service: AppService) { }
  tableHead = ['Name', 'Card Number', 'Balance', 'Limit']

  ngOnInit(): void {
    this._service.creditCardDetailsChanged
    .subscribe((resp: Credit[]) => {
      this.tableBody = resp;
    });
    /* this._service.listData()
    .subscribe((resp: Credit[]) => {
      this.tableBody = resp;
    }) */
  }

}

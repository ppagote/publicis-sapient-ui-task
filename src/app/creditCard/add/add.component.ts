import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { Credit } from '../credit.model';

export interface ErrorResp {
  timestamp: string;
  message: string;
  status: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit, OnDestroy {
  model = new Credit('', '', '');
  // addSubscription: Subscription;
  error = null;
  credits: Credit[] = [];
  constructor(private _service: AppService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this._service.listData().subscribe((response: Credit[]) => {
      console.log(response)
      this.credits = response;

    console.log(this.credits);
    this._service.creditCardDetailsChanged.next(this.credits);
    })
  }

  onSubmit(form: NgForm) {
    this.error = null;
    /* this.addSubscription =  */ this._service.addData(form.value).subscribe(
      (resp: Credit) => {
        this.model = resp;
       this.fetchData()
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage.error.message;
      }
    );
  }

  ngOnDestroy() {
    // this.addSubscription.unsubscribe();
  }
}

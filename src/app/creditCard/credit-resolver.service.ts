import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { resolve } from 'dns';
import { AppService } from '../app.service';
import { Credit } from './credit.model';

@Injectable({ providedIn: 'root' })
export class CreditResolverService implements Resolve<Credit[]> {
  constructor(private _service: AppService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this._service.listData();
  }
}

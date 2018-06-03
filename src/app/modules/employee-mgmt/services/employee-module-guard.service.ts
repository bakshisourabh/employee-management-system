import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeModuleGuardService implements CanActivate {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return this.es.list().map(
      result => {
        return true;
      },
      error => {
        return false;
      }
    );
  }
  constructor(private es: EmployeeService) {}
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Employee, IEmployee } from './../types/models/entities/employee';

@Injectable()
export class EmployeeService {
  private employeesSub: BehaviorSubject<Array<Employee>>;
  private _url: string;

  public get employees(): Observable<Array<Employee>> {
    return this.employeesSub.asObservable().distinctUntilChanged();
  }

  constructor(private http: Http) {
    this._url = '../../../../assets/mock/employee-data.json';
    this.employeesSub = new BehaviorSubject([]);
  }

  public list(): Observable<Array<Employee>> {
    return this.http
      .get(this._url)
      .map((response: Response) => {
        const src: Array<IEmployee> = response.json().data as Array<IEmployee>;
        const list: Array<Employee> = src.map(emp => Employee.parse(emp));

        this.employeesSub.next(list);

        return list;
      })
      .catch((error: Response) => {
        return Observable.throw(error || 'Server error');
      });
  }
}

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { Employee, IEmployee } from './../types/models/entities/employee';

@Injectable()
export class EmployeeService {
  private employeesSub: BehaviorSubject<Array<Employee>>;
  private filterSub: BehaviorSubject<string>;
  private _filteredEmployees: Observable<Array<Employee>>;
  private _url: string;

  public get employees(): Observable<Array<Employee>> {
    return this.employeesSub.asObservable().distinctUntilChanged();
  }

  public get filteredEmployees(): Observable<Array<Employee>> {
    return this._filteredEmployees;
  }

  public get filter(): Observable<string> {
    return this.filterSub.asObservable().distinctUntilChanged();
  }

  constructor(private http: Http) {
    this._url = '../../../../assets/mock/employee-data.json';
    this.employeesSub = new BehaviorSubject([]);
    this.filterSub = new BehaviorSubject('');
    this.filterEmployees = this.filterEmployees.bind(this);

    this._filteredEmployees = this.employees
      .combineLatest(this.filter)
      .map(([employees, filter]) => {
        let filtered: Array<Employee> = employees;

        if (filter !== '') {
          filtered = employees.filter(this.filterEmployees);
        }

        return filtered;
      });
  }

  public filterEmployees(
    emp: Employee,
    index: number,
    list: Array<Employee>
  ): boolean {
    const filter: string = this.filterSub.value;
    return (
      emp.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
      emp.address.city.toLowerCase().indexOf(filter.toLowerCase()) >= 0
    );
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

  public setFilter(value: string): void {
    this.filterSub.next(value);
  }
}

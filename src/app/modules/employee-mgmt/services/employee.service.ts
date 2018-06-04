import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BehaviorSubject, Subject } from 'rxjs';
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

  public add(employee: Employee): Observable<Employee> {
    const result: Subject<Employee> = new Subject();

    setTimeout(() => {
      const oldList: Array<Employee> = this.employeesSub.getValue();
      const newList: Array<Employee> = oldList.concat(employee).slice();

      employee.id = oldList.length + 1;
      this.employeesSub.next(newList);

      return result.next(employee);
    }, 500);

    return result.asObservable();
  }

  public update(employee: Employee): Observable<Employee> {
    const result: Subject<Employee> = new Subject();

    setTimeout(() => {
      const oldList: Array<Employee> = this.employeesSub.getValue();
      const index: number = oldList.findIndex(
        (emp: Employee, pos: number, list: Array<Employee>) => {
          return emp.id === employee.id;
        }
      );

      oldList[index] = employee;
      this.employeesSub.next(oldList.slice());

      return result.next(employee);
    }, 500);

    return result.asObservable();
  }

  public get(empId: number): Employee {
    let result: Employee;

    empId = +empId;
    result = this.employeesSub.value.find((emp: Employee) => {
      return emp.id === empId;
    });

    return result;
  }

  public edit(empId: number): Employee {
    return this.get(empId).clone();
  }

  public setFilter(value: string): void {
    this.filterSub.next(value);
  }
}

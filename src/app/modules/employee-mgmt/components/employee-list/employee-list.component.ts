import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from './../../services/employee.service';
import { Employee } from './../../types/models/entities/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('filterRef') filterRef: NgControl;
  public displayedColumns = [
    'id',
    'name',
    'phone',
    'address_line1',
    'address_line2',
    'city',
    'postal_code',
    'edit'
  ];

  private _filter: string;
  private filterChange: Subscription;

  get filter(): string {
    return this._filter;
  }

  set filter(value: string) {
    this._filter = value;
    this.es.setFilter(value);
  }

  public employees: Observable<Array<Employee>>;

  constructor(private es: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.employees = this.es.filteredEmployees;
  }

  ngAfterViewInit(): void {
    this.filterChange = this.filterRef.valueChanges
      .debounceTime(500)
      .subscribe(value => {
        this.filter = value;
      });
  }

  ngOnDestroy(): void {
    this.filterChange.unsubscribe();
  }

  public OnEdit(empId: number): void {
    this.router.navigateByUrl(`/employees/${empId}/edit`);
  }

  public getPhoneNumber(emp: Employee): string {
    if (isNaN(parseInt(emp.phone))) {
      return 'NA';
    }
    return emp.phone;
  }
}

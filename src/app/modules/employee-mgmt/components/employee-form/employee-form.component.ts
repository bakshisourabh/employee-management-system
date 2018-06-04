import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from './../../types/models/entities/employee';

@Component({
  selector: 'employee-form',
  templateUrl: `./employee-form.component.html`
})
export class EmployeeFormComponent {
  public emp: Employee;
  public errorMsg: string;

  private empId: number;

  public get isEditMode(): boolean {
    return this.empId > -1;
  }

  constructor(
    private es: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.init();
  }

  public onSubmit(): void {
    if (this.isEditMode) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  public onCancel(): void {
    this.router.navigateByUrl('/employees/list');
  }

  protected addEmployee(): void {
    this.es.add(this.emp).subscribe(
      resEmployeeData => {
        this.emp = resEmployeeData;
        this.router.navigateByUrl('/employees/list');
      },
      resEmployeeError => {
        this.errorMsg = resEmployeeError;
      }
    );
  }

  protected updateEmployee(): void {
    this.es.update(this.emp).subscribe(
      resEmployeeData => {
        this.emp = resEmployeeData;
        this.router.navigateByUrl('/employees/list');
      },
      resEmployeeError => {
        this.errorMsg = resEmployeeError;
      }
    );
  }

  protected initModel(): void {
    const emp: Employee = new Employee();
    emp.name = '';
    emp.phone = '';
    emp.address.address_line1 = '';
    emp.address.address_line2 = '';
    emp.address.city = '';
    emp.address.postal_code = '';

    this.emp = emp;
  }

  protected init(): void {
    this.empId = -1;

    this.initModel();

    this.route.params
      .subscribe(params => {
        this.empId = params['empId'];
      })
      .unsubscribe();

    if (this.isEditMode) {
      this.emp = this.es.edit(this.empId);
    }
  }
}

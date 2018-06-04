import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatTableModule,
  MatToolbarModule,
} from '@angular/material';

import { EmployeeFormComponent } from './components/employee-form/employee-form.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeMgmtRoutingModule } from './modules/employee-mgmt-routing/employee-mgmt-routing.module';
import { EmployeeModuleGuardService } from './services/employee-module-guard.service';
import { EmployeeService } from './services/employee.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EmployeeMgmtRoutingModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    CdkTableModule
  ],
  declarations: [EmployeeListComponent, EmployeeFormComponent],
  providers: [EmployeeService, EmployeeModuleGuardService]
})
export class EmployeeMgmtModule {}

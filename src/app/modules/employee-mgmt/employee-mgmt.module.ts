import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

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
  MatToolbarModule,
  MatTableModule
} from '@angular/material';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeMgmtRoutingModule } from './modules/employee-mgmt-routing/employee-mgmt-routing.module';
import { EmployeeModuleGuardService } from './services/employee-module-guard.service';
import { EmployeeService } from './services/employee.service';
import { CdkTableModule } from '@angular/cdk/table';

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
  declarations: [EmployeeListComponent],
  providers: [EmployeeService, EmployeeModuleGuardService]
})
export class EmployeeMgmtModule {}

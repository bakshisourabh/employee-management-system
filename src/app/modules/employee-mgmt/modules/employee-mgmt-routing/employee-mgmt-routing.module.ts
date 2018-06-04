import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeModuleGuardService } from '../../services/employee-module-guard.service';
import { EmployeeFormComponent } from './../../components/employee-form/employee-form.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [EmployeeModuleGuardService],
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: EmployeeListComponent },
          { path: 'add', component: EmployeeFormComponent },
          { path: ':empId/edit', component: EmployeeFormComponent }
        ]
      }
    ])
  ],
  declarations: []
})
export class EmployeeMgmtRoutingModule {}

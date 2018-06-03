import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { EmployeeListComponent } from '../../components/employee-list/employee-list.component';
import { EmployeeModuleGuardService } from '../../services/employee-module-guard.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [EmployeeModuleGuardService],
        children: [
          { path: '', redirectTo: 'list' },
          { path: 'list', component: EmployeeListComponent }
          
        ]
      }
    ])
  ],
  declarations: []
})
export class EmployeeMgmtRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees.component';

/**
 * Pages
 */
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmployeesComponent 
  },
  { 
    path: 'create', 
    component: CreateComponent 
  },
  { 
    path: 'show', 
    component: ShowComponent 
  },
  { 
    path: 'edit', 
    component: EditComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }

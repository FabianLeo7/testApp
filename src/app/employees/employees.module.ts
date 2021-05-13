import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpErrorResponse } from '@angular/common/http';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { CreateComponent } from './pages/create/create.component';
import { EditComponent } from './pages/edit/edit.component';
import { ShowComponent } from './pages/show/show.component';

import { ButtonsModule, WavesModule, CollapseModule } from 'angular-bootstrap-md';
import { DeleteComponent } from './pages/delete/delete.component'

@NgModule({
  declarations: [
    EmployeesComponent,
    CreateComponent,
    EditComponent,
    ShowComponent,
    DeleteComponent
  ],
  imports: [
    CommonModule,
    EmployeesRoutingModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ButtonsModule,
    WavesModule,
    CollapseModule
  ],
  entryComponents: [
    DeleteComponent
  ]
})
export class EmployeesModule { }

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { ResourceService } from '../services/api/resource/resource.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { DeleteComponent } from './pages/delete/delete.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public employees: Array<any> = [];
  public search: String = '';

  DeleteEmployeeModalRef = new MDBModalRef;

  public sending: Boolean = false;

  // Paginate
  public offset = 2;
  public pagination = {
    current_page: 0,
    from: 0,
    last_page: 0,
    per_page: 0,
    to: 0,
    total: 0,
  };

  elements: any = [
    { id: 1, first: 'Mark', last: 'Otto', handle: '@mdo' },
    { id: 2, first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { id: 3, first: 'Larry', last: 'the Bird', handle: '@twitter' },
  ];

  headElements = ['Nombre', 'Edad', 'Fecha de Contratación', 'Acciones'];

  constructor(
    private Resource: ResourceService,
    private ModalService: MDBModalService,
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  /**
  * Get all roles
  */
  getEmployees(page: number = 1) {
    this.sending = true;

    this.Resource.url = 'employees';
    this.Resource.index(this.search, page).subscribe(
      data => this.handleResponse(data.body),
      error => this.handleError(error)
    );
  }
  handleResponse(data: any) {
    this.sending = false;
    this.employees = data.data;

    //Pagination
    this.pagination = data.meta;

  }

  handleError(error: HttpErrorResponse) {
    this.sending = false;
    if (error.status == 500) {

    } else if (error.status == 401) {

    }
  }


  getAge(date_birth: Date){

    var date_now = new Date();
    var date_birth = new Date(date_birth);

    return date_now.getFullYear() - date_birth.getFullYear();
  }


  /**
   * Delete
   */

  delete(employee: any) {

    this.DeleteEmployeeModalRef = this.ModalService.show(DeleteComponent, {
      // backdrop: true,
      // keyboard: true,
      // focus: true,
      // show: false,
      // ignoreBackdropClick: false,
      class: 'modal-dialog modal-sm modal-notify modal-danger',
      containerClass: 'bottom',
      animated: true,
      data: {
        employee: employee
      }
    });

    this.DeleteEmployeeModalRef.content.action.subscribe((
      result: any) => {
      this.DeleteEmployeeModalRef.hide();

      this.getEmployees();
    });

  }

  //pagination
  isActived() {
    return this.pagination.current_page;
  };

  pagesNumber() {
    if (!this.pagination.to) {
      return [];
    }

    var from = this.pagination.current_page - this.offset; //TODO offset
    if (from < 1) {
      from = 1;
    }

    var to = from + (this.offset * 2); //TODO 
    if (to >= this.pagination.last_page) {
      to = this.pagination.last_page;
    }

    var pagesArray = [];
    while (from <= to) {
      pagesArray.push(from);
      from++;
    }

    return pagesArray;
  }

  changePage(page: any) {
    this.pagination.current_page = page;
    //this.employees = [];
    this.getEmployees(page);
  };

}

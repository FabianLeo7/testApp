import { Component, OnInit } from '@angular/core';

import { ResourceService } from 'src/app/services/api/resource/resource.service';
import { HttpErrorResponse } from '@angular/common/http';

import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  action = new Subject();
  public employee : any;

  public sending : boolean = false;

  constructor(
    public DeleteEmployeeModalRef : MDBModalRef,
    private Resource          : ResourceService,
  ) {
  }

  ngOnInit(): void {
  }

  onYesClick() {
    this.sending = true;

    this.Resource.url = 'employees';
    this.Resource.destroy(this.employee.id).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data : any){
    this.sending = false;
    this.action.next(this.employee);
  }

  handleError(error : HttpErrorResponse){
    this.sending = false;
    if(error.status == 500){
     
    }else if(error.status == 401){

    }
  }

}

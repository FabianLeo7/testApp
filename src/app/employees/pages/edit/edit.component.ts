import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResourceService } from 'src/app/services/api/resource/resource.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public validatingForm: any;
  public countries: any = [];

  public message_success = '';
  public message_error = '';
  public sending: boolean = false;

  public errors = {
    name: [],
    date_birth: [],
    country: [],
    position: [],
    username: [],
    hiring_date: [],
    status: [],
    area: [],
    commission: []
  };

  constructor(
    private Countries: CountriesService,
    private Resource: ResourceService,
    private Route: ActivatedRoute,
  ) {
    this.Countries.index().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  ngOnInit(): void {
    this.createForm();

    this.Route.paramMap.subscribe((params : any) => {
      this.Resource.url = 'employees';
      this.Resource.show(parseInt(params.get('id'))).subscribe(
        data => this.getEmployee(data.data),
        error => console.log(error)
      );
    });
  }

  getEmployee(data: any) {
    this.validatingForm = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl(data.name),
      date_birth: new FormControl(data.date_birth),
      country: new FormControl(data.country),
      username: new FormControl(data.username, Validators.compose([
        Validators.maxLength(150),
        Validators.required,
      ])),
      hiring_date: new FormControl(data.hiring_date),
      status: new FormControl(data.status),
      area: new FormControl(data.area),
      position: new FormControl(data.position),
      commission: new FormControl(data.commission),
    });

    this.setArea(data.area);

  }

  createForm() {
    this.validatingForm = new FormGroup({
      name: new FormControl(''),
      date_birth: new FormControl(''),
      country: new FormControl(''),
      username: new FormControl('', Validators.compose([
        Validators.maxLength(150),
        Validators.required,
      ])),
      hiring_date: new FormControl(''),
      status: new FormControl(''),
      area: new FormControl(''),
      position: new FormControl(''),
      commission: new FormControl(''),
    });
  }

  /*
   * Validate inputs
   */
  get id() {
    return this.validatingForm.get('id');
  }

  get name() {
    return this.validatingForm.get('name');
  }

  get date_birth() {
    return this.validatingForm.get('date_birth');
  }

  get country() {
    return this.validatingForm.get('country');
  }

  get username() {
    return this.validatingForm.get('username');
  }

  get hiring_date() {
    return this.validatingForm.get('hiring_date');
  }

  get status() {
    return this.validatingForm.get('status');
  }

  get area() {
    return this.validatingForm.get('area');
  }

  get position() {
    return this.validatingForm.get('position');
  }

  get commission() {
    return this.validatingForm.get('commission');
  }

  setArea(data: string) {
    this.validatingForm.get('area').value = data;
  }

  onSubmit() {

    this.sending = true;
    this.message_success = '';
    this.message_error = '';

    this.errors = {
      name: [],
      date_birth: [],
      country: [],
      position: [],
      username: [],
      hiring_date: [],
      status: [],
      area: [],
      commission: []
    };

    this.Resource.url = 'employees';
    this.Resource.update(this.validatingForm.get('id').value, this.validatingForm.value).subscribe(
      data => this.hanldeResponse(data),
      error => this.handleError(error)
    );

  }

  hanldeResponse(data: any) {
    this.sending = false;
    this.message_success = 'Empleado actualizado exitosamente.'

  }

  handleError(error: HttpErrorResponse) {
    this.sending = false;
    if (error.status == 422) {
      this.setErrors(error.error.errors);
      this.message_error = error.error.message;

    } else if (error.status == 500) {
      this.message_error = 'Error: comunícate con el administrador.';
    } else if (error.status == 401) {
      this.message_error = 'Sessión expirada';
    }
  }

  setErrors(error: any) {

    if (error.name) {
      this.errors.name = error.name;
    }

    if (error.date_birth) {
      this.errors.date_birth = error.date_birth;
    }

    if (error.country) {
      this.errors.country = error.country;
    }

    if (error.position) {
      this.errors.position = error.position;
    }

    if (error.username) {
      this.errors.username = error.username;
    }

    if (error.hiring_date) {
      this.errors.hiring_date = error.hiring_date;
    }

    if (error.status) {
      this.errors.status = error.status;
    }

    if (error.area) {
      this.errors.area = error.area;
    }

    if (error.commission) {
      this.errors.commission = error.commission;
    }

  }

}

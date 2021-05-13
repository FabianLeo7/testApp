import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResourceService } from 'src/app/services/api/resource/resource.service';
import { CountriesService } from 'src/app/services/countries/countries.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public validatingForm: any;

  public countries: any = [];

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
    private Resource: ResourceService
  ) {
    this.Countries.index().subscribe(
      data => {
        this.countries = data;
      }
    );
  }

  ngOnInit(): void {
    this.createForm();
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

  onSubmit() {

    this.sending = true;
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
    this.Resource.store(this.validatingForm.value).subscribe(
      data => this.hanldeResponse(data),
      error => this.handleError(error)
    );

  }

  hanldeResponse(data: any) {
    this.sending = false;
    this.createForm();
  }

  handleError(error: HttpErrorResponse) {
    this.sending = false;
    if (error.status == 422) {
      this.setErrors(error.error.errors);

    } else if (error.status == 500) {

    } else if (error.status == 401) {

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

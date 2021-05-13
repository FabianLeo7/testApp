import { Component, OnInit } from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ResourceService } from 'src/app/services/api/resource/resource.service';
import { CountriesService } from 'src/app/services/countries/countries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {

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

  getEmployee(data: any) {
    this.validatingForm = new FormGroup({
      id: new FormControl(data.id, Validators.required),
      name: new FormControl({value: data.name, disabled: true}),
      date_birth: new FormControl({value: data.date_birth, disabled: true}),
      country: new FormControl({value: data.country, disabled: true}),
      username: new FormControl({value: data.username, disabled: true}, Validators.compose([
        Validators.maxLength(150),
        Validators.required,
      ])),
      hiring_date: new FormControl({value: data.hiring_date, disabled: true}),
      status: new FormControl({value: data.status, disabled: true}),
      area: new FormControl({value: data.area, disabled: true}),
      position: new FormControl({value: data.position, disabled: true}),
      commission: new FormControl({value: data.commission, disabled: true}),
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
}

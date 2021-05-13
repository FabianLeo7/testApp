import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CountriesService } from 'src/app/services/countries/countries.service';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  public validatingForm: any;

  public  countries : any = [];

public sending : boolean = false;

  public errors = {
    name: [],
    date_birth: [],
    country: [],
    position: [],
    username: [],
    hiring_date: [],
    status: [],
    area: [],
    commission : []
  };

  constructor(
    private Countries: CountriesService
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

  }

}

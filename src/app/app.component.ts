import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CountryService } from './countries.service';
import { Country } from './country';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'geography';
  regions: string[] = ['Asia', 'Europe'];
  countriesData: Country[] = [];
  countriesName: string[] = [];
  tableHeaders: string[] = [
    'Name',
    'Capital',
    'Population',
    'Currencies',
    'Flag',
  ];
  selectedCountryDetails: Country;
  countryDropDownFlag: boolean = false;
  countryCurrency: string;
  showCountryDetails : boolean =  false;

  form: FormGroup;

  constructor(private countryService: CountryService) {}

  ngOnInit() {
    this.form = new FormGroup({
      region: new FormControl(''),
      country: new FormControl(''),
    });
    
    this.dropDownChange();
  }

  dropDownChange() {
    this.countryService.dropDownChange.subscribe((data) => {
      console.log(data);
      if (this.regions.includes(data)) {
        this.onRegionChange();
      } 
    });
  }

  onRegionChange() {
    let regionValue = this.form.get('region').value;
    this.countriesData =
      regionValue === 'Europe'
        ? this.countryService.countriesDataEurope
        : this.countryService.countriesDataAsia;
    if(this.countriesData.length > 0) {
      this.countriesName = this.getCountryName(this.countriesData);
    }
    else {
      this.countryService.getCountries(regionValue)
      .subscribe((data) => {
        this.countriesData = data;
        this.countriesName = this.getCountryName(this.countriesData);
        console.log(this.countriesName);
        this.countryService.saveCountryDetails(data, regionValue);
    });
    }
    
    this.countryDropDownFlag = true;
  }

  getCountryName(countriesData: Country[]) {
    console.log(countriesData);
    return this.countriesData.map((country) => {
      return country.name;
    });
  }

  onLoadCountry() {
    console.log(` ${this.form.get('country').value}`);
    let selectedCountry = this.form.get('country').value;
    this.selectedCountryDetails = this.countriesData.find((country) => {
      return country['name'] === selectedCountry;
    });
    this.showCountryDetails = true;

    console.log(this.selectedCountryDetails);
  }

}


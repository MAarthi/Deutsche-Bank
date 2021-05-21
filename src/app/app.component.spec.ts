import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CountryService } from './countries.service';
import { DropdownComponent } from './dropdown/dropdown.component';
import { By } from "@angular/platform-browser";
import { from } from "rxjs";

import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';


describe('AppComponent', () => {
  let fixture : ComponentFixture<AppComponent> ;
  let app : AppComponent;
  let service : CountryService; 
  let fakeAsiaCountryList = [
    {
       "name":"Afghanistan",
       "capital":"Kabul",
       "population":27657145,
       "currencies":[
          {
             "code":"AFN",
             "name":"Afghan afghani",
             "symbol":"؋"
          }
       ],
       "flag":"https://restcountries.eu/data/afg.svg"
    },
    {
       "name":"Armenia",
       "capital":"Yerevan",
       "population":2994400,
       "currencies":[
          {
             "code":"AMD",
             "name":"Armenian dram",
             "symbol":null
          }
       ],
      
       "flag":"https://restcountries.eu/data/arm.svg"
    }];

    let fakeEuropeCountryList = [ 
    {
      "name":"Andorra",
      "capital":"Andorra la Vella",
      "population":78014,
      "currencies":[
         {
            "code":"EUR",
            "name":"Euro",
            "symbol":"€"
         }
      ],
      "flag":"https://restcountries.eu/data/and.svg",
   },
   {
      "name":"Austria",
      "capital":"Vienna",
      "population":8725931,
      "currencies":[
         {
            "code":"EUR",
            "name":"Euro",
            "symbol":"€"
         }
      ],
      "flag":"https://restcountries.eu/data/aut.svg"
   }]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [
        HttpClientModule
      ],
      declarations: [
        AppComponent,
        DropdownComponent
      ],
      providers : [ CountryService ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    service = TestBed.get(CountryService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should subscribe to dropDownChange observable and call onRegionChange method', () => {
    service.dropDownChange.next('Asia');
    app.dropDownChange();
    expect(app.countryDropDownFlag).toBe(true);
  });

  it('should get countries for region - Europe from the service', () => {
    spyOn(service,'getCountries').and.returnValue(from([fakeEuropeCountryList]));
    service.dropDownChange.next('Europe');
    app.dropDownChange();
    expect(app.countriesName).toContain('Austria');
  });

  it('should get countries for region - Asia from the service', () => {
    spyOn(service,'getCountries').and.returnValue(from([fakeAsiaCountryList]));
    service.dropDownChange.next('Asia');
    app.dropDownChange();
    expect(app.countriesName).toContain('Afghanistan');
  });

  it('should call the onLoadCountry() upon button click' , () => {
    
    spyOn(service,'getCountries').and.returnValue(from([fakeEuropeCountryList]));
    service.dropDownChange.next('Europe');
    app.dropDownChange();
    app.form = new FormGroup({
      region: new FormControl(''),
      country: new FormControl(''),
    });
    app.form.get('country').setValue('Austria');
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#loadCountry');
    console.log(`Flag Value: ${app.countryDropDownFlag} ${button}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    expect(app.showCountryDetails).toBeTruthy();
  });

  it('should load the country details upon button click' , () => {
    
    spyOn(service,'getCountries').and.returnValue(from([fakeEuropeCountryList]));
    service.dropDownChange.next('Europe');
    app.dropDownChange();
    app.form = new FormGroup({
      region: new FormControl(''),
      country: new FormControl(''),
    });
    app.form.get('country').setValue('Austria');
    fixture.detectChanges();
    let button = fixture.debugElement.nativeElement.querySelector('#loadCountry');
    console.log(`Flag Value: ${app.countryDropDownFlag} ${button}`);
    button.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    let td = fixture.debugElement.query(By.css('table td')).nativeElement;
    expect(td.textContent ).toBe('Austria');
  });
});

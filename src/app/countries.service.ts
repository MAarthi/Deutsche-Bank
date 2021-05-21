import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { Country } from "./country";

@Injectable({
    providedIn  : 'root'
})
export class CountryService {
    europeEndPoint = "https://restcountries.eu/rest/v2/region/europe";
    asiaEndPoint = "https://restcountries.eu/rest/v2/region/asia";


    dropDownChange: Subject<string> = new Subject<string>();
    countriesDataEurope: Country[] = [];
    countriesDataAsia: Country[] = [];


    constructor(private httpClient: HttpClient) {
        
    }

    saveCountryDetails(countriesData, region : string) {

        region === 'Europe'
          ? (this.countriesDataEurope = countriesData)
          : (this.countriesDataAsia = countriesData);
    }

    getCountries(region : string):Observable<any> {
        return this.httpClient.get(region === 'Europe'? this.europeEndPoint : this.asiaEndPoint );
    }

}
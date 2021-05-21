import { Component, OnInit, Input} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CountryService } from '../countries.service';
import { Country } from "../country";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  @Input('dropDownOptions') dropDownOptions : any[];
  @Input('labelName') labelName : string;
  @Input('formName') form : FormGroup;
  value : string ='';

  constructor(private countryService : CountryService) { }

  ngOnInit(): void {
    console.log(`${this.dropDownOptions} - dropDown`);
  }

  onDropDownChange() {
    this.value = this.form.get(this.labelName).value;
    this.countryService.dropDownChange.next(this.value);
  }
}

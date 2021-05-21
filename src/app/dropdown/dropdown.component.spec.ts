import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from "@angular/platform-browser";
import { CountryService } from '../countries.service';
import { DropdownComponent } from './dropdown.component';

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports : [HttpClientModule,
                ReactiveFormsModule],
      declarations: [ DropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
    component.form = new FormGroup({
      region: new FormControl(''),
      country: new FormControl(''),
    });
    component.labelName = 'region';
    component.dropDownOptions = ['Asia', 'Europe'];
    fixture.detectChanges();
  });

  it('should emit the dropdown value whenever onDropDownChange is called', () => {

    let dropDown: HTMLSelectElement = fixture.debugElement.query(By.css('.form-control')).nativeElement;
    dropDown.value = dropDown.options[1].value;
    console.log(dropDown.value);
   
    dropDown.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.value).toBe('Europe');
  });
});

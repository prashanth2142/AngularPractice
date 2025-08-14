import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reactive-form-example',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reactive-form-example.component.html',
  styleUrl: './reactive-form-example.component.css'
})
export class ReactiveFormExampleComponent {
  userForm!: FormGroup;

  // ngOnInit() {
  //   this.userForm = new FormGroup({
  //     name: new FormControl('', [Validators.required]),
  //     email: new FormControl('', [Validators.required, Validators.email]),
  //   });
  // }

  // onSubmit() {
  //   if (this.userForm.valid) {
  //     alert('Form Submitted');
  //   }
  // }
  ngOnInit() {
    this.userForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      address2: new FormControl(''),
      city: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required, Validators.maxLength(5)]),
    });
  }

  get firstNameCheck() { return this.userForm.get('firstName'); }
  get lastName() { return this.userForm.get('lastName'); }
  get address() { return this.userForm.get('address'); }
  get city() { return this.userForm.get('city'); }
  get state() { return this.userForm.get('state'); }
  get postalCode() { return this.userForm.get('postalCode'); }


  onSubmit() {
    if (this.userForm.valid) {
      console.log('Form Submitted', this.userForm.value);
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test-form',
  standalone: false,
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.css'
})
export class TestFormComponent {
myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      textInput: ['', Validators.required],
      fileInput: [null]
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.myForm.patchValue({
        fileInput: file
      });
    }
  }

  getFormValues() {
    if (this.myForm.valid) {
      const textValue = this.myForm.get('textInput')?.value;
      const fileValue = this.myForm.get('fileInput')?.value;
      
      console.log('Text Input:', textValue);
      console.log('File Input:', fileValue);
      
      // You can now use these values as needed
      this.processFormData(textValue, fileValue);
    } else {
      console.log('Form is invalid');
    }
  }

  processFormData(text: string, file: File) {
    // Process your form data here
    console.log('Processing:', text, file);
  }
}

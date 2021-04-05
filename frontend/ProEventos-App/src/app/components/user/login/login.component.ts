import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  forms!: FormGroup;

  get f(): any {
    return this.forms.controls;
  }

  constructor(public fb: FormBuilder) { }


  ngOnInit(): void {
  }

  public validation(): void {
    this.forms = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', [Validators.required]],
    });
  }

  public resetForm(): void {
    return this.forms.reset();
  }

}

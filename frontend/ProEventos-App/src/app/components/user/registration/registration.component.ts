import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  forms!: FormGroup;

  get f(): any {
    return this.forms.controls;
  }

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    }

    this.forms = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      ultimoNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha: ['', [Validators.required]],
    }, formOptions);
  }

  public resetForm(): void {
    return this.forms.reset();
  }

}

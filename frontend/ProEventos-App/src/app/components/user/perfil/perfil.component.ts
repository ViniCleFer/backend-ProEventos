import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

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
      titulo: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      primeiroNome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      ultimoNome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required]],
      funcao: ['', [Validators.required]],
      descricao: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmeSenha: ['', [Validators.required]],
    }, formOptions);
  }

  public resetForm(event: any): void {
    event?.preventDefault()
    return this.forms.reset();
  }

  public cssValidators(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

}

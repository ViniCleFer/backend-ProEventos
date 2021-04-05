import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  forms!: FormGroup;

  get f(): any {
    return this.forms.controls;
  }

  constructor(public fb: FormBuilder) { }

  ngOnInit(): void {
    this.validation();
  }

  public validation(): void {
    this.forms = this.fb.group({
      tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      local: ['', [Validators.required]],
      dataEvento: ['', [Validators.required]],
      qtdPessoas: ['', [Validators.required, Validators.max(120000)]],
      telefone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      imagemUrl: ['', [Validators.required]],
    });
  }

  public resetForm(): void {
    return this.forms.reset();
  }

}

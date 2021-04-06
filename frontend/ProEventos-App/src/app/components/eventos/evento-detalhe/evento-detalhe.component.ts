import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/model/evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  forms!: FormGroup;
  evento = {} as Evento;
  estadoSalvar = 'post';

  get f(): any {
    return this.forms.controls;
  }

  get bsConfig(): any {
    return {
      adaptivePosition: true,
      isAnimated: true,
      dateInputFormat: 'DD/MM/YYYY hh:mm a',
      containerClass: 'theme-default',
      showWeekNumbers: false
    }
  }

  constructor(
    public fb: FormBuilder,
    private localeService: BsLocaleService,
    private router: ActivatedRoute,
    private eventoService: EventoService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
    this.localeService.use('pt-br');
  }

  carregarEvento(): void {
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null) {
      this.estadoSalvar = 'put';

      this.spinner.show();
      this.eventoService.getEventoById(+eventoIdParam).subscribe(
        (evento: Evento) => {
          this.evento = {...evento};
          this.forms.patchValue(evento);
        },
        (error: any) => {
          this.toast.error('Erro ao tentar carregar Evento.', 'Erro!')
          console.error(error);
        },
      ).add(() => this.spinner.hide())
    }
  }

  ngOnInit(): void {
    this.carregarEvento();
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

  public cssValidators(campoForm: FormControl): any {
    return {'is-invalid': campoForm.errors && campoForm.touched};
  }

  public salvarEvento(): void {
    this.spinner.show();

    if (this.forms.valid) {

      this.evento = (this.estadoSalvar === 'post')
        ? {...this.forms.value}
        : {id: this.evento.id, ...this.forms.value};

      this.eventoService[this.estadoSalvar === 'post' ? 'post' : 'put'](this.evento).subscribe(
        () => this.toast.success('Evento salvo com sucesso!', 'Sucesso!'),
        (error: any) => {
          console.error(error);
          this.toast.success('Erro ao salvar o evento', 'Erro!');
        }
      ).add(
        () => {
          this.spinner.hide();
          this.carregarEvento();
        }
      );
    }
  }
}

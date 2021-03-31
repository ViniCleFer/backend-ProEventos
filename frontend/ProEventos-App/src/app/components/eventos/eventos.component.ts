import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from 'src/app/model/evento';

import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {
  modalRef = {} as BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public larguraImagem = 100;
  public margemImagem = 2;
  public exibirImagem = true;
  private filtroListado = '';

  public filtrarEventos(filtrarPor: string): Evento[] {
    filtrarPor = filtrarPor.toLocaleLowerCase();
    return this.eventos.filter(
      (evento: any) => evento.tema.toLowerCase().indexOf(filtrarPor) !== -1 ||
        evento.local.toLowerCase().indexOf(filtrarPor) !== -1
    );
  }

  public get filtroLista(): string {
    return this.filtroListado;
  }

  public set filtroLista(value: string) {
    this.filtroListado = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  constructor(
    private eventoService: EventoService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }

  public mostrarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public getEventos(): any {
    this.eventoService.getEventos().subscribe({
      next: (responseEventos: Evento[]) => {
        this.eventos = responseEventos,
        this.eventosFiltrados = this.eventos;
      },
      error: () => {
        this.spinner.hide();
        this.toastr.success('Erro ao carregar os eventos!', 'Error!');
      },
      complete: () => this.spinner.hide()
    });
  }

  public openModal(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef.hide();
    this.toastr.success('O Evento foi excluído com sucesso!', 'Excluído!');
  }

  public decline(): void {
    this.modalRef.hide();
  }

}

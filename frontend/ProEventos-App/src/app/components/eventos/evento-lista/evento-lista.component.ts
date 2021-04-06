import { Component, OnInit,TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

import { Evento } from 'src/app/model/evento';

import { EventoService } from 'src/app/services/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {
  modalRef = {} as BsModalRef;

  public eventos: Evento[] = [];
  public eventosFiltrados: Evento[] = [];
  public eventoId = 0;

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
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.spinner.show();
    this.carregarEventos();
  }

  public mostrarImagem(): void {
    this.exibirImagem = !this.exibirImagem;
  }

  public carregarEventos(): any {
    this.eventoService.getEventos().subscribe(
      (responseEventos: Evento[]) => {
        this.eventos = responseEventos,
        this.eventosFiltrados = this.eventos;
      },
      () => {
        this.toastr.success('Erro ao carregar os eventos!', 'Error!');
      },
    ).add(() => this.spinner.hide());
  }

  public openModal(event: any, template: TemplateRef<any>, eventoId: number): void {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  public confirm(): void {
    this.modalRef.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe(
      (result: any) => {
        if (result.message === 'Deletado') {
          this.toastr.success('O Evento foi excluído com sucesso!', 'Excluído!');
        }
      },
      (error: any) => {
        console.error(error);
        this.toastr.success(`Erro ao tentar excluir o evento ${this.eventoId}`, 'Erro!');
      },
    ).add(() => {
      this.spinner.hide();
      this.carregarEventos();
    });

  }

  public decline(): void {
    this.modalRef.hide();
  }

  detalheEvento(id: number): void{
    this.router.navigate([`/eventos/detalhe/${id}`]);
  }
}

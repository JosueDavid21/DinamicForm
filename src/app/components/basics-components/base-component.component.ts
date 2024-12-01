import { Component, OnInit } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from "primeng/api";
import { NavigationExtras, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { lastValueFrom } from "rxjs";
import { BaseService } from '../../services/base-service.service';
import { BaseTask } from '../../models/base-task.model';

@Component({
  template: ''
})
export abstract class BaseComponent<T extends BaseTask> implements OnInit {

  listaEntidad: T[] = [];
  inicio = 0;
  filas = 10;
  totalRegistros: number = 0;
  descripcionAnulacion: string = "";
  entidadSeleccionada: T = <T>{};
  indexTabProceso: number = 0;
  tabReporteActivo: boolean = false;
  esNuevo: boolean = true;
  entidad: T = <T>{};

  form: FormGroup;

  constructor(protected messageService: MessageService,
    protected baseService: BaseService<T>,
    protected router: Router,
    protected formBuilder: FormBuilder,
    protected confirmationServicio: ConfirmationService,
    protected primeNGConfig: PrimeNGConfig) {

    this.form = formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      state: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  abstract getNameReturn(): string;

  abstract getField(): string[];
  
  getMensajeDeAdvertencia(): Message {
    return {
      severity: 'warn',
      summary: 'Warning',
      detail: 'Select Register',
      life: 500
    }
  }

  addChildForm(name: string, group: FormBuilder) {
    this.form.addControl(name, group);
    // console.log(Object.keys(this.form.value) + "=" + " " + Object.keys(group.value) + ":" + Object.values(group.value))
  }

  async editEntity(id: number) {
    let entidadEditar = <T>{};
    try {
      entidadEditar = await this.loadDataEdit(id);
    } catch (error: any) {
      await this.router.navigate(["/" + this.getNameReturn()], {
        queryParams: error.error
      })
    }
    return entidadEditar;
  }

  async captureDataEdit() {
    const extrasNavegacion = this.router.getCurrentNavigation();
    const id = extrasNavegacion?.extras.state;
    let entidadEditar = <T>{};
    if (id) {
      entidadEditar = await this.editEntity(id['id'])
      this.esNuevo = false;
    }
    return entidadEditar;
  }

  listEntity(endpointBase?: string) {
    this.listaEntidad = [];
    this.baseService.getAll().subscribe({
      next: (x: any) => {
        this.listaEntidad = x.content;
        this.totalRegistros = x.totalElements;
      }, error: (error) => {
        console.log(error)
      }
    });
  }

  save(endpointBase: string): void {
    // this.entidad = this.form.value as T;
    this.baseService.create(this.entidad).subscribe({
      next: (x: any) => {
        this.router.navigate(["/" + this.getNameReturn()]);
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Success Save',
          life: 3000
        })
      }, error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error ocurred: ' + error.error.message,
          life: 3000
        })
      }
    });
  }

  delete(id: number, endpointBase?: string): void {
    this.confirmationServicio.confirm({
      message: 'Are you sure?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.baseService.delete(id).subscribe({
          next: (x: any) => {
            // this.listarEntidad([]);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Success Save',
              life: 3000
            })
          }, error: (error) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error ocurred: ' + error.error.message,
              life: 3000
            })
          }
        });
      }
    });
  }

  update(entidad: T) {
    const extrasNavegacion: NavigationExtras = {
      state: { id: entidad }
    };
    this.router.navigate(["/" + this.getNameReturn() + "-crear-editar"], extrasNavegacion)
  }

  async loadDataEdit(id: number, endpointBase?: string): Promise<T> {
    return await lastValueFrom(this.baseService.getById(id))
  }
}

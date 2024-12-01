import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService, Message, MessageService, PrimeNGConfig } from "primeng/api";
import {
  FormsModule, FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ProjectService } from '../../services/project/project-app.service';
import { BaseComponent } from '../basics-components/base-component.component';
import { Project } from '../../models/project-app.model';
import { Router } from '@angular/router';
import { AppConstants } from '../../constants/app-constants';

@Component({
  selector: 'app-project-app',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, InputTextModule, DropdownModule],
  templateUrl: './project-app.component.html',
  styleUrl: './project-app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProjectAppComponent extends BaseComponent<Project> implements OnInit {

  detailFirstLevelForm!: FormGroup;
  private options = [
    { name: 'In Progress' },
    { name: 'Finished' },
    { name: 'Approved' }
  ];

  constructor(messageService: MessageService, private projectService: ProjectService, router: Router,
    formBuilder: FormBuilder, confirmationService: ConfirmationService, primengConfig: PrimeNGConfig
  ) {
    super(messageService, projectService, router, formBuilder, confirmationService, primengConfig);
  }

  override ngOnInit(): void {
    this.detailFirstLevelForm = this.formBuilder.group({
      planDetail: this.formBuilder.array([])
    });
  }

  // private loadAllData(): void {
  //   this.projectService.getAll().subscribe((data) => {
  //     data.forEach(item => {
  //       this.detallePrimerNivel.push(this.loadPhases(item));
  //     });
  //   });
  // }

  // private loadPhases(project: Project): FormGroup {
  //   const detallePlan = this.formBuilder.array([]);
  //   project.detailProjectList.forEach(item => {
  //     detallePlan.push(this.formBuilder.group({
  //       nombre: [item.name, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }],
  //       estado: [item.status, Validators.required],
  //       detallePlan: this.formBuilder.array([])
  //     }));
  //   });
  //   return this.formBuilder.group({
  //     nombre: [project.name, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }],
  //     estado: [project.status, Validators.required],
  //     detallePlan
  //   });
  // }

  override getNameReturn(): string {
    return AppConstants.PROJECT_URL;
  }

  override getField(): string[] {
    return ['*']
  }

  override save() {
    console.log(this.detailFirstLevelForm.value);
  }

  private createPlanDetail(): FormGroup {
    return this.formBuilder.group({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(50)] }),
      state: [''],
      planDetail: this.formBuilder.array([])
    });
  }

  get firstLevelDetail(): FormArray {
    return this.detailFirstLevelForm.get('planDetail') as FormArray;
  }

  addFirstLevelDetail(): void {
    this.firstLevelDetail.push(this.createPlanDetail());
  }

  deleteFirstLevelDetail(rowIndex: number): void {
    this.firstLevelDetail.removeAt(rowIndex);
  }

  //                        Second Level Detail
  detailSecondLevel(rowIndex: number): FormArray {
    return this.firstLevelDetail.at(rowIndex)?.get('planDetail') as FormArray;
  }

  addSecondLevelDetail(rowIndex: number): void {
    this.detailSecondLevel(rowIndex).push(this.createPlanDetail());
  }

  deleteSecondLevelDetail(rowIndex: number, rowSubIndex: number): void {
    this.detailSecondLevel(rowIndex).removeAt(rowSubIndex);
  }
}
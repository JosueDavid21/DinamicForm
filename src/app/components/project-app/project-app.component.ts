import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import {
  FormsModule, FormArray, FormBuilder, FormControl, FormGroup,
  ReactiveFormsModule, Validators
} from "@angular/forms";
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-app',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, TableModule, InputTextModule, DropdownModule],
  templateUrl: './project-app.component.html',
  styleUrl: './project-app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class ProjectAppComponent implements OnInit {

  detailFirstLevelForm!: FormGroup;
  private options = [
    { name: 'In Progress' },
    { name: 'Finished' },
    { name: 'Approved' }
  ];

  constructor(private router: Router, private formBuilder: FormBuilder, private primengConfig: PrimeNGConfig
  ) {
  }

  ngOnInit(): void {
    this.detailFirstLevelForm = this.formBuilder.group({
      planDetail: this.formBuilder.array([])
    });
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
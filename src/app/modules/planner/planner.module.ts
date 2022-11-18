import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerRoutingModule } from './planner-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { PlannerComponent } from './planner.component';

@NgModule({
  declarations: [
    PlannerComponent
  ],
  imports: [
    CommonModule,
    PlannerRoutingModule,
    ReactiveFormsModule
  ]
})
export class PlannerModule { }

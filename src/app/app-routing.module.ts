import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./modules/planner/planner.module').then(m => m.PlannerModule) },
  { path: '**', loadChildren: () => import('./modules/planner/planner.module').then(m => m.PlannerModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

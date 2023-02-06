import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FormViewComponent } from './form-view/form-view.component';
import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  { path: 'form', component: FormViewComponent},
  { path: 'table', component: TableViewComponent},
  { path: '**',  redirectTo: '/form'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

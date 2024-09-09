import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingersComponent } from './components/singers/singers.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home page
  { path: 'singers', component: SingersComponent } // Singers page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';


const routes: Routes = [
  {
    path: "signin",
    component: SigninComponent,
  },
  {
    path: "**",
    redirectTo: "signin"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
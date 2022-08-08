import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PorfolioComponent } from './component/porfolio/porfolio.component';
import { RegisterComponent } from './login/registrar/registrar.component';

const routes: Routes = [
  {path: "porfolio", component:PorfolioComponent},
  {path: "login", component:LoginComponent},
  {path: "", redirectTo:"porfolio", pathMatch:"full" },
  // {path: "registrar", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

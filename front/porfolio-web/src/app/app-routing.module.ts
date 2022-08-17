import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { RegisterComponent } from './login/registrar/registrar.component';

const routes: Routes = [
  {path: "portfolio", component:PortfolioComponent},
  {path: "login", component:LoginComponent},
  {path: "", redirectTo:"portfolio", pathMatch:"full" },
  {path: "registrar", component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

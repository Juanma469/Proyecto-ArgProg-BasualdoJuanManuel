import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/portfolio/header/header.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EducacionComponent } from './component/portfolio/educacion/educacion.component';
import { ExperienciaComponent } from './component/portfolio/experiencia/experiencia.component';
import { HardsoftskillsComponent } from './component/portfolio/hardsoftskills/hardsoftskills.component';
import { ProyectosComponent } from './component/portfolio/proyectos/proyectos.component';
import { FooterComponent } from './component/footer/footer.component';
import { AcercadeComponent } from './component/portfolio/acercade/acercade.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { PortfolioComponent } from './component/portfolio/portfolio.component';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './login/registrar/registrar.component';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';

import { OrdenarPorAnioPipe } from './pipe/ordenar-por-anio.pipe';






@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavbarComponent,
    EducacionComponent,
    ExperienciaComponent,
    HardsoftskillsComponent,
    ProyectosComponent,
    FooterComponent,
    AcercadeComponent,
    PortfolioComponent,
    LoginComponent,
    RegisterComponent,
    OrdenarPorAnioPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

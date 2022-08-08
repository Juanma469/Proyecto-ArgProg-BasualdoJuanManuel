import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/porfolio/header/header.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EducacionComponent } from './component/porfolio/educacion/educacion.component';
import { ExperienciaComponent } from './component/porfolio/experiencia/experiencia.component';
import { HardsoftskillsComponent } from './component/porfolio/hardsoftskills/hardsoftskills.component';
import { ProyectosComponent } from './component/porfolio/proyectos/proyectos.component';
import { FooterComponent } from './component/footer/footer.component';
import { AcercadeComponent } from './component/porfolio/acercade/acercade.component';

import { NgCircleProgressModule } from 'ng-circle-progress';
import { PorfolioComponent } from './component/porfolio/porfolio.component';
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';

import {AngularFireModule} from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { RegisterComponent } from './login/registrar/registrar.component';
import { FormsModule } from '@angular/forms';

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
    PorfolioComponent,
    LoginComponent,
    RegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({}),
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

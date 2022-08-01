import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { EducacionComponent } from './component/educacion/educacion.component';
import { ExperienciaComponent } from './component/experiencia/experiencia.component';
import { HardsoftskillsComponent } from './component/hardsoftskills/hardsoftskills.component';
import { ProyectosComponent } from './component/proyectos/proyectos.component';
import { FooterComponent } from './component/footer/footer.component';
import { AcercadeComponent } from './component/acercade/acercade.component';

import { NgCircleProgressModule } from 'ng-circle-progress';

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
    AcercadeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

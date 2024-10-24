import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Componentes/login/login.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './Componentes/header/header.component';
import { InicioNoRegistradoComponent } from './Componentes/inicio-no-registrado/inicio-no-registrado.component';
import { RegistrarseComponent } from './Componentes/registrarse/registrarse.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeComponent } from './Componentes/home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { NuevoTurnoComponent } from './Componentes/nuevo-turno/nuevo-turno.component';
import { MisTurnosComponent } from './Componentes/mis-turnos/mis-turnos.component';
import { MatTableModule } from '@angular/material/table';
import { DatosPersonalesComponent } from './Componentes/datos-personales/datos-personales.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    LoginComponent,
    HeaderComponent,
    InicioNoRegistradoComponent,
    RegistrarseComponent,
    HomeComponent,
    NuevoTurnoComponent,
    MisTurnosComponent,
    DatosPersonalesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

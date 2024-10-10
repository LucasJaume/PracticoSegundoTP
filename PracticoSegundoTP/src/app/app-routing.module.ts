import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioNoRegistradoComponent } from './Componentes/inicio-no-registrado/inicio-no-registrado.component';
import { HomeComponent } from './Componentes/home/home.component';
import { NuevoTurnoComponent } from './Componentes/nuevo-turno/nuevo-turno.component';
import { MisTurnosComponent } from './Componentes/mis-turnos/mis-turnos.component';
import { DatosPersonalesComponent } from './Componentes/datos-personales/datos-personales.component';

const routes: Routes = [
  {path:'home-login', component:InicioNoRegistradoComponent},
  {path:'', redirectTo:'home-login', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'Nuevo', component:NuevoTurnoComponent},
  {path:'misTurnos', component:MisTurnosComponent},
  {path:'datosPersonales', component:DatosPersonalesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

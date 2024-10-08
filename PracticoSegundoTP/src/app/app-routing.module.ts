import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioNoRegistradoComponent } from './Componentes/inicio-no-registrado/inicio-no-registrado.component';
import { HomeComponent } from './Componentes/home/home.component';
import { NuevoTurnoComponent } from './Componentes/nuevo-turno/nuevo-turno.component';

const routes: Routes = [
  {path:'home-login', component:InicioNoRegistradoComponent},
  {path:'', redirectTo:'home-login', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'Nuevo', component:NuevoTurnoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioNoRegistradoComponent } from './Componentes/inicio-no-registrado/inicio-no-registrado.component';
import { LoginComponent } from './Componentes/login/login.component';
import { RegistrarseComponent } from './Componentes/registrarse/registrarse.component';
import { HomeComponent } from './Componentes/home/home.component';

const routes: Routes = [
  {path:'home-login', component:InicioNoRegistradoComponent},
  {path:'', redirectTo:'home-login', pathMatch:'full'},
  {path:'home', component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioNoRegistradoComponent } from './Componentes/inicio-no-registrado/inicio-no-registrado.component';
import { HomeComponent } from './Componentes/home/home.component';
import { NuevoTurnoComponent } from './Componentes/nuevo-turno/nuevo-turno.component';
import { MisTurnosComponent } from './Componentes/mis-turnos/mis-turnos.component';
import { DatosPersonalesComponent } from './Componentes/datos-personales/datos-personales.component';
import { VistaAdministradorComponent } from './Componentes/vista-administrador/vista-administrador.component';
import { VistaMedicoComponent } from './Componentes/vista-medico/vista-medico.component';
import { TurnosProgramadosComponent } from './Componentes/turnos-programados/turnos-programados.component';
import { GestionAgendasComponent } from './Componentes/gestion-agendas/gestion-agendas.component';
import { VistaOperadorComponent } from './Componentes/vista-operador/vista-operador.component';
import { OperadorCrearPacienteComponent } from './Componentes/operador-crear-paciente/operador-crear-paciente.component';
import { OperadorAsignarTurnosComponent } from './Componentes/operador-asignar-turnos/operador-asignar-turnos.component';
import { OperadorGestionMedicoComponent } from './Componentes/operador-gestion-medico/operador-gestion-medico.component';
import { OperadorPacientesDelDiaComponent } from './Componentes/operador-pacientes-del-dia/operador-pacientes-del-dia.component';

const routes: Routes = [
  {path:'home-login', component:InicioNoRegistradoComponent},
  {path:'', redirectTo:'home-login', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'Nuevo', component:NuevoTurnoComponent},
  {path:'misTurnos', component:MisTurnosComponent},
  {path:'datosPersonales', component:DatosPersonalesComponent},
  {path: 'vistaAdministrador', component:VistaAdministradorComponent},
  {path: 'vistaMedico', component:VistaMedicoComponent},
  {path: 'turnosProgramados', component:TurnosProgramadosComponent},
  {path: 'gestionAgendas', component:GestionAgendasComponent},
  {path: 'vistaOperador', component:VistaOperadorComponent},
  {path: 'vistaCrearPaciente', component:OperadorCrearPacienteComponent},
  {path: 'vistaAsignarTurno', component:OperadorAsignarTurnosComponent},
  {path: 'vistaGestionMedico', component:OperadorGestionMedicoComponent},
  {path: 'vistaPacientesDia', component:OperadorPacientesDelDiaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

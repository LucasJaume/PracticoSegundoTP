import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { GestionAgendasComponent } from '../gestion-agendas/gestion-agendas.component';
import { MatDialog } from '@angular/material/dialog';
import { OperadorAsignarTurnosComponent } from '../operador-asignar-turnos/operador-asignar-turnos.component';
import { TurnosProgramadosComponent } from '../turnos-programados/turnos-programados.component';


export interface operadorGestionMedico {
  nombre: string;
  especialidad: string;
  horarioatencion: string;
}

const tablaOperador: operadorGestionMedico[] = [
  {nombre: "medico1", especialidad: 'kinesio', horarioatencion: "15:00hs a 20:00hs"},
  {nombre: "medico2", especialidad: 'otorrino', horarioatencion: "15:00hs a 20:00hs"},

];

@Component({
  selector: 'app-operador-gestion-medico',
  templateUrl: './operador-gestion-medico.component.html',
  styleUrls: ['./operador-gestion-medico.component.css']
})
export class OperadorGestionMedicoComponent {
  displayedColumns: string[] = ['nombre', 'especialidad', 'horarioatencion', 'acciones'];
  dataSource = tablaOperador;

  constructor(public dialog: MatDialog) {}

  modificarHorarios(doctor: any) {
    const dialogRef = this.dialog.open(GestionAgendasComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'custom-dialog-container',
      data: { horarios: { entrada: '09:00', salida: '17:00' } } 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo horario guardado:', result);
      }
    });
  }

  agregarTurnos(doctor: any) {
    const dialogRef = this.dialog.open(OperadorAsignarTurnosComponent, {
      width: '800px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo horario guardado:', result);
      }
    });
  }

  verTurnosConfirmados(doctor: any) {
    const dialogRef = this.dialog.open(TurnosProgramadosComponent, {
      width: '800px',
      height: '700px',
    });
  }

  cancelarTurnos(doctor : any){
    const dialogRef = this.dialog.open(TurnosProgramadosComponent);
  }
}



import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { GestionAgendasComponent } from '../gestion-agendas/gestion-agendas.component';
import { MatDialog } from '@angular/material/dialog';
import { OperadorAsignarTurnosComponent } from '../operador-asignar-turnos/operador-asignar-turnos.component';


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
      width: '400px',
      height: '300px',
      data: { horarios: { entrada: '09:00', salida: '17:00' } } // Puedes pasar los horarios actuales del doctor aquí
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo horario guardado:', result);
        // Aquí puedes actualizar la lógica para guardar el nuevo horario en tu sistema
      }
    });
  }

  agregarCancelarTurnos(doctor: any) {
    const dialogRef = this.dialog.open(OperadorAsignarTurnosComponent, {
      width: '800px',
      height: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Nuevo horario guardado:', result);
        // Aquí puedes actualizar la lógica para guardar el nuevo horario en tu sistema
      }
    });
  }

  verTurnosConfirmados(doctor: any) {
    
  }
}



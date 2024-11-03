import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AutenticacionService } from '../Service/autenticacion.service';
import { OperadorAsignarTurnosComponent } from '../operador-asignar-turnos/operador-asignar-turnos.component';
import { GestionAgendasComponent } from '../gestion-agendas/gestion-agendas.component';
import { TurnosProgramadosComponent } from '../turnos-programados/turnos-programados.component';

export interface operadorGestionMedico {
  nombre: string;
  especialidad: string;
  horarioatencion: string;
}

@Component({
  selector: 'app-operador-gestion-medico',
  templateUrl: './operador-gestion-medico.component.html',
  styleUrls: ['./operador-gestion-medico.component.css']
})
export class OperadorGestionMedicoComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'especialidad', 'horarioatencion', 'acciones'];
  dataSource: operadorGestionMedico[] = [];
  fechaForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    private fb: FormBuilder,
    private autenticacionService: AutenticacionService
  ) {
    this.fechaForm = this.fb.group({
      fecha: [new Date()]
    });
  }

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const fechaSeleccionada = this.fechaForm.get('fecha')?.value;
    if (fechaSeleccionada) {
      const fechaString = fechaSeleccionada.toISOString().split('T')[0]; // Formato AAAA-MM-DD
      const id_medico = 9; // Asegúrate de que este id sea un número
      
      this.autenticacionService.obtenerTurnosMedico(fechaString, id_medico).subscribe(
        (response) => {
          console.log('Respuesta de OBTENER TURNOS', response); // Log de respuesta
  
          if (response && Array.isArray(response.payload)) {
            this.dataSource = response.payload.map((turno: any) => {
              console.log('datos del turno',turno); // Log de cada turno
              return {
                nombre: turno.nombre_medico,
                especialidad: turno.especialidad,
                horarioatencion: turno.hora
              };
            });
          } else {
            console.warn('La respuesta no contiene un payload válido');
            this.dataSource = [];
          }
        },
        (error) => {
          console.error('Error al cargar turnos', error);
        }
      );
    }
  }
  
  

  // Agregar un método para manejar el botón de carga de turnos
  onFechaChange(): void {
    this.cargarTurnos();
  }

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

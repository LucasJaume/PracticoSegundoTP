import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AutenticacionService } from '../Service/autenticacion.service';
import { animate, state, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-turnos-programados',
  templateUrl: './turnos-programados.component.html',
  styleUrls: ['./turnos-programados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class TurnosProgramadosComponent implements OnInit {

  userRole: string | null = '';


  dataSource = new MatTableDataSource<turnosMedicos>();
  columnsToDisplay = ['hora', 'nombre', 'edad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'acciones'];
  expandedElement: turnosMedicos | null = null;
  datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || '[]');

  id_medico = this.datosUsuario[0]?.id; 
  fecha: string = ''; 

  constructor(private autenticacionService: AutenticacionService) { }

  ngOnInit() {
    this.obtenerTurnos();

    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || '[]');
    console.log(datosUsuario);
    
    this.userRole= datosUsuario[0]?.rol || '';
  }

  onDateChange(fecha: Date) {
    this.fecha = fecha.toISOString().split('T')[0]; 
    this.obtenerTurnos();
  }

  obtenerTurnos() {
    this.autenticacionService.obtenerTurnosMedico(this.fecha, this.id_medico).subscribe(
      (response) => {
        console.log('Respuesta de OBTENER TURNOS', response); 
        if (response && Array.isArray(response.payload)) {
          this.dataSource.data = response.payload.map((turno: any, index:number) => ({
            id_turno: index + 1,
            hora: turno.hora,
            nombre: turno.nombre_paciente,
            edad: this.calcularEdad(turno.fecha_nacimiento),
            nota: turno.nota
          }));
        } else {
          console.warn('La respuesta no contiene un payload válido');
          this.dataSource.data = [];
        }
      },
      (error) => {
        console.error('Error al cargar turnos', error);
      }
    );
  }

  cancelarTurno(turno: any): void {

    const id = parseInt(turno) ;
    console.log(turno);
    
    console.log('Elemento recibidoOOOoo:', id);
    if (id === undefined) {
        console.error('ID del turno es undefined');
        alert('No se pudo cancelar el turno: ID no válido');
        return;
    }

    this.autenticacionService.cancelarTurno(id).subscribe({
        next: () => {
            alert('Turno cancelado con éxito');
       
            this.dataSource.data = this.dataSource.data.filter(t => t.id_turno !== id); 
            console.log(this.dataSource.data);
        },
        error: (err) => {
            console.error('Error al cancelar el turno:', err);
            alert('Error al cancelar el turno');
        }
    });
}
  

  calcularEdad(fechaNacimiento: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }
}

export interface turnosMedicos {
  id_turno: number; 
  hora: string;
  nombre: string;
  edad: number;
  nota: string;
}

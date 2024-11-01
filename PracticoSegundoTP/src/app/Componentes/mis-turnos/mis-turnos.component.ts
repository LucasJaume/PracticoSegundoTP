import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../Service/autenticacion.service';
import { MatTableDataSource } from '@angular/material/table';


export interface Turno {
  fecha: Date;
  hora: string;
  detalle: string;
  especialista: string; 
  especialidad: string; 
}


@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent implements OnInit {
  displayedColumns: string[] = ['fecha', 'hora', 'detalle'];
  dataSource = new MatTableDataSource<Turno>(); 

  constructor(private AutenticacionService: AutenticacionService) {}

  ngOnInit() {
    const idPaciente = 10; 
    this.obtenerTurnosPaciente(idPaciente); 
    
  }

  obtenerTurnosPaciente(id: number): void {
    this.AutenticacionService.obtenerTurnosPaciente(id).subscribe(
      (response) => {
        if (response.codigo === 200) { 
          response.payload.sort((a: { fecha: string | number | Date; }, b: { fecha: string | number | Date; }) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime());
          this.dataSource.data = response.payload; 
          console.log('Turnos obtenidos:', response.payload); 
        } else {
          console.error('Error en la respuesta:', response.mensaje);
        }
      },
      (error) => {
        console.error('Error al obtener los turnos:', error);
      }
    );
  }
  
  
}


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
    const datosUsuarioString = sessionStorage.getItem('datosUsuario');
  
    console.log('Contenido de datosUsuarioString:', datosUsuarioString);
  
    const datosUsuario = datosUsuarioString ? JSON.parse(datosUsuarioString) : null;
  
    console.log('Contenido de datosUsuario:', datosUsuario);
  
    const idPaciente = Array.isArray(datosUsuario) && datosUsuario[0]?.id ? datosUsuario[0].id : null;
  
    if (idPaciente) {
      this.obtenerTurnosPaciente(idPaciente);
      console.log('ID de paciente:', idPaciente);
    } else {
      console.error('ID de paciente no encontrado en datosUsuario');
    }
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


import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { RegistrarseComponent } from '../registrarse/registrarse.component';


export interface listaUsuarios{
  nombre: string;
  apellido: string; 
  tipoUsuario : string;
}

const listaUser : listaUsuarios[] = [
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "flaco", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "mati", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "negro", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "juan", apellido: "420", tipoUsuario: "inpaciente" }, 
];


@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css'],
})
export class VistaAdministradorComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoUsuario', 'acciones'];
  dataSource = new MatTableDataSource(listaUser);

  constructor(public dialog:MatDialog){}

  crearUsuarioAdmin(){
    const dialogRef = this.dialog.open(RegistrarseComponent);
  }

  editarUsuarioAdmin(){
    const dialogRef = this.dialog.open(RegistrarseComponent);
  }




  filtroAdmin(event: MatSelectChange | Event) {
    if ('value' in event) {
      const valorFiltro = event.value;
      // Filtrar usando MatTableDataSource
      this.dataSource.filter = valorFiltro.trim().toLowerCase();
    } else {
      const valorFiltro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = valorFiltro.trim().toLowerCase();
    }
  }
  
}



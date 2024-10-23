import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';


export interface listaUsuarios{
  nombre: string;
  apellido: string; 
  tipoUsuario : string;
}

// editarUsuario(): void{
  
// }

const listaUser : listaUsuarios[] = [
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
  {nombre: "gordo", apellido: "420", tipoUsuario: "inpaciente" }, 
];


@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css'],
})
export class VistaAdministradorComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoUsuario', 'acciones'];
  dataSource = listaUser;
}



import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSelectChange } from '@angular/material/select';
import { RegistrarseComponent } from '../registrarse/registrarse.component';
import { AutenticacionService } from '../Service/autenticacion.service';


export interface listaUsuarios{
  nombre: string;
  apellido: string; 
  tipoUsuario : string;
  telefono?: string;
  dni?: string;
  email?: string;
  fecha?: string;
  contrasena?: string;
}


@Component({
  selector: 'app-vista-administrador',
  templateUrl: './vista-administrador.component.html',
  styleUrls: ['./vista-administrador.component.css'],
})
export class VistaAdministradorComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'tipoUsuario', 'acciones'];
  dataSource = new MatTableDataSource<listaUsuarios>([]);

  constructor(public dialog:MatDialog,
    private autenticacionService: AutenticacionService
  ){}

  nombreFiltro = '';
  apellidoFiltro = '';
  tipoUsuarioFiltro = '';

  ngOnInit(): void {

      this.cargarUsuarios();

      this.dataSource.filterPredicate = (data: listaUsuarios, filter: string) => {
        const [nombre, apellido, tipoUsuario] = filter.split('|');
        
        const nombreMatch = data.nombre.toLowerCase().includes(nombre.toLowerCase());
        const apellidoMatch = data.apellido.toLowerCase().includes(apellido.toLowerCase());
        const tipoUsuarioMatch = tipoUsuario === '' || data.tipoUsuario.toLowerCase().includes(tipoUsuario.toLowerCase());
        
        return nombreMatch && apellidoMatch && tipoUsuarioMatch;
      };
      
  }

  cargarUsuarios(): void {
    this.autenticacionService.obtenerUsuarios().subscribe(
      (usuarios) => {
        console.log(usuarios);

        this.dataSource.data = usuarios.payload.map((usuario: any) => ({
          id:usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          tipoUsuario: usuario.rol,
          telefono: usuario.telefono,
          dni: usuario.dni,
          email: usuario.email,
          fecha_nacimiento: usuario.fecha_nacimiento,
          password: usuario.password,
        }));
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  crearUsuarioAdmin(){
    const dialogRef = this.dialog.open(RegistrarseComponent,{
      data: ''
    });
  }

  editarUsuarioAdmin(usuario: any) {
    console.log('Datos del usuario que se están pasando:', usuario);
    const dialogRef = this.dialog.open(RegistrarseComponent, {
      data: {usuario: usuario}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.cargarUsuarios(); 
      }
    });
  }

  filtroNombre(event: Event) {
    this.nombreFiltro = (event.target as HTMLInputElement).value;
    this.aplicarFiltro();
  }

  filtroApellido(event: Event) {
    this.apellidoFiltro = (event.target as HTMLInputElement).value;
    this.aplicarFiltro();
  }

  filtroTipoUsuario(event: MatSelectChange) {
    this.tipoUsuarioFiltro = event.value;
    this.aplicarFiltro();
  }

  aplicarFiltro() {
    const filterValue = `${this.nombreFiltro.trim()}|${this.apellidoFiltro.trim()}|${this.tipoUsuarioFiltro.trim()}`;
    this.dataSource.filter = filterValue;
  }
  
}



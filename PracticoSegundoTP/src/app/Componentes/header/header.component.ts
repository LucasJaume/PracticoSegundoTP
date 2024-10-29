import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  nombreUsuario: string | null = null; 
  tipoUsuario: string | null = null;

  constructor(
    private router: Router,
    private location: Location) {this.cargarDatosUsuario();}

    cargarDatosUsuario(): void {
      const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || 'null');
      if (datosUsuario) {
        // Asumiendo que 'nombre' y 'apellido' están en 'datosUsuario'
        this.nombreUsuario = `${datosUsuario[0]?.nombre} ${datosUsuario[0]?.apellido}`;
        this.tipoUsuario = datosUsuario[0]?.rol; // Asegúrate de que 'rol' es el nombre correcto
      }
    }

  cerrarSesion(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/home-login']);
  }

  volverAtras() : void{
    this.location.back();
  }
}

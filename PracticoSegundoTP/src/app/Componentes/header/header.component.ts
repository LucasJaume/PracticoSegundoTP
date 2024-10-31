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

        this.nombreUsuario = `${datosUsuario[0]?.nombre} ${datosUsuario[0]?.apellido}`;
        this.tipoUsuario = datosUsuario[0]?.rol; 
      }
    }

  cerrarSesion(): void {
    sessionStorage.clear();
    localStorage.clear();
    this.router.navigate(['/home-login']);
    localStorage.removeItem('token');
  }

  volverAtras() : void{
    this.location.back();
  }
}

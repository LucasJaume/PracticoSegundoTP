import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-operador',
  templateUrl: './vista-operador.component.html',
  styleUrls: ['./vista-operador.component.css']
})
export class VistaOperadorComponent {

  apellidoUsuario: string | null = null;


  constructor(private router:Router){
    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || 'null');
    if (datosUsuario) {
      this.apellidoUsuario = `${datosUsuario[0]?.apellido} `;
    }
  }

  vistaCrearPaciente() : void{
    this.router.navigate(["/vistaCrearPaciente"])
  }

  vistaAsignarTurnos(): void{
    this.router.navigate(["/vistaAsignarTurno"])
  }

  vistaGestionMedico(): void{
    this.router.navigate(["/vistaGestionMedico"])
  }
}

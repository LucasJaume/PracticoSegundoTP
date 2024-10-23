import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-operador',
  templateUrl: './vista-operador.component.html',
  styleUrls: ['./vista-operador.component.css']
})
export class VistaOperadorComponent {

  constructor(private router:Router){}

  vistaCrearPaciente() : void{
    this.router.navigate(["/vistaCrearPaciente"])
  }

  vistaAsignarTurnos(): void{
    this.router.navigate(["/vistaAsignarTurno"])
  }

  vistaGestionMedico(): void{
    this.router.navigate(["/vistaGestionMedico"])
  }

  vistaPacientesDia(): void{
    this.router.navigate(["/vistaPacientesDia"])
  }
}

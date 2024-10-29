import {Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  userRole: string | null = '';

  constructor(private router:Router){}

  ngOnInit(): void {
    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || '[]');
    this.userRole= datosUsuario[0]?.rol || '';
  }

  nuevoTurno():void{
    this.router.navigate(['/Nuevo'])
  }

  misTurnos():void{
    this.router.navigate(["/misTurnos"])
  }

  datosPersonales():void{
    this.router.navigate(["/datosPersonales"])
  }

  listaUsuarios(): void{
    this.router.navigate(["/vistaAdministrador"])
  }

  vistaMedico() : void{
    this.router.navigate(["/vistaMedico"])
  }

  vistaOperador() : void{
    this.router.navigate(["/vistaOperador"])
  }


}

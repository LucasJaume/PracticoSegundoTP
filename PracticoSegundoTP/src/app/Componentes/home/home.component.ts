import {Component} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router){}

  nuevoTurno():void{
    this.router.navigate(['/Nuevo'])
  }

  misTurnos():void{
    this.router.navigate(["/misTurnos"])
  }

  datosPersonales():void{
    this.router.navigate(["/datosPersonales"])
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-medico',
  templateUrl: './vista-medico.component.html',
  styleUrls: ['./vista-medico.component.css']
})
export class VistaMedicoComponent {
  
  constructor(private router:Router){}

  turnosProgramados():void{
    this.router.navigate(['/turnosProgramados'])
  }

  gestionAgenda():void{
    this.router.navigate(["/gestionAgendas"])
  }

}

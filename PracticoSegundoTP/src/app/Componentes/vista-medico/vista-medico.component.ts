import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista-medico',
  templateUrl: './vista-medico.component.html',
  styleUrls: ['./vista-medico.component.css']
})
export class VistaMedicoComponent {
  
  apellidoUsuario: string | null = null;
  
  constructor(private router: Router) {
    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || 'null');
    if (datosUsuario) {
      this.apellidoUsuario = `${datosUsuario[0]?.apellido} `;
    }
    

  }

  turnosProgramados(): void {
    this.router.navigate(['/turnosProgramados']);
  }

  gestionAgenda(): void {
    this.router.navigate(['/gestionAgendas']);
  }
}


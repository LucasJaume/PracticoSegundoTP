import { Component } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NgFor, NgIf} from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-turnos-programados',
  templateUrl: './turnos-programados.component.html',
  styleUrls: ['./turnos-programados.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class TurnosProgramadosComponent {
  dataSource = TURNOSMEDICOS;
  columnsToDisplay = ['hora', 'nombre', 'edad'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand', 'acciones'];
  expandedElement: turnosMedicos | null = null;

  cancelarTurno(turno: turnosMedicos) {

  }
}

export interface turnosMedicos {
  hora :string;
  nombre: string;
  edad : number;
  nota: string;

}

const TURNOSMEDICOS: turnosMedicos[] = [
  {
    hora: '10:00',
    nombre: 'Juan Perez',
    edad: 20,
    nota: `revision de lesion de tobillo izquierdo`
  },
  {
    hora: '12:00',
    nombre: 'Julian Alvarez',
    edad: 25,
    nota: 'aductor izquierdo molestia'
  }
];

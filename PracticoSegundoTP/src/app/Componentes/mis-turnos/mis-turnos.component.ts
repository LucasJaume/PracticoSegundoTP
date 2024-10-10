import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

export interface Turnos {
  fecha: Date;
  hora: String;
  detalle: String;
}

const TURNOS: Turnos[] = [
  {
    fecha: new Date("2024-10-10"),
    hora: "11:00",
    detalle: "Menu"
  }
];

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.css']
})
export class MisTurnosComponent {
  displayedColumns: string[] = ['fecha', 'hora', 'detalle'];
  dataSource = TURNOS;
}

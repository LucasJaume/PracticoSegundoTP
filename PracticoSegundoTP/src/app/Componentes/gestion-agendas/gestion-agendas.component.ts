import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-agendas',
  templateUrl: './gestion-agendas.component.html',
  styleUrls: ['./gestion-agendas.component.css']
})
export class GestionAgendasComponent {
  selectedDate: string | null = null;
  mostrarHorarios: boolean = false;

  horarios: {[date : string]: {entrada: string; salida: string}}= {
    '2024-10-17':{entrada: '09:00', salida:'17:00'}, //ejemplo
  };

  nuevoHorario={entrada: '', salida: ''};

  isDialog: boolean = false;

  // constructor(
  //   private router: Router,
  //   public dialogRef?: MatDialogRef<GestionAgendasComponent>, // Opcional
  //   @Inject(MAT_DIALOG_DATA) public data?: any, // Opcional
  //    // Inyección del router
  // ) {
  //   this.isDialog = !!dialogRef; // Verifica si estamos en modo diálogo
  // }
  
  // Maneja el cambio de fecha
  onDateChange(date: Date) {
    this.selectedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    this.nuevoHorario = { entrada: '', salida: '' }; // Resetea nuevos horarios
    this.mostrarHorarios = false; // Oculta los campos de horario al seleccionar nueva fecha
  }

  establecerHorario() {
    if (this.selectedDate) {
      this.horarios[this.selectedDate] = {
        entrada: this.nuevoHorario.entrada,
        salida: this.nuevoHorario.salida
      };
      this.mostrarHorarios = false; // Oculta los campos después de establecer el horario
    }
  }

  // cerrar() {
  //   if (this.isDialog) {
  //     if (this.dialogRef) { // Verifica que dialogRef esté definido
  //       if (this.selectedDate) {
  //         this.dialogRef.close(this.horarios[this.selectedDate]);
  //       } else {
  //         this.dialogRef.close(null); // O puedes cerrar con un valor por defecto
  //       }
  //     }
  //   } else {
  //     this.router.navigate(['/home']);
  //   }
  // }
  
}

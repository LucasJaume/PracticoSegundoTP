import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Service/autenticacion.service';


interface Horario {
  entrada: string;
  salida: string;
}

@Component({
  selector: 'app-gestion-agendas',
  templateUrl: './gestion-agendas.component.html',
  styleUrls: ['./gestion-agendas.component.css']
})
export class GestionAgendasComponent implements OnInit  {
  selectedDate: string | null = null; 
  mostrarHorarios: boolean = false;
  // horarios: { [date: string]: Horario } = {}; 
  horarios: any = {}; // Este objeto contendrá los horarios por fecha

  nuevoHorario: Horario = { entrada: '', salida: '' };
  idMedico: number = 0;
  idEspecialidad: number = 0; 

  agenda: any[] = [];
  fechaSeleccionada: string = '';
  otroHorario: { entrada: string, salida: string } = { entrada: '', salida: '' };


  isDialog: boolean = false;

  constructor(private router: Router,    private AutenticacionService:AutenticacionService
  ) {
    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || '[]');

    if (datosUsuario.length > 0) {
      this.idMedico = datosUsuario[0].id;
      console.log(this.idMedico);
      this.obtenerEspecialidad();
    }
  }
  
  ngOnInit(){
    // console.log(this.idEspecialidad);
    this.obtenerAgenda();
  }

  obtenerAgenda() {
    this.AutenticacionService.obtenerAgenda(this.idMedico).subscribe((response) => {
      if (response.codigo === 200) {
        this.agenda = response.payload; 
        console.log("AGENDA MEDICO:", this.agenda);
        
      } else {
        console.error('No se pudo obtener la agenda del médico');
      }
    });
  }
  
  // Maneja el cambio de fecha
  onDateChange(selectedDate: Date) {

    this.selectedDate = this.formatDate(selectedDate); // Función para formatear la fecha

    // Filtrar la agenda para obtener los horarios de la fecha seleccionada
    const fechaSeleccionada = this.selectedDate;
    const horariosDelDia = this.agenda.filter(h => 
        new Date(h.fecha).toISOString().slice(0, 10) === fechaSeleccionada
    );

    // Almacenar los horarios de entrada y salida
    if (horariosDelDia.length > 0) {
        this.horarios[fechaSeleccionada] = {
            entrada: horariosDelDia.map(h => h.hora_entrada).join(', '),
            salida: horariosDelDia.map(h => h.hora_salida).join(', ')
        };
    } else {
        this.horarios[fechaSeleccionada] = null; // No hay horarios para esta fecha
    }
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes 0-11
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`; // Retorna formato 'YYYY-MM-DD'
}

  establecerHorario() {
    if (!this.selectedDate || !this.nuevoHorario.entrada || !this.nuevoHorario.salida) return;

      // Verifica si hay un conflicto con el nuevo horario
  if (this.hayConflicto(this.nuevoHorario)) {
    // Muestra un mensaje de error si hay un conflicto
    alert('Error: El horario que intentas establecer ya está ocupado.');
    return; // Detiene la ejecución si hay un conflicto
  }

    const horarioData = {
      hora_entrada: this.nuevoHorario.entrada,
      hora_salida: this.nuevoHorario.salida,
      fecha: this.selectedDate,
      id_medico: this.idMedico,
      id_especialidad: this.idEspecialidad
    };

    console.log(horarioData);
    

    this.AutenticacionService.crearAgenda(horarioData)
        .subscribe(() => {
          this.horarios[this.selectedDate!] = { ...this.nuevoHorario };
          this.mostrarHorarios = false;
        });
  }

  obtenerEspecialidad() {
    this.AutenticacionService.obtenerEspecialidadesPorMedico(this.idMedico)
      .subscribe((especialidad) => {
        if (especialidad.payload.length > 0) {
          this.idEspecialidad = especialidad.payload[0].id_especialidad; 
        }
      });
  }

  // Método para verificar si hay un conflicto en los horarios
hayConflicto(nuevoHorario: { entrada: string, salida: string }): boolean {
  const entradaNuevo = this.convertirAHoras(nuevoHorario.entrada);
  const salidaNuevo = this.convertirAHoras(nuevoHorario.salida);

  const horariosDelDia = this.agenda.filter(h => 
    new Date(h.fecha).toISOString().slice(0, 10) === this.selectedDate
  );

  // Verifica si hay algún horario que se superponga
  return horariosDelDia.some(h => {
    const entradaExistente = this.convertirAHoras(h.hora_entrada);
    const salidaExistente = this.convertirAHoras(h.hora_salida);

    // Comprobación de superposición
    return (entradaNuevo < salidaExistente && salidaNuevo > entradaExistente);
  });
}

// Función auxiliar para convertir la hora a un formato que se pueda comparar
private convertirAHoras(hora: string): number {
  const [horas, minutos] = hora.split(':').map(Number);
  return horas * 60 + minutos; // Convierte a minutos
}
}


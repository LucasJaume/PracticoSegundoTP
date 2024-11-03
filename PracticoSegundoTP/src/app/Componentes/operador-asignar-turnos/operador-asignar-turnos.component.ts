import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Service/autenticacion.service';

@Component({
  selector: 'app-operador-asignar-turnos',
  templateUrl: './operador-asignar-turnos.component.html',
  styleUrls: ['./operador-asignar-turnos.component.css']
})

export class OperadorAsignarTurnosComponent implements OnInit {

  coberturas: any[] = [];
  especialidades: any[] = [];
  profesionales: any[] = [];
  agenda: any[] = [];
  fechasDisponibles: string[] = [];
  horasDisponibles: string[] = [];


  form = this.fb.group({
    'cobertura': ['', Validators.required],
    'especialidad': ['', Validators.required],
    'profesional': ['', Validators.required],
    'fecha': ['', Validators.required],
    'hora': ['', Validators.required],
    'notas': ['', Validators.required],
    'paciente': ['', Validators.required] 
  });
  

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private autenticacionService: AutenticacionService
  ) {}

  ngOnInit(): void {
    
    this.cargarEspecialidades();

    this.cargarCoberturas();
  }
  

  cargarCoberturas() {
    this.autenticacionService.obtenerCoberturas().subscribe(
      (response) => {
        console.log('respuesa cobertua',response);
        if (response && Array.isArray(response)) {
          this.coberturas = response;
        } else {
          console.error('La respuesta no contiene un array en payload');
        }
      },
      (error) => {
        console.error('Error al cargar coberturas', error);
      }
    );
  }
  

cargarEspecialidades() {
  this.autenticacionService.obtenerEspecialidades().subscribe(
    (response) => {
      console.log('respuesta especialidad',response.payload);
      if (response && Array.isArray(response.payload)) {
        this.especialidades = response.payload;
      } else {
        console.error('La respuesta no contiene un array en payload');
      }
    },
    (error) => {
      console.error('Error al cargar especialidades', error);
    }
  );
}

onEspecialidadChange(especialidadId: number): void {
  this.autenticacionService.obtenerMedicoPorEspecialidad(especialidadId).subscribe(
    (response) => {
      console.log("respuesta especialidades",response);
      if (response && Array.isArray(response.payload)) {
        this.profesionales = response.payload;
      } else {
        console.error('La respuesta no contiene un array en payload');
      }
    },
    (error) => {
      console.error('Error al obtener profesionales', error);
    }
  );
}

onProfesionalChange(profesionalId: number): void {
  this.autenticacionService.obtenerAgenda(profesionalId).subscribe(
    (response) => {
      console.log('Respuesta de agenda:', response);
      this.agenda = response.payload;
      this.filtrarDisponibilidad();
    },
    (error) => {
      console.error('Error al obtener agenda', error);
    }
  );
}

filtrarDisponibilidad(): void {
  if (Array.isArray(this.agenda)) {
    this.fechasDisponibles = [...new Set(this.agenda.map(item => item.fecha))];
    this.horasDisponibles = [];

    this.agenda.forEach(item => {
      const startTime = new Date(`1970-01-01T${item.hora_entrada}:00`);
      const endTime = new Date(`1970-01-01T${item.hora_salida}:00`);

      while (startTime < endTime) {
        this.horasDisponibles.push(startTime.toTimeString().slice(0, 5));
        startTime.setMinutes(startTime.getMinutes() + 30);
      }
    });
  } else {
    console.error('Agenda no es un array');
  }
}

asignarTurno() {
  if (this.form.valid) {
    const idAgenda = this.obtenerIdAgenda();
    if (!idAgenda) {
      console.error('id_agenda no válido');
      return;
    }

    const turnoData = {
      nota: this.form.get('notas')?.value,
      id_agenda: idAgenda, 
      fecha: this.form.get('fecha')?.value,
      hora: this.form.get('hora')?.value,
      id_paciente: Number(this.form.get('paciente')?.value), 
      id_cobertura: Number(this.form.get('cobertura')?.value), 
    };

    console.log('Turno Data:', turnoData); 

    this.autenticacionService.asignarTurnoPaciente(turnoData).subscribe(
      (response) => {
        console.log('Turno asignado exitosamente', response);
        alert('turno asignado.')
        this.router.navigate(['/home'])
      },
      (error) => {
        console.error('Error al asignar turno', error);
      }
    );
  } else {
    console.error('Formulario inválido');
  }
}


obtenerIdAgenda(): number {
  const fechaSeleccionada = this.form.get('fecha')?.value;
  const horaSeleccionada = this.form.get('hora')?.value;

  if (!fechaSeleccionada || !horaSeleccionada) {
    console.error('Fecha o hora no seleccionada');
    return 0; // Devolver 0 en lugar de una cadena vacía
  }

  const agendaItem = this.agenda.find(item => 
    item.fecha === fechaSeleccionada && 
    item.hora_entrada <= horaSeleccionada && 
    item.hora_salida >= horaSeleccionada
  );

  console.log('Agenda Item:', agendaItem);

  return agendaItem ? agendaItem.id : 0; // Devolver el id de la agenda
}


}
  


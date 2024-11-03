import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Service/autenticacion.service';

interface Cobertura {
  nombre: string;
  id: number;
}

interface Especialidad {
  descripcion: string;
  id: number;
}

interface Profesional {
  nombre: string;
  apellido: string;
  id_medico: number;
  horarioInicio: string;  
  horarioFin: string;     
}

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {
  form = this.fb.group({
    cobertura: ['', Validators.required],
    especialidad: [{ value: '', disabled: true }, Validators.required],
    profesional: [{ value: '', disabled: true }, Validators.required],
    fecha: [{ value: '', disabled: true }, Validators.required],
    hora: [{ value: '', disabled: true }, Validators.required],
    notas: ['', Validators.required]
  });

  cobertura: Cobertura[] = [];
  especialidades: Especialidad[] = [];
  profesionales: Profesional[] = [];
  horasDisponibles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private AutenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.cargarCoberturas();
  }

  cargarCoberturas() {
    this.AutenticacionService.obtenerCoberturas().subscribe(
      (data: any) => {
        this.cobertura = data.payload;
        console.log("Coberturas cargadas:", this.cobertura);
      },
      (error) => {
        console.error("Error al cargar coberturas:", error);
      }
    );
  }

  cambiarCobertuas() {
    if (this.form.get('cobertura')?.valid) {
      this.form.get('especialidad')?.enable();
      this.cargarEspecialidades();
      console.log("Cobertura seleccionada, especialidad habilitada.");
    }
  }

  cargarEspecialidades() {
    this.AutenticacionService.obtenerEspecialidades().subscribe(
      (data: any) => {
        this.especialidades = data.payload;
        console.log("Especialidades cargadas:", this.especialidades);
      },
      (error) => {
        console.error("Error al cargar especialidades:", error);
      }
    );
  }

  cambiarEspecialidad() {
    const idEspecialidad = Number(this.form.get('especialidad')?.value);
    if (idEspecialidad) {
      this.AutenticacionService.obtenerMedicoPorEspecialidad(idEspecialidad).subscribe(
        (data: any) => {
          console.log("Respuesta del API para médicos:", data);
          this.profesionales = data.payload;
          console.log("Médicos cargados para la especialidad:", this.profesionales);
          if (this.profesionales.length > 0) {
            this.form.get('profesional')?.enable();
          } else {
            console.warn("No hay profesionales disponibles para esta especialidad.");
            this.form.get('profesional')?.disable();
          }
        },
        (error) => {
          console.error("Error al cargar médicos por especialidad:", error);
        }
      );
    } else {
      console.warn("Especialidad no seleccionada o inválida:", idEspecialidad);
    }
  }

  cambiarProfesional() {
    const profesionalSeleccionadoValue = this.form.get('profesional')?.value;
    const profesionalSeleccionado = profesionalSeleccionadoValue ? parseInt(profesionalSeleccionadoValue, 10) : 0;

    if (profesionalSeleccionado) {
      this.AutenticacionService.obtenerAgenda(profesionalSeleccionado).subscribe(
        (data: any) => {
          const agenda = data.payload;
          console.log("Agenda para el profesional:", agenda);

          if (agenda && agenda.length > 0) {
            this.form.get('fecha')?.enable(); 
            this.form.get('hora')?.disable(); 
          } else {
            console.warn("No hay disponibilidad para este profesional.");
            this.form.get('fecha')?.disable(); 
            this.form.get('hora')?.disable(); 
          }
        },
        (error) => {
          console.error("Error al obtener la agenda del profesional:", error);
        }
      );
    } else {
      console.warn("Profesional no seleccionado.");
      this.form.get('fecha')?.disable(); 
      this.form.get('hora')?.disable(); 
    }
  }
  
  idAgenda: any;


  cambiarFechas() {
    const fechaSeleccionada = this.form.get('fecha')?.value;
    const profesionalSeleccionadoValue = this.form.get('profesional')?.value;
    const profesionalSeleccionado = profesionalSeleccionadoValue ? parseInt(profesionalSeleccionadoValue, 10) : 0;
  
    if (fechaSeleccionada && profesionalSeleccionado) {
      this.AutenticacionService.obtenerAgenda(profesionalSeleccionado).subscribe(
        (data: any) => {
          const agenda = data.payload;
  
    
          const agendaDelDia = agenda.filter((item: any) => {
            const fechaAgenda = new Date(item.fecha).toISOString().split('T')[0]; 
            return fechaAgenda === fechaSeleccionada;
          });
          
          if (agendaDelDia.length > 0) {
            this.idAgenda = agendaDelDia[0].id;
            console.log("ID de la agenda seleccionada:", this.idAgenda);
            const horasDisponibles: string[] = [];
            agendaDelDia.forEach((item: any) => {
              const { hora_entrada, hora_salida } = item; 
  
              this.generarHorasDisponibles(hora_entrada, hora_salida, horasDisponibles);
            });
  
            this.horasDisponibles = horasDisponibles;
            this.form.get('hora')?.enable(); 
          } else {
            console.warn("No hay disponibilidad para el profesional en la fecha seleccionada.");
            this.form.get('hora')?.disable(); 
            this.form.get('hora')?.setValue(null); 
          }
        },
        (error) => {
          console.error("Error al obtener la agenda del profesional:", error);
        }
      );
    } else {
      console.warn("Fecha o profesional no seleccionados.");
      this.form.get('hora')?.disable(); 
      this.form.get('hora')?.setValue(null); 
    }
  }


  generarHorasDisponibles(horaEntrada: string, horaSalida: string, horasDisponibles: string[]) {
    const startHour = new Date(`1970-01-01T${horaEntrada}:00`);
    const endHour = new Date(`1970-01-01T${horaSalida}:00`);
  

    for (let hora = startHour; hora < endHour; hora.setHours(hora.getHours() + 1)) {
      const horaFormato = `${hora.getHours().toString().padStart(2, '0')}:00hs a ${(hora.getHours() + 1).toString().padStart(2, '0')}:00hs`;
 
      if (!horasDisponibles.includes(horaFormato)) {
        horasDisponibles.push(horaFormato);
      }
    }
  
    console.log("Horas disponibles generadas:", horasDisponibles);
  }

  enviar() {

    let idUsuario;
    const datosUser = sessionStorage.getItem("datosUsuario");
    if (datosUser) {
      const parsedData = JSON.parse(datosUser);
      idUsuario = parsedData[0].id; 
    } else {
      console.error("No se encontraron datos de usuario en el almacenamiento local.");
    }

    console.log(idUsuario);
    
    
    if (this.form.valid) {
      const turnoData = {
        nota: this.form.get('notas')?.value!,
        id_agenda: this.idAgenda,
        fecha: this.form.get('fecha')?.value!,
        hora: this.form.get('hora')?.value!,
        id_paciente: idUsuario,
        id_cobertura: Number(this.form.get('cobertura')?.value)
      };

      console.log("Datos del turno a enviar:", turnoData);

      this.AutenticacionService.asignarTurnoPaciente(JSON.stringify(turnoData)).subscribe(
        () => {
          alert(`Turno confirmado con el especialista el día ${turnoData.fecha} a las ${turnoData.hora}`);
          console.log("Turno confirmado:", turnoData);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Error al asignar el turno:', error);
          alert('Error al asignar el turno. Intente nuevamente.');
        }
      );
    } else {
      console.warn("Formulario inválido:", this.form.value);
    }
  }

  botonCancelar(): void {
    this.router.navigate(['/home']);
  }
}

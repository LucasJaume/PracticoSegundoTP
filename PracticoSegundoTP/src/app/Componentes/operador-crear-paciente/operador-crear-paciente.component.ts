import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-operador-crear-paciente',
  templateUrl: './operador-crear-paciente.component.html',
  styleUrls: ['./operador-crear-paciente.component.css']
})
export class OperadorCrearPacienteComponent {
  formularioCrearPaciente=this.fb.group({
    'nombre':['',Validators.required],
    'apellido':['',Validators.required],
    'mail':['',Validators.required],
    'tipo':['',Validators.required],
    'dni':['',Validators.required],
    'fecha':['',Validators.required],
    'contrasena':['',Validators.required]
  })

  constructor(private fb:FormBuilder){}


}

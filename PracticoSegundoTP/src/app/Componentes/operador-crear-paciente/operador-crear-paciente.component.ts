import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutenticacionService } from '../Service/autenticacion.service';


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
    'telefono':['',Validators.required],
    'tipo':['',Validators.required],
    'dni':['',Validators.required],
    'fecha':['',Validators.required],
    'contrasena':['',Validators.required]
  })

  constructor(private fb:FormBuilder,
    private authenticationService: AutenticacionService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: {usuario:any}
  ){}


  crear():void{ 
    const {nombre, apellido, mail, telefono, dni, fecha, contrasena}=this.formularioCrearPaciente.value
    console.log({nombre, apellido, mail, telefono, dni, fecha, contrasena})
    this.authenticationService.register(apellido,nombre, fecha, contrasena, "paciente", mail, telefono, dni).subscribe({
      next: (response) => {
        alert("usuario creado exitosamente")
        console.log('Respuesta del servidor:', response);
      },
      error: (error) => {
        alert("error de crear usuario")
        console.error('Error en la creación:', error);
      }
    });
  }


}

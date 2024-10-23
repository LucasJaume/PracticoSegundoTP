import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

interface cobertura {
  obraSocial:String;
}

interface especialidad {
  rol:String;
}

interface profesional {
  nombre:String;
}

@Component({
  selector: 'app-operador-asignar-turnos',
  templateUrl: './operador-asignar-turnos.component.html',
  styleUrls: ['./operador-asignar-turnos.component.css']
})

export class OperadorAsignarTurnosComponent {

  form=this.fb.group({
    'cobertura':['', Validators.required],
    'especialidad':['', Validators.required],
    'profesional':['', Validators.required],
    'fecha':['', Validators.required],
    'hora':['', Validators.required],
    'notas':['', Validators.required]
  })

  constructor(private fb:FormBuilder, private router:Router){}

  cobertura: cobertura[]=[
      {obraSocial:'osde'},
      {obraSocial:'jerarquicos'},
  ]

  especialidad: especialidad[]=[
    {rol:'traumatologo'},
    {rol:'oculista'}
  ]

  profesional: profesional[]=[
    {nombre:'Lucas'},
    {nombre:'Matias'},
  ]
}

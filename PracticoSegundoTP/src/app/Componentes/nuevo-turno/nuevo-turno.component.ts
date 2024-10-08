import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent {
  form=this.fb.group({
    'cobertura':['', Validators.required],
    'especialidad':['', Validators.required],
    'profesional':['', Validators.required],
    'fecha':['', Validators.required],
    'hora':['', Validators.required],
    'notas':['', Validators.required]
  })
  constructor(private fb:FormBuilder, private router:Router){}
  
  botonCancelar():void{
this.router.navigate(['/home'])
  }

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

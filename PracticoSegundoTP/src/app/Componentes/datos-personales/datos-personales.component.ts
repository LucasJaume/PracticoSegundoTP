import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent {
  form=this.fb.group({
    'nombre':['', Validators.required],
    'Apellido':['', Validators.required],
    'dni':['', Validators.required],
    'correo':['', Validators.required],
    'telefono':['', Validators.required],
    'contrasena':['', Validators.required],
  })

  constructor(private fb: FormBuilder, private router:Router){}

  cancelar():void{
    this.router.navigate(["/home"])
  }

  editar():void{
    
  }
}

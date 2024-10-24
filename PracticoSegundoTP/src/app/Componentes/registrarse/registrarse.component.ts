import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AutenticacionService } from '../Service/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {
  form=this.fb.group({
    'nombre':['',Validators.required],
    'usuario':['',Validators.required],
    'apellido':['',Validators.required],
    'email':['',Validators.required],
    'telefono':['',Validators.required],
    'dni':['',Validators.required],
    'fecha':['',Validators.required],
    'contrasena':['',Validators.required]
  })

constructor(private fb:FormBuilder, 
  public dialogRef:MatDialogRef<RegistrarseComponent>, 
  private AutenticacionService:AutenticacionService,
  private router: Router  
){}

close(): void {
  this.dialogRef.close();
}

aceptar():void{
  const nombre = this.form.get('nombre')?.value;
  const apellido = this.form.get('apellido')?.value;
  const email = this.form.get('email')?.value;
  const dni = this.form.get('dni')?.value;
  const telefono = this.form.get('telefono')?.value;
  const fecha = this.form.get('fecha')?.value;
  const contrasena = this.form.get('contrasena')?.value;
  const usuario = this.form.get('usuario')?.value;

  this.AutenticacionService.register(apellido, nombre, fecha, contrasena, usuario, "paciente", email, telefono, dni).subscribe(
    response => {
      if (response.codigo === 200) {
        console.log('Login exitoso', response);
        localStorage.setItem('token', response.jwt);
        this.router.navigate(['/home-login']);
        this.dialogRef.close();
        alert("Usuario registrado exitosamente.")
      } else {
        console.error('Error de login', response.mensaje);
      }
    },
    error =>{
      console.error('Error en la petición', error);
    }
  )

}

}


import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Service/autenticacion.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  form=this.fb.group({
    'nombre':['', Validators.required],
    'Contrasena':['',Validators.required]
  })
constructor(
  private AutenticacionService: AutenticacionService,
  private fb:FormBuilder,
  public dialogRef:MatDialogRef<LoginComponent>,
  private router:Router
){}

aceptar(): void {
  const nombre = this.form.get('nombre')?.value;
  const Contrasena = this.form.get('Contrasena')?.value;

  if (nombre && Contrasena) {
    this.AutenticacionService.login(nombre, Contrasena).subscribe(
      response => {
        if (response.codigo === 200) {
          console.log('Login exitoso', response);
          localStorage.setItem('token', response.jwt);
          this.router.navigate(['/home']);
          this.dialogRef.close();
        } else {
          console.error('Error de login', response.mensaje);
        }
      },
      error => {
        console.error('Error en la petición', error);
      }
    );
  } else {
    console.error('Nombre o contraseña no pueden estar vacíos');
  }
}

close(): void {
  this.dialogRef.close();
}

}

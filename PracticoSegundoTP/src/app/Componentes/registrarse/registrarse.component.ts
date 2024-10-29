import { Component, Inject, Optional  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { AutenticacionService } from '../Service/autenticacion.service';
import { Router } from '@angular/router';
import { loadTranslations } from '@angular/localize';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.css']
})
export class RegistrarseComponent {

  userRole: string | null  = localStorage.getItem("rol");

  form = this.fb.group({
    'nombre': ['', Validators.required],
    'apellido': ['', Validators.required],
    'email': ['', Validators.required],
    'telefono': ['', Validators.required],
    'dni': ['', Validators.required],
    'fecha_nacimiento': ['', Validators.required],
    'password': ['', Validators.required],
    'rol': ['', Validators.required]
 });

  ngOnInit(): void {

    const datosUsuario = JSON.parse(sessionStorage.getItem('datosUsuario') || '[]');

    this.userRole= datosUsuario[0]?.rol || '';
    console.log(this.usuario)
    if (this.usuario) {
      const fechaNacimientoDate: Date = new Date(this.usuario.fecha_nacimiento);
      const fechaFormateada: string = fechaNacimientoDate.toISOString().split('T')[0];
      console.log(this.usuario)
      this.form.patchValue({
        nombre: this.usuario.nombre,
        apellido: this.usuario.apellido,
        fecha_nacimiento: fechaFormateada,
        password: this.usuario.password,
        email: this.usuario.email,
        telefono: this.usuario.telefono,
        dni: this.usuario.dni,
        rol: this.usuario.tipoUsuario
      });
    }
    console.log('Datos iniciales del formulario:', this.form.value);
  }
usuario: any;

constructor(private fb:FormBuilder, 
  public dialogRef:MatDialogRef<RegistrarseComponent>, 
  private AutenticacionService:AutenticacionService,
  private router: Router,
  @Optional() @Inject(MAT_DIALOG_DATA) public data: {usuario:any}
){
  if(this.userRole === "administrador"){
  this.usuario=data.usuario;
  console.log(data);
  }
}



close(): void {
  this.dialogRef.close();
}

aceptar(): void {
  console.log(this.form);

  const { nombre, apellido, email, dni, telefono, fecha_nacimiento, password, rol } = this.form.value;

  let body = { nombre, apellido, email, dni, telefono, fecha_nacimiento, password, rol };

  console.log('Datos enviados:', { nombre, apellido, email, dni, telefono, fecha_nacimiento, password, rol });

  console.log(this.usuario);
  if (this.usuario) {
    console.log(this.usuario.id);
    
    this.AutenticacionService.actualizarUsuario(
      this.usuario.id,
      JSON.stringify(body)
    ).subscribe(
      response => {
        if (response.codigo === 200) {
          console.log('Usuario actualizado exitosamente', response);
          this.dialogRef.close();
          alert("Usuario actualizado exitosamente.");
        } else {
          console.error('Error al actualizar usuario', response.mensaje);
        }
      },
      error => {
        console.error('Error en la petición', error);
      }
    );
  }
  else {
    // Si no hay 'data', significa que está creando un nuevo usuario
    this.AutenticacionService.register(
      apellido, nombre, fecha_nacimiento, password, rol || 'paciente', email, telefono, dni
    ).subscribe(
      response => {
        if (response.codigo === 200) {
          console.log('Usuario registrado exitosamente', response);
          localStorage.setItem('token', response.jwt);
          if(!sessionStorage.getItem('datosUsuario')){
           console.log(sessionStorage.getItem('datosUsuario'))
            this.router.navigate(['/home-login']);
          }
          this.dialogRef.close();
          alert("Usuario registrado exitosamente.");
        } else {
          console.error('Error de registro', response.mensaje);
        }
      },
      error => {
        console.error('Error en la petición', error);
      }
    );
  }
}


}


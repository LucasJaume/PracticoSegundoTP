import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../Service/autenticacion.service';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private router: Router,  
    private autenticacionService: AutenticacionService
  ) {
    this.form = this.fb.group({
      nombre: [{ value: '', disabled: true }, Validators.required],
      apellido: [{ value: '', disabled: true }, Validators.required],
      dni: [{ value: '', disabled: true }, Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const datosUsuario = sessionStorage.getItem('datosUsuario');
    if (datosUsuario) {
      const datosUsuarioObj = JSON.parse(datosUsuario); 
      const idUsuario = datosUsuarioObj[0].id; 
      console.log(idUsuario); 
      console.log(datosUsuarioObj);
      

      this.autenticacionService.obtenerUsuario(idUsuario).subscribe(
        (response) => {
          console.log("Datos del usuario:", response);
          const usuario = response.payload[0];
          console.log("Datos del usuario a cargar:", usuario); 

          this.form.patchValue({
            nombre: usuario.nombre,
            apellido: usuario.apellido,
            dni: usuario.dni,
            email: usuario.email,
            telefono: usuario.telefono,
            password: usuario.password,
          });
          
        },
        (error) => {
          console.error("Error al obtener los datos del usuario:", error);
        }
      );
    } else {
      console.log("No se encontraron datos del usuario en sessionStorage.");
    }
  }

  cancelar(): void {
    this.router.navigate(['/home']);
  }

  editar(): void {
    if (this.form.valid) {
      const datosActualizados = this.form.getRawValue();
      const datosUsuario = sessionStorage.getItem('datosUsuario');

      let datosUsuarioObj;
      if (datosUsuario) {
        datosUsuarioObj = JSON.parse(datosUsuario)[0];
        console.log("Datos de usuario en sessionStorage:", datosUsuarioObj);
      } else {
        console.error("No se encontraron datos del usuario en sessionStorage.");
        return;
      }

      // const fechaFormateada = this.formatFecha(datosActualizados.fecha_nacimiento);

      const datosAActualizar = {
        nombre: datosUsuarioObj.nombre,
        apellido: datosUsuarioObj.apellido, 
        dni: datosActualizados.dni, 
        // fecha_nacimiento: fechaFormateada, 
        rol: datosUsuarioObj.rol, 
        email: datosActualizados.email, 
        telefono: datosActualizados.telefono, 
        password: datosActualizados.password 
      };
  
      console.log("Datos a actualizar:", datosAActualizar); 
  
      const idUsuario = datosUsuarioObj.id; 
  
      this.autenticacionService.actualizarUsuario(idUsuario, datosAActualizar).subscribe(
        (response) => {
          console.log("Usuario actualizado:", response);
        },
        (error) => {
          console.error("Error al actualizar el usuario:", error);
        }
      );
    }
  }

  // formatFecha(fecha: string): string {
  //    const [year, month, day] = fecha.split('-'); return `${day}-${month}-${year}`; // Ajusta el formato según sea necesario }  
  // }
}

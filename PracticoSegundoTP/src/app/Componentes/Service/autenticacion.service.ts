import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private url = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string):Observable<any>{
    return this.http.post(`${this.url}/api/login`, { usuario, password })
  }

  register(apellido: string | null | undefined, nombre: string | null | undefined, fecha_nacimiento: string | null | undefined, password: string | null | undefined, rol: string | null | undefined, email: string | null | undefined, telefono: string | null | undefined, dni: string | null | undefined,):Observable<any>{
    return this.http.post(`${this.url}/api/crearUsuario`, { password, fecha_nacimiento, nombre, apellido, rol, email, telefono, dni })
  }

  obtenerUsuarios(): Observable<any> {
    const token = localStorage.getItem('token'); 
  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type' : 'application/json' 
    };
  
    return this.http.get(`${this.url}/api/obtenerUsuarios`, { headers });
  }

  actualizarUsuario(id: string, usuarioData: any): Observable<any> {
    const token = localStorage.getItem('token');
  
    const headers = {
        'Authorization': ` ${token}`,
        'Content-type': 'application/json'
    };
  
    return this.http.put(`${this.url}/api/actualizarUsuario/${id}`, usuarioData, { headers });
  }

  // funciona cheto
  obtenerEspecialidades(): Observable<any>{
    const token = localStorage.getItem('token'); 
  
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type' : 'application/json' 
    };
  
    return this.http.get(`${this.url}/api/obtenerEspecialidades`, { headers });
  }


  // no funciona 
  crearMedicoEspecialidad(data: { id_medico: number; id_especialidad: number }): Observable<any> {
    const token = localStorage.getItem('token');  
    console.log('Token utilizado:', token);
    const headers = {
      'Authorization': ` ${token}`,
      'Content-type': 'application/json' 
    };
    return this.http.post(`${this.url}/api/crearMedicoEspecialidad`, data, { headers });
  }


  


}

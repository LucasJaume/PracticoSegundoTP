import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private url = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string):Observable<any>{
    return this.http.post(`${this.url}/api/login`, { usuario, password })
  }

  register(apellido: string | null | undefined, nombre: string | null | undefined, fecha_nacimiento: string | null | undefined, password: string | null | undefined, usuario: string | null | undefined, rol: string | null | undefined, email: string | null | undefined, telefono: string | null | undefined, dni: string | null | undefined,):Observable<any>{
    return this.http.post(`${this.url}/api/crearUsuario`, { usuario, password, fecha_nacimiento, nombre, apellido, rol, email, telefono, dni })
  }


}

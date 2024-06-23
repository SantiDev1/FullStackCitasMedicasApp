import { Injectable } from '@angular/core';
import { appsettings } from '../settings/appsettings';
import { Register } from '../interface/Register';
import { Observable } from 'rxjs';
import { from } from 'rxjs';
import { ResponseAcceso } from '../interface/ResponseAcesso';
import { Login } from '../interface/Login';
import { Citas } from '../interface/Citas';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private baseUrl: string = appsettings.apiUrl;

  constructor() { }

  // llamado a la api para registrar un usuario
  registrarse(objeto: Register): Observable<ResponseAcceso> {
    return from(
      axios.post<ResponseAcceso>(`${this.baseUrl}/identity/register`, objeto)
        .then(response => response.data)
    );
  }

  // llamado a la api para login un usuario
  login(objeto: Login): Observable<ResponseAcceso> {
    return from(
      axios.post<ResponseAcceso>(`${this.baseUrl}/identity/login`, objeto)
        .then(response => response.data)
    );
  }

  // llamado a la api para crear las citas
  createCita(data: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return from(
      axios.post(`${this.baseUrl}/api/Citas`, data, { headers })
        .then(response => response.data)
    );
  }

  // llamado a la api para obtener todas las citas
  getAllCitas(): Observable<Citas[]> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return from(
      axios.get<Citas[]>(`${this.baseUrl}/api/Citas`, { headers })
        .then(response => response.data)
    );
  }

  // llamado a la api para borrar las citas
  deleteCita(id: any): Observable<any> {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return from(
      axios.delete(`${this.baseUrl}/api/Citas/${id}`, { headers })
        .then(response => response.data)
    );
  }
}

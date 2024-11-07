import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from './empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  //URL: esta url obtiene el listado de todos los empleados del backend
  private baseURL= "http://localhost:8080/api/v1/empleados";

  constructor( private httpClient : HttpClient  ) { }


  //este metodo nos sirve para obtener los empleados
  obtenerListaEmpleado():Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(`${this.baseURL}`)
  }

  //metodo para registrar un empleado
  registraEmpleado( empleado:Empleado):Observable<Object>{

    return this.httpClient.post(`${this.baseURL}` , empleado);

  }

  //actulaizar Empleado
  actulaizarEmpleado(  id:number , empleado:Empleado ):Observable<Object>{


    return this.httpClient.put(`${this.baseURL}/${id}` , empleado);

  }

  //obtener empleado por id
  obtenerEmpleadoPorId( id:number  ){
    return this.httpClient.get<Empleado>(`${this.baseURL}/${id}`);
  }

  eliminarEmpleado( id:number){

    return this.httpClient.delete(`${this.baseURL}/${id}`)


  }







}

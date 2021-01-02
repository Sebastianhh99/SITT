import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl : string;
  private a: any[];
  constructor(private httpClient:HttpClient) {
    this.apiUrl='https://pruebatecnica.sittycia.com/api_vp';
  }

  getCities(departmentId: number):any {
    return this.httpClient.post(`${this.apiUrl}/ciudad`,{'id_departamento':departmentId});
  }

  getDepartments():any{
    return this.httpClient.get(`${this.apiUrl}/departamento`);
  }

  getDocumentTypes():any{
    return this.httpClient.get(`${this.apiUrl}/tipoDocumentos`);
  }

  getUserTypes():any{
    return [
      {
        id_tipo_usuario: 1,
        descripcion : "Administrador"
      },
      {
        id_tipo_usuario: 2,
        descripcion : "Usuario"
      },
      {
        id_tipo_usuario: 3,
        descripcion : "Instructor"
      }
    ]
  }

  registerUser(values: any){
    this.httpClient.post(`${this.apiUrl}/auth`,values).subscribe(
      (data:any[])=>{
        console.log(data);
      }
    );
  }

}

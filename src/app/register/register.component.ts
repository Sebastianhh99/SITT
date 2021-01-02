import { UserService } from './../user.service';
import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormControl,FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { ValueTransformer } from '@angular/compiler/src/util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  formData: FormGroup;
  departmentsOptions = [];
  citiesOptions = [];
  documentTypes = [];
  userTypes = [];
  repeat: boolean = false;
  samePass: boolean = false;
  repeatText: string;
  constructor(private services:UserService) {
    this.apiLoadDepartments();
    this.apiLoadDocumentTypes();
    this.apiLoadUserTypes();
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      first_name: new FormControl(''),
      username: new FormControl(''),
      last_name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      password2: new FormControl(''),
      bio: new FormControl(''),
      direccion: new FormControl(''),
      department: new FormControl(),
      fecha_nacimiento: new FormControl(),
      id_ciudad: new FormControl(),
      tipo_documento: new FormControl(),
      tipo_usuario: new FormControl(),
    });
  }

  makeSubmit(){
    var values = this.formData.value;
    this.services.registerUser({
      username: values.username,
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      perfil:{
        bio: values.bio,
        direccion: values.direccion,
        fecha_nacimiento: values.fecha_nacimiento,
        tipo_documento: values.tipo_documento,
        tipo_usuario: values.tipo_usuario,
        id_ciudad:values.id_ciudad
      }
    });
  }

  passwordsCheck(): void{
    this.repeat=true;
    if(this.formData.value.password==this.formData.value.password2){
      this.repeatText='Las contraseas son iguales';
      this.samePass=true;
    }else{
      this.repeatText='Las contraseas son diferentes';
      this.samePass=false;
    }
  }

  apiLoadCitiesByDepartment(){
    this.services.getCities(this.formData.value.department).subscribe(
      (data:any[])=>{
        this.citiesOptions = data;
      }
    );
  }

  apiLoadDepartments(){
    this.services.getDepartments().subscribe(
      (data:any[])=>{
        this.departmentsOptions = data;
      }
    );
  }

  apiLoadDocumentTypes(){
    this.services.getDocumentTypes().subscribe(
      (data:any[])=>{
        this.documentTypes = data;
      }
    );
  }

  apiLoadUserTypes(){
    this.userTypes=this.services.getUserTypes();
  }
}

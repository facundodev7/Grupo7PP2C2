import { Component } from '@angular/core';
import { ControladorR } from '../../database';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:any
  contra:any

  form:any
  formData = new FormData()

  constructor(private controlador:ControladorR){}

  subir(){
    this.form = document.getElementById('formu')
    this.formData = new FormData(this.form)

    this.email = this.formData.get('usuario')
    this.contra = this.formData.get('contra')

    this.controlador.login(this.email,this.contra)
  }

}

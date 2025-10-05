import { Component } from '@angular/core';
import { ControladorR } from '../../database';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:any
  contra:any
  
  constructor(private controlador:ControladorR){}

  async subir(){
    await this.controlador.login(this.email,this.contra)
  }

}

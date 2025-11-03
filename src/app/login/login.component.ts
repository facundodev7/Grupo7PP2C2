import { Component } from '@angular/core';
import { ControladorR } from '../../database';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email:any
  contra:any
  
  constructor(private controlador:ControladorR, private ruta:Router){}

  async subir(){
    await this.controlador.login(this.email,this.contra)
  }

   irA(arg:string){
    this.ruta.navigate([arg])
  }

}

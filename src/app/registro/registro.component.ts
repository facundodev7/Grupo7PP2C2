import { Component } from '@angular/core';
import { ControladorR } from '../../database';

@Component({
  selector: 'app-registro',
  imports: [],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  constructor(private controlador:ControladorR){}

  async registro(){
    console.log('test')
    //aca va el codigo de registro
  }
}

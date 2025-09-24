import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { ControladorR } from '../../database';
import { currentUserId } from '../../database';

@Component({
  selector: 'app-inicio',
  imports: [RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent {

  correo:any

  constructor(private ruta:Router, private controlador:ControladorR)
  {
    this.cargar()
  }

  async cargar(){
    this.correo = await this.controlador.getEmail(currentUserId)
  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

  test1(){
    console.log(currentUserId)
  }

}

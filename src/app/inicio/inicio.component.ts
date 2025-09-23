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



  constructor(private ruta:Router, private controlador:ControladorR){

  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

  test1(){
    console.log(currentUserId)
  }

}

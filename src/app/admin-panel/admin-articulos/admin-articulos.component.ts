import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorR } from '../../../database';

@Component({
  selector: 'app-admin-articulos',
  imports: [],
  templateUrl: './admin-articulos.component.html',
  styleUrl: './admin-articulos.component.css'
})
export class AdminArticulosComponent {

  correo:any

   constructor(private ruta:Router, private controlador: ControladorR){}


   async ngOnInit(){
    this.controlador.user$.subscribe(async (user) =>{
      if (user){
        this.correo = await this.controlador.getEmail(user.uid)
        
      } else {
        this.correo = null;
      }
    })
  }


     irA(arg:string){
    this.ruta.navigate([arg])
  }

}

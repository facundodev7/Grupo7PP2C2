import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorR } from '../../../database';
import { Articulo } from '../../models/Articulos';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-articulos',
  imports: [ReactiveFormsModule,RouterModule, FormsModule],
  templateUrl: './admin-articulos.component.html',
  styleUrl: './admin-articulos.component.css'
})
export class AdminArticulosComponent {

  correo:any
  articulo = new Articulo('','','')

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

   enviar(){
    this.controlador.agregarArticulo( this.articulo.Titulo, this.articulo.Texto, this.articulo.Imagen);
    }


     irA(arg:string){
    this.ruta.navigate([arg])
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorR } from '../../../database';

@Component({
  selector: 'app-admin-usuarios',
  imports: [],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {

  correo:any


 constructor(private controlador:ControladorR,private ruta:Router){}

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

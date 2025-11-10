import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ControladorR } from '../../../database';

@Component({
  selector: 'app-admin-usuarios',
  imports: [ CommonModule],
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css'
})
export class AdminUsuariosComponent {

  correo:any
  usuarios:any

 constructor(private controlador:ControladorR,private ruta:Router){}

async ngOnInit(){
    this.controlador.user$.subscribe(async (user) =>{
      if (user){
        this.correo = await this.controlador.getEmail(user.uid)
        
      } else {
        this.correo = null;
      }
    })
    this.agarrar()
  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

  async agarrar(){
    this.usuarios = await this.controlador.getUsers()
    this.usuarios.forEach((usuario: { mostrar: boolean; }) =>{
      usuario.mostrar = false;
    })
    const numero = this.usuarios.findIndex((arg: { correo: string; }) => arg.correo = "admin@admin.com")
    this.usuarios.splice(numero, 1)
    console.log(this.usuarios)
  }

  mostrarMascotas(usuario:any){
    usuario.mostrar = !usuario.mostrar

    if (usuario.mostrar && usuario.mascotas){
      usuario.MascotasArray = Object.values(usuario.mascotas)
    }
  }

}

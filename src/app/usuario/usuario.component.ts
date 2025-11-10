import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorR } from '../../database';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {

    nombre:any
    apellido:any
    correo:any
    telefono:any
    calle:any
    numero:any

    mascota: string = 'Sin definir';
    mascotas: any[] = [];


    constructor(
    private ruta: Router,
    private controlador: ControladorR ) {}


 async ngOnInit() {

    
    const uid = this.controlador.getCurrentUid();

    if (uid) {
      this.mascotas = await this.controlador.getMascotas(uid);
    }

    this.controlador.user$.subscribe(async (user) =>{
      if (user){
        this.correo = await this.controlador.getEmail(user.uid);
        this.nombre = await this.controlador.getNombre(user.uid);
        this.apellido = await this.controlador.getApellido(user.uid);
        this.telefono = await this.controlador.getTelefono(user.uid);

      } else {
        this.correo = null;
      }
    })
  
  }









      irA(arg:string){
    this.ruta.navigate([arg])
  }


}

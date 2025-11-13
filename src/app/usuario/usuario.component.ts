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
      this.nombre = await this.controlador.getNombre(uid);
      this.apellido = await this.controlador.getApellido(uid);
      this.telefono = await this.controlador.getTelefono(uid);
      this.calle = await this.controlador.getCalle(uid);
      this.numero = await this.controlador.getNumero(uid);
    }

    this.controlador.user$.subscribe(async (user) =>{
      if (user){
        this.correo = await this.controlador.getEmail(user.uid);

      } else {
        this.correo = null;
      }
    })
  
  }


   async eliminarMascota(id: string) {
  const uid = this.controlador.getCurrentUid();
  if (!uid) return;

  const confirmacion = confirm('¿Eliminar esta mascota?');
  if (!confirmacion) return;

  await this.controlador.borrarMascota(uid, id);
  this.mascotas = this.mascotas.filter(m => m.id !== id);
}






      irA(arg:string){
    this.ruta.navigate([arg])
  }


}

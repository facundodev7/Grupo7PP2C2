import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControladorR } from '../../../database';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-usuario-editar',
  imports: [CommonModule,FormsModule],
  templateUrl: './usuario-editar.component.html',
  styleUrl: './usuario-editar.component.css'
})
export class UsuarioEditarComponent {nombre:any
    apellido:any
    correo:any
    telefono:any
    calle:any
    numero:any


    constructor(
    private ruta: Router,
    private controlador: ControladorR ) {}


 async ngOnInit() {

    
    const uid = this.controlador.getCurrentUid();

    if (uid) {

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


  guardar() {
    const uid = this.controlador.getCurrentUid();
    if (!uid) return;

    if (this.nombre == '')
    {
      alert('Ingrese un nombre');
      return;
    }

    if (this.apellido == '')
    {
      alert('Ingrese un apellido');
      return;
    }

    if (this.telefono == '')
    {
      alert('Ingrese un teléfono');
      return;
    }


    this.controlador.writeNombre(uid, this.nombre);
    this.controlador.writeApellido(uid, this.apellido);
    this.controlador.writeTelefono(uid, this.telefono);

    if(this.calle != null)
    {
      this.controlador.writeCalle(uid, this.calle);
    }

    if(this.calle != null)
    {
      this.controlador.writeNumero(uid, this.numero);
    }
    

    this.ruta.navigate(['usuario']);
  }


 



      irA(arg:string){
    this.ruta.navigate([arg])
  }


}

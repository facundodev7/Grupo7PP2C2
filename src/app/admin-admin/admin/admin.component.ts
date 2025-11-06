import { Component, OnInit } from '@angular/core';
import { ControladorR } from '../../../database';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router, RouterLink, RouterModule } from '@angular/router';

var hoy = new Date()
var hoyT
var hoyMesS:string
var hoyNumeroO:string
hoyT = hoy.toDateString()
hoyMesS = hoyT.slice(4,7)
hoyNumeroO = hoyT.slice(8,10)

var maniana = hoy
var manianaMesS:string
var manianaNumeroO:string
maniana.setDate(hoy.getDate() + 1)
manianaMesS = maniana.toDateString().slice(4,7)
manianaNumeroO = maniana.toDateString().slice(8,10)




@Component({
  selector: 'app-admin',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  turnos = new Array
  turnosM = new Array
  hoyNumero = hoyNumeroO
  hoyMes = hoyMesS
  manianaNumero = manianaNumeroO
  manianaMes = manianaMesS

  ladoIzquierdo = false
  ladoDerecho = false
  medio = true


  correo = ''

  constructor(private controlador:ControladorR,private ruta:Router){}


  async ngOnInit(){
    this.cargar().then(()=> {
      this.agregarDatos(this.turnos)
      this.agregarDatos(this.turnosM)
    })

    switch(this.hoyMes){
      case 'Jan':
        this.hoyMes = 'Enero'
        break;
      case 'Feb':
        this.hoyMes = 'Febrero'
        break;
      case 'Mar':
        this.hoyMes = 'Marzo'
        break;
      case 'Apr':
        this.hoyMes = 'Abril'
        break;
      case 'May':
        this.hoyMes = 'Mayo'
        break;
      case 'Jun':
        this.hoyMes = 'Junio'
        break;
      case 'Jul':
        this.hoyMes = 'Julio'
        break;
      case 'Aug':
        this.hoyMes = 'Agosto'
        break;
      case 'Sep':
        this.hoyMes = 'Septiembre'
        break;
      case 'Oct':
        this.hoyMes  = 'Octubre'
        break;
      case 'Nov':
        this.hoyMes = 'Noviembre'
        break;
      case 'Dec':
        this.hoyMes = 'Diciembre'
        break;
  }
  switch (this.manianaMes) {
  case 'Jan':
    this.manianaMes = 'Enero';
    break;
  case 'Feb':
    this.manianaMes = 'Febrero';
    break;
  case 'Mar':
    this.manianaMes = 'Marzo';
    break;
  case 'Apr':
    this.manianaMes = 'Abril';
    break;
  case 'May':
    this.manianaMes = 'Mayo';
    break;
  case 'Jun':
    this.manianaMes = 'Junio';
    break;
  case 'Jul':
    this.manianaMes = 'Julio';
    break;
  case 'Aug':
    this.manianaMes = 'Agosto';
    break;
  case 'Sep':
    this.manianaMes = 'Septiembre';
    break;
  case 'Oct':
    this.manianaMes = 'Octubre';
    break;
  case 'Nov':
    this.manianaMes = 'Noviembre';
    break;
  case 'Dec':
    this.manianaMes = 'Diciembre';
    break;
}
  }

  async cargar(){
    this.turnos = await this.controlador.turnosAdminHoy()
    this.turnosM = await this.controlador.turnosAdminManiana()
    console.log(this.turnos)
  }

  async obtenerUsuario(argumento:any){
    return await this.controlador.getNombre(argumento)
  }

  async agregarDatos(arg:any){ //trae los datos de usuario de los turnos
    let i = 0
    for (let usuario of arg){
      usuario.nombre = await this.controlador.getNombre(usuario.usuario)
      usuario.apellido = await this.controlador.getApellido(usuario.usuario)
      usuario.telefono = await this.controlador.getTelefono(usuario.usuario)
      usuario.email = await this.controlador.getEmail(usuario.usuario)
      usuario.numero =  ++i 
    }
  }

  irA(arg:string){
    this.ruta.navigate([arg])
  }

}

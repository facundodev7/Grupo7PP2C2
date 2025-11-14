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

  // Arrays para almacenar turnos de hoy, mañana, ayer y futuro, y flags para controlar vistas
  turnos = new Array
  turnosM = new Array
  turnosA = new Array
  turnosF = new Array

  btnI = true
  btnD = true
  ladoIzquierdo = false
  ladoDerecho = false
  medio = true

  hoyNumero = hoyNumeroO
  hoyMes = hoyMesS
  manianaNumero = manianaNumeroO
  manianaMes = manianaMesS

  


  correo = ''

  constructor(private controlador:ControladorR,private ruta:Router){}

// Al iniciar el componente carga datos iniciales y convierte los meses a formato en español

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

  // Elimina un turno y recarga la información dependiendo de qué sección esté activa
  async borrarTurno(arg1:any, arg2:any){
    await this.controlador.borrarTurno(arg1, arg2).then(()=> {
      this.cargar().then(async ()=>{
        this.agregarDatos(this.turnos)
        this.agregarDatos(this.turnosM)
        
        if (this.ladoIzquierdo == true){
            this.turnosA = await this.controlador.turnosAdminAyer()
            this.agregarDatos(this.turnosA)
        }
        if (this.ladoDerecho == true){
            this.turnosF = await this.controlador.turnosAdminAyer()
            this.agregarDatos(this.turnosF)
        }
      })
    })
  }

  // Carga los turnos de hoy y mañana desde la base de datos

  async cargar(){
    this.turnos = await this.controlador.turnosAdminHoy()
    this.turnosM = await this.controlador.turnosAdminManiana()
    console.log(this.turnos)
  }
  // Muestra los turnos de ayer y cambia la interfaz hacia el panel izquierdo

  async cargarAyer(){
    this.turnosA = await this.controlador.turnosAdminAyer()
    this.agregarDatos(this.turnosA)
    this.ladoIzquierdo = !this.ladoIzquierdo
    this.btnI = !this.btnI
    this.btnD = !this.btnD
    this.medio = !this.medio

  }

  // Muestra los turnos futuros y activa la vista del panel derecho

  async cargarFuturo(){
    this.turnosF = await this.controlador.turnosAdminFuturo()
    this.agregarDatos(this.turnosF)
    this.ladoDerecho = !this.ladoDerecho
    this.btnI = !this.btnI
    this.btnD = !this.btnD
    this.medio = !this.medio
  }

  // Restaura la vista principal ocultando los paneles laterales


  async volver(arg:any){
    arg = !arg
    this.medio = true
    this.ladoIzquierdo = false
    this.ladoDerecho = false
    this.btnI = true
    this.btnD = true
  }

  async obtenerUsuario(argumento:any){
    return await this.controlador.getNombre(argumento)
  }

  // solicitud de cada turno de nombre, apellido, teléfono, correo y nombre de mascota con funcion getNombreMascota
  async agregarDatos(arg:any){ 
  let i = 0;
  for (let turno of arg) {
    turno.nombre = await this.controlador.getNombre(turno.usuario);
    turno.apellido = await this.controlador.getApellido(turno.usuario);
    turno.telefono = await this.controlador.getTelefono(turno.usuario);
    turno.email = await this.controlador.getEmail(turno.usuario);

    // 🔹 Agregamos el nombre de la mascota si existe ID
    if (turno.mascota) {
      turno.mascota = await this.controlador.getNombreMascota(turno.usuario, turno.mascota);
    }

    turno.numero = ++i;
  }
}


  irA(arg:string){
    this.ruta.navigate([arg])
  }

}

import { Component, OnInit } from '@angular/core';
import { ControladorR } from '../../database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  imports: [CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  turnos:any[] = []
  hoy = new Date()

  hoy2 = this.hoy.toDateString()

  hoyNumero = this.hoy2.slice(8,10)

  hoyMes = this.hoy2.slice(4,7)

  constructor(private controlador:ControladorR){}


  async ngOnInit(){
    this.test()
  }

  async test(){
    this.turnos = await this.controlador.turnosAdminV2()
    console.log(this.turnos)
  }

  async obtenerUsuario(argumento:any){
    return await this.controlador.getNombre(argumento)
  }

}

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
  constructor(private controlador:ControladorR){}


  async ngOnInit(){
    this.agarrar()
  }

  async agarrar(){
    this.turnos = await this.controlador.getTurnosAdmin();

    for (const turno of this.turnos) {
      turno.Nombre = await this.controlador.getNombre(turno.userId);
      turno.Apellido = await this.controlador.getApellido(turno.userId)
      turno.Email = await this.controlador.getEmail(turno.userId)
      turno.Telefono = await this.controlador.getTelefono(turno.userId)

    }
  }

  async obtenerUsuario(argumento:any){
    return await this.controlador.getNombre(argumento)
  }

}

import { Component } from '@angular/core';
import { ControladorR } from '../../database';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], 
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})

export class RegistroComponent {
  nombre: string = '';
  apellido: string = '';
  email: string = '';
  telefono: string = '';
  password: string = '';
  confir: string = '';

  constructor(private controlador: ControladorR) {}

  async registro() {
    if (!this.nombre) {
      console.log("Debe completar el nombre");
      return;
    }

    if (!this.apellido) {
      console.log("Debe completar el apellido");
      return;
    }

    if (!this.email) {
      console.log("Debe completar email");
      return;
    }

    if (!this.telefono) {
      console.log("Debe completar el teléfono");
      return;
    }

    if (!this.password) {
      console.log("Debe completar la contraseña");
      return;
    }

    if (!this.confir ) {
      console.log("Debe completar la confirmación de la contraseña");
      return;
    }

     if (this.password !== this.confir) {
      console.log("Las contraseñas no coinciden");
      return;
    }

    const resultado = await this.controlador.registroUsuario(this.nombre, this.apellido, this.email, this.telefono, this.password);
    if (resultado.success)  {
      console.log("Usuario registrado con UID:", resultado.uid);
    } else {
      console.error("Error al registrar:", resultado.message);
    }
  }
  
}

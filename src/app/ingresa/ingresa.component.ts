import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Animal } from '../models/Animales';
import { ControladorR } from '../../database';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ingresa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './ingresa.component.html',
  styleUrls: ['./ingresa.component.css']
})
export class IngresaComponent {

  animal = new Animal('', '');
  correo: string = '';
  admin: boolean = false;

  constructor(private controlador: ControladorR, private router: Router) {
    console.log('✅ Se cargó ingresa.component.ts correctamente');
  }

  irA(ruta: string) {
    console.log(`➡️ Navegando a ${ruta}`);
    this.router.navigate([`/${ruta}`]);
  }

  out() {
    console.log('🚪 Cerrando sesión...');
    this.correo = '';
    this.admin = false;
    this.router.navigate(['/login']);
  }

  enviar() {
    console.log('📨 Enviando mascota:', this.animal);
    this.controlador.agregarMascota(
      this.controlador.getCurrentUid(),
      this.animal.Nombre,
      this.animal.Animal,
    );
  }
}

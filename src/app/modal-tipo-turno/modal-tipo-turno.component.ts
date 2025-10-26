  import { Component, Inject } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
  import { ControladorR } from '../../database';

  @Component({
    selector: 'app-modal-tipo-turno',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './modal-tipo-turno.component.html', // referencia al HTML
    styleUrls: ['./modal-tipo-turno.component.css']
  })

  export class ModalTipoTurnoComponent {
    tipoTurno: string = 'Primera consulta';
    mascota: string = 'Sin definir';

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<ModalTipoTurnoComponent>,
      private controlador:ControladorR
    ) {}

    async confirmar() {
    try {
      const userId = this.controlador.getCurrentUid();
      if (!userId) {
        alert('Debes iniciar sesión para reservar un turno.');
        return;
      }

      const fechaCompleta = this.data.fecha; // viene desde el modal anterior
      const [fecha, hora] = fechaCompleta.split(' '); // separa fecha y hora

      // Guardar turno en Firebase
      await this.controlador.reservarTurno(
        hora,
        fecha,
        userId
      );

      // Además, guardar tipo de turno y mascota
      console.log('Turno reservado en Firebase:');
      console.log('Fecha:', fecha);
      console.log('Hora: a', hora);
      console.log('Tipo:', this.tipoTurno);
      console.log('Mascota:', this.mascota);

      alert('¡Turno confirmado correctamente!');
      this.dialogRef.close();
    } catch (error) {
      console.error('Error al confirmar turno:', error);
      alert('Ocurrió un error al guardar el turno.');
    }
  }

  cerrar() {
    this.dialogRef.close();
  }
}


import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { ControladorR } from '../../../database';


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
    mascotas: any[] = [];

    constructor(
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dialogRef: MatDialogRef<ModalTipoTurnoComponent>,
      private controlador:ControladorR
    ) {}


async ngOnInit() {
  const uid = this.controlador.getCurrentUid();

  if (uid) {
    this.mascotas = await this.controlador.getMascotas(uid);
  }
}



  confirmar() {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    const turno = {
      usuario: user ? user.uid : 'sin_usuario',
      fechaOriginal: this.data.fechaTurno,
      hora: this.data.horaTurno,
      tipo: this.tipoTurno,
      mascota: this.mascota,
      creadoEn: new Date().toISOString()
    };

    // Guardar por fecha y hora
    const turnoRef = ref(db, `turnos/${this.data.fechaTurno}/${this.data.horaTurno}`);
    set(turnoRef, turno)
      .then(() => {
        console.log('Turno guardado correctamente:', turno);
        this.dialogRef.close();
      })
      .catch((err) => {
        console.error('Error al guardar turno:', err);
      });
  }

  cerrar() {
    this.dialogRef.close();
  }
}


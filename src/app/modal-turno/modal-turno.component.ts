import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog  } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ModalTipoTurnoComponent } from '../modal-tipo-turno/modal-tipo-turno.component';
import { getDatabase, ref, get } from 'firebase/database';
import { ControladorR } from '../../database';


@Component({
  selector: 'app-modal-turno',
  templateUrl: './modal-turno.component.html',
  styleUrls: ['./modal-turno.component.css'],
  imports: [CommonModule],      // <--- necesario para *ngFor, *ngIf
})
export class ModalTurnoComponent {

  usuarioPidioTurno:any;

    ngOnInit() {
  this.cargarTurnosOcupados();
  this.mismoUsuario()
}

  turnoSeleccionado: number | null = null;

  turnos = [
  { hora: '09:00 a 9:30 Hs', aceptado: false },
  { hora: '09:30 a 10:00 Hs', aceptado: false },
  { hora: '10:00 a 10:30 Hs', aceptado: false },
  { hora: '10:30 a 11:00 Hs', aceptado: false },
  { hora: '11:00 a 11:30 Hs', aceptado: false },
  { hora: '11:30 a 12:00 Hs', aceptado: false },
  { hora: '12:00 a 12:30 Hs', aceptado: false },
  { hora: '12:30 a 13:00 Hs', aceptado: false },
  { hora: '13:00 a 13:30 Hs', aceptado: false },
  { hora: '13:30 a 14:00 Hs', aceptado: false },
  { hora: '14:00 a 14:30 Hs', aceptado: false },
  { hora: '14:30 a 15:00 Hs', aceptado: false },
  { hora: '15:00 a 15:30 Hs', aceptado: false },
  { hora: '15:30 a 16:00 Hs', aceptado: false },
  { hora: '16:00 a 16:30 Hs', aceptado: false },
  { hora: '16:30 a 17:00 Hs', aceptado: false },
  { hora: '17:00 a 17:30 Hs', aceptado: false },
  { hora: '17:30 a 18:00 Hs', aceptado: false },
  { hora: '18:00 a 18:30 Hs', aceptado: false }
];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ModalTurnoComponent>,
    private dialog: MatDialog,
    private controlador: ControladorR
  ) {}

  seleccionarTurno(index: number) {
    this.turnoSeleccionado = index;
  }


  cerrar() {
    this.dialogRef.close();
  }

  abrirTipoTurno() {
  if (this.turnoSeleccionado === null) return;

  const turno = this.turnos[this.turnoSeleccionado];
  const hora = turno.hora.split(' ')[0];
  const fechaCompleta = `${this.data.fecha} ${hora}hs`;
  const fechaTurno = `${this.data.fecha}`;
  const horaTurno = `${hora}`;

  this.dialogRef.close();

  this.dialog.open(ModalTipoTurnoComponent, {
    data: { fecha: fechaCompleta, fechaTurno: fechaTurno, horaTurno: horaTurno },
    width: '40%'
  });
}

mismoUsuario(){
  var pidioTurno = this.data.usuario
  if (pidioTurno == this.controlador.getCurrentUid()){
    this.usuarioPidioTurno = true
  }
  else {
    this.usuarioPidioTurno = false
  }
  console.log(this.usuarioPidioTurno)
}

async cargarTurnosOcupados() {
  const db = getDatabase();
  const fechaRef = ref(db, `turnos/${this.data.fecha}`);
  const snapshot = await get(fechaRef);


  if (snapshot.exists()) {
    const turnosGuardados = snapshot.val();

    for (const key in turnosGuardados) {
      const horaOcupada = turnosGuardados[key].hora.substring(0, 5); // ej. "09:00"

      const index = this.turnos.findIndex(t =>
        t.hora.substring(0, 5) === horaOcupada
      );

      if (index !== -1) {
        this.turnos[index].aceptado = true;
        console.log('Ocupado:', this.turnos[index].hora);
      } else {
        console.log('No coincide:', horaOcupada);
      }
    }
  }


  if (this.turnos.some(t => t.aceptado)) {
    alert('Ya tenés un turno reservado para este día.');
  }
}

tieneTurnoAceptado(): boolean {
  return this.turnos.some(t => t.aceptado);
}





}

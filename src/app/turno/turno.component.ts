import { Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalTurnoComponent } from '../modal-turno/modal-turno.component';
import { MatDialog } from '@angular/material/dialog';




@Component({
  selector: 'app-turno',
  imports: [CommonModule ],
  templateUrl: './turno.component.html',
  styleUrl: './turno.component.css'
})
export class TurnoComponent implements OnInit{

  constructor(private dialog: MatDialog) {}

  monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

    currentDate = new Date();
  currentMonth = this.currentDate.getMonth();
  currentYear = this.currentDate.getFullYear();
  calendarDays: { number: number; class: string }[] = [];

  ngOnInit() {
    this.renderCalendar();
  }

  renderCalendar() {
    const year = this.currentYear;
    const month = this.currentMonth;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = (firstDay.getDay() + 6) % 7; // lunes=0
    const totalDays = lastDay.getDate();
    const prevLastDay = new Date(year, month, 0).getDate();

    const days: { number: number; class: string }[] = [];

    // Días del mes anterior
    for (let i = startDay; i > 0; i--) {
      days.push({ number: prevLastDay - i + 1, class: 'last-month' });
    }

    // Días del mes actual
    for (let i = 1; i <= totalDays; i++) {
      const isToday =
        i === new Date().getDate() &&
        month === new Date().getMonth() &&
        year === new Date().getFullYear();

      days.push({ number: i, class: isToday ? 'today' : '' });
    }

    // Completar los días hasta 42 (6 filas de 7)
    const nextDays = 42 - days.length;
    for (let i = 1; i <= nextDays; i++) {
      days.push({ number: i, class: 'next-month' });
    }

    this.calendarDays = days;
  }

  prevMonth() {
    this.currentMonth--;
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }
    this.renderCalendar();
  }

  nextMonth() {
    this.currentMonth++;
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.renderCalendar();
  }

   abrirModalAdmin(day: number) {
    const fecha = `${day} ${this.monthNames[this.currentMonth]} ${this.currentYear}`;
    this.dialog.open(ModalTurnoComponent, {
      data: { fecha },
      width: '40%'
    });
  }

  abrirModal(day: number, event: Event) {
  const target = event.target as HTMLElement;

  // si tiene la clase last-month, no abrir
  if (target.classList.contains('last-month')) return;

  const selectedDate = new Date(this.currentYear, this.currentMonth, day);
  const today = new Date();
  today.setHours(0, 0, 0, 0); // eliminar horas para comparar solo fechas

  if (selectedDate < today) {
    return; // no abrir modal si es fecha pasada
  }

  const fecha = `${day} ${this.monthNames[this.currentMonth]} ${this.currentYear}`;
  this.dialog.open(ModalTurnoComponent, {
    data: { fecha },
    width: '40%'
  });
}










}

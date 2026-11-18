import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  studentName: string = 'Ali';
  studentAge: number = 22;
  studentGrade: number = 18.5;
  isPassed: boolean = true;
  courseName: string = 'Angular';
  students: string[] = [
  'Ali',
  'Sara',
  'Tara',
  'Mina',
  'Mammad',
  'Nima'
  ];

  grades: number[] = [18, 15, 20, 17];

  getTotalGrades(): number {
  let total: number = 0;

  for (let i = 0; i < this.grades.length; i++) {
    total += this.grades[i];
  }

  return total;
  }
}

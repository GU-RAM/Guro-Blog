import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';

const Modules = [RouterLink];
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [...Modules],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [DatePipe],
})
export class HeaderComponent implements OnInit {
  currentDate: string = '';

  constructor(private datePipe: DatePipe) {}

  ngOnInit() {
    this.updateCurrentDate();
    interval(1000).subscribe(() => {
      this.updateCurrentDate();
    });
  }

  updateCurrentDate() {
    this.currentDate = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    )!;
  }
}

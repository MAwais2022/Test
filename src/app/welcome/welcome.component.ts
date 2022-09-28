import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @ViewChild('inp_name') namekey!: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }
  StartQuiz() {
    localStorage.setItem("name", this.namekey.nativeElement.value)
  }

}

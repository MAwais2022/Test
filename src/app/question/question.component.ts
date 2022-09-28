import { Component, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { QuestionService } from '../services/question.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public name: string = "";
  public questionList: any = [];
  public CurrentQuestion: number = 0;
  public Points: number = 0;
  counter = 50;
  CorrectAnswer: number = 0;
  IncorrectAnswer: number = 0;
  Interval$: any;
  progress: string = "0";
  isQuiz: boolean = false;
  constructor(private questionService: QuestionService) { }

  ngOnInit(): void {
    this.name = localStorage.getItem("name")!;
    this.getAllQuestion();
    this.StartCounter();
  }
  getAllQuestion() {
    this.questionService.getQuestionJson()
      .subscribe(res => {
        this.questionList = res.questions;
      })
  }
  NextQuestion() {
    this.CurrentQuestion++;

  }
  PreviusQuestion() {
    this.CurrentQuestion--;

  }
  answer(CurrentQueno: number, option: any) {
    if (CurrentQueno == this.questionList.length) {
      this.isQuiz = true
    }
    if (option.correct) {
      this.Points += 10;
      this.CorrectAnswer++;
      setTimeout(() => {
        this.CurrentQuestion++;
        this.ResetCounter();
        this.getProgressPercentage();
      }, 1000)

    }
    else {
      setTimeout(() => {
        this.IncorrectAnswer++;
        this.ResetCounter();
        this.getProgressPercentage();
        this.CurrentQuestion++;
      }, 1000);
      this.Points -= 10;
    }

  }
  StartCounter() {
    this.Interval$ = interval(1000)
      .subscribe(val => {
        this.counter--;
        if (this.counter == 0) {
          this.CurrentQuestion++;
          this.counter = 50;
          this.Points -= 10;
        }
      });
    setTimeout(() => {
      this.Interval$.unsubscribe();
    }, 300000);
  }
  StopCounter() {
    this.Interval$.unsubscribe();
    this.counter = 0;
  }
  ResetCounter() {
    this.StopCounter();
    this.counter = 50;
    this.StartCounter()
  }
  ResetQuiz() {
    this.ResetCounter();
    this.getAllQuestion();
    this.Points = 0;
    this.counter = 50;
    this.CurrentQuestion = 0;
    this.progress = "0";

  }
  getProgressPercentage() {
    this.progress = ((this.CurrentQuestion / this.questionList.length) * 100).toString();
    return this.progress
  }
}

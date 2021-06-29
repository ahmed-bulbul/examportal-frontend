import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid;
  questions;

  marksGot = 0;
  correctAnswer = 0;
  attempted = 0;
  wrongAnswer = 0;

  isSubmit = false;

  timer: any;

  constructor(
    private LocationSt: LocationStrategy,
    private _route: ActivatedRoute,
    private _question: QuestionService
  ) {}

  ngOnInit(): void {
    this.preveventBackButton();
    this.qid = this._route.snapshot.params.qid;
    console.log(this.qid);
    this.loadQuestions();
  }
  loadQuestions() {
    this._question.getQuestionsOfQuizForTest(this.qid).subscribe(
      (data: any) => {
        this.questions = data;

        this.timer = this.questions.length * 2 * 60;

        this.questions.forEach((q) => {
          q['givenAnswer'] = '';
        });

        console.log(this.questions);
        this.startTimer();
      },
      (error) => {
        console.log(error);
        Swal.fire('Error', 'Error in loading question of quiz', 'error');
      }
    );
  }

  preveventBackButton() {
    history.pushState(null, null, location.href);
    this.LocationSt.onPopState(() => {
      history.pushState(null, null, location.href);
    });
  }

  submitQuiz() {
    Swal.fire({
      title: 'Do you want to submit the quiz?',
      showCancelButton: true,
      confirmButtonText: `Submit`,
      icon: 'info',
    }).then((e) => {
      if (e.isConfirmed) {
        this.evalQuiz();
      }
    });
  }

  startTimer() {
    let t = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.evalQuiz();
        clearInterval(t);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime() {
    let hh = Math.floor(this.timer / 3600);
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60;
    return `${hh} hr : ${mm} min : ${ss} sec`;
  }

  evalQuiz() {
    //calculation
    this.isSubmit = true;

    this.questions.forEach((q) => {
      if (q.givenAnswer == q.answer) {
        this.correctAnswer++;
        let marksSingle =
          this.questions[0].quiz.maxMarks / this.questions.length;
        this.marksGot += marksSingle;
      }

      if (q.givenAnswer != q.answer && q.givenAnswer.trim() != '') {
        this.wrongAnswer++;
        // this.marksGot=this.marksGot-.50;
      }

      if (q.givenAnswer.trim() != '') {
        this.attempted++;
      }
    });

    console.log('Correct Answer :' + this.correctAnswer);
    console.log('Marks Got ' + this.marksGot);
    console.log(this.questions);
    console.log('Attempted ' + this.attempted);
    console.log('Wrong Ans ' + this.wrongAnswer);
  }
}

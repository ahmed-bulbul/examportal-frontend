import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {

  qId;
  quiz;

  constructor(
    private _route:ActivatedRoute,
    private _quiz:QuizService
  ) { }

  ngOnInit(): void {
    this.qId=this._route.snapshot.params.qid;
    
    this._quiz.getQuiz(this.qId).subscribe(
      (data:any)=>{
        this.quiz=data;
      },
      (error)=>{
        console.log(error);
        alert("error in loading quiz data");
      }
    );
  }

}

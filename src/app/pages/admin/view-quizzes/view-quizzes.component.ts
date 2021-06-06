import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
  quizzes = [];

  updatePublishQuiz;


  constructor(
    private _quiz: QuizService,
    private _router:Router,
    ) {}

  ngOnInit(): void {
    this._quiz.quizzes().subscribe(
      (data:any) => {
        this.quizzes = data;
        console.log(this.quizzes);
      },
      (error) => {
        console.log(error);
        Swal.fire('Error !!', 'Error in loading data', 'error');
      }
    );
  }

  //delete quiz
  deleteQuiz(qId) {
    //alert(qId);
   Swal.fire({
     icon:'warning',
     title:"Are you sure?",
     confirmButtonText:'Delete',
     showCancelButton:true,
   }).then((result)=>{

      if(result.isConfirmed){
        //delete
        this._quiz.deleteQuiz(qId).subscribe(
          (data)=>{
            this.quizzes=this.quizzes.filter((quiz)=>quiz.qId!=qId);
            Swal.fire('Success','Quiz deleted','success');
          },
          (error)=>{
            Swal.fire('Error!','Error in deleteing quiz','error');
          }
        );
      }
   })
  }

  
  }


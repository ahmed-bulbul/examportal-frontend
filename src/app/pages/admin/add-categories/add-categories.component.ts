import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {

  category={
    title:'',
    description:''
  }

  showSpinner: boolean=false;
 

  constructor(private _category:CategoryService,private _snack:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      this._snack.open("Title Required !!",'ok',{
        duration:3000
      });
      return;
    }
    this.showSpinner=true;

    //all done
    this._category.addCategory(this.category).subscribe(
      (data:any)=>{
        this.router.navigate(['/admin/categories']);
        // this.category.title='',
        // this.category.description='',
        this.showSpinner=false;
        
        Swal.fire("Success !",'Category added successfully','success')
      },
      (error)=>{
        console.log(error);
        Swal.fire("Error !",'Server Error','error');
        this.showSpinner=false;
      }
    );
  }

}

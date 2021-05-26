import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.css']
})
export class ViewCategoriesComponent implements OnInit {

  categories=[];
  showSpinner: boolean=true;

  constructor(private _category:CategoryService) { }

  ngOnInit(): void {
    this._category.categories().subscribe((data:any)=>{
        this.categories=data;
        this.showSpinner=false;
        console.log(this.categories);
    },
    (error)=>{
      console.log(error);
      Swal.fire("Error !!","Error in loading data",'error');
      this.showSpinner=false;
    }
    
    );
  }

}

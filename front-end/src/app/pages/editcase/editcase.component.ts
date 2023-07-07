import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';
import { Cases } from 'src/app/interfaces/cases';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcase',
  templateUrl: './editcase.component.html',
  styleUrls: ['./editcase.component.css']
})
export class EditcaseComponent implements OnInit {
  caseEditForm: FormGroup;
  Case= new Array<Cases>();

  constructor(private fb:FormBuilder, private http:CaseService, private route:ActivatedRoute, private router:Router) { 
    this.caseEditForm=this.fb.group({
      caseName: ["",[Validators.required, Validators.maxLength(100)]],
      dataCase: ["", [Validators.required,Validators.maxLength(100)]],
      Noncoplanar: [true,[Validators.required]],
      cancerName: ["",[Validators.required, Validators.maxLength(60)]],
      cancerDescription: ["",[Validators.maxLength(200)]]
    });
  }

  ngOnInit(): void {
    this.getCase(this.route.snapshot.paramMap.get('id'));
  }
  getCase(idCase:any):void {
    this.http.get(idCase).subscribe(datos =>{
     this.Case = datos;
    //  console.log(datos);
    },error =>{
     console.log(error);
    });
   }
   
  updateCase(idCase:any,Case:any): void{
    this.http.update(idCase,Case.value).subscribe(response => {
      if(response){
        // console.log(Case.value);
        window.location.href='http://localhost:4200/mycases';
      }
    },error => {console.log(error)})
  };

}

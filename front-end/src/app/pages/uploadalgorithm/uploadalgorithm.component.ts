import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlgService } from 'src/app/services/alg.service';

@Component({
  selector: 'app-uploadalgorithm',
  templateUrl: './uploadalgorithm.component.html',
  styleUrls: ['./uploadalgorithm.component.css']
})
export class UploadalgorithmComponent implements OnInit {

  AlgorithmForm: FormGroup;

  submitted = false;

  constructor(private fb:FormBuilder, public http:AlgService,private route:Router) { 
    this.AlgorithmForm=this.fb.group({
      algorithmName: ["",[Validators.required,Validators.maxLength(60)]],
      algorithmFile: ["",[Validators.required,Validators.maxLength(200),Validators.pattern('(https?://)?(www\\.[\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      algorithmInfo: ["",[Validators.maxLength(400)]]
    
    });
  }

  ngOnInit(): void {}

  sendDataAlgorithm(){
       this.http.createAlgorithm(this.AlgorithmForm.value).subscribe(res =>{
       console.log('Algorithm uploaded successfully');
       this.submitted=true;
      //  this.route.navigate(['/myalgorithms']);
    })
  }
  newAlgorithm(): void{
    this.submitted = false;
    window.location.href='http://localhost:4200/uploadalgorithm';
  }

}

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
   

  constructor(private fb:FormBuilder, public http:AlgService,private route:Router) { 
    this.AlgorithmForm=this.fb.group({
      algorithmInfo: ["",[Validators.required, Validators.maxLength(100)]],
      algorithmFile: [""]
    
    });
  }

  ngOnInit(): void {}

  get f(){
    return this.AlgorithmForm.controls;
  }

  sendDataAlgorithm(){
    console.log(this.AlgorithmForm.value);
       this.http.createAlgorithm(this.AlgorithmForm.value).subscribe(res =>{
       console.log('Algorithm uploaded successfully');
       this.route.navigate(['/myalgorithms']);
    })
  }

}

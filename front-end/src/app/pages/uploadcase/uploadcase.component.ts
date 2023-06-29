import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CaseService } from 'src/app/services/case.service';
import { CancerService } from 'src/app/services/cancer.service';

@Component({
  selector: 'app-uploadcase',
  templateUrl: './uploadcase.component.html',
  styleUrls: ['./uploadcase.component.css']
})
export class UploadcaseComponent implements OnInit {

  caseForm: FormGroup;

  constructor(private fb:FormBuilder,private route:Router,public http:CaseService, private http2:CancerService) { 
    this.caseForm=this.fb.group({
      caseName: ["",[Validators.required, Validators.maxLength(100)]],
      dataCase: ["", [Validators.maxLength(100)]],
      Noncoplanar: [""],
      cancerName: [""],
      cancerDescription: [""]
    });
  }

  ngOnInit(): void {}

  get f(){
    return this.caseForm.controls;
  }

  sendDataCase(){
    console.log(this.caseForm.value);
    this.http.createCase(this.caseForm.value).subscribe(res =>{
      console.log('Case uploaded successfully');
      this.route.navigate(['/mycases']);
    })
    // this.http2.createCancer(this.caseForm.value)
      
  };

  }

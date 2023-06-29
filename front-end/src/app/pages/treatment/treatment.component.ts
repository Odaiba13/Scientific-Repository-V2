import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Treatment } from 'src/app/interfaces/treatment';
import { TreatmentService } from 'src/app/services/treatment.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.css']
})
export class TreatmentComponent implements OnInit {

  treatmentForm: FormGroup;

  constructor(private fb:FormBuilder, private http:TreatmentService) { 
    this.treatmentForm=this.fb.group({
      treatmentinfo: ["",[Validators.required, Validators.maxLength(100)]],
      numberofbeams: [""]
    });
  }

  ngOnInit(): void {}

  sendDataTreatment(){
    
  }

}

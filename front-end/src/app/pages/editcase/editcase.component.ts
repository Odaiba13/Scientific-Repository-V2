import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editcase',
  templateUrl: './editcase.component.html',
  styleUrls: ['./editcase.component.css']
})
export class EditcaseComponent implements OnInit {
    currentCase = null;
    message = '';

  constructor(private CaseService:CaseService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.message='';
    this.getCase(this.route.snapshot.paramMap.get('id'));
  }
  getCase(id:any):void {
   this.CaseService.get(id).subscribe(data =>{
    this.currentCase = data;
    console.log(data);
   },error =>{
    console.log(error);
   });
  }

}

import { Component, OnInit } from '@angular/core';
import { AlgService } from 'src/app/services/alg.service';
import { Alg } from 'src/app/interfaces/alg';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-editalgorithm',
  templateUrl: './editalgorithm.component.html',
  styleUrls: ['./editalgorithm.component.css']
})
export class EditalgorithmComponent implements OnInit {
  editAlgorithmForm: FormGroup;
  Algorithm= new Array<Alg>();

  constructor(private fb:FormBuilder, private http:AlgService, private route:ActivatedRoute, private router:Router) { 
    this.editAlgorithmForm=this.fb.group({
      algorithmName: [``,[Validators.required,Validators.maxLength(60)]],
      algorithmFile: ["",[Validators.required,Validators.maxLength(200),Validators.pattern('(https?://)?(www\\.[\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      algorithmInfo: ["",[Validators.maxLength(400)]]
    
    });
  }

  ngOnInit(): void {
    this.getAlgorithm(this.route.snapshot.paramMap.get('id'));
  }

  getAlgorithm(idAlgorithm:any):void {
    this.http.get(idAlgorithm).subscribe(datos =>{
     this.Algorithm = datos;
    //  console.log(datos);
    },error =>{
     console.log(error);
    });
   }
   updateAlgorithm(idAlgorithm:any,Algorithm:any): void{
    this.http.update(idAlgorithm,Algorithm.value).subscribe(response => {
      if(response){
        // console.log(Algorithm.value);
        window.location.href='http://localhost:4200/myalgorithms';
      }
    },error => {console.log(error)})
  };

}

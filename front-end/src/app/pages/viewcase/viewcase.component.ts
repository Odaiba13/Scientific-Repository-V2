import { Component, OnInit } from '@angular/core';
import { CaseService } from 'src/app/services/case.service'; 
import { Cases } from 'src/app/interfaces/cases'; 
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-viewcase',
  templateUrl: './viewcase.component.html',
  styleUrls: ['./viewcase.component.css']
})
export class ViewcaseComponent implements OnInit {
  Case= new Array<Cases>();

  constructor(private http:CaseService,private route:ActivatedRoute, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.getCase(this.route.snapshot.paramMap.get('id'));

  }
  getCase(idCase:any):void {
    this.http.get(idCase).subscribe(datos =>{
     this.Case = datos;
     console.log(datos);
    },error =>{
     console.log(error);
    });
   }
   imprimir(){
    const encabezado = [ "Case Name", "Data Case", "Noncoplanar"];
    // const cuerpo = [this.listaCases];
    const cuerpo = [this.Case[0].caseName,this.Case[0].dataCase ,this.Case[0].Noncoplanar ];
    this.http.imprimir(encabezado, cuerpo, "Information About Case", true);
  }

}

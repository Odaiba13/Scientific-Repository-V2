import { Component, OnInit } from '@angular/core';
import { AlgService } from 'src/app/services/alg.service';
import { Alg } from 'src/app/interfaces/alg';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewalgorithm',
  templateUrl: './viewalgorithm.component.html',
  styleUrls: ['./viewalgorithm.component.css']
})
export class ViewalgorithmComponent implements OnInit {
  Algorithm= new Array<Alg>();

  constructor(private http:AlgService,private route:ActivatedRoute, private router:Router ) { }

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
   imprimir(){
    const encabezado = [ "Algorithm Name", "Algorithm Info", "Algorithm File"]
    const cuerpo = [this.Algorithm[0].algorithmName, this.Algorithm[0].algorithmInfo,this.Algorithm[0].algorithmFile ];
    this.http.imprimir(encabezado, cuerpo, "Information About Alogrithm", true);
  }
}

import { Component, OnInit } from '@angular/core';
import { Alg } from 'src/app/interfaces/alg';
import { AlgService } from 'src/app/services/alg.service';

@Component({
  selector: 'app-myalgorithms',
  templateUrl: './myalgorithms.component.html',
  styleUrls: ['./myalgorithms.component.css']
})
export class MyalgorithmsComponent implements OnInit {
  listaAlgorithm= new Array<Alg>();
  currentAlgorithm = null;
  currentIndex = -1;
  algorithms:any;


  constructor(private http:AlgService) { }

  ngOnInit(): void {
    this.http.getAlg().subscribe(datos =>{
      this.algorithms = datos;
      console.log(this.algorithms);
      // console.log(datos);
      for(let i=0;i<datos.length;i++){
        this.listaAlgorithm.push(datos[i])
      }
      console.log(this.listaAlgorithm);
    });
  }
  setActiveAlgorithm(algorithm:any, index:any): void {
    this.currentAlgorithm = algorithm;
    this.currentIndex = index;
  }
  imprimir(){
    // alert("Imprimir");
    const encabezado = [ "Algorithm Name", "Algorithm Info", "Algorithm File"]
    const cuerpo = ["Algoritm 1", "Info About Algorithm", "www.git.com/algorithm"];
    this.http.imprimir(encabezado, cuerpo, "Information About Alogrithm", true);
  }

}

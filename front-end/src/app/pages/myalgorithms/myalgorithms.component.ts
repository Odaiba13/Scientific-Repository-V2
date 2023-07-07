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

  constructor(private http:AlgService) { }

  ngOnInit(): void {
    this.http.getAll().subscribe(datos =>{
      for(let i=0;i<datos.length;i++){
        this.listaAlgorithm.push(datos[i])
      }
    });
  }
  
  imprimir(){
    const encabezado = [ "Algorithm Name", "Algorithm Info", "Algorithm File"]
    const cuerpo = ["Algoritm 1", "Info About Algorithm", "www.git.com/algorithm"];
    this.http.imprimir(encabezado, cuerpo, "Information About Alogrithm", true);
  }
  deleteAlgorithm(idAlgorithm:any): void {
    this.http.delete(idAlgorithm).subscribe(response => {
          if(response.message=="Algorithm Deleted"){
              // console.log("redireccionar");
              window.location.href='http://localhost:4200/myalgorithms';
              //this.router.navigate(['/mycases']);
          }
        },
        error => {
          console.log(error);
        });
  }
}

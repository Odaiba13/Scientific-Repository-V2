import { Component, OnInit } from '@angular/core';
import { Cases } from 'src/app/interfaces/cases';
import { CaseService } from 'src/app/services/case.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-mycases',
  templateUrl: './mycases.component.html',
  styleUrls: ['./mycases.component.css']
})
export class MycasesComponent implements OnInit {
  listaCases= new Array<Cases>();
  cases:any;
  currentCase = null;
  currentIndex = -1;

  constructor(private http:CaseService, private route:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.http.getAll().subscribe(datos =>{
      // this.cases = datos;
      // console.log(datos);
      for(let i=0;i<datos.length;i++){
        this.listaCases.push(datos[i])
      }
    });
    this.getCase(this.route.snapshot.paramMap.get('id'));
  }
  getCase(id:any):void {
    this.http.get(id).subscribe(data=>{
      this.currentCase=data;
      console.log(data);
    },error=>{
      console.log(error);
    });
  }
  setActiveCase(cases:any, index:any): void {
    this.currentCase = cases;
    this.currentIndex = index;

  }
  imprimir(){
    const encabezado = [ "Case Name", "Data Case", "Noncoplanar"];
    // const cuerpo = [this.listaCases];
    const cuerpo = ["Caso 1", "Data sobre el caso 1", "Yes"];
    this.http.imprimir(encabezado, cuerpo, "Information About Case", true);
  }
  deleteCase(caseName:any): void {
    this.http.delete(caseName).subscribe(response => {
          console.log(response);
          // this.router.navigate(['/mycases']);
        },
        error => {
          console.log(error);
        });
  }

}



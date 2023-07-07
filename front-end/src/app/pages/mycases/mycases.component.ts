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

  constructor(private http:CaseService, private route:ActivatedRoute, private router:Router ) { }

  ngOnInit(): void {
    this.http.getAll().subscribe(datos =>{
      for(let i=0;i<datos.length;i++){
        this.listaCases.push(datos[i])
      }
    });
  }

  deleteCase(idCase:any): void {
    this.http.delete(idCase).subscribe(response => {
      if(response.message=="Case Deleted"){
        console.log("redireccionar");
        window.location.href='http://localhost:4200/mycases';
        // this.router.navigate(['/mycases']);
      }
    },
    error => {
      console.log(error);
    });
  }
  imprimir(){
    const encabezado = [ "Case Name", "Data Case", "Noncoplanar"];
    // const cuerpo = [this.listaCases];
    const cuerpo = ["Caso 1", "Data sobre el caso 1", "Yes"];
    this.http.imprimir(encabezado, cuerpo, "Information About Case", true);
  }
  
}



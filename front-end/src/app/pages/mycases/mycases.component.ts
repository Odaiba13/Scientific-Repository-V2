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
  currentCase = null;
  currentIndex = -1;

  constructor(private http:CaseService, private route:ActivatedRoute, private router:Router ) { }

  
  ngOnInit(): void {
    this.http.getAll().subscribe(datos =>{
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
  // deleteCase(): void {
  //   this.http.delete(this.currentCase.id).subscribe(response => {
  //         console.log(response);
  //         // this.router.navigate(['/mycases']);
  //       },
  //       error => {
  //         console.log(error);
  //       });
  // }

}



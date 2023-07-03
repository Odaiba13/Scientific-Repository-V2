import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Alg } from '../interfaces/alg';
import { catchError } from 'rxjs/operators'; 

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';



@Injectable({
  providedIn: 'root'
})
export class AlgService {

  private apiUrl = "http://localhost:3001/algorithm/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  getAlg():Observable<any>{
    return this.http.get(this.apiUrl + "/ListarAlgorithms");
  }

  createAlgorithm(alg:any): Observable<Alg>{ 
    return this.http.post<Alg>(this.apiUrl + "InsertAlgorithm", JSON.stringify(alg), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any){
    let errorMessage = '';
   if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: $(error.status) \nMessage: $(error.message)`;
    }
    return throwError(errorMessage);
 }
 imprimir(encabezado : string[], cuerpo: Array<any>, titulo:string, guardar?:boolean){
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: 'letter'     
  });
  doc.text(titulo, doc.internal.pageSize.width /2, 25, {align: 'center'});
  autoTable(doc, {
    head: [encabezado],
    body: [cuerpo],
  })
  if(guardar){
    const hoy = new Date();
    doc.save(hoy.getDate() + hoy.getMonth() + hoy.getFullYear() + hoy.getTime() + '.pdf'); 
  }else{

  }
}

}
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute, Route } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  User= new Array<User>();

  constructor(private http:UserService, private route:ActivatedRoute, private Router:Router) { }

  ngOnInit(): void {
    // this.getUser(this.route.snapshot.paramMap.get('id'));
  }

  // getUser(idUser:any):void {
  //   this.http.get(idUser).subscribe(datos =>{
  //    this.idUser = datos;
  //    console.log(datos);
  //   },error =>{
  //    console.log(error);
  //   });
  //  }

}

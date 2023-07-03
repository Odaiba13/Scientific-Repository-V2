import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

 
  user = {
    Email: '',
    userPassword: ''
  }

  constructor(private login: LoginService, private router: Router) {}
  
  ngOnInit(): void {
    
  }

  logIn(){
    this.login.singin(this.user).subscribe( (res:any) => {
      if(res.token){
        
      }
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['private']);
    })
  }

}

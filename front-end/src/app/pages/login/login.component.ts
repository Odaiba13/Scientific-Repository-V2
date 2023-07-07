import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup;

  constructor(private login: LoginService, private router: Router, private fb:FormBuilder) {
    this.loginForm = this.fb.group({
      Email: ["",[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      userPassword: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      
    });
  }
  
  ngOnInit(): void {}

  logIn(){
    // console.log(this.loginForm.value);
    this.login.singin(this.loginForm.value).subscribe( (res:any) => {
      if(this.loginForm.value !== ''){
        // this.toastr.error('Login Successfully!');
        localStorage.setItem('token', res.token);
        this.router.navigate([`/${res.id}`]);
      }else{
        // this.toastr.error('Email or Password Incorrect!');
      }
    })
  }

}

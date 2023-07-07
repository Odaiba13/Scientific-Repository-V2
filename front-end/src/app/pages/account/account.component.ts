import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accountForm:FormGroup;
  User= new Array<User>();

  constructor(private fb:FormBuilder,private route: ActivatedRoute, private router: Router) {
    this.accountForm=this.fb.group({
      userName: ["",[Validators.required, Validators.maxLength(100)]],
      Email: ["", [Validators.maxLength(100)]],
      Charge: ["",[Validators.required]],
      userPassword: ["",[Validators.required, Validators.maxLength(60)]]
    });
  }

  ngOnInit(): void {
  }

  get f(){
    return this.accountForm.controls;
  }

}

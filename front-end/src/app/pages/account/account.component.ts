import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  // id!: number;
  accountForm:FormGroup;
  //person!: User;

  constructor(private fb:FormBuilder,private route: ActivatedRoute, private router: Router) {
    this.accountForm=this.fb.group({
      userName: ["",[Validators.required, Validators.maxLength(100)]],
      Email: ["", [Validators.maxLength(100)]],
      Charge: [true,[Validators.required]],
      userPassword: ["",[Validators.required, Validators.maxLength(60)]]
    });
  }

  ngOnInit(): void {
    
  }

  get f(){
    return this.accountForm.controls;
  }

  submit(){
    //console.log(this.accountForm.value);
    //this.servicio.update(this. id, this.accountForm.value).subscribe(res =>{
    //  console.log('User updated successfully');
    //  this.router.navigateByUrl('/account')
    //})
  }

}

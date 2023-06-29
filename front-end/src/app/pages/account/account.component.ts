import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id!: number;
  accountForm!: FormGroup;
  //person!: User;

  constructor(private route: ActivatedRoute, private router: Router) {}

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

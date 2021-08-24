import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators } from '@angular/forms';
import { DataService } from '../data.service'; 
import { Router } from '@angular/router';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  submitted:boolean=false;
  loginForm= new FormGroup({  
    name:new FormControl(''),
    password :new FormControl('')
  })


  constructor(private service:DataService,private formBuilder: FormBuilder,private route:Router){}
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        name: ['',  Validators.required],
        password: ['', [ Validators.required,  Validators.minLength(6)]]
    });
}
get f() { return this.loginForm.controls; }

submit(){
  this.submitted = true;
  // stop here if form is in invalid
  if (this.loginForm.invalid) {
      return;
  }
  {
    if(this.loginForm.value==this.service){
    console.log(this.loginForm.value)
    this.route.navigate(['/new'])
      this.loginForm.reset
  }

  }
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4)); 
  }
  }


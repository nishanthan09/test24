import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup,  Validators    } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service'; 
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Showedit=true;
  enabled:boolean | undefined;disabled:boolean=true;
  cloud="CLOUD";
  prrow="PRROW";
  vtlab="VTLAB";
  condition:boolean=false;
  conditions:boolean=false;
  where:boolean=false;
  submitted:boolean=false;
  sum=0;
  ShowAll:any=[]
  people:any=[]
  loginForm= new FormGroup({  
    name:new FormControl(''),
    mail:new FormControl(''),
    password :new FormControl(''),
    mobile :new FormControl(''),
    pin:new FormControl(''),
    colors:new FormControl('')
  })
  id: any;
  patUpdate: any;
  
 
    constructor(private service:DataService,private formBuilder: FormBuilder,private route:Router){}
    ngOnInit() {
      this.loginForm = this.formBuilder.group({
          name: ['',  Validators.required],
          mail: ['', [ Validators.required,  Validators.email]],
          password: ['', [ Validators.required,  Validators.minLength(6)]],
          mobile:['', [ Validators.required,  Validators.minLength(10), Validators.maxLength(10)]],
          pin:['',[ Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
          colors: ['',  Validators.required]
      });
  }
  get f() { return this.loginForm.controls; }

  data:any=[
    {sno:0,name:'Nishanthan',age:17,constraints:'CLOUD',check:"correct",box:"No",you:"yes",checkbox:true},
    {sno:1,name:'Praveen',age:17,constraints:'PRROW',check:"correct",box:"Yes",you:"no",checkbox:false},
    {sno:2,name:'Gokul',age:20,constraints:'CLOUD',check:"correct",box:"No",you:"no",checkbox:false},
    {sno:3,name:'Elam',age:22,constraints:'PRROW',check:"correct",box:"No",you:"no",checkbox:false},
    {sno:4,name:'Bhavin',age:25,constraints:'VTLAB',check:"correct",box:"No",you:"no",checkbox:false},
    {sno:5,name:'Manoj',age:18,constraints:'VTLAB',check:"correct",box:"No",you:"no",checkbox:false},
    {sno:6,name:'Pancha',age:30,constraints:'CLOUD',check:"correct",box:"No",you:"no",checkbox:false}];

    enable(hi:any){
    var i:any;
    if( this.data[0].constraints=='CLOUD'){
      this.disabled=true;
    }
    else{
      console.log("No data")
      this.disabled=false;
    }
  }
  clouds(){
    this.disabled=true;
  }
  prrows(){
    this.disabled=false;
  }
  vtlabs(){
    this.disabled=false;
  }
  showedit(){
   console.log("text")
  }
  save(value: any){
    console.log(value)
    if(value=="CLOUD"){
      this.disabled=false;
    }
    else{
      console.log("No data")
      this.disabled=true;
    }
  }
  click(hello:any){
    console.log(this.data[hello].box),
    console.log("id")
    
    if(this.data[hello].box =="Yes"){
      console.log("HI") 
    }
    else{
      console.log("You")
    }
   
  }
  onchange(i:any,value:any){
  //   if(e.target.checked){
  //     console.log("checked")    
  //   }
  //   else{
  //     console.log("not checked")
  //   }
   if(value.checkbox==false){
     console.log("hi")
     this.data[i].you='yes';
     this.data[i].checkbox=true;
     
   } 
   else{
    this.data[i].you='no';
    this.data[i].checkbox=false;
   }  
}
submit(){
  this.submitted = false;

  // stop here if form is  invalid
  if (this.loginForm. invalid) {
      return;
  }
 
  let loginForm=this.loginForm.value;
  if(this.where){
    this.service.update(this.id,loginForm).subscribe((res: any)=>{
      console.log(res);
    })
    alert('Update SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4));
  }
  else{
    
    this.service.postData(loginForm).subscribe((res: any)=>{
      console.log(res);
      this.route.navigate(['/login'])
      this.loginForm.reset
})   
    alert(' Submited SUCCESS!! :-)\n\n' + JSON.stringify(this.loginForm.value, null, 4)); 
  }
}
con:boolean=false;
get(){
  let loginForm=this.loginForm.value;
  console.log(loginForm)
  this.con=true
  this.service.getData(loginForm).subscribe((res: any)=>{
    const intervalCount = interval(this.ShowAll);
    this.ShowAll = intervalCount.pipe(take(100));
    this.ShowAll.subscribe((res: any) => console.log(res));
    console.log(res);
    this.ShowAll=res;

    this.ShowAll.forEach((ele:any) => {
    this.sum +=ele.pin;  
    console.log(this.sum) 
    });
    this.condition=true;
   
  })

}
edit(id:any){
  this.where=true;
  this.id=id;
  this.service.getbyId(id).subscribe((res: any)=>{
    this.patUpdate=res;
    console.log(res);
    this.loginForm.patchValue({
      name:this.patUpdate.name,
      mail:this.patUpdate.mail,
      password:this.patUpdate.password,
      mobile:this.patUpdate.mobile,
      pin:this.patUpdate.pin,
      colors:this.patUpdate.colors
    })
  })
}
delete(id:any){
  this.service.deleteData(id).subscribe((res: any)=>{
    this.get();
    this.condition=true;
    console.log(res)
  })
}
  // clickme(){
  //   this.route.navigate(['/new'])
  // }
}
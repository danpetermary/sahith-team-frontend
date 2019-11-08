import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MyrouteService } from '../myroute.service';
import { UserService } from '../user.service';
import { User } from '../User';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerform: FormGroup;
   userName: FormControl;
   emailId: FormControl;
   userPassword: FormControl;
   phone: FormControl;
   country: FormControl;
  user: User;
  submitMessage:String;

  ngOnInit() {}

  constructor(private snack:MatSnackBar, private formBuilder : FormBuilder,private routerService:MyrouteService, private userSer:UserService) {
    
   this.registerform=this.formBuilder.group({
   userName: ['',Validators.compose([Validators.required,Validators.minLength(3)])],
   emailId: ['', Validators.compose([Validators.required,Validators.email])],
   userPassword:['',Validators.compose([Validators.required,Validators.minLength(8)])],
   phone:['', Validators.compose([ Validators.required,Validators.minLength(10)])],
   country:['',Validators.compose([Validators.required])]
  }); //form group

  this.user    = new User();  
}
// validate(robj : FormGroup) : void
// {
//  console.log(robj.value) ;  
//  this.user=robj.value;
// }
validate(){
  // let record=({userName: this.user.userName, emailId: this.user.emailId,
  //   userPassword: this.user.userPassword, phone: this.user.phone, country: this.user.country});
    
  this.user=this.registerform.value;
  this.userSer.addRecord(this.user)
    .subscribe(
      (data)=>
      {
        console.log("User Added");
        console.log(data);
        let snackconfig=this.snack.open("User Registered");
        setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
        // this.routerService.openLogin();
      },


    (err)=>
     {
      if(err.status==200){
        let snackconfig=this.snack.open("User Registered");
        setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
        
      }
      else if(err.status==409)
      {
        let snackconfig=this.snack.open("Already Exists");
        setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
      
      }

    })
    this.routerService.openLogin();
  }  //validate

  myHome(){
    this.routerService.openHome();
  }

  myLogin(){
    this.routerService.openLogin();
  }
  cancel_btn(){
    this.routerService.openHome();
  }
}
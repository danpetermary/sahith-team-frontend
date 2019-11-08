import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyrouteService } from '../myroute.service';
import { AuthenticationService } from '../authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailId:FormControl;
  userPassword:FormControl;
  submitMessage: string;
  token:string;
  id:string;
  
 constructor(private myserve:MyrouteService,private auth:AuthenticationService, private snack:MatSnackBar)
    {
        
        this.emailId=new FormControl('',Validators.email && Validators.required),
      this.userPassword=new FormControl('',Validators.required)
    }
   

  ngOnInit() {
 
}
myLogin()
 {
  let dt=null;
  console.log(this.emailId.value);
   if (this.emailId.hasError('required') || this.userPassword.hasError('required')) {
   this.submitMessage = 'Username and Password required';
  }
  
   else 
   {
     let dt=(
       {emailId:this.emailId.value,
        userPassword:this.userPassword.value}
        )
        
    this.auth.validateUser(dt)
    .subscribe(
      (res)=>
      {
        this.token=res['token'];
        this.auth.setBearerToken(this.token);
        localStorage.setItem("id",this.emailId.value);
        let  snackBarRef = this.snack.open('Sucessfully Logged In');
        setTimeout(snackBarRef.dismiss.bind(snackBarRef),1500);
        console.log("login"+localStorage.getItem("id"));
        console.log(this.token);
        this.myserve.openMultiMusic();
      },
      (err)=>
      {
        if(err.status==200){
          let snackconfig=this.snack.open("Successfully Logged In");
          setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
          
        }
        else if(err.status==404)
        {
          let snackconfig=this.snack.open("Invalid Credentials");
          setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
        
        }
        // window.alert("Invalid User ID or Password. Please Check.");
      }
    )
    
    }
  }

 checkemail()
{
  let mes=this.emailId.hasError('required')? "": " ";
  return (mes);
}
checkpassword()
{
  let mes=this.userPassword.hasError('required')? "": " ";
  return (mes);
}
myRegister()
  {
    this.myserve.openRegister();
  }

  myHome(){
    this.myserve.openHome();
  }

  myCancel(){
    this.myserve.openHome();
  }
}

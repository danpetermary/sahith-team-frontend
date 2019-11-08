import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { User } from '../User';
import { MyrouteService } from '../myroute.service';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  submitMessage: string;
  // userName:string;
  // userPassword:string;
  // phone:string;
  // country:string;
  Errmsg:string;
  uobj : User;
  successMsg:string;

  ngOnInit(): void {
   // window.location.reload();
   }
constructor(private snack:MatSnackBar, private routerService:MyrouteService,private authService:AuthenticationService,private uath:UserService){
  let eId=localStorage.getItem("id");
  this.get_button(eId);
  this.uobj=new User();
   }

done_btn(){

    this.uath.updateRecord(this.uobj)
    .subscribe
    (
      (res)=>
      {
        console.log(res); 
        //window.alert("The values are updated successfully");
        let snackconfig=this.snack.open("Successfully Updated");
        setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
        this.successMsg="Updated Successfully";
        this.routerService.openMultiMusic();
      }
    ),

    (err)=>
    {
    
     if(err.status==404)
      {
        let snackconfig=this.snack.open("Invalid Credentials");
        setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
      
      }
      // this.Errmsg=err.message;
      // window.alert("One or more fields missed. Kindly Check.")
    }

  }
  get_button(eId){

      this.uath.fetchRecord(eId)
      .subscribe
      (
        (res)=>
        {
          this.uobj=res;
          console.log("hi"+this.uobj);
        }
      ),
      (err)=>
      {
        this.Errmsg=err.message;
      }
   
    }

// myRegister(){
//   this.routerService.openLogin();
//   }
myMultiMusic()
  {
    this.routerService.openMultiMusic();
  }
  myLogout(){
    
    localStorage.setItem("id",null);
   // localStorage.setItem("Bearertoken",null);
    this.routerService.openHome();
  }
  cancel_btn(){
    this.routerService.openMultiMusic();
  }
}
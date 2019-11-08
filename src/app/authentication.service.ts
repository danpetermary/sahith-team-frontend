import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Tokens } from './Tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  url:string;
  constructor(private httpserver:HttpClient){
    this.url="http://localhost:8088/login";
     }
      validateUser(data){
        console.log("data is ");
        console.log(data);
        return this.httpserver.post(this.url,data);
      }
 
      setBearerToken(token){
        localStorage.setItem('Bearertoken',token);
             }
 
       getBearerToken(){
         return (localStorage.getItem("Bearertoken"));
       }

      //  getTokenExpirationDate(token:string):Date{
  
      //   const decodedValue= new Tokens(token);
    
      //   if(decodedValue.exp===undefined) return null;
    
      //   const date= new Date(0);
    
      //   date.setUTCSeconds(decodedValue.exp);
    
      //   return date;
    
      //  }
    
      // isTokenExpired(token?:string):boolean{
    
      //   if(!token) token =this.getBearerToken();
    
      //   if(!token) return true;
    
      //   const date=this.getTokenExpirationDate(token);
    
      //   if(date===undefined || date===null) return false;
    
      //   return !(date.valueOf() > new Date().valueOf());
    
      // }
        
        }


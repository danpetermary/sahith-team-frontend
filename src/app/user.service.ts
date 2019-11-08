import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string;
  url1:string;
  emailId:String;
  url2:string;
  url3:string;
  constructor(private httpserve : HttpClient) { 

    this.url="http://localhost:8083/user/register";
    this.url1=`http://localhost:8083/user/delete/${this.emailId}`;
    this.emailId=localStorage.getItem("id");
   // console.log(this.emailId);
    this.url3=`http://localhost:8083/user/update/${this.emailId}`;
  }

  addRecord(data):Observable<any>

  {
   return this.httpserve.post(this.url,data,{reportProgress: true, responseType:'text'});
   
  }

  deleteRecord():Observable<any>
  {
    return this.httpserve.delete<User>(this.url1);
  }

  fetchRecord(emailId):Observable<any>{
    console.log(this.emailId);
    return this.httpserve.get<User>(`http://localhost:8083/user/fetch/${emailId}`);
  }

  updateRecord(user:User):Observable<any>{
    return this.httpserve.put<User>(this.url3,user);
  }
}

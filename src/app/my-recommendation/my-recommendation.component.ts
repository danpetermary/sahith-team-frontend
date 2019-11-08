import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../Music';
import { MyrouteService } from '../myroute.service';
import { MusicData } from '../MusicData';
import { MusicRecData } from '../MusicRecData';
import { FetchDataService } from '../fetch-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-recommendation',
  templateUrl: './my-recommendation.component.html',
  styleUrls: ['./my-recommendation.component.css']
})
export class MyRecommendationComponent implements OnInit {
  Errmsg:any;
  emailId:any;
  robj:MusicRecData;
  user1:Array<MusicRecData>;
  constructor(private snack:MatSnackBar, private myserve:MyrouteService, private myrec:FetchDataService) {
    
    this.robj=new MusicRecData();
    this.user1=[];
    let eId=localStorage.getItem("id");
    this.getrecbyuser(eId);
   }
  myMultiMusic()
  {
    this.myserve.openMultiMusic();
  }
  myFavourite()
  {
    this.myserve.openFavourite();
  }
 
  getrecbyuser(eId){
      this.myrec
      .getrecommendations(eId)
      .subscribe(data => {
        this.robj= data;
        this.user1=data;
        console.log(this.user1);
        console.log(this.robj[0].emailId);
        console.log(this.robj[0].id);
       
      }),
     (err)=>
     {
       this.Errmsg=err.message;
      
     }
    }

  ngOnInit(): void {
    
  }
 delrec(recId)
  {
    this.myrec.delrecommend(recId).subscribe();
    // window.alert("Record Deleted");
    let snackconfig=this.snack.open("Recommendation Deleted");
    setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
    window.location.reload();
    this.myserve.openRecommendation();

  }
  myUpdate(){
    this.myserve.openUpdate();
  }
  myLogout(){
    localStorage.setItem("id",null);
    this.myserve.openHome();
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Music } from '../Music';
import { MyrouteService } from '../myroute.service';
import { FetchDataService } from '../fetch-data.service';
import { MusicData } from '../MusicData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-favourites',
  templateUrl: './my-favourites.component.html',
  styleUrls: ['./my-favourites.component.css']
})
export class MyFavouritesComponent implements OnInit {
  fobj: MusicData;
  Errmsg:any;
  emailId:any;
  user: Array<MusicData>;
  ngOnInit(): void
   {
  }
 
  constructor(private snack:MatSnackBar,  private myserve:MyrouteService, private myfav:FetchDataService) { 
 
    this.fobj=new MusicData();
    this.user=[];
    let eId=localStorage.getItem("id");
    this.getfavbyuser(eId);

  }
  myMultiMusic()
  {
    this.myserve.openMultiMusic();
  }

  myRecommendation()
  {
    this.myserve.openRecommendation();
  }

  getfavbyuser(eId){
    this.myfav
    .getfavourite(eId)
    .subscribe(data => {
      this.fobj = data;
      //console.log(this.robj);
      this.user=data;
      console.log(this.user);
      //console.log(this.robj.emailId);
      //this.eid=localStorage.getItem("eid");
      console.log(this.fobj[0].emailId);
      console.log(this.fobj[0].favId);
     
    }),
   (err)=>
   {
     this.Errmsg=err.message;
   }
  }

  delfav(favId)
  {
    this.myfav.delfavourite(favId).subscribe();
    let snackconfig=this.snack.open("Favourite Deleted");
    setTimeout(snackconfig.dismiss.bind(snackconfig),1500);
   // this.myroute.navigate(['dashboardpage']);
   window.location.reload();
   this.myserve.openFavourite();

  }
  myUpdate(){
    this.myserve.openUpdate();
  }
  myLogout(){
    localStorage.setItem("id",null);
    this.myserve.openHome();
  }
}

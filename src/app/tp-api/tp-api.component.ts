import { Component, OnInit, SystemJsNgModuleLoader, Input } from '@angular/core';
import { FetchDataService } from '../fetch-data.service';
import { Music } from 'src/app/Music';
import { MyrouteService } from '../myroute.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MusicData } from '../MusicData';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tp-api',
  templateUrl: './tp-api.component.html',
  styleUrls: ['./tp-api.component.css']
})
export class TpApiComponent implements OnInit {
  music:Music;
  newMusic: Array<Music>;
  users: Array<any> = [];
  data1: any;
  public form: FormGroup;
  song: FormControl;
  track: Array<Music>;
  musix: MusicData;
  emailId: string;
  k:string;

  musicarr: Array<MusicData>;
  constructor(private snack:MatSnackBar, private dataService:FetchDataService, private myserve:MyrouteService) {
    this.newMusic=[];
    this.track=[];
    this.song=new FormControl('',Validators.required);
    this.musix=new MusicData();
    this.musicarr=[];
   }
   ngOnInit() {
  
    this.dataService.getMusic().subscribe((res) =>{
      console.log("Music playlist")
      this.newMusic=res['tracks']['track'];
      console.log(res['tracks']['track']);
    }); 
    
   }

   sendform() {
    let artist=this.song.value;
    this.dataService
      . getSearchTracks(artist)
      .subscribe(data => {
        this.data1 = data;
        this.users = this.data1.results.trackmatches.track;
        console.log(this.users);
      })
    //  alert("Displaying search results for "+value.location);
  }

  myUpdate(){
    this.myserve.openUpdate();
  }

  myFavourite()
  {
    this.myserve.openFavourite();
  }
  myRecommendation()
  {
    this.myserve.openRecommendation();
  }

  addToFavourite(users){
    this.emailId=localStorage.getItem("id");
    this.musix.artist=users.artist;
    this.musix.emailId=this.emailId;
    this.musix.name=users.name;

  console.log(users);

    this.dataService.favoritesadd(this.musix).subscribe(
      (data)=>{
        this.musicarr.push(data);
        
      },
      // error=>{
      //   console.log("error");
      // }
      
      err=>{
        if (err.status == 201){
          let snackconfig=this.snack.open("Favourite Added");
              setTimeout(snackconfig.dismiss.bind(snackconfig),7000);
    
        }
      else{
      
       let snackconfig=this.snack.open("Favourite Already Exists");
              setTimeout(snackconfig.dismiss.bind(snackconfig),7000);
      }
        
      }
      ); 
    
  
   }
  addToRecomnded(users){
    this.emailId=localStorage.getItem("id");
    //console.log(this.emailId+" "+music.name+" "+music.artist.name[0]+" "+music.id);

    this.musix.artist=users.artist;
    this.musix.emailId=this.emailId;
    this.musix.name=users.name;
    //console.log("inside dashboard"+this.musix);
  
  if(localStorage.getItem("id")==null){
  console.log(this.emailId);
  this.myserve.openLogin();
}
else{
    this.dataService.recommendationsadd(this.musix).subscribe(
      (data)=>{
        
        this.musicarr.push(data);
      },
        
        err=>{
          if (err.status == 201){
            let snackconfig=this.snack.open("Recommendation Added");
                setTimeout(snackconfig.dismiss.bind(snackconfig),7000);
      
          }
        else{
        
         let snackconfig=this.snack.open("Recommendation Already Exists");
                setTimeout(snackconfig.dismiss.bind(snackconfig),7000);
        }
          
        }
        );
  }}
  myLogout(){
 
    localStorage.setItem("id",null);
    //localStorage.clear();
    
   // localStorage.setItem("Bearertoken",null);
   // console.log(  localStorage.setItem("id",null));
    this.myserve.openHome();
  }
}

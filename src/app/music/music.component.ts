import { Component, OnInit, Input } from '@angular/core';
import { Music } from 'src/app/Music';
import { FetchDataService } from '../fetch-data.service';
import { MusicData } from '../MusicData';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent implements OnInit {
  
  @Input() music:Music;
  musix: MusicData;
  emailId: string;
  //musix1: MusicData;
  musicarr: Array<MusicData>;
  constructor(private snack:MatSnackBar,private myrout:Router, private fetch:FetchDataService ) { 
    this.musix=new MusicData();
    this.musicarr=[];
    //this.musix1=new MusicData();
  }
  ngOnInit() {
  }
  addToFavouriteList(music){

    this.emailId=localStorage.getItem("id");
    this.musix.artist=music.artist.name;
    this.musix.emailId=this.emailId;
    this.musix.name=music.name;
    let k;
    if(this.emailId=="null")
    k=this.emailId.trim.length;
    else
    k=this.emailId.length;
    if(k==0)
    {
      this.myrout.navigate(['loginpage']);
    }
    else{


  console.log(this.music);

    this.fetch.favoritesadd(this.musix).subscribe(
      (data)=>{
        this.musicarr.push(data);
        
      },
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
  }
  
  addToRecomndedList(music){
    this.emailId=localStorage.getItem("id");
    //console.log(this.emailId+" "+music.name+" "+music.artist.name[0]+" "+music.id);

    this.musix.artist=music.artist.name;
    this.musix.emailId=this.emailId;
    this.musix.name=music.name;
    //console.log("inside dashboard"+this.musix);

    this.fetch.recommendationsadd(this.musix).subscribe(
      (data)=>{
        //console.log("kjhjuhgj"+data);
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
  }
}
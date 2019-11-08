import { Component, OnInit } from '@angular/core';
import { MyrouteService } from '../myroute.service';
import { FetchDataService } from '../fetch-data.service';
import { Music } from '../Music';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  track: Array<Music>;
  name: string;
  users: Array<any> = [];
  data1: any;
  data2: any;
  public form: FormGroup;
  song: FormControl;

  constructor(private myrout:Router,private myserve:MyrouteService,private fetch:FetchDataService) { 
  this.track=[];
  this.song=new FormControl('',Validators.required);
  }
  mydash()
  {
    this.myrout.navigate(['multimusicpage']);
  }
  ngOnInit() {
  }
  myLogin(){
    this.myserve.openLogin();
  }
  
  myRegister(){
    this.myserve.openRegister();
  }
  sendform() {
    let artist=this.song.value;
    this.fetch
      . getSearchTracks(artist)
      .subscribe(data => {
        this.data1 = data;
        this.users = this.data1.results.trackmatches.track;
        console.log(this.users);
      })
    //  alert("Displaying search results for "+value.location);
  }
  
}

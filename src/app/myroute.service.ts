import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MyrouteService {

  constructor(private rt:Router) { }

  openHome(){
    this.rt.navigate(['homepage'])
  }

  openLogin(){
    this.rt.navigate(['loginpage'])
  }
  openRegister(){
    this.rt.navigate(['registerpage'])
  }
 
  openUpdate(){
    this.rt.navigate(['updatepage'])
  }

  openMultiMusic(){
    this.rt.navigate(['multimusicpage'])
  }

  openFavourite() {
    this.rt.navigate(['favouritepage'])
  }

  openRecommendation(){
    this.rt.navigate(['recommendationpage'])
  }
}

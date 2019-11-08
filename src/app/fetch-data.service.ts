import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from 'src/app/Music';
import { map } from 'rxjs/operators';
import { MusicData } from './MusicData';
import { MusicRecData } from './MusicRecData';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  emailId:string;
  constructor(private http:HttpClient) { 
    this.emailId=localStorage.getItem("id");
  }
  public request: any = {
  };

getMusic() : Observable<any>{
  return this.http.get<Music>('http://ws.audioscrobbler.com/2.0/?method=geo.gettoptracks&country=spain&api_key=f8e4de5a811976286f84b29904ec7353&format=json');
  
}
getSearchTracks(searchText) {
  return  this.http.get(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchText}&api_key=33c8519b97100be2f94379844c039803&format=json`);
}

favoritesadd(musix):Observable<MusicData>{
  console.log(musix);
  return this.http.post<any>('http://localhost:8095/fav/add',musix);

}

recommendationsadd(musix):Observable<MusicData>{
  console.log(musix);
  return this.http.post<any>('http://localhost:8096/recommend/add',musix);
}

getfavourite(emailId):Observable<any>{
  console.log(this.emailId);
  return this.http.get<MusicData>(`http://localhost:8095/fav/fetch/${emailId}`);
}
getrecommendations(emailId):Observable<any>{
  console.log(this.emailId);
  return this.http.get<MusicRecData>(`http://localhost:8096/recommend/fetch/${emailId}`);
}

delfavourite(id) :Observable<any>{
  return this.http.delete(`http://localhost:8095/fav/delete/${id}`);
}
delrecommend(id) :Observable<any>{
  return this.http.delete(`http://localhost:8096/recommend/delete/${id}`);
}

}

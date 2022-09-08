import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interface/gifs.interface'
@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey : string = "oI0jvVwMjvEpxtlU5U66ziBl2hgYc1tP";
  private _history: string[] = [];
  public results:  Gif[] = [];

  get history(){
    return [...this._history]
  };

  constructor(private http: HttpClient){
    // if(localStorage.getItem('history')){
    //   this._history = JSON.parse(localStorage.getItem('history')!)
    // }
    this._history = JSON.parse(localStorage.getItem('history')!) || [];
    if(localStorage.getItem('results')){
      this.results = JSON.parse(localStorage.getItem('results')!)
    }
  }
  
  searchGifs(query: string){
    query = query.trim().toLowerCase()
    if(!this._history.includes(query)){
      this._history.unshift(query);
      localStorage.setItem('history', JSON.stringify(this._history));
    }else{
      null
    };
             
    this.http.get<SearchGifResponse>(`https://api.giphy.com/v1/gifs/search?api_key=oI0jvVwMjvEpxtlU5U66ziBl2hgYc1tP&q=${query}&limit=10`)
      .subscribe((response ) => {
      console.log(response.data);
      this.results = response.data; 
      localStorage.setItem('results', JSON.stringify(this.results))
    }); 
      
    this._history = this._history.splice(0, 10);
    console.log(this._history)
  };

}

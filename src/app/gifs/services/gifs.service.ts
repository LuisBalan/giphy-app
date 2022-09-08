import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifResponse } from '../interface/gifs.interface'

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private urlService : string = 'https://api.giphy.com/v1/gifs';
  private apiKey : string = "oI0jvVwMjvEpxtlU5U66ziBl2hgYc1tP";
  private _history: string[] = [];
  public results:  Gif[] = [];

  get history(){
    return [...this._history]
  };

  constructor(private http: HttpClient){
    if(localStorage.getItem('history')){
      this._history = JSON.parse(localStorage.getItem('history')!)
    }
    // this._history = JSON.parse(localStorage.getItem('history')!) || [];
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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query)
             
    this.http.get<SearchGifResponse>(`${this.urlService}/search`, {params: params})
      .subscribe((response ) => {
      // console.log(response.data);
      this.results = response.data; 
      localStorage.setItem('results', JSON.stringify(this.results))
    }); 
      
    this._history = this._history.splice(0, 10);
    console.log(this._history)
  };

}

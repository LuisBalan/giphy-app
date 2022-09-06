import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _history: string[] = [];

  get history(){
    return [...this._history]
  };
  
  searchGifs(query: string){
    query = query.trim().toLowerCase()
    if(!this._history.includes(query)){
      this._history.unshift(query);
    }else{
      null
    };

    this._history = this._history.splice(0, 10);
    console.log(this._history)
  };

  constructor() { }
}

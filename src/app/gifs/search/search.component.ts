import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class SearchComponent {

  constructor() { }

 @ViewChild('txtSearch') txtSearch!: ElementRef <HTMLInputElement> ;

  search(term: string){
    const value = this.txtSearch.nativeElement.value;
    console.log(this.txtSearch);
    this.txtSearch.nativeElement.value = "";
  };

}

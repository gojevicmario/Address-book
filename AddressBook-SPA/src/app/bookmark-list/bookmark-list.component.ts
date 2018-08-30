import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {

  contacts: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }
  // napravi service koristis ovo u dvije komponente
  getValues() {
    this.http.get('http://localhost:5000/api/Contacts').subscribe(response => {
      this.contacts = response;
    }, error => {
      console.log(error);
    });
  }
}

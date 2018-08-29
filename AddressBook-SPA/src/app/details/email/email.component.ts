import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.css']
})
export class EmailComponent implements OnInit {

  emails: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getEmails();
  }

  getEmails() {
    this.http.get('http://localhost:5000/api/Emails/1').subscribe(response => {
      this.emails = response;
    }, error => {
      console.log(error);
    });
  }
}

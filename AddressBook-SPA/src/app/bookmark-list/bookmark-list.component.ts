import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ContactService } from '../_services/contact.service';
import { Contact } from '../_models/contact';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css']
})
export class BookmarkListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.contacts = data['contacts'];
      for ( const i of this.contacts) {
        if (i.isBookmarked === true) {
          this.contacts.splice(this.contacts.indexOf(i), 1);
        }
      }
    });
  }
}

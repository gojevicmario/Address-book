import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[];
  bookmarkedContacts: Contact[];

  items: Array<any>;
  pageOfItems: Array<any>;

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.contacts = data['contacts'];
      this.items = data['contacts'];
    });
    this.bookmarkedContacts = this.contacts.slice(0);
    this.showOnlyBookmarked();
  }

  private showOnlyBookmarked() {
    for ( const i of this.bookmarkedContacts) {
      if (i.isBookmarked === true) {
        this.bookmarkedContacts.splice(this.bookmarkedContacts.indexOf(i), 1);
      }
    }
  }

  onChangePage(pageOfItems: Array<any>) {
    this.pageOfItems = pageOfItems;
  }

}


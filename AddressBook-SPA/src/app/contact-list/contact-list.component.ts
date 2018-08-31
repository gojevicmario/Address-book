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

  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.contacts = data['contacts'];
    });
  }

}


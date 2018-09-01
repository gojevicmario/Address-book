import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})

export class ContactListComponent implements OnInit {

  contacts: Contact[];

  constructor(private contactService: ContactService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe( data => {
      this.contacts = data['contacts'];
    });
  }



  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(next => {
     this.contacts.splice(this.contacts.findIndex( c => c.id === id), 1 );
    }, error => {
      console.log(error);
    });
  }

}


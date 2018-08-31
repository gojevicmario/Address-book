import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  contact: Contact;


  constructor(private contactService: ContactService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
    });
  }

  // loadUser() {
  //  this.contactService.getContact(+this.route.snapshot.params['id']).subscribe((contact: Contact) => {
  //    this.contact = contact;
  //  }, error => {
  //    alert(error);
  //  });
  // }
}

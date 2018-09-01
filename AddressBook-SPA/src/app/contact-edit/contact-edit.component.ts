import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('editForm')
  editContactForm: NgForm;
  contact: Contact;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
    });
  }

  updateContact() {
    this.contactService.updateContact(this.contact.id, this.contact).subscribe(next => {
      this.router.navigate(['contacts/details/' + this.contact.id]);
    }, error => {
      console.log(error);
    });
  }
}

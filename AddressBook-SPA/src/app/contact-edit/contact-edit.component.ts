import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Email } from '../_models/email';
import { Tag } from '../_models/tag';
import { DetailsService } from '../_services/Details.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  @ViewChild('editForm')
  editContactForm: NgForm;
  contact: Contact;
  emails: Email[];
  numbers: Number[];
  tags: Tag[];

  constructor(
    private contactService: ContactService,
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
      this.emails = data['emails'];
    });
  }

  updateContact() {
    this.contactService
      .updateContact(this.contact.id, this.contact)
      .subscribe(error => {
        console.log(error);
      });
  }
  updateEmails(pkId: number, index: number) {
    const email = this.detailsService
      .getEmail(this.contact.id, pkId)
      .subscribe();
    this.detailsService
      .updateEmails(this.contact.id, pkId, this.emails[index])
      .subscribe(
        next => {
          this.router.navigate(['contacts/edit/' + this.contact.id]);
        },
        error => {
          console.log(error);
        }
      );
  }
  deleteEmail(pkId: number, index: number) {
    const email = this.detailsService
      .getEmail(this.contact.id, pkId)
      .subscribe();
    this.detailsService.deleteEmail(this.contact.id, pkId).subscribe(
      next => {
        this.emails.splice(this.emails.findIndex(e => e.id === pkId), 1);
      },
      error => {
        console.log(error);
      }
    );
  }
}

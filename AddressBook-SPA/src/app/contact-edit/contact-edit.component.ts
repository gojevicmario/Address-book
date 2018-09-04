import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Email } from '../_models/email';
import { Tag } from '../_models/tag';
import { Number } from '../_models/number';
import { Location } from '@angular/common';
import { DetailsService } from '../_services/Details.service';
import { AlertifyService } from '../_services/Alertify.service';

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

  newEmail: Email = { id: null, emailAddress: '' };
  newNumber: Number = { id: null, phoneNumber: '' };
  newTag: Tag = { id: null, tagName: '' };

  constructor(
    private contactService: ContactService,
    private detailsService: DetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contact = data['contact'];
      this.emails = data['emails'];
      this.numbers = data['numbers'];
      this.tags = data['tags'];
    });
  }

  cancel() {
    this.location.back();
  }

  createEmail() {
    this.detailsService.createEmail(this.contact.id, this.newEmail).subscribe(
      next => {
        this.detailsService.getEmails(this.contact.id).subscribe(data => {
          this.emails = data;
          this.alertify.success('Email added you have');
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  createTag() {
    this.detailsService.createTag(this.contact.id, this.newTag).subscribe(
      next => {
        this.detailsService.getTags(this.contact.id).subscribe(data => {
          this.tags = data;
        });
      },
      error => {
        this.alertify.error('The tag you want to enter is already in the list!');
      }
    );
  }
  createNumber() {
    this.detailsService.createNumber(this.contact.id, this.newNumber).subscribe(
      next => {
        this.detailsService.getNumbers(this.contact.id).subscribe(data => {
          this.numbers = data;
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  updateContact() {
    this.contactService.updateContact(this.contact.id, this.contact).subscribe(
      next => {
        this.contactService.getContact(this.contact.id).subscribe(data => {
          this.contact = data;
          this.editContactForm.reset(this.contact);
          this.alertify.success('Contact updated with major success');
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  updateEmail(pkId: number, index: number) {
    const email = this.detailsService
      .getEmail(this.contact.id, pkId)
      .subscribe();
    this.detailsService
      .updateEmail(this.contact.id, pkId, this.emails[index])
      .subscribe(
        success => {
          this.alertify.success('Email updated you have');
        },
        error => {
          console.log(error);
        }
      );
  }

  updateNumber(pkId: number, index: number) {
    const number = this.detailsService
      .getNumber(this.contact.id, pkId)
      .subscribe();
    this.detailsService
      .updateNumber(this.contact.id, pkId, this.numbers[index])
      .subscribe(error => {
        console.log(error);
      });
  }

  updateTag(pkId: number, index: number) {
    const tag = this.detailsService.getTag(this.contact.id, pkId).subscribe();
    this.detailsService
      .updateTag(this.contact.id, pkId, this.tags[index])
      .subscribe(error => {
        this.alertify.error(
          'The tag is already in the list!'
        );
      });
  }

  deleteEmail(pkId: number, index: number) {
    const email = this.detailsService
      .getEmail(this.contact.id, pkId)
      .subscribe();
    this.alertify.confirm('You are about to delete the email', () => {
      this.detailsService.deleteEmail(this.contact.id, pkId).subscribe(
        next => {
          this.emails.splice(this.emails.findIndex(e => e.id === pkId), 1);
          this.alertify.success('Email deleted!');
        },
        error => {
          this.alertify.error('something went wrong!');
        }
      );
    });
  }

  deleteNumber(pkId: number, index: number) {
    const number = this.detailsService
      .getNumber(this.contact.id, pkId)
      .subscribe();
    this.detailsService.deleteNumber(this.contact.id, pkId).subscribe(
      next => {
        this.numbers.splice(this.numbers.findIndex(e => e.id === pkId), 1);
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteTag(pkId: number, index: number) {
    const tag = this.detailsService.getTag(this.contact.id, pkId).subscribe();
    this.detailsService.deleteTag(this.contact.id, pkId).subscribe(
      next => {
        this.tags.splice(this.tags.findIndex(e => e.id === pkId), 1);
      },
      error => {
        console.log(error);
      }
    );
  }
}

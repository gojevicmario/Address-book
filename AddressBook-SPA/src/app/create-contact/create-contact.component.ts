import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.css']
})
export class CreateContactComponent implements OnInit {
  createContactForm: FormGroup;
  contact: Contact;
  constructor(
    private fb: FormBuilder,
    private contactService: ContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.CreateContactForm();
  }

  CreateContactForm() {
    this.createContactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      isBookmarked: [ false],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  create() {
    if (this.createContactForm.valid) {
      this.contact = Object.assign({}, this.createContactForm.value);
      this.contactService.createContact(this.contact).subscribe(
        response => {
          this.router.navigateByUrl('/contacts/edit/' + response);
        },
        error => {
          console.log(error);
        }
      );
    }
  }
}

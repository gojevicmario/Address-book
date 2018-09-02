import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[];
  pagination: Pagination;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contacts = data['contacts'].result;
      this.pagination = data['contacts'].pagination;
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadContacts();
  }

  deleteContact(id) {
    this.contactService.deleteContact(id).subscribe(
      next => {
        this.contacts.splice(this.contacts.findIndex(c => c.id === id), 1);
        this.loadContacts();
      },
      error => {
        console.log(error);
      }
    );
  }

  loadContacts() {
    this.contactService
      .getContacts(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(
        (res: PaginatedResult<Contact[]>) => {
          this.contacts = res.result;
          this.pagination = res.pagination;
        },
        error => {
          console.log(error);
        }
      );
  }
}

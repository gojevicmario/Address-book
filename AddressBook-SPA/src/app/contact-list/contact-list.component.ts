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
  userParams: any = {};
  pagination: Pagination;
  searchString: string = null;
  test: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  changeTestString(newTestString: string) {
    this.test = newTestString;
  }

  clearParams() {
    this.userParams.tag = null;
    this.userParams.firstName = null;
    this.userParams.lastName = null;
  }
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

  loadContacts(type?: string) {
    if (type === 'lastName') {
      this.userParams.lastName = this.searchString;
    } if (type === 'firstName') {
      this.userParams.firstName = this.searchString;
    } if (type === 'tag') {
      this.userParams.tag = this.searchString;
    }
    this.contactService
      .getContacts(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<Contact[]>) => {
          this.contacts = res.result;
          this.pagination = res.pagination;
          this.clearParams();
        },
        error => {
          console.log(error);
        }
      );
  }
}

import { Component, OnInit } from '@angular/core';
import { Contact } from '../_models/contact';
import { ContactService } from '../_services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AlertifyService } from '../_services/Alertify.service';

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
  typeString: string;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.contacts = data['contacts'].result;
      this.pagination = data['contacts'].pagination;
    });
    // this.loadContacts('true');
  }

  changeTypeString(typeString: string) {
    this.typeString = typeString;
  }

  clearParams() {
    this.userParams.tag = null;
    this.userParams.firstName = null;
    this.userParams.lastName = null;
    this.userParams.isBookmarked = false;
    this.searchString = null;
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadContacts(this.typeString);
  }

  deleteContact(id) {
    this.alertify.confirm(
      'By deleteing the contact you also delete all associated items!',
      () => {
        this.contactService.deleteContact(id).subscribe(
          next => {
            this.contacts.splice(this.contacts.findIndex(c => c.id === id), 1);
            this.loadContacts();
            this.alertify.success('contact deleted!');
          },
          error => {
            console.log(error);
          }
        );
      }
    );
  }

  loadContacts(type?: string) {
    if (type === 'lastName') {
      this.userParams.lastName = this.searchString;
    } else if (type === 'firstName') {
      this.userParams.firstName = this.searchString;
    } else if (type === 'tag') {
      this.userParams.tag = this.searchString;
    } else if (type === 'true') {
      this.userParams.isBookmarked = true;
    } else if (type === 'false') {
      this.userParams.isBookmarked = false;
    } else {
      this.clearParams();
    }

    this.contactService
      .getContacts(
        this.pagination.currentPage,
        this.pagination.itemsPerPage,
        this.userParams
      )
      .subscribe(
        (res: PaginatedResult<Contact[]>) => {
          if(res.result.length === 0) {
            this.alertify.error('No contacts match the search criteria');
          }
          this.contacts = res.result;
          this.pagination = res.pagination;
        },
        error => {
          console.log(this.userParams);
        }
      );
  }
}

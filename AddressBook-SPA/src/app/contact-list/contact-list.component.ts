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
  }

  changeTypeString(typeString: string) {
    this.typeString = typeString;
  }

  clearParams() {
    this.userParams.tag = null;
    this.userParams.firstName = null;
    this.userParams.lastName = null;
    this.userParams.isBookmarked = false;
  }
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadContacts();
  }

  deleteContact(id) {
    this.alertify.confirm('By deleteing the contact you also delete all associated items!', () => {
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
    });
  }

  loadContacts(type?: string) {
    if (type === 'lastName') {
      this.userParams.lastName = this.searchString;
    }
    if (type === 'firstName') {
      this.userParams.firstName = this.searchString;
    }
    if (type === 'tag') {
      this.userParams.tag = this.searchString;
    }
    if (type === 'true') {
      this.userParams.isBookmarked = true;
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

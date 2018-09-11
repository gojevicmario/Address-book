import { Injectable } from '@angular/core';
import { Contact } from '../_models/contact';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from '../_services/contact.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ContactListResolver implements Resolve<Contact[]> {
  pageNumber = 1;
  pageSize = 5;
  userParams: any = {isBookmarked: true};
  constructor(private contactService: ContactService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
    return this.contactService.getContacts(this.pageNumber, this.pageSize, this.userParams).pipe(
      catchError(error => {
        console.log(error);
        this.router.navigate(['/contacts']);
        return of(null);
      })
    );
  }
}

import { Injectable } from '@angular/core';
import { Contact } from '../_models/contact';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from '../_services/contact.service';
import { Observable, of } from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ContactListResolver implements Resolve<Contact[]> {
    constructor(private contactService: ContactService,
         private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Contact[]> {
        return this.contactService.getContacts().pipe(
            catchError( error => {
                console.log('greska');
                this.router.navigate(['/bookmarks']);
                return of(null);
            })
        );
    }
}

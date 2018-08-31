import { Injectable } from '@angular/core';
import { Contact } from '../_models/contact';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from '../_services/contact.service';
import { Observable, of } from '../../../node_modules/rxjs';
import {catchError} from 'rxjs/operators';

@Injectable()
export class ContactDetailResolver implements Resolve<Contact> {
    constructor(private contactService: ContactService,
         private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<Contact> {
        return this.contactService.getContact(route.params['id']).pipe(
            catchError( error => {
                console.log('greska');
                this.router.navigate(['/bookmarks']);
                return of(null);
            })
        );
    }
}

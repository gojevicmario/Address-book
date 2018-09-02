import { Injectable } from '@angular/core';
import { Contact } from '../_models/contact';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ContactService } from '../_services/contact.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DetailsService } from '../_services/Details.service';
import { Email } from '../_models/email';

@Injectable()
export class ContactEditEmailResolver implements Resolve<Email[]> {
  constructor(
    private router: Router,
    private detailService: DetailsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Email[]> {
    return this.detailService.getEmails(route.params['id']).pipe(
      catchError(error => {
        console.log('greska');
        this.router.navigate(['/contacts']);
        return of(null);
      })
    );
  }
}

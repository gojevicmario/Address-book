import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DetailsService } from '../_services/Details.service';
import { Tag } from '../_models/tag';

@Injectable()
export class ContactEditTagResolver implements Resolve<Tag[]> {
  constructor(
    private router: Router,
    private detailService: DetailsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Tag[]> {
    return this.detailService.getTags(route.params['id']).pipe(
      catchError(error => {
        console.log('greska');
        this.router.navigate(['/contacts']);
        return of(null);
      })
    );
  }
}

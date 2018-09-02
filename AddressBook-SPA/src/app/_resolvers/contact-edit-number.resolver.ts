import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DetailsService } from '../_services/Details.service';

@Injectable()
export class ContactEditNumberResolver implements Resolve<Number[]> {
  constructor(
    private router: Router,
    private detailService: DetailsService
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Number[]> {
    return this.detailService.getNumbers(route.params['id']).pipe(
      catchError(error => {
        console.log('greska');
        this.router.navigate(['/contacts']);
        return of(null);
      })
    );
  }
}

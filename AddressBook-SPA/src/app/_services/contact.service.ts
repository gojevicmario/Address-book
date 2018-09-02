import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getContacts(
    page?,
    itemsPerPage?,
    userParams?
  ): Observable<PaginatedResult<Contact[]>> {
    const paginatedResult: PaginatedResult<Contact[]> = new PaginatedResult<
      Contact[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams != null) {
      if (userParams.firstName != null) {
        params = params.append('firstName', userParams.firstName);
      }
      if (userParams.lastName != null) {
        params = params.append('lastName', userParams.lastName);
      }
      if (userParams.tag != null) {
        params = params.append('tag', userParams.tag);
      }
    }
    return this.http
      .get<Contact[]>(this.baseUrl + 'contacts', {
        observe: 'response',
        params
      })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('pagination')
            );
          }
          return paginatedResult;
        })
      );
  }

  getContact(id): Observable<Contact> {
    return this.http.get<Contact>(this.baseUrl + 'contacts/' + id);
  }

  updateContact(id: number, contact: Contact) {
    return this.http.put(this.baseUrl + 'contacts/' + id, contact);
  }

  deleteContact(id: number) {
    return this.http.delete(this.baseUrl + 'contacts/' + id);
  }

  createContact(contact: Contact) {
    return this.http.post(this.baseUrl + 'contacts/', contact);
  }
}

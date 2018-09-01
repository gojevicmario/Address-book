import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl + 'contacts');
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

}

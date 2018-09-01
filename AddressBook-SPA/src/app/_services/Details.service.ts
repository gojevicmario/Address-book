import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Email } from '../_models/email';
import { Number } from '../_models/number';
import { Tag } from '../_models/tag';
import { Contact } from '../_models/contact';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEmails(id): Observable<Email[]> {
    return this.http.get<Email[]>(this.baseUrl + 'emails/' + id);
  }

  getEmail(fkId: number, pkId: number): Observable<Email> {
    return this.http.get<Email>(this.baseUrl + `emails/${fkId}/${pkId}`);
  }

  getNumbers(id): Observable<Number[]> {
    return this.http.get<Number[]>(this.baseUrl + 'numbers/' + id);
  }

  getTags(id): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.baseUrl + 'tags/' + id);
  }

  updateEmails(fkId: number, pkId: number, email: Email) {
    return this.http.put(this.baseUrl + `emails/${fkId}/${pkId}`, email);
  }

  deleteEmail(fkId: number, pkId: number) {
    return this.http.delete(this.baseUrl + `emails/${fkId}/${pkId}`);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../_models/contact';

@Pipe({
  name: 'bookmarkedContacts',
  pure: false
})
export class BookmarkedContactsPipe implements PipeTransform {
  transform(contacts: Contact[]): Contact[] {
      return contacts.filter(c => c.isBookmarked);
  }
}

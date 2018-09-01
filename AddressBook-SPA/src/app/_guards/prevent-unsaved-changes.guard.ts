import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ContactEditComponent } from '../contact-edit/contact-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<ContactEditComponent> {
  canDeactivate(component: ContactEditComponent) {
    if (component.editContactForm.dirty) {
      return confirm('You are about to leave the page and lose all the updated data!');
    }
    return true;
  }
}

import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { DetailsComponent } from './details/details.component';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';
import { ContactListResolver } from './_resolvers/contact-list.resolver';
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ContactEditEmailResolver } from './_resolvers/contact-edit-email.resolver';
import { ContactEditNumberResolver } from './_resolvers/contact-edit-number.resolver';
import { ContactEditTagResolver } from './_resolvers/contact-edit-tag.resolver';

export const appRoutes: Routes = [
  {
    path: 'contacts',
    component: ContactListComponent,
    resolve: { contacts: ContactListResolver }
  },
  { path: 'contacts/create', component: CreateContactComponent },
  {
    path: 'contacts/edit/:id',
    component: ContactEditComponent,
    resolve: {
      contact: ContactDetailResolver,
      emails: ContactEditEmailResolver,
      numbers: ContactEditNumberResolver,
      tags: ContactEditTagResolver
    },
    canDeactivate: [PreventUnsavedChanges]
  },
  {
    path: 'contacts/details/:id',
    component: DetailsComponent,
    resolve: { contact: ContactDetailResolver }
  },
  { path: '**', redirectTo: 'contacts', pathMatch: 'full' }
];

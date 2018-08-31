import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { DetailsComponent } from './details/details.component';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';

export const appRoutes: Routes = [
    {path: 'bookmarks', component: BookmarkListComponent},
    {path: 'all', component: ContactListComponent},
    {path: 'createContact', component: CreateContactComponent},
    {path: 'details/:id', component: DetailsComponent, resolve: {contact: ContactDetailResolver}},
    {path: '**', redirectTo: 'bookmarks', pathMatch: 'full'}
];

import { Routes } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { CreateContactComponent } from './create-contact/create-contact.component';

export const appRoutes: Routes = [
    {path: 'bookmarks', component: BookmarkListComponent},
    {path: 'all', component: ContactListComponent},
    {path: 'createContact', component: CreateContactComponent},
    {path: '**', redirectTo: 'bookmarks', pathMatch: 'full'}
];

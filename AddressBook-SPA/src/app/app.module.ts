import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule, TabsModule} from 'ngx-bootstrap';
import { RouterModule, Routes, Router } from '@angular/router';


import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { DetailsComponent} from './details/details.component';
import { EmailComponent } from './details/email/email.component';
import { NumberComponent } from './details/number/number.component';
import { TagComponent } from './details/tag/tag.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { appRoutes } from './routes';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactService } from './_services/contact.service';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';
import { ContactListResolver } from './_resolvers/contact-list.resolver';




@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      DetailsComponent,
      EmailComponent,
      NumberComponent,
      TagComponent,
      ContactListComponent,
      BookmarkListComponent,
      CreateContactComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
       ContactService,
       ContactDetailResolver,
       ContactListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

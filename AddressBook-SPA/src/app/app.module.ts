import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';


import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { DetailsComponent} from './details/details.component';
import { EmailComponent } from 'src/app/details/email/email.component';
import { NumberComponent } from 'src/app/details/number/number.component';
import { TagComponent } from 'src/app/details/tag/tag.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';
import { appRoutes } from './routes';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactService } from './_services/contact.service';




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
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
       ContactService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

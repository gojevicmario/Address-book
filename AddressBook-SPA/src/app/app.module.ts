import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { NavComponent } from './nav/nav.component';
import { DetailsComponent} from './details/details.component';
import { EmailComponent } from 'src/app/details/email/email.component';
import { NumberComponent } from 'src/app/details/number/number.component';
import { TagComponent } from 'src/app/details/tag/tag.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { BookmarkListComponent } from './bookmark-list/bookmark-list.component';


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
      BookmarkListComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule
   ],
   providers: [],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

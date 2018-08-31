import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
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
import {JwPaginationComponent} from 'jw-angular-pagination';
import { appRoutes } from './routes';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ContactService } from './_services/contact.service';
import { ContactDetailResolver } from './_resolvers/contact-detail.resolver';
import { ContactListResolver } from './_resolvers/contact-list.resolver';
import { DetailsService } from './_services/Details.service';




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
      CreateContactComponent,
      JwPaginationComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxPaginationModule
   ],
   providers: [
       ContactService,
       DetailsService,
       ContactDetailResolver,
       ContactListResolver
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

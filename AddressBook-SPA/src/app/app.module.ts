import { BrowserModule } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule, TabsModule, PaginationModule} from 'ngx-bootstrap';
import { RouterModule, Routes, Router } from '@angular/router';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';



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
import { ContactEditComponent } from './contact-edit/contact-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { BookmarkedContactsPipe } from './_pipes/bookmarked-contacts.pipe';
import { ContactEditEmailResolver } from './_resolvers/contact-edit-email.resolver';
import { SafeStylePipe } from './_pipes/safeStyle.pipe';
import { ContactEditNumberResolver } from './_resolvers/contact-edit-number.resolver';
import { ContactEditTagResolver } from './_resolvers/contact-edit-tag.resolver';






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
      JwPaginationComponent,
      ContactEditComponent,
      ContactEditComponent,
      BookmarkedContactsPipe,
      SafeStylePipe
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      TabsModule.forRoot(),
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      NgxPaginationModule,
      ReactiveFormsModule
   ],
   providers: [
       ContactService,
       DetailsService,
       ContactDetailResolver,
       ContactEditEmailResolver,
       ContactEditNumberResolver,
       ContactEditTagResolver,
       ContactListResolver,
       PreventUnsavedChanges
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }

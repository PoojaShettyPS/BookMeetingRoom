import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppCommonModule } from './app-common/app-common.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink  } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppCommonModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule,
    ApolloModule,
    HttpLinkModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(apollo: Apollo, httpLink: HttpLink) {
    apollo.create({
      link: httpLink.create({uri: 'http://localhost:4000'}),
      cache: new InMemoryCache()
    });
  }
}

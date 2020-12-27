import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { SearchInputComponent } from './search-input/search-input.component';
import { BackendApiHttpService } from 'src/services/backend-api/backend-api-http.service';
import { BackendApiService } from 'src/services/backend-api/backend-api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    SearchInputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,      
  ],
  providers: [
    BackendApiHttpService,
    BackendApiService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

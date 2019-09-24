import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxPlayCardModule } from 'ngx-play-card';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxPlayCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

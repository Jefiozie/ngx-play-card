import { NgModule } from '@angular/core';
import { NgxPlayCardComponent } from './ngx-play-card.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [NgxPlayCardComponent],
  imports: [
    CommonModule
  ],
  exports: [NgxPlayCardComponent]
})
export class NgxPlayCardModule { }

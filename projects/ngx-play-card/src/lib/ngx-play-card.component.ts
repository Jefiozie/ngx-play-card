import { Component, OnInit, AfterViewInit, Input, ViewChild, ElementRef } from '@angular/core';
import { fromEvent, merge, combineLatest } from 'rxjs';
import { delay, mapTo, share, takeUntil, switchMap, map, repeat, endWith } from 'rxjs/operators';
@Component({
  selector: 'ngx-play-card',
  templateUrl: './ngx-play-card.component.html',
  styleUrls: ['./ngx-play-card.component.scss']
})
export class NgxPlayCardComponent implements OnInit, AfterViewInit {
  height: number;
  width: number;
  backgroundImage: any;
  mouseX = 0;
  mouseY = 0;
  get mousePX() {
    return this.mouseX / this.width;
  }
  get mousePY() {
    return this.mouseY / this.height;
  }

  @Input() cardBgImage = '';

  @ViewChild('card', { static: true }) card: ElementRef<HTMLElement>;

  get cardStyle() {
    return this.transformStyle();
  }

  get cardBgTransform() {

    return this.transformStyle();
  }

  private transformStyle() {
    const tX = this.mousePX * -30;
    const tY = this.mousePY * -30;
    return { transform: `rotateY(${tX}deg) rotateX(${tY}deg)` };
  }
  get nativeElement(): HTMLElement {
    return this.card.nativeElement;
  }
  ngOnInit() {
    const mouseMove$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mousemove');
    const mouseLeave$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mouseleave').pipe(
      delay(100),
      mapTo(({ mouseX: 0, mouseY: 0 })),
      share()
    );
    const mouseEnter$ = fromEvent<MouseEvent>(this.card.nativeElement, 'mouseenter').pipe(takeUntil(mouseLeave$));

    mouseEnter$.pipe(
      switchMap(() => mouseMove$),
      map(e =>
        ({
          mouseX: e.pageX - this.nativeElement.offsetLeft - this.width / 2,
          mouseY: e.pageY - this.nativeElement.offsetTop - this.height / 2
        })),
      takeUntil(mouseLeave$),
      endWith(({ mouseX: 0, mouseY: 0 })),
      repeat()
    ).subscribe(e => {
      this.mouseX = e.mouseX;
      this.mouseY = e.mouseY;
    });

  }
  ngAfterViewInit() {
    this.width = this.card.nativeElement.offsetWidth;
    this.height = this.card.nativeElement.offsetHeight;
  }
}

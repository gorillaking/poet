import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: 'input[numberOnly]'
})
export class OnlyNumberDirective {
  @Input() max: number = Infinity;
  @Input() min: number = 0;
  constructor(private _el: ElementRef) { }

  @HostListener('input', ['$event']) onInputChange(event) {
    const initialValue = this._el.nativeElement.value;
    this._el.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');
    if( initialValue !== this._el.nativeElement.value) {
      event.stopPropgation();
    }
    
    this._el.nativeElement.value = this._el.nativeElement.value.replace(/^0+/, '');
  }

  @HostListener('blur') onBlur() {
    let val = +this._el.nativeElement.value;
    this._el.nativeElement.value = Math.max(this.min, Math.min(this.max, val));
  }
}

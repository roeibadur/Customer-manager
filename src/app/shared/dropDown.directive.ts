import {Directive , HostListener, HostBinding } from '@angular/core';
@Directive({selector: '[app-dropDown]'})
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('click') dropdown() {
    this.isOpen = ! this.isOpen;
  }
}

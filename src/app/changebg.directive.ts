 import { Directive , Input , ElementRef, Renderer2, HostListener} from '@angular/core';

 @Directive({
   selector: '[appChangebg]'
 })
 export class ChangebgDirective {
 @Input() isCorrect: Boolean = false;
   constructor(private el :ElementRef, private render:Renderer2) { }
 @HostListener('click') answer(){
  if(this.isCorrect){
  this.render.setStyle(this.el.nativeElement,'background','green');
  this.render.setStyle(this.el.nativeElement,'color','#fff');
  this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
}else{
  this.render.setStyle(this.el.nativeElement,'background','red');
  this.render.setStyle(this.el.nativeElement,'color','#fff');
  this.render.setStyle(this.el.nativeElement,'border','2px solid grey');
}
 }
 }
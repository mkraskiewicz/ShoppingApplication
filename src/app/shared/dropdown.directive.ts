import { Directive, ElementRef, Renderer2, HostListener, Host, OnInit, HostBinding } from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit{

    @HostBinding('class.open') isOpen: boolean = false;
    constructor(private elemRef: ElementRef, private renderer: Renderer2){}

    ngOnInit(){}

    @HostListener('click') mouseHoverOn(eventData: Event){
        this.isOpen = !this.isOpen;
        this.renderer.addClass(this.elemRef.nativeElement,'open');
    }



}
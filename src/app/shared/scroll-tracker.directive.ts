import { Directive, Output, EventEmitter, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appScrollTracker]'
})
export class ScrollTrackerDirective {

  constructor(private el: ElementRef) {
    // console.log(this.el);
  //   console.log( "IH",this.el.innerHeight); 
  //   console.log('SY',this.el.scrollY);
  //  console.log('OH',this.el.nativeElement.offsetHeight);
  //  console.log('OH',this.el.nativeElement.scrollHeight) 
  }
  @Output() scrollingFinished = new EventEmitter<void>();
  
  emitted = false;

  

  // @HostListener("window:scroll", [])
  // onScroll(): void {

  //  console.log( "IH",this.el.nativeElement.innerHeight); 
  //   console.log('SY',this.el.nativeElement.scrollY);
  //  console.log('OH',this.el.nativeElement.offsetHeight)  ;


  //   // if ((this.el.nativeElement.innerHeight + this.el.nativeElement.scrollY) >= this.el.nativeElement.offsetHeight && !this.emitted) {
  //   //   this.emitted = true;
  //   //   this.scrollingFinished.emit();
  //   // } else if ((this.el.nativeElement.innerHeight + this.el.nativeElement.scrollY) < document.body.offsetHeight) {
  //   //   this.emitted = false;
  //   // }
  // }

}

// isLeaving = false;

//   const recipes = document.querySelectorAll('.recipe__item');
//   const config = {
//   root: document.querySelector('.recipes__box'),
//   rootMargin: '0px'
//   };

//   const observer = new IntersectionObserver(function (entries, self) {
//       entries.forEach(entry => {
//           if (entry.isIntersecting) { 
//       this.islLeaving= true;

//         }
//           else if (this.isLeaving){
      
//     this.isLeaving= false
//       };
//       })
//     }, this.config);

//     this.recipes.forEach(recipe => { observer.observe(recipe); });

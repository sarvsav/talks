import { Component } from '@angular/core';

import { gsap } from "gsap";


@Component({
  selector: 'app-root',
  imports: [],
  template: `
  <div class="green">
    Hello, Angular!
  </div>
  <div class="purple">
    Welcome to GSAP!
  </div>
  <div class="blue">
    Enjoy Animations!
  </div>
  <div class="box" style="width: 50px; height: 50px;">
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="greenToBlack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:green; stop-opacity:1" />
          <stop offset="100%" style="stop-color:black; stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" ry="20" fill="url(#greenToBlack)" />
    </svg>
  </div>
  <div class="redBox" style="width: 50px; height: 50px;">
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="redToBlack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:red; stop-opacity:1" />
          <stop offset="100%" style="stop-color:black; stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" ry="20" fill="url(#redToBlack)" />
    </svg>
  </div>
  <div class="blueBox" style="width: 50px; height: 50px;">
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="blueToBlack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:blue; stop-opacity:1" />
          <stop offset="100%" style="stop-color:black; stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" ry="20" fill="url(#blueToBlack)" />
    </svg>
  </div>
  <div class="lightGreenBox" style="width: 50px; height: 50px;">
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lightGreenToBlack" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#90ee90; stop-opacity:1" />
          <stop offset="100%" style="stop-color:#98fb98; stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="20" ry="20" fill="url(#lightGreenToBlack)" />
    </svg>
  </div>
  `,
  styles: [],
  standalone: true
})
export class AppComponent {
  title = 'angularanimation';

  ngAfterViewInit() {
    // target the element with a class of "green" - rotate and move TO 100px to the left over the course of 1 second.
    gsap.to(".green", {rotation: 360, x: 100, duration: 1});

    // target the element with a class of "purple" - rotate and move FROM 100px to the left over the course of 1 second.
    gsap.from(".purple", {rotation: -360, x: -100, duration: 1});

    // target the element with a class of "blue" - rotate and move FROM 100px to the left, TO 100px to the right over the course of 1 second.
    gsap.fromTo(".blue", {x: -100},{rotation: 360, x: 100, duration: 1});

    gsap.to(".box", { x: 200, delay: 1 })
    gsap.from(".redBox", { x: 200,  delay: 2});
    gsap.fromTo(".blueBox", { x: 200 }, { x: 400, duration: 1, delay: 3 });

    gsap.to(".lightGreenBox", {
      rotation: 360,
      x: '200',
      xPercent: -100,
      // special properties
      duration: 2, // how long the animation lasts
      delay: 4,
      repeat: 3, // the number of repeats - this will play 3 times
      yoyo: true, // this will alternate back and forth on each repeat. Like a yoyo
      ease: "bounce.out", // 'bounce' ease revs up, races along and then bounces to a stop.
    });
  }
}

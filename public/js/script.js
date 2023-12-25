gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);
// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


alert('You must have to Login !');


// const mobileNavOpen = document.getElementsByClassName('menuItems');
// const closemobileNav = document.getElementsByClassName('closingTheNav');


// mobileNavOpen.addEventListener('click',()=>{
//   gsap.to('#navigationBarForMobile',{
//     y:'100vh',
//     duration:0.5,
//     delay:0.2
//   })
// })

const products = document.getElementsByClassName('cards__container__products');
const topToDown = document.getElementById('topToBottom');
topToDown.addEventListener('mouseenter',()=>{
  gsap.to(products,{
    y:'170%',
    duration:1,
    pin:true
  })
})



//isko phir se uncommen krna hai
// const closeBtn = document.querySelector('.closetheProducts');
// topToDown.addEventListener('mouseleave',()=>{
//   gsap.to(products,{
//     y:'-170%',
//     duration:2
//   })
// })


const closeProductPage = document.querySelector('.productRemixIcons');
closeProductPage.addEventListener('click',()=>{
  // alert('closing the product page');
  gsap.to(products,{
    y:'-170%',
    duration:1.1
  })
})



// const pricingLists = document.getElementsByClassName("pricingListsInHover");
const pricingLists = document.querySelector('#pricingListsInHover');
const pricing = document.querySelector('#PricingListsTopToBottom');
pricing.addEventListener('mouseenter',()=>{
  gsap.to(pricingLists,{
    y:'170%',
    duration:0.3
  })
  console.log('Hey Varun is Here');
})


pricing.addEventListener('mouseleave',()=>{
  gsap.to(pricingLists,{
    y:'-170%',
    duration:1
  })
  console.log('Hey Varun is Here');
})

const loginPage = document.querySelector('.close__login__page');
const loginView = document.querySelector('#login__page')
loginPage.addEventListener('click',gsap.to(loginView,{
  y:'-100%',
  duration:0.7
},

console.log('Click on the Back to the login Page')))


// const mobileNavOpen = document.getElementsByClassName('menuItems');
// const closemobileNav = document.getElementsByClassName('closingTheNav');


// // mobileNavOpen.addEventListener('click',()=>{
// //   gsap.to('#navigationBarForMobile',{
// //     y:'100vh',
// //     duration:0.5,
// //     delay:0.2
// //   })
// // })

// mobileNavOpen.addEventListener('click',()=>{
//   console.log('open the navigation');
// })
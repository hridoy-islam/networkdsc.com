const mobileNavOpen = document.querySelector('.menuItems');
//  const closemobileNav = document.('closingTheNav');

mobileNavOpen.addEventListener('click',()=>{
    gsap.to('.navForMobile',{
      y:'100vh',
      duration:0.5,
      delay:0.2,
    })
})
mobileNavOpen.addEventListener('click',()=>{
    console.log('Hii WWE');
})


const closeNavOnMobile =document.querySelector('.ri-arrow-up-line');


closeNavOnMobile.addEventListener('click',()=>{
     gsap.to('.navForMobile',{
      y:'-100vh',
      duration:0.5,
      delay:0.2,
     })
})

closeNavOnMobile.addEventListener('click',()=>{
  console.log('closing the nav');
})
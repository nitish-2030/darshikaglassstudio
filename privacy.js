(function(){
  "use strict";

  /* ---------- Mobile menu ---------- */
  var nav = document.getElementById('nav');
  var burgerBtn = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  function closeMenu(){
    mobileMenu.classList.remove('open'); nav.classList.remove('menu-open');
    burgerBtn.setAttribute('aria-expanded','false'); document.body.style.overflow='';
  }
  burgerBtn.addEventListener('click', function(){
    var open = mobileMenu.classList.toggle('open');
    nav.classList.toggle('menu-open', open);
    burgerBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });

  /* ---------- Navbar scroll state + back-to-top ---------- */
  var topBtn = document.getElementById('topBtn');
  var lastKnownScroll = 0, ticking = false;
  function onScroll(){
    lastKnownScroll = window.scrollY;
    if(!ticking){
      window.requestAnimationFrame(function(){
        nav.classList.toggle('scrolled', lastKnownScroll > 40);
        topBtn.classList.toggle('show', lastKnownScroll > 500);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  topBtn.addEventListener('click', function(){ window.scrollTo({top:0, behavior:'smooth'}); });

  /* ---------- Footer year ---------- */
  document.getElementById('yearNow').textContent = new Date().getFullYear();

  /* ---------- Hide floating buttons once footer is in view ---------- */
  var floatStack = document.querySelector('.float-stack');
  var footerEl = document.querySelector('.footer');
  if(floatStack && footerEl && 'IntersectionObserver' in window){
    var footerIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        floatStack.classList.toggle('footer-near', entry.isIntersecting);
      });
    }, {rootMargin:'0px 0px -60px 0px', threshold:0});
    footerIO.observe(footerEl);
  }

})();

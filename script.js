(function(){
  "use strict";

  /* ---------- Data ---------- */
  /* Service thumbnails: drop real photos into /assets/services/ using the filenames below
     (square/near-square, ~600x600px, optimised jpg). Falls back to a placeholder tile if missing. */
  var SERVICES = [
    {icon:'i-glass', tag:'01', title:'All Type Glass Work', cat:'glass', img:'assets/services/glass-work.webp',
      desc:'Toughened partitions, shower cubicles, tabletops and windows — cut and fitted for a precise finish.'},
    {icon:'i-aluminium', tag:'02', title:'Aluminium Work', cat:'aluminium', img:'assets/services/aluminium-work.webp',
      desc:'Doors, windows and section work built for durability and a smooth, modern look.'},
    {icon:'i-mirror', tag:'03', title:'Digital Mirror', cat:'mirrors', img:'assets/services/digital-mirror.webp',
      desc:'Printed and LED-lit mirrors that add a modern focal point to any room.'},
    {icon:'i-wallpaper', tag:'04', title:'Wallpaper Installation', cat:'interior', img:'assets/services/wallpaper.webp',
      desc:'Wall coverings installed smoothly and evenly, from textures to bold patterns.'},
    {icon:'i-interior', tag:'05', title:'Interior Work', cat:'interior', img:'assets/services/interior-work.webp',
      desc:'Room layouts and finishing work planned around how the space is actually used.'},
    {icon:'i-furniture', tag:'06', title:'Furniture Work', cat:'interior', img:'assets/services/furniture-work.webp',
      desc:'Custom wardrobes, cabinets and modular furniture built to fit your space.'},
    {icon:'i-ceiling', tag:'07', title:'PVC False Ceiling', cat:'ceiling', img:'assets/services/false-ceiling.webp',
      desc:'Moisture-resistant ceilings with clean lines and integrated lighting.'}
  ];

  /* DEMO DATA — replace src paths with your real photos/clips in /assets/work/.
     type:'video' tiles need a poster (shown instantly) + a small mp4 (plays once visible). */
  var WORK = [
    {type:'video', src:'assets/work/clip-1-web.mp4', poster:'assets/work/clip-1-poster.webp', tag:'Glass Work', title:'Premium Salon Interior'}, 
    {type:'video', src:'assets/work/clip-2-web.mp4', poster:'assets/work/clip-2-poster.webp', tag:'Aluminium', title:'Custom Designed Glasses'},
    {type:'video', src:'assets/work/clip-3-web.mp4', poster:'assets/work/clip-3-poster.webp', tag:'Aluminium + glass', title:'Shower Cubicle Fit'},
    {type:'video', src:'assets/work/clip-4-web.mp4', poster:'assets/work/clip-4-poster.webp', tag:'Interior', title:'LED Touch Mirror'},
    {type:'video', src:'assets/work/clip-5-web.mp4', poster:'assets/work/clip-5-poster.webp', tag:'LED Mirror', title:'Foldable Glass Door'},
    {type:'video', src:'assets/work/clip-6-web.mp4', poster:'assets/work/clip-6-poster.webp', tag:'Interior', title:'Wave Fountain'}
  ];

  /* ---------- Featured Projects data ----------
     This is the ONLY thing you touch to add a new project photo.
     Add a new object to this array — no layout/markup changes needed.

     Fields:
       image     required — path to the photo (see /assets/projects/)
       title     required — short project or service name
       category  required — must match a filter button: Glass, Interior,
                             Mirrors, Aluminium or Ceiling
       location  optional — e.g. "Sidhi" — omit or leave "" to hide it

     The masonry tile shape (tall/wide/square/medium) is assigned
     automatically based on position, so you never need to touch CSS. */
  var PROJECTS = [
    {image:'assets/projects/glass-partition-living-room.webp', title:'Living Room Partition', category:'Glass', location:'Sidhi'},
    {image:'assets/projects/aluminium-shopfront-frame.webp', title:'Shopfront Frame', category:'Aluminium', location:'Sidhi'},
    {image:'assets/projects/bedroom-mirror-feature-wall.webp', title:'Bedroom Feature Wall', category:'Mirrors', location:''},
    {image:'assets/projects/office-cabin-interior.webp', title:'Office Cabin Layout', category:'Interior', location:'Sidhi'},
    {image:'assets/projects/pvc-false-ceiling-hall.webp', title:'PVC False Ceiling', category:'Ceiling', location:''},
    {image:'assets/projects/shower-cubicle-glass.webp', title:'Shower Cubicle', category:'Glass', location:''},
    {image:'assets/projects/modular-wardrobe-interior.webp', title:'Modular Wardrobe', category:'Interior', location:'Majhauli'},
    {image:'assets/projects/aluminium-balcony-window.webp', title:'Balcony Window', category:'Aluminium', location:''},
    {image:'assets/projects/salon-digital-mirror.webp', title:'Salon Digital Mirror', category:'Mirrors', location:'Sidhi'},
    {image:'assets/projects/accent-wallpaper-bedroom.webp', title:'Accent Wallpaper', category:'Interior', location:''},
    {image:'assets/projects/gypsum-led-cove-ceiling.webp', title:'Gypsum + LED Cove', category:'Ceiling', location:'Sidhi'},
    {image:'assets/projects/staircase-glass-railing.webp', title:'Staircase Railing', category:'Glass', location:''}
  ];

  var FAQS = [
    {q:'Which areas do you serve?', a:'We primarily serve Sidhi and the surrounding towns in Madhya Pradesh. If you\'re nearby, call or WhatsApp us and we\'ll confirm whether we can take on your project.'},
    {q:'Do you provide home visits?', a:'Yes. For most jobs we visit your home, shop or office in person to take measurements and understand the space before giving a quote.'},
    {q:'Can I customise glass designs?', a:'Yes — glass type, thickness, tint and finish can all be discussed and customised to match your space and budget.'},
    {q:'How long does installation take?', a:'It depends on the scope. Small jobs like a mirror or partition can be done in a day; larger interior or ceiling work may take a few days. We\'ll give you a clear timeline with your estimate.'},
    {q:'Do you work for offices?', a:'Yes, alongside homes we regularly take on office, shop and other commercial fit-out work.'}
  ];

  /* ---------- Helpers ---------- */
  function el(tag, cls, html){ var e=document.createElement(tag); if(cls) e.className=cls; if(html!==undefined) e.innerHTML=html; return e; }

  /* ---------- Build Our Work strip ---------- */
  var workTrack = document.getElementById('workTrack');
  WORK.forEach(function(w){
    var item = el('div','work-item');
    if(w.type === 'video'){
      item.innerHTML =
        '<div class="work-media">'+
          '<img src="'+w.poster+'" alt="" loading="lazy">'+
          '<video muted loop playsinline preload="none" poster="'+w.poster+'"><source data-src="'+w.src+'" type="video/mp4"></video>'+
          '<span class="clip-badge"><svg class="icon icon-play" aria-hidden="true"><use href="#i-play"/></svg><svg class="icon icon-pause" aria-hidden="true"><use href="#i-pause"/></svg></span>'+
        '</div>'+
        '<p class="work-caption">'+w.title+'</p>';
    } else {
      item.innerHTML =
        '<div class="work-media"><img src="'+w.src+'" alt="'+w.title+'" loading="lazy"></div>'+
        '<p class="work-caption">'+w.title+'</p>';
    }
    workTrack.appendChild(item);
  });

  /* Click-to-play: the video file only downloads once the user actually
     asks for it. (Old code auto-loaded+played every video that scrolled
     into view — on tablet/desktop .work-track becomes a visible 4-col
     grid with overflow:visible, not a clipped scroll strip, so most/all
     6 videos counted as "in view" on page load and all downloaded at once.
     That was the 6-video simultaneous-load problem.) */
  document.querySelectorAll('.work-item').forEach(function(item){
    var v = item.querySelector('video');
    if(!v) return;
    var src = v.querySelector('source');
    item.addEventListener('click', function(){
      /* Toggle: if this clip is already playing, clicking it again stops it. */
      if(!v.paused && !v.ended){
        v.pause();
        item.classList.remove('is-playing');
        return;
      }
      if(src && src.dataset.src && !v.currentSrc){ src.src = src.dataset.src; v.load(); }
      document.querySelectorAll('.work-item.is-playing').forEach(function(otherItem){
        if(otherItem !== item){
          var otherV = otherItem.querySelector('video');
          if(otherV){ otherV.pause(); }
          otherItem.classList.remove('is-playing');
        }
      });
      v.play().then(function(){ v.classList.add('is-active'); item.classList.add('is-playing'); }).catch(function(){});
    });
  });

  /* Prev/Next arrows for the desktop/laptop 4-up scroller. Steps by exactly
     one card width (+ gap) each click, and disables at the very start/end. */
  var workPrevBtn = document.getElementById('workPrev');
  var workNextBtn = document.getElementById('workNext');
  if(workTrack && workPrevBtn && workNextBtn){
    var stepWork = function(dir){
      var card = workTrack.querySelector('.work-item');
      var gap = parseFloat(getComputedStyle(workTrack).columnGap || getComputedStyle(workTrack).gap || 16) || 16;
      var step = card ? (card.getBoundingClientRect().width + gap) : (workTrack.clientWidth * 0.8);
      workTrack.scrollBy({left: dir * step, behavior: 'smooth'});
    };
    workPrevBtn.addEventListener('click', function(){ stepWork(-1); });
    workNextBtn.addEventListener('click', function(){ stepWork(1); });
    var updateWorkArrows = function(){
      var max = workTrack.scrollWidth - workTrack.clientWidth - 1;
      workPrevBtn.disabled = workTrack.scrollLeft <= 1;
      workNextBtn.disabled = workTrack.scrollLeft >= max;
    };
    workTrack.addEventListener('scroll', updateWorkArrows, {passive:true});
    window.addEventListener('resize', updateWorkArrows);
    updateWorkArrows();
  }

  /* Swipe-hint dots for the mobile/tablet horizontal strip (hidden by CSS once
     .work-track becomes a grid at 768px, so this is a no-op cost on desktop). */
  var workDots = document.getElementById('workDots');
  if(workDots && workTrack){
    var workItems = Array.prototype.slice.call(workTrack.querySelectorAll('.work-item'));
    workItems.forEach(function(_, i){
      var dot = el('span', i === 0 ? 'is-active' : '');
      workDots.appendChild(dot);
    });
    var dots = Array.prototype.slice.call(workDots.children);
    var dotsIO = ('IntersectionObserver' in window) ? new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          var idx = workItems.indexOf(entry.target);
          if(idx > -1){
            dots.forEach(function(d){ d.classList.remove('is-active'); });
            dots[idx].classList.add('is-active');
          }
        }
      });
    }, {root: workTrack, threshold:0.6}) : null;
    if(dotsIO){ workItems.forEach(function(item){ dotsIO.observe(item); }); }
  }

  /* Pause a playing clip once it scrolls out of view (battery/data, not loading) */
  if('IntersectionObserver' in window){
    var workVideoIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting){
          entry.target.pause();
          var parentItem = entry.target.closest('.work-item');
          if(parentItem) parentItem.classList.remove('is-playing');
        }
      });
    }, {threshold:0.2});
    document.querySelectorAll('.work-item video').forEach(function(v){ workVideoIO.observe(v); });
  }

  /* ---------- Hero video (optional, connection-aware) ----------
     Stays image-only until a <source src="..."> is filled in inside #heroVideo.
     Once you add that, it auto-skips the video on slow/data-saver connections. */
  (function initHeroMedia(){
    var video = document.getElementById('heroVideo');
    var source = video.querySelector('source');
    if(!source || !source.getAttribute('src')) return; // no video added yet — image only
    var conn = navigator.connection || navigator.webkitConnection;
    var isSlow = conn && (conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''));
    if(isSlow) return;
    video.addEventListener('canplaythrough', function(){ video.classList.add('is-active'); }, {once:true});
    video.load();
    video.play().catch(function(){});
  })();

  /* ---------- Build Services list ---------- */
  var servicesList = document.getElementById('servicesList');
  SERVICES.forEach(function(s, i){
    var row = el('div','service-row');
    row.setAttribute('data-index', i);
    row.innerHTML =
      '<div class="service-row__thumb facet-tile">'+
        '<div class="glyph"><svg class="icon" aria-hidden="true"><use href="#'+s.icon+'"/></svg></div>'+
        '<img src="'+s.img+'" alt="'+s.title+'" loading="lazy" onerror="this.style.display=\'none\'">'+
        '<span class="service-row__num-badge">'+s.tag+'</span>'+
      '</div>'+
      '<div class="service-row__body">'+
        '<p class="tag">'+s.tag+'</p><h3>'+s.title+'</h3><p>'+s.desc+'</p>'+
      '</div>';
    servicesList.appendChild(row);
  });

  /* ---------- Build Featured Projects ----------
     Reusable card renderer: pass it any project object from PROJECTS
     and an index, and it returns a ready-to-insert image tile. */
  var MASONRY_SIZES = ['h-tall','h-square','h-med','h-wide'];
  function renderProjectCard(project, index){
    var size = MASONRY_SIZES[index % MASONRY_SIZES.length];
    var item = el('div','gallery-item '+size);
    item.setAttribute('data-cat', project.category.toLowerCase());
    item.setAttribute('data-index', index);
    var metaLine = project.category + (project.location ? ' · ' + project.location : '');
    item.innerHTML =
      '<div class="project-media">'+
        '<img src="'+project.image+'" alt="'+project.title+'" loading="lazy" onerror="this.closest(\'.gallery-item\').classList.add(\'img-missing\')">'+
        '<div class="zoom-hint"><svg class="icon" aria-hidden="true"><use href="#i-zoom"/></svg></div>'+
        '<div class="cap"><span class="cap-tag">'+metaLine+'</span><span class="cap-title">'+project.title+'</span></div>'+
      '</div>';
    item.addEventListener('click', function(){ openLightbox(index); });
    return item;
  }
  var galleryGrid = document.getElementById('galleryGrid');
  PROJECTS.forEach(function(p, i){ galleryGrid.appendChild(renderProjectCard(p, i)); });

  /* ---------- Build FAQ ---------- */
  var faqWrap = document.getElementById('faqWrap');
  FAQS.forEach(function(f){
    var item = el('div','faq-item');
    item.innerHTML =
      '<button type="button" class="faq-q"><span>'+f.q+'</span><svg class="icon chev" aria-hidden="true"><use href="#i-arrow" style="transform:rotate(90deg)"/></svg></button>'+
      '<div class="faq-panel"><div class="faq-panel-inner"><p>'+f.a+'</p></div></div>';
    item.querySelector('.faq-q').addEventListener('click', function(){
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(o){ o.classList.remove('open'); });
      if(!wasOpen) item.classList.add('open');
    });
    faqWrap.appendChild(item);
  });

  /* ---------- Navbar scroll state ---------- */
  var nav = document.getElementById('nav');
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

  /* ---------- Mobile menu ---------- */
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

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(elm){ io.observe(elm); });
  } else {
    revealEls.forEach(function(elm){ elm.classList.add('is-visible'); });
  }
  // hero reveals immediately on load
  requestAnimationFrame(function(){ document.getElementById('heroReveal').classList.add('is-visible'); });

  /* ---------- Gallery filter ---------- */
  function applyGalleryFilter(f){
    document.querySelectorAll('.gallery-item').forEach(function(item){
      var match = (f === 'all' || item.getAttribute('data-cat') === f);
      item.classList.toggle('hide', !match);
    });
  }
  document.getElementById('filterRow').addEventListener('click', function(e){
    var btn = e.target.closest('.filter-btn');
    if(!btn) return;
    document.querySelectorAll('.filter-btn').forEach(function(b){ b.classList.remove('active'); });
    btn.classList.add('active');
    applyGalleryFilter(btn.getAttribute('data-filter'));
  });
  // apply whichever filter is active by default on load
  var defaultFilterBtn = document.querySelector('.filter-btn.active');
  applyGalleryFilter(defaultFilterBtn ? defaultFilterBtn.getAttribute('data-filter') : 'all');

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById('lightbox');
  var lbTile = document.getElementById('lbTile');
  var lbImage = document.getElementById('lbImage');
  var lbTag = document.getElementById('lbTag');
  var lbTitle = document.getElementById('lbTitle');
  var currentIndex = 0;
  function renderLightbox(i){
    var p = PROJECTS[i];
    lbTile.classList.remove('img-missing');
    lbImage.setAttribute('src', p.image);
    lbImage.setAttribute('alt', p.title);
    lbTag.textContent = p.category + (p.location ? ' · ' + p.location : '');
    lbTitle.textContent = p.title;
  }
  function openLightbox(i){
    currentIndex = i; renderLightbox(i);
    lightbox.classList.add('open'); document.body.style.overflow='hidden';
  }
  function closeLightbox(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
  document.getElementById('lbClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function(e){ if(e.target === lightbox) closeLightbox(); });
  document.getElementById('lbPrev').addEventListener('click', function(){ currentIndex=(currentIndex-1+PROJECTS.length)%PROJECTS.length; renderLightbox(currentIndex); });
  document.getElementById('lbNext').addEventListener('click', function(){ currentIndex=(currentIndex+1)%PROJECTS.length; renderLightbox(currentIndex); });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){ closeLightbox(); closeServiceModal(); }
    if(lightbox.classList.contains('open')){
      if(e.key === 'ArrowRight') document.getElementById('lbNext').click();
      if(e.key === 'ArrowLeft') document.getElementById('lbPrev').click();
    }
  });

  /* ---------- Service modal ---------- */
  var serviceModal = document.getElementById('serviceModal');
  var modalIcon = document.getElementById('modalIcon');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var modalWa = document.getElementById('modalWa');
  function openServiceModal(i){
    var s = SERVICES[i];
    modalIcon.setAttribute('href','#'+s.icon);
    modalTitle.textContent = s.title;
    modalDesc.textContent = s.desc;
    modalWa.href = 'https://wa.me/919755054649?text=' + encodeURIComponent('Hi Darshika Glass Studio, I want to ask about: ' + s.title);
    serviceModal.classList.add('open'); document.body.style.overflow='hidden';
  }
  function closeServiceModal(){ serviceModal.classList.remove('open'); document.body.style.overflow=''; }
  document.getElementById('modalClose').addEventListener('click', closeServiceModal);
  serviceModal.addEventListener('click', function(e){ if(e.target === serviceModal) closeServiceModal(); });

  /* ---------- Quote form -> WhatsApp ---------- */
  var quoteForm = document.getElementById('quoteForm');
  quoteForm.addEventListener('submit', function(e){
    e.preventDefault();
    var name = document.getElementById('qName').value.trim();
    var phone = document.getElementById('qPhone').value.trim();
    var service = document.getElementById('qService').value;
    var msg = document.getElementById('qMsg').value.trim();
    var text = 'Hi Darshika Glass Studio, I would like a free quote.%0A' +
      'Name: ' + encodeURIComponent(name) + '%0A' +
      'Phone: ' + encodeURIComponent(phone) + '%0A' +
      'Service: ' + encodeURIComponent(service) +
      (msg ? ('%0AMessage: ' + encodeURIComponent(msg)) : '');
    document.getElementById('formFields').style.display = 'none';
    document.getElementById('formSuccess').classList.add('show');
    window.open('https://wa.me/919755054649?text=' + text, '_blank', 'noopener');
  });

  /* ---------- Lazy-load process section background (CSS backgrounds ignore loading="lazy") ---------- */
  var bgEl = document.querySelector('[data-bg]');
  if(bgEl){
    if('IntersectionObserver' in window){
      var bgIO = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.backgroundImage = "url('" + entry.target.dataset.bg + "')";
            bgIO.unobserve(entry.target);
          }
        });
      }, {rootMargin:'600px 0px'});
      bgIO.observe(bgEl);
    } else {
      bgEl.style.backgroundImage = "url('" + bgEl.dataset.bg + "')";
    }
  }

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
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
    {type:'video', src:'assets/work/clip-2-web.mp4', poster:'assets/work/clip-2-poster.webp', tag:'Aluminium + glass', title:'Custom Designed Glasses'},
    {type:'video', src:'assets/work/clip-3-web.mp4', poster:'assets/work/clip-3-poster.webp', tag:'Interior', title:'Complete Interior'},
    {type:'video', src:'assets/work/clip-4-web.mp4', poster:'assets/work/clip-4-poster.webp', tag:'Digital Mirror', title:'LED Touch Mirror'},
    {type:'video', src:'assets/work/clip-5-web.mp4', poster:'assets/work/clip-5-poster.webp', tag:'Glass', title:'Foldable Glass Door'},
    {type:'video', src:'assets/work/clip-6-web.mp4', poster:'assets/work/clip-6-poster.webp', tag:'Fountain', title:'Wave Fountain'}
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
    {image:'assets/projects/office-cabin-interior.webp', title:'Office Cabin Layout', category:'Ceiling', location:'Sidhi'},
    {image:'assets/projects/pvc-false-ceiling-hall.webp', title:'PVC False Ceiling', category:'Ceiling', location:''},
    {image:'assets/projects/shower-cubicle-glass.webp', title:'Shower Cubicle', category:'Glass', location:''},
    {image:'assets/projects/modular-wardrobe-interior.webp', title:'Modular Wardrobe', category:'Interior', location:'Majhauli'},
    {image:'assets/projects/aluminium-balcony-window.webp', title:'Balcony Window', category:'Aluminium', location:''},
    {image:'assets/projects/salon-digital-mirror.webp', title:'Salon Digital Mirror', category:'Mirrors', location:'Sidhi'},
    {image:'assets/projects/accent-wallpaper-bedroom.webp', title:'Accent Wallpaper', category:'Interior', location:''},
    {image:'assets/projects/gypsum-led-cove-ceiling.webp', title:'Gypsum + LED Cove', category:'Ceiling', location:'Sidhi'},
    {image:'assets/projects/staircase-glass-railing.webp', title:'Staircase Railing', category:'Glass', location:''},
    {image:'assets/projects/Luxury-Bedroom.webp', title:'Luxury Bedroom', category:'Interior', location:'sidhi'},
    {image:'assets/projects/aluminium-railing.webp', title:'Aluminium Railing', category:'Aluminium', location:'sidhi'},
    {image:'assets/projects/mirror.webp', title:'Designing Mirror', category:'Mirrors', location:''}
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
  var workTrackInner = document.getElementById('workTrackInner');
  WORK.forEach(function(w){
    var item = el('div','work-item');
    if(w.type === 'video'){
      item.innerHTML =
        '<div class="work-media">'+
          '<img src="'+w.poster+'" alt="" loading="lazy">'+
          '<video muted loop playsinline preload="none" poster="'+w.poster+'"><source data-src="'+w.src+'" type="video/mp4"></video>'+
          (w.tag ? '<span class="work-tag">'+w.tag+'</span>' : '')+
          '<span class="clip-badge"><svg class="icon icon-play" aria-hidden="true"><use href="#i-play"/></svg><svg class="icon icon-pause" aria-hidden="true"><use href="#i-pause"/></svg><span class="clip-spinner" aria-hidden="true"></span></span>'+
        '</div>'+
        '<p class="work-caption">'+w.title+'</p>';
      /* Keyboard users need a way to reach and trigger this the same as a
         click (play/pause) — a plain div has no default focus or key
         behaviour, so both are added explicitly. */
      item.setAttribute('tabindex','0');
      item.setAttribute('role','button');
      item.setAttribute('aria-label','Play video: '+w.title);
    } else {
      item.innerHTML =
        '<div class="work-media">'+
          '<img src="'+w.src+'" alt="'+w.title+'" loading="lazy">'+
          (w.tag ? '<span class="work-tag">'+w.tag+'</span>' : '')+
        '</div>'+
        '<p class="work-caption">'+w.title+'</p>';
    }
    workTrackInner.appendChild(item);
  });

  /* Click-to-play: the video file only downloads once the user actually
     asks for it. (Old code auto-loaded+played every video that scrolled
     into view — on tablet/desktop .work-track becomes a visible 4-col
     grid with overflow:visible, not a clipped scroll strip, so most/all
     6 videos counted as "in view" on page load and all downloaded at once.
     That was the 6-video simultaneous-load problem.) */
  /* Stopping a clip (manually, by switching to another one, or by scrolling
     out of view) resets it back to the poster frame rather than freezing on
     whatever frame it happened to stop at — keeps the grid looking like a
     curated set of thumbnails rather than a trail of random paused frames. */
  function stopWorkClip(item){
    var v = item.querySelector('video');
    if(!v) return;
    v.pause();
    try{ v.currentTime = 0; }catch(err){}
    v.classList.remove('is-active');
    item.classList.remove('is-playing');
    item.classList.remove('is-loading');
  }

  /* Actually starting the network fetch for a clip — shared by both the
     tap-to-play path and the background preload queue below, so there's
     one place that decides "has this already started loading?" instead of
     two copies of the same check drifting apart. */
  function beginWorkClipLoad(item){
    var v = item.querySelector('video');
    if(!v) return null;
    var src = v.querySelector('source');
    if(!src || !src.dataset.src || v.currentSrc) return v; // already started/loaded
    v.preload = 'auto';
    src.src = src.dataset.src;
    v.load();
    return v;
  }

  document.querySelectorAll('.work-item').forEach(function(item){
    var v = item.querySelector('video');
    if(!v) return;
    /* Buffering feedback: 'waiting' fires whenever the video engine wants to
       play but doesn't have enough data yet (the initial tap-to-play fetch
       on a slow connection, or a mid-clip stall) — 'playing' fires the
       moment real playback actually starts/resumes. Driving the spinner off
       these two events (rather than off the click handler alone) means it
       stays correct even if the connection stalls again after the clip was
       already running. */
    v.addEventListener('waiting', function(){ item.classList.add('is-loading'); });
    v.addEventListener('playing', function(){ item.classList.remove('is-loading'); });
    function toggleWorkClip(){
      /* Toggle: if this clip is already playing, activating it again stops it. */
      if(!v.paused && !v.ended){
        stopWorkClip(item);
        return;
      }
      /* Show the spinner the instant the tap happens rather than waiting for
         'waiting' to fire — on a slow connection there can be a beat before
         the browser reports it's stalled, and that gap is exactly the "did
         my tap register?" moment we want to cover. */
      item.classList.add('is-loading');
      /* If this card was already quietly preloading in the background (see
         queueWorkPreload below), beginWorkClipLoad() is a no-op here and
         play() can start immediately off whatever's already buffered —
         that's the whole point. If it wasn't preloaded yet (fast tap
         before its turn in the queue came up), this is the same
         load-then-play fallback as before. */
      beginWorkClipLoad(item);
      document.querySelectorAll('.work-item.is-playing').forEach(function(otherItem){
        if(otherItem !== item) stopWorkClip(otherItem);
      });
      v.play().then(function(){ v.classList.add('is-active'); item.classList.add('is-playing'); }).catch(function(){ item.classList.remove('is-loading'); });
    }
    item.addEventListener('click', function(){
      /* A click that was actually a mouse-drag (see enableWorkDrag below)
         shouldn't also toggle play/pause. */
      if(workDragSuppressClick){ workDragSuppressClick = false; return; }
      toggleWorkClip();
    });
    /* Keyboard equivalent of the click above — Enter and Space are the
       standard activation keys for a role="button" element. Space also
       scrolls the page by default, so that has to be prevented. */
    item.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
        e.preventDefault();
        toggleWorkClip();
      }
    });
  });

  /* ---------- Background preload for clips about to be reachable ----------
     The hero (Stage 1) already loads with top priority. This queue is
     Stage 2 for the "Our Work" strip specifically: as a card scrolls near
     the visible area of the strip, its clip quietly starts downloading in
     the background — one clip at a time, never several at once — so that
     by the time someone actually taps it, playback starts instantly
     instead of stalling to buffer on a slow connection.

     Two safety limits keep this from working against the person it's
     meant to help:
       1. Data Saver / a detected slow connection (2G or slower) skips this
          entirely — those users get the plain tap-to-load behaviour from
          before, since guessing wrong and burning their data in the
          background would be worse than a single deliberate tap-triggered
          load.
       2. Only ONE clip downloads at a time (a small queue below), so
          background loading of upcoming cards never competes with, or
          delays, whatever's currently loading or playing. */
  function workConnectionAllowsPreload(){
    var conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    if(!conn) return true; // API not supported — assume a normal connection
    if(conn.saveData) return false;
    if(conn.effectiveType && /2g/.test(conn.effectiveType)) return false;
    return true;
  }

  var workPreloadQueue = [];
  var workPreloadBusy = false;

  function processWorkPreloadQueue(){
    if(workPreloadBusy) return;
    var item = workPreloadQueue.shift();
    if(!item) return;
    var v = beginWorkClipLoad(item);
    if(!v){ processWorkPreloadQueue(); return; }
    workPreloadBusy = true;
    var settled = false;
    function next(){
      if(settled) return;
      settled = true;
      v.removeEventListener('canplay', next);
      v.removeEventListener('error', next);
      workPreloadBusy = false;
      processWorkPreloadQueue();
    }
    v.addEventListener('canplay', next, {once:true});
    v.addEventListener('error', next, {once:true});
    // Safety valve: move on even if neither event ever fires, so one stuck
    // clip can't permanently block the rest of the queue.
    setTimeout(next, 8000);
  }

  function queueWorkPreload(item){
    var v = item.querySelector('video');
    if(!v || v.currentSrc || item.dataset.preloadQueued) return;
    item.dataset.preloadQueued = '1';
    workPreloadQueue.push(item);
    processWorkPreloadQueue();
  }

  /* Runs after the page's own load event (Stage 1 is already done by then)
     plus a short delay, so this never competes with anything still
     finishing up above the fold. */
  window.addEventListener('load', function(){
    if(!('IntersectionObserver' in window) || !workConnectionAllowsPreload()) return;
    setTimeout(function(){
      var workPreloadIO = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(!entry.isIntersecting) return;
          var item = entry.target.closest('.work-item');
          if(item) queueWorkPreload(item);
        });
      }, { root: workTrack, rootMargin: '0px 320px 0px 320px', threshold: 0.01 });
      document.querySelectorAll('.work-item video').forEach(function(v){ workPreloadIO.observe(v); });
    }, 800);
  });

  /* Prev/Next arrows + mouse drag, for EVERY screen size.

     .work-track is a plain native horizontal scroller (overflow-x:auto with
     scroll-snap) at every breakpoint now — there's no separate "desktop
     mode" any more. That used to be a fixed-width, overflow:hidden viewport
     moved with a JS transform, which only responded to the arrow buttons,
     and the buttons themselves were hidden below 1024px — so on any smaller
     or resized view there was no way to move the strip at all except touch.

     Now: arrows call scrollBy() one card at a time, touch keeps using native
     momentum scrolling untouched, and enableWorkDrag() below adds
     click-and-drag with a mouse (which browsers don't support natively on a
     scroll container the way touch is). */
  var workPrevBtn = document.getElementById('workPrev');
  var workNextBtn = document.getElementById('workNext');
  var workDragSuppressClick = false;

  function workCardStep(){
    var item = workTrackInner.querySelector('.work-item');
    if(!item) return workTrack.clientWidth;
    var gapStyle = getComputedStyle(workTrackInner);
    var gap = parseFloat(gapStyle.columnGap || gapStyle.gap) || 0;
    return item.getBoundingClientRect().width + gap;
  }

  function updateWorkArrows(){
    if(!workPrevBtn || !workNextBtn) return;
    var maxScroll = workTrack.scrollWidth - workTrack.clientWidth - 1;
    workPrevBtn.disabled = workTrack.scrollLeft <= 1;
    workNextBtn.disabled = maxScroll <= 1 || workTrack.scrollLeft >= maxScroll;
  }

  function goWork(dir){
    workTrack.scrollBy({ left: dir * workCardStep(), behavior: 'smooth' });
  }

  if(workTrack && workTrackInner && workPrevBtn && workNextBtn){
    workPrevBtn.addEventListener('click', function(){ goWork(-1); });
    workNextBtn.addEventListener('click', function(){ goWork(1); });

    var workScrollTicking = false;
    workTrack.addEventListener('scroll', function(){
      if(workScrollTicking) return;
      workScrollTicking = true;
      requestAnimationFrame(function(){ updateWorkArrows(); workScrollTicking = false; });
    }, {passive:true});

    var workResizeTimer = null;
    window.addEventListener('resize', function(){
      clearTimeout(workResizeTimer);
      workResizeTimer = setTimeout(updateWorkArrows, 120);
    });

    updateWorkArrows();
    window.addEventListener('load', updateWorkArrows);
  }

  /* Click-and-drag scrolling with a mouse. Touch (pointerType 'touch') is
     skipped entirely so native swipe/momentum scrolling keeps working
     exactly as it did before — this only adds the mouse case that was
     missing.

     Deliberately NOT using setPointerCapture here: capturing the pointer
     on `track` re-targets the resulting click event to `track` itself
     instead of the card under the cursor, which is what broke the
     play/pause click on video cards. Tracking move/up on `document`
     instead gets the same "drag works even if the mouse leaves the
     strip" behaviour without hijacking the click target. */
  (function enableWorkDrag(track){
    if(!track) return;
    var dragging = false, startX = 0, startScroll = 0, moved = false;

    function onMove(e){
      if(!dragging) return;
      var dx = e.clientX - startX;
      if(Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startScroll - dx;
    }
    function endDrag(){
      if(!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerup', endDrag);
      document.removeEventListener('pointercancel', endDrag);
      if(moved) workDragSuppressClick = true;
    }
    track.addEventListener('pointerdown', function(e){
      if(e.pointerType === 'touch') return;
      dragging = true; moved = false;
      startX = e.clientX; startScroll = track.scrollLeft;
      track.classList.add('is-dragging');
      document.addEventListener('pointermove', onMove);
      document.addEventListener('pointerup', endDrag);
      document.addEventListener('pointercancel', endDrag);
    });
  })(workTrack);

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

  /* Reset a playing clip back to its poster once it scrolls out of view
     (battery/data, and consistent with stopWorkClip's reset-to-poster
     behaviour above). */
  if('IntersectionObserver' in window){
    var workVideoIO = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(!entry.isIntersecting){
          var parentItem = entry.target.closest('.work-item');
          if(parentItem) stopWorkClip(parentItem);
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
    /* Focusable + keyboard-operable so the lightbox can be opened without a
       mouse or touch — a bare div click handler alone skips keyboard users. */
    item.setAttribute('tabindex','0');
    item.setAttribute('role','button');
    item.setAttribute('aria-label','Open photo: '+project.title);
    item.addEventListener('click', function(){ openLightbox(index); });
    item.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar'){
        e.preventDefault();
        openLightbox(index);
      }
    });
    return item;
  }
  var galleryGrid = document.getElementById('galleryGrid');
  PROJECTS.forEach(function(p, i){ galleryGrid.appendChild(renderProjectCard(p, i)); });

  /* ---------- Build FAQ ---------- */
  var faqWrap = document.getElementById('faqWrap');
  FAQS.forEach(function(f){
    var item = el('div','faq-item');
    item.innerHTML =
      '<button type="button" class="faq-q"><span>'+f.q+'</span><span class="faq-toggle" aria-hidden="true"><span class="bar bar-h"></span><span class="bar bar-v"></span></span></button>'+
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
  var mmCloseBtn = document.getElementById('mmCloseBtn');
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
  if(mmCloseBtn) mmCloseBtn.addEventListener('click', closeMenu);
  mobileMenu.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', closeMenu); });
  /* Tapping the dimmed backdrop (anywhere outside the sliding panel
     itself) closes the menu too — standard drawer behaviour. Checking
     e.target === mobileMenu (not e.currentTarget) means a tap that lands
     inside .mm-panel doesn't bubble up and accidentally close it. */
  mobileMenu.addEventListener('click', function(e){
    if(e.target === mobileMenu) closeMenu();
  });


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
  // Default filter depends on screen size: wider/landscape screens (tablet
  // and up) start on "All", narrow mobile-portrait screens start on
  // "Interior" — per client request.
  var galleryDefaultFilter = window.matchMedia('(min-width:768px)').matches ? 'all' : 'interior';
  document.querySelectorAll('.filter-btn').forEach(function(b){
    b.classList.toggle('active', b.getAttribute('data-filter') === galleryDefaultFilter);
  });
  applyGalleryFilter(galleryDefaultFilter);

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
    if(e.key === 'Escape'){ closeLightbox(); closeServiceModal(); closeMenu(); }
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
    var consentBox = document.getElementById('qConsent');
    if(consentBox && !consentBox.checked){
      consentBox.focus();
      return;
    }
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

  /* ---------- Lazy-load parallax section backgrounds (CSS backgrounds ignore loading="lazy") ---------- */
  var bgEls = document.querySelectorAll('[data-bg]');
  if(bgEls.length){
    if('IntersectionObserver' in window){
      var bgIO = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            entry.target.style.backgroundImage = "url('" + entry.target.dataset.bg + "')";
            bgIO.unobserve(entry.target);
          }
        });
      }, {rootMargin:'600px 0px'});
      bgEls.forEach(function(el){ bgIO.observe(el); });
    } else {
      bgEls.forEach(function(el){ el.style.backgroundImage = "url('" + el.dataset.bg + "')"; });
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
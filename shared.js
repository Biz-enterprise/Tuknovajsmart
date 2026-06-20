/* ═══════════════════════════════════════════════
   TUKNOVA ENTERPRISE — SHARED JS
   Skeleton dancer + scroll WA + nav + reveal
════════════════════════════════════════════════ */

/* ── NAV SCROLL ── */
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('tNav');
  if(nav) nav.classList.toggle('scrolled',window.scrollY>60);
});

/* ── UNIVERSAL SCROLL PROGRESS BAR ── */
(function(){
  let bar=document.getElementById('scrollBar');
  if(!bar){
    bar=document.createElement('div');
    bar.id='scrollBar';
    document.body.insertBefore(bar,document.body.firstChild);
  }
  function updateBar(){
    const h=document.documentElement;
    const pct=(window.scrollY/(h.scrollHeight-h.clientHeight))*100;
    bar.style.width=(isNaN(pct)?0:pct)+'%';
  }
  window.addEventListener('scroll',updateBar);
  updateBar();
})();

/* ── MOBILE MENU (only if page doesn't define its own) ── */
if(typeof openMenu==='undefined' || !window.openMenu){
  window.openMenu=function(){const m=document.getElementById('mobMenu');if(m)m.classList.add('open');}
}
if(typeof closeMenu==='undefined' || !window.closeMenu){
  window.closeMenu=function(){const m=document.getElementById('mobMenu');if(m)m.classList.remove('open');}
}
document.querySelectorAll('#mobMenu a').forEach(a=>a.addEventListener('click',()=>{
  const m=document.getElementById('mobMenu');if(m)m.classList.remove('open');
}));

/* ── SCROLL REVEAL ── */
const revObserver=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObserver.observe(el));

/* ══════════════════════════════════════════════
   SKELETON DANCER + SCROLL WHATSAPP BUTTON
══════════════════════════════════════════════ */
(function(){
  // States: idle, bob, shock, dance, celebrate
  let state='idle', lastScroll=0, scrollDelta=0, danceTimer=null, shockTimer=null;
  let scrollAccum=0, floatMsgs=['Need a quote? 😄','I can help! ⚡','Tap me! 🙌','Let\'s chat! 💬','Click me! 🔥'];
  let msgIndex=0;

  // ── BUILD THE WIDGET ──
  const wrap=document.createElement('div');
  wrap.id='wa-skeleton-wrap';
  wrap.innerHTML=`
    <div class="skeleton-bubble" id="skeleBubble">Tap me for a quote!</div>
    <div class="skele-container" id="skeleContainer">
      <svg id="skeleSvg" class="skele-svg" viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- HEAD -->
        <circle cx="24" cy="8" r="6" stroke="#f5a623" stroke-width="2" fill="rgba(245,166,35,.1)"/>
        <!-- EYES -->
        <ellipse id="eyeL" cx="21.5" cy="7.5" rx="1.2" ry="1.5" fill="#f5a623"/>
        <ellipse id="eyeR" cx="26.5" cy="7.5" rx="1.2" ry="1.5" fill="#f5a623"/>
        <!-- MOUTH -->
        <path id="skeleMouth" d="M21 10.5 Q24 12.5 27 10.5" stroke="#f5a623" stroke-width="1.5" fill="none" stroke-linecap="round"/>
        <!-- NECK -->
        <line x1="24" y1="14" x2="24" y2="18" stroke="#f5a623" stroke-width="2"/>
        <!-- BODY -->
        <rect x="17" y="18" width="14" height="16" rx="3" stroke="#f5a623" stroke-width="2" fill="rgba(245,166,35,.07)"/>
        <!-- LEFT ARM -->
        <g id="armL"><line x1="17" y1="20" x2="10" y2="28" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/>
        <line x1="10" y1="28" x2="7" y2="35" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/></g>
        <!-- RIGHT ARM -->
        <g id="armR"><line x1="31" y1="20" x2="38" y2="28" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/>
        <line x1="38" y1="28" x2="41" y2="35" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/></g>
        <!-- SPINE -->
        <line x1="24" y1="34" x2="24" y2="42" stroke="#f5a623" stroke-width="2"/>
        <!-- LEFT LEG -->
        <g id="legL"><line x1="24" y1="42" x2="18" y2="52" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/>
        <line x1="18" y1="52" x2="15" y2="62" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/></g>
        <!-- RIGHT LEG -->
        <g id="legR"><line x1="24" y1="42" x2="30" y2="52" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/>
        <line x1="30" y1="52" x2="33" y2="62" stroke="#f5a623" stroke-width="2" stroke-linecap="round"/></g>
        <!-- SHOCK BOLTS (hidden by default) -->
        <g id="shockBolts" opacity="0">
          <path d="M5 20 L9 26 L6 26 L11 33" stroke="#00d4ff" stroke-width="2" fill="none" stroke-linecap="round"/>
          <path d="M43 20 L39 26 L42 26 L37 33" stroke="#00d4ff" stroke-width="2" fill="none" stroke-linecap="round"/>
        </g>
        <!-- STARS (hidden) -->
        <g id="shockStars" opacity="0">
          <text x="2" y="16" font-size="8" fill="#00d4ff">✦</text>
          <text x="38" y="16" font-size="8" fill="#f5a623">✦</text>
          <text x="20" y="4" font-size="6" fill="#fff">⭐</text>
        </g>
      </svg>
    </div>
    <a class="wa-main-btn" id="waBtnMain" href="https://wa.me/2349064859498?text=Hello%20Tuknova%2C%20I%20found%20your%20website%20and%20I%20need%20a%20quote!" target="_blank" aria-label="Chat on WhatsApp">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
    </a>`;
  document.body.appendChild(wrap);

  const svg=document.getElementById('skeleSvg');
  const bolts=document.getElementById('shockBolts');
  const stars=document.getElementById('shockStars');
  const mouth=document.getElementById('skeleMouth');
  const eyeL=document.getElementById('eyeL');
  const eyeR=document.getElementById('eyeR');
  const armL=document.getElementById('armL');
  const armR=document.getElementById('armR');
  const legL=document.getElementById('legL');
  const legR=document.getElementById('legR');
  const bubble=document.getElementById('skeleBubble');
  const waBtn=document.getElementById('waBtnMain');

  // ── POSE FUNCTIONS ──
  function setIdle(){
    svg.style.animation='wa-bob 2.5s ease-in-out infinite';
    armL.style.transform='';armR.style.transform='';
    legL.style.transform='';legR.style.transform='';
    bolts.style.opacity='0';stars.style.opacity='0';
    mouth.setAttribute('d','M21 10.5 Q24 12.5 27 10.5');
    eyeL.setAttribute('ry','1.5');eyeR.setAttribute('ry','1.5');
  }

  function setShocked(){
    svg.style.animation='skele-shock .6s ease';
    bolts.style.opacity='1';stars.style.opacity='1';
    mouth.setAttribute('d','M21 11 Q24 9 27 11'); // O face
    eyeL.setAttribute('ry','2.5');eyeR.setAttribute('ry','2.5');
    armL.style.transform='rotate(-40deg) translateY(-6px)';
    armL.style.transformOrigin='17px 20px';
    armR.style.transform='rotate(40deg) translateY(-6px)';
    armR.style.transformOrigin='31px 20px';
    spawnFloatText('⚡ ZAP!','#00d4ff');
    setTimeout(()=>{bolts.style.opacity='0';stars.style.opacity='0';},600);
  }

  function setDance(){
    svg.style.animation='skele-dance .5s ease-in-out infinite';
    mouth.setAttribute('d','M20 10 Q24 13.5 28 10');
    eyeL.setAttribute('ry','1.5');eyeR.setAttribute('ry','1.5');
    bolts.style.opacity='0';
    // Alternate arms
    let t=0;
    const danceInterval=setInterval(()=>{
      if(state!=='dance'){clearInterval(danceInterval);return;}
      const up=(t%2===0);
      armL.style.transform=up?'rotate(-60deg)':'rotate(10deg)';
      armL.style.transformOrigin='17px 20px';
      armR.style.transform=up?'rotate(60deg)':'rotate(-10deg)';
      armR.style.transformOrigin='31px 20px';
      legL.style.transform=up?'rotate(15deg)':'rotate(-10deg)';
      legL.style.transformOrigin='24px 42px';
      legR.style.transform=up?'rotate(-15deg)':'rotate(10deg)';
      legR.style.transformOrigin='24px 42px';
      t++;
    },250);
  }

  function setCelebrate(){
    spawnFloatText('🎉 Let\'s go!','#f5a623');
    spawnFloatText('⚡ Power up!','#00d4ff');
    mouth.setAttribute('d','M20 10 Q24 14 28 10');
  }

  // ── FLOAT TEXT ──
  function spawnFloatText(text,color){
    const el=document.createElement('div');
    el.textContent=text;
    Object.assign(el.style,{
      position:'fixed',bottom:'160px',right:'20px',color:color,
      fontFamily:'var(--font-d)',fontSize:'.8rem',fontWeight:'800',
      pointerEvents:'none',zIndex:'10000',whiteSpace:'nowrap',
      animation:'float-up 1.2s ease forwards',textShadow:'0 0 8px currentColor'
    });
    document.body.appendChild(el);
    setTimeout(()=>el.remove(),1200);
  }

  // ── SCROLL TRACKING ──
  let lastScrollY=window.scrollY, scrollVelocity=0, scrollTimer=null;
  window.addEventListener('scroll',()=>{
    const now=window.scrollY;
    const delta=Math.abs(now-lastScrollY);
    scrollVelocity=delta;
    lastScrollY=now;

    // Show bubble with scroll tip
    const pct=Math.round((now/(document.body.scrollHeight-window.innerHeight))*100);
    if(pct<20) showBubble('👋 Hi! Need a solar quote?');
    else if(pct<40) showBubble('⚡ Check out our services!');
    else if(pct<60) showBubble('🔋 Get a battery quote now!');
    else if(pct<80) showBubble('📷 Need CCTV cameras too?');
    else showBubble('🎉 Ready? Let\'s chat on WhatsApp!');

    clearTimeout(scrollTimer);

    if(delta>40){
      // Fast scroll = shock!
      if(state!=='shock'){
        state='shock';setShocked();
        clearTimeout(shockTimer);
        shockTimer=setTimeout(()=>{state='dance';setDance();
          clearTimeout(danceTimer);
          danceTimer=setTimeout(()=>{state='idle';setIdle();},2000);
        },700);
      }
    } else if(delta>10 && state==='idle'){
      state='dance';setDance();
      clearTimeout(danceTimer);
      danceTimer=setTimeout(()=>{if(state==='dance'){state='idle';setIdle();}},1500);
    }

    scrollTimer=setTimeout(()=>{
      if(state!=='idle'){state='idle';setIdle();}
    },2000);
  });

  // ── HOVER EFFECT ──
  wrap.addEventListener('mouseenter',()=>{
    if(state==='idle'){state='dance';setDance();}
    showBubble('💬 Tap to WhatsApp us!');
  });
  wrap.addEventListener('mouseleave',()=>{
    setTimeout(()=>{if(state==='dance'){state='idle';setIdle();}},1000);
  });

  // ── WA CLICK ──
  waBtn.addEventListener('click',()=>{
    setCelebrate();
    state='dance';setDance();
    setTimeout(()=>{state='idle';setIdle();},2000);
  });

  // ── BUBBLE ──
  let bubbleTimer=null;
  function showBubble(msg){
    bubble.textContent=msg;
    bubble.style.opacity='1';
    bubble.style.transform='translateY(0)';
    clearTimeout(bubbleTimer);
    bubbleTimer=setTimeout(()=>{
      bubble.style.opacity='0';
      bubble.style.transform='translateY(5px)';
    },2500);
  }

  // ── IDLE RANDOM JOLT ──
  setInterval(()=>{
    if(state==='idle' && Math.random()<.15){
      state='shock';setShocked();
      setTimeout(()=>{state='idle';setIdle();},700);
    }
  },5000);

  // Auto show bubble on load
  setTimeout(()=>showBubble('👋 Hi! Tap me for a quote!'),2000);
  setIdle();
})();

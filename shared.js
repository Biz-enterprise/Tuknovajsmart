/* ============================================================
   TUKNOVA ENTERPRISE — SHARED BEHAVIOUR
   Included on every page. Page-specific scripts live inline
   at the bottom of each HTML file.
   ============================================================ */

const WA_NUMBER = '2349064859498';

/* Each page can set <body data-wa-msg="..."> for the default
   WhatsApp message. Falls back to a generic greeting. */
function waLink(msg){
  const text = encodeURIComponent(msg || document.body.dataset.waMsg || "Hi Tuknova! I'd like a quote.");
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}

/* ---------- MOBILE MENU (ESC + outside click) ---------- */
document.addEventListener('keydown', e=>{
  if(e.key==='Escape'){const m=document.getElementById('mMenu');if(m)m.classList.remove('open');}
});

/* ---------- SCROLL REVEAL ---------- */
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(en=>{
    if(en.isIntersecting){en.target.classList.add('in-view');revealObserver.unobserve(en.target);}
  });
},{threshold:0.12,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));

/* ============================================================
   WHATSAPP FLOAT BUTTON — inject markup + wire behaviour
   ============================================================ */
(function initWaFloat(){
  const wrap=document.createElement('div');
  wrap.id='wa-float';
  wrap.innerHTML=`
    <div id="wa-bubble"></div>
    <a id="wa-btn" href="${waLink()}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp">
      <div class="wa-ring"><svg viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="29"/><circle class="fg" cx="32" cy="32" r="29" stroke-dasharray="182" stroke-dashoffset="182"/></svg></div>
      <svg viewBox="0 0 32 32"><path d="M16 0C7.2 0 .1 7.1.1 15.9c0 2.8.7 5.5 2.1 7.9L0 32l8.4-2.2c2.3 1.3 4.9 1.9 7.6 1.9 8.8 0 15.9-7.1 15.9-15.9C31.9 7.1 24.8 0 16 0zm9.3 22.7c-.4 1.1-2.2 2.1-3 2.2-.8.1-1.7.4-5.8-1.2-4.9-1.9-8-6.9-8.3-7.2-.2-.3-2-2.6-2-5 0-2.4 1.3-3.5 1.7-4 .4-.4 1-.6 1.3-.6h.9c.3 0 .7 0 1 .8.4.9 1.3 3.2 1.4 3.4.1.2.2.5 0 .8-.1.3-.2.5-.4.7l-.7.8c-.2.2-.5.5-.2 1 .3.5 1.4 2.3 3 3.7 2 1.8 3.7 2.4 4.2 2.6.5.2.8.2 1.1-.1.3-.3 1.2-1.4 1.6-1.9.4-.5.7-.4 1.2-.2.5.2 3.1 1.5 3.7 1.7.6.3 1 .4 1.1.7.1.2.1 1.2-.3 2.3z"/></svg>
      <div id="wa-badge">1</div>
    </a>`;
  document.body.appendChild(wrap);

  const fg=wrap.querySelector('.wa-ring .fg');
  const bubble=document.getElementById('wa-bubble');
  const badge=document.getElementById('wa-badge');
  const CIRC=182;

  const msgs = window.WA_CONTEXT_MSGS || [
    "Need a quote? Tap to chat 👋",
    "We reply in minutes ⚡",
    "Free advice, no pressure 🙂",
    "Tap to ask us anything"
  ];
  let msgIdx=0, bubbleTimer=null, hideTimer=null, badgeShown=false;

  function showBubble(){
    bubble.textContent=msgs[msgIdx % msgs.length];
    msgIdx++;
    bubble.classList.add('show');
    clearTimeout(hideTimer);
    hideTimer=setTimeout(()=>bubble.classList.remove('show'),3600);
  }

  function updateProgress(){
    const h=document.documentElement;
    const scrolled=h.scrollTop;
    const max=h.scrollHeight-h.clientHeight;
    const pct=max>0?Math.min(1,scrolled/max):0;
    fg.style.strokeDashoffset=String(CIRC-CIRC*pct);

    if(pct>0.25 && !badgeShown){
      badgeShown=true;
      badge.classList.add('show');
    }
    if(pct>0.5 && !bubble.classList.contains('show') && !window.__waBubbleAuto){
      window.__waBubbleAuto=true;
      showBubble();
    }
  }

  let waTicking=false;
  window.addEventListener('scroll',()=>{
    if(!waTicking){window.requestAnimationFrame(()=>{updateProgress();waTicking=false;});waTicking=true;}
  },{passive:true});
  updateProgress();

  wrap.addEventListener('mouseenter',()=>{ if(!bubble.classList.contains('show')) showBubble(); });
  document.getElementById('wa-btn').addEventListener('click',()=>{
    badge.classList.remove('show');
  });

  // gentle periodic nudge so the button "tracks" the user happily
  clearInterval(bubbleTimer);
  bubbleTimer=setInterval(()=>{ if(!bubble.classList.contains('show')) showBubble(); },14000);
})();

/* ============================================================
   SHOCKY THE SKELETON — scroll-triggered dancing mascot
   ============================================================ */
(function initShocky(){
  const wrap=document.createElement('div');
  wrap.id='shocky-wrap';
  wrap.innerHTML=`
    <div id="shocky-speech">Zzzzap!</div>
    <svg id="shocky" viewBox="0 0 74 90" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="37" cy="84" rx="16" ry="4" fill="rgba(0,0,0,0.35)"/>
      <g class="shocky-spark">
        <path d="M8 18 L16 26 L10 28 L20 38" stroke="#00d4ff" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M66 22 L58 30 L64 32 L54 42" stroke="#f5a623" stroke-width="2.4" fill="none" stroke-linecap="round"/>
        <path d="M37 2 L33 12 L39 13 L34 22" stroke="#00d4ff" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      </g>
      <!-- legs -->
      <line x1="30" y1="68" x2="25" y2="82" stroke="#e9e3d6" stroke-width="4" stroke-linecap="round"/>
      <line x1="44" y1="68" x2="49" y2="82" stroke="#e9e3d6" stroke-width="4" stroke-linecap="round"/>
      <!-- arms -->
      <line x1="24" y1="48" x2="10" y2="38" stroke="#e9e3d6" stroke-width="4" stroke-linecap="round"/>
      <line x1="50" y1="48" x2="64" y2="38" stroke="#e9e3d6" stroke-width="4" stroke-linecap="round"/>
      <!-- ribcage -->
      <rect x="26" y="44" width="22" height="22" rx="6" fill="#0d0b09" stroke="#e9e3d6" stroke-width="2.5"/>
      <line x1="29" y1="50" x2="45" y2="50" stroke="#e9e3d6" stroke-width="1.6"/>
      <line x1="29" y1="55" x2="45" y2="55" stroke="#e9e3d6" stroke-width="1.6"/>
      <line x1="29" y1="60" x2="45" y2="60" stroke="#e9e3d6" stroke-width="1.6"/>
      <!-- head -->
      <circle cx="37" cy="26" r="17" fill="#e9e3d6"/>
      <g class="shocky-eye-normal">
        <circle cx="30" cy="25" r="2.6" fill="#0a0908"/>
        <circle cx="44" cy="25" r="2.6" fill="#0a0908"/>
        <path d="M31 34 Q37 38 43 34" stroke="#0a0908" stroke-width="2" fill="none" stroke-linecap="round"/>
      </g>
      <g class="shocky-eye-shock">
        <path d="M27 22 L32 25 L28 26 L33 30" stroke="#00d4ff" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M47 22 L42 25 L46 26 L41 30" stroke="#00d4ff" stroke-width="2" fill="none" stroke-linecap="round"/>
        <ellipse cx="37" cy="34" rx="4" ry="3" fill="#0a0908"/>
      </g>
    </svg>`;
  document.body.appendChild(wrap);

  const speech=document.getElementById('shocky-speech');
  const lines=["Zzzzap!","Whoa, easy!","I felt that ⚡","Current mood: shocked","Keep scrolling!","Ouch-tastic!"];
  let armed=false, shockTimeout=null, idleTimeout=null;

  function arm(){
    if(armed) return;
    armed=true;
    wrap.classList.add('armed');
  }

  function zap(){
    arm();
    wrap.classList.add('shocked');
    speech.textContent=lines[Math.floor(Math.random()*lines.length)];
    clearTimeout(shockTimeout);
    shockTimeout=setTimeout(()=>wrap.classList.remove('shocked'),650);
    // after a while of no scrolling at all, let him rest off-screen-ish (stay docked though)
    clearTimeout(idleTimeout);
  }

  let shockyTicking=false;
  window.addEventListener('scroll',()=>{
    if(!shockyTicking){
      window.requestAnimationFrame(()=>{zap();shockyTicking=false;});
      shockyTicking=true;
    }
  },{passive:true});
})();

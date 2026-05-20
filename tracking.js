(function () {
  const STORAGE_KEY = "lashine_tracking_events";
  const MAX_EVENTS = 50;
  function deviceType(){const w=window.innerWidth; return w<768?'mobile':(w<1024?'tablet':'desktop');}
  function getUtm(){const p=new URLSearchParams(location.search); const o={};['utm_source','utm_medium','utm_campaign','utm_term','utm_content'].forEach(k=>o[k]=p.get(k)||''); return o;}
  function eventType(target){const href=target.getAttribute('href')||''; const t=target.dataset.trackType||''; if(t==='whatsapp'||href.includes('wa.me')) return 'whatsapp_click'; if(t==='phone'||href.startsWith('tel:')) return 'phone_click'; if(t==='instagram'||href.includes('instagram.com')) return 'instagram_click'; return target.dataset.trackEvent||'cta_click';}
  function payload(target){return {event:eventType(target),track_type:target.dataset.trackType||'cta',service_page:target.dataset.trackService||'general',language:target.dataset.trackLanguage||document.documentElement.lang||'en',referrer:document.referrer||'',timestamp:new Date().toISOString(),device_type:deviceType(),page_path:location.pathname,utm:getUtm(),href:target.getAttribute('href')||''};}
  function persist(ev){const arr=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]'); arr.unshift(ev); localStorage.setItem(STORAGE_KEY,JSON.stringify(arr.slice(0,MAX_EVENTS)));}
  async function postLater(ev){return fetch('/api/track-event.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(ev)});}
  document.addEventListener('click',e=>{const t=e.target.closest("a[data-track-event],a[data-track-type],a[href*='wa.me'],a[href^='tel:'],a[href*='instagram.com']"); if(!t) return; const ev=payload(t); console.log('Tracking event',ev); persist(ev); window.LaShineTrackingLastEvent=ev;});
  window.LaShineTracking={postLater};
})();

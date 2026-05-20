(function(){
  const map={
    '/laser-hair-removal-alanya':{tr:'/tr/lazer-epilasyon-alanya',ru:'/ru/lazernaya-epilyatsiya-alanya',no:'/no/laser-harfjerning-alanya'},
    '/nail-salon-mahmutlar':{tr:'/tr/tirnak-salonu-mahmutlar',ru:'/ru/manikyur-mahmutlar',no:'/no/neglsalong-mahmutlar'},
    '/permanent-makeup-alanya':{tr:'/tr/kalici-makyaj-alanya',ru:'/ru/permanentnyy-makiyazh-alanya',no:'/no/permanent-makeup-alanya'},
    '/skin-care-alanya':{tr:'/tr/cilt-bakimi-alanya',ru:'/ru/ukhod-za-kozhey-alanya',no:'/no/hudpleie-alanya'},
    '/g5-therapy-alanya':{tr:'/tr/g5-masaj-alanya',ru:'/ru/g5-massazh-alanya',no:'/no/g5-massasje-alanya'}
  };
  const lang=(document.documentElement.lang||'en').slice(0,2);
  const path=location.pathname.replace(/\.html$/,'');
  function urlFor(l){if(l==='en') return path||'/'; if(map[path]&&map[path][l]) return map[path][l]; return '/'+l+'/';}
  const box=document.createElement('div');
  box.style='position:fixed;right:14px;bottom:14px;background:#fff;padding:8px 10px;border:1px solid #eee;border-radius:10px;z-index:9999;font:13px Inter,sans-serif';
  box.innerHTML=['en','tr','ru','no'].map(l=>`<a href="${urlFor(l)}" style="margin:0 4px;${l===lang?'font-weight:700':''}">${l.toUpperCase()}</a>`).join('');
  document.body.appendChild(box);
})();

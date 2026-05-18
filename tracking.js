(function () {
  function buildEvent(target) {
    const service = target.dataset.trackService || "general";
    const language = target.dataset.trackLanguage || document.documentElement.lang || "en";
    return {
      event_type: target.dataset.trackEvent || "cta_click",
      cta_type: target.dataset.trackType || "unknown",
      service,
      page: target.dataset.trackPage || window.location.pathname.replace(/^\//, '') || 'home',
      language,
      referrer: document.referrer,
      timestamp: new Date().toISOString()
    };
  }

  document.addEventListener("click", function (event) {
    const tracked = event.target.closest("[data-track-event]");
    if (!tracked) return;
    const payload = buildEvent(tracked);
    console.log("[LaShine Tracking]", payload);
    // Future-ready endpoint hook:
    // fetch('/api/track-event.php', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)});
  });
})();

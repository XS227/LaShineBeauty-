(function () {
  const WHATSAPP_NUMBER = "905551859900";

  function getLanguage(target) {
    return (
      target.dataset.language ||
      target.dataset.trackLanguage ||
      document.documentElement.lang ||
      "en"
    ).toLowerCase();
  }

  function getCtaText(target) {
    const text = (target.innerText || target.textContent || target.getAttribute("aria-label") || "")
      .replace(/\s+/g, " ")
      .trim();
    return text || target.getAttribute("aria-label") || "CTA";
  }

  function getEventName(target) {
    if (target.dataset.track) return target.dataset.track;

    const href = target.getAttribute("href") || "";
    const type = target.dataset.trackType || "";

    if (type === "whatsapp" || href.includes("wa.me") || href.includes("whatsapp")) return "whatsapp_click";
    if (type === "phone" || href.startsWith("tel:")) return "phone_click";
    if (type === "instagram" || href.includes("instagram.com")) return "instagram_click";

    return target.dataset.trackEvent || "cta_click";
  }

  function buildParams(target) {
    return {
      page_path: window.location.pathname,
      page_title: document.title,
      language: getLanguage(target),
      service: target.dataset.service || target.dataset.trackService || "general",
      cta_text: getCtaText(target),
      cta_location: target.dataset.ctaLocation || target.dataset.trackLocation || "section"
    };
  }

  function trackEvent(eventName, params = {}) {
    try {
      if (typeof window.gtag === "function") {
        window.gtag("event", eventName, params);
      }
    } catch (error) {
      console.warn("GA tracking failed", error);
    }
  }

  function getWhatsAppMessage(target) {
    const language = getLanguage(target).split("-")[0];
    return (
      target.dataset[`whatsappMessage${language.charAt(0).toUpperCase()}${language.slice(1)}`] ||
      target.dataset.whatsappMessage ||
      "Hi La Shine Beauty, I found you on Google and would like to book an appointment."
    );
  }

  function updateWhatsAppHref(target) {
    const href = target.getAttribute("href") || "";
    if (!href.includes("wa.me") && !href.includes("whatsapp")) return;

    const message = getWhatsAppMessage(target);
    target.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  document.addEventListener("click", function (event) {
    const tracked = event.target.closest(
      "a[data-track], a[data-track-event], a[href^='tel:'], a[href*='wa.me'], a[href*='instagram.com']"
    );

    if (!tracked) return;

    updateWhatsAppHref(tracked);
    trackEvent(getEventName(tracked), buildParams(tracked));
  });

  window.LaShineTracking = {
    trackEvent,
    updateWhatsAppHref
  };
})();

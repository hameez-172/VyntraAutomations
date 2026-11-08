/* =====================================================================
   Traffic tracking. Loads on every page.
   1) Vercel Web Analytics: visitors, pages, countries, referrers.
      Turn it on once in Vercel -> Project -> Analytics -> Enable.
   2) Google Analytics 4 (optional): paste your Measurement ID in config.js
      (ga4Id: "G-XXXXXXXXXX") to also track events and see sources.
   window.vyntraTrack(name, params) is used by the buttons and the form.
   ===================================================================== */
(function () {
  var cfg = window.VYNTRA || {};
  var local = /^(localhost|127\.0\.0\.1|)$/.test(location.hostname);

  if (!local) {
    window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
    var v = document.createElement('script');
    v.defer = true; v.src = '/_vercel/insights/script.js';
    document.head.appendChild(v);
  }

  if (cfg.ga4Id && !local) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    var g = document.createElement('script');
    g.async = true; g.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(cfg.ga4Id);
    document.head.appendChild(g);
    window.gtag('js', new Date());
    window.gtag('config', cfg.ga4Id);
  }

  window.vyntraTrack = function (name, params) {
    try { if (window.gtag && cfg.ga4Id) window.gtag('event', name, params || {}); } catch (e) {}
    try { if (window.va) window.va('event', Object.assign({ name: name }, params || {})); } catch (e) {}
  };

  document.addEventListener('click', function (e) {
    var a = e.target.closest('a');
    if (!a) return;
    var where = document.body.getAttribute('data-page') || 'page';
    if (a.classList.contains('wa-float') || /wa\.me\//.test(a.href)) window.vyntraTrack('whatsapp_click', { page: where });
    else if (a.classList.contains('js-book')) window.vyntraTrack('book_call_click', { page: where });
    else if (/^mailto:/.test(a.href)) window.vyntraTrack('email_click', { page: where });
  });
})();

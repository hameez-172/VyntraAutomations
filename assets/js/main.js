/* =====================================================================
   Page behaviour: demo videos, booking buttons, contact form.
   Settings live in config.js. Demo video links live in each page's
   <div class="demo" data-src="..."> line.
   ===================================================================== */
(function () {
  var cfg = window.VYNTRA || {};
  var root = document.body.getAttribute('data-root') || '';
  var isHome = document.body.getAttribute('data-page') === 'home';

  /* ----- Booking buttons: open your calendar if bookingUrl is set ----- */
  if (cfg.bookingUrl) {
    document.querySelectorAll('a.js-book').forEach(function (a) {
      a.href = cfg.bookingUrl; a.target = '_blank'; a.rel = 'noopener';
    });
  }

  /* ----- Demo videos ----- */
  function embedUrl(src) {
    var m = src.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
    if (m) return 'https://www.youtube.com/embed/' + m[1];
    m = src.match(/loom\.com\/share\/([\w]+)/);
    if (m) return 'https://www.loom.com/embed/' + m[1];
    return src;
  }
  document.querySelectorAll('.demo').forEach(function (box) {
    var src = (box.getAttribute('data-src') || '').trim();
    var poster = box.getAttribute('data-poster') || '';
    var title = box.getAttribute('data-title') || 'Demo';
    if (!src) {
      box.innerHTML =
        '<div class="demo-empty"><span class="playbtn"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l11-6.5z"/></svg></span>' +
        '<strong>Demo video coming soon</strong><p>Want to see it working now? Ask for a live walkthrough.</p>' +
        '<a class="btn btn-cyan js-book" href="' + (isHome ? '' : root + 'index.html') + '#contact">Ask for a live demo</a></div>';
      if (cfg.bookingUrl) { var b = box.querySelector('.js-book'); b.href = cfg.bookingUrl; b.target = '_blank'; b.rel = 'noopener'; }
      return;
    }
    if (/\.(mp4|webm|mov)(\?.*)?$/i.test(src)) {
      var v = document.createElement('video');
      v.controls = true; v.preload = 'metadata'; v.playsInline = true; v.src = src;
      if (poster) v.poster = poster;
      v.setAttribute('aria-label', title);
      box.appendChild(v);
    } else {
      var i = document.createElement('iframe');
      i.src = embedUrl(src); i.title = title; i.loading = 'lazy';
      i.allow = 'fullscreen; picture-in-picture'; i.allowFullscreen = true;
      box.appendChild(i);
    }
  });


  /* ----- Click a screenshot to see it full screen ----- */
  document.addEventListener('click', function (e) {
    var img = e.target.closest('.shot img');
    if (img) {
      var box = document.createElement('div');
      box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Screenshot, click to close');
      var big = document.createElement('img'); big.src = img.currentSrc || img.src; big.alt = img.alt;
      box.appendChild(big); document.body.appendChild(box);
      return;
    }
    var lb = e.target.closest('.lightbox');
    if (lb) lb.remove();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { var lb = document.querySelector('.lightbox'); if (lb) lb.remove(); }
  });

  /* ----- Contact form (home page) ----- */
  var form = document.getElementById('lead-form');
  if (!form) return;

  if (cfg.email) {
    var d = document.getElementById('direct'), l = document.getElementById('direct-link');
    if (d && l) { l.textContent = cfg.email; l.href = 'mailto:' + cfg.email; d.hidden = false; }
  }
  if (cfg.whatsapp) {
    var wd = document.getElementById('wa-direct'), wl = document.getElementById('wa-direct-link');
    if (wd && wl) { wl.href = 'https://wa.me/' + cfg.whatsapp + (cfg.whatsappMessage ? '?text=' + encodeURIComponent(cfg.whatsappMessage) : ''); wd.hidden = false; }
  }
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-interest]');
    if (a) { var s = document.getElementById('f-interest'); if (s) s.value = a.getAttribute('data-interest'); }
  });
  var pre = new URLSearchParams(location.search).get('interest');
  if (pre) { var sel = document.getElementById('f-interest'); if (sel) sel.value = pre; }

  var btn = document.getElementById('f-submit'), status = document.getElementById('f-status');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    if (!form.reportValidity()) return;
    if (form.elements['company_website'].value) return; // honeypot
    var data = {};
    new FormData(form).forEach(function (v, k) { if (k !== 'company_website') data[k] = v; });
    data.page = location.href;
    var q = new URLSearchParams(location.search);
    ['utm_source', 'utm_medium', 'utm_campaign'].forEach(function (k) { if (q.get(k)) data[k] = q.get(k); });
    data.referrer = document.referrer || '';
    btn.disabled = true; btn.textContent = 'Sending...';
    fetch(cfg.formEndpoint || '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      if (!r.ok) throw new Error('bad status');
      var first = String(data.name || '').trim().split(' ')[0];
      document.getElementById('f-done-title').textContent = first ? 'Thanks, ' + first + '. Request received.' : 'Request received';
      form.hidden = true;
      var done = document.getElementById('f-done'); done.hidden = false;
      if (window.vyntraTrack) window.vyntraTrack('generate_lead', { interest: data.interest || '' });
      if (cfg.bookingUrl && !done.querySelector('iframe')) {
        var sep = cfg.bookingUrl.indexOf('?') > -1 ? '&' : '?';
        var cal = document.createElement('iframe');
        cal.src = cfg.bookingUrl + sep + 'embed_domain=' + encodeURIComponent(location.hostname) + '&embed_type=Inline&name=' + encodeURIComponent(data.name || '') + '&email=' + encodeURIComponent(data.email || '');
        cal.title = 'Pick a time for your discovery call'; cal.loading = 'lazy';
        cal.style.cssText = 'width:100%;height:680px;border:0;border-radius:14px;margin-top:16px;background:#fff';
        var lead = document.createElement('p'); lead.innerHTML = '<strong>Pick a time that suits you:</strong>';
        done.appendChild(lead); done.appendChild(cal);
      }
    }).catch(function () {
      status.textContent = cfg.email
        ? 'We could not send your request. Please try again, or email ' + cfg.email + '.'
        : 'We could not send your request. Please try again in a moment.';
      btn.disabled = false; btn.textContent = 'Request a discovery call';
    });
  });
})();

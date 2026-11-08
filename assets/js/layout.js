/* =====================================================================
   Header and footer for every page. Edit the menu or footer links HERE
   once and all 11 pages update.
   Pages set <body data-root=""> (home) or <body data-root="../"> (systems/).
   ===================================================================== */
(function () {
  var root = document.body.getAttribute('data-root') || '';
  var isHome = document.body.getAttribute('data-page') === 'home';
  var cfg = window.VYNTRA || {};
  var home = function (hash) { return (isHome ? '' : root + 'index.html') + hash; };

  var SYSTEMS = [
    ['voice-receptionist', 'AI Voice Receptionist'],
    ['website-chatbot', 'AI Website Chatbot'],
    ['missed-call-recovery', 'Missed Call Recovery'],
    ['appointment-management', 'Appointment Management'],
    ['appointment-reminders', 'Appointment Reminder & Confirmation'],
    ['patient-followup', 'Patient Follow-up Automation'],
    ['patient-recall', 'Patient Recall Automation'],
    ['lead-qualification-crm', 'AI Lead Qualification & CRM'],
    ['appointment-waitlist', 'Appointment Waitlist Automation'],
    ['feedback-reviews', 'Patient Feedback & Review Automation']
  ];

  var waUrl = cfg.whatsapp ? 'https://wa.me/' + cfg.whatsapp + (cfg.whatsappMessage ? '?text=' + encodeURIComponent(cfg.whatsappMessage) : '') : '';

  var headerHTML =
    '<a class="skip" href="#main">Skip to content</a>' +
    '<header class="site-header"><div class="wrap nav-inner">' +
    '<a class="brand" href="' + (isHome ? '#' : root + 'index.html') + '" aria-label="Vyntra Automations home">' +
    '<img src="' + root + 'assets/img/logo-dark.svg" alt="Vyntra Automations" width="177" height="40"></a>' +
    '<nav class="nav-pill" id="nav-links" aria-label="Main">' +
    '<a href="' + home('#solutions') + '">Solutions</a>' +
    '<a href="' + home('#our-work') + '">Our Work</a>' +
    '<a href="' + home('#how-we-work') + '">How We Work</a>' +
    '<a href="' + home('#about') + '">About Us</a>' +
    '<a href="' + home('#contact') + '">Contact</a></nav>' +
    '<div class="nav-actions"><a class="btn btn-cyan js-book" href="' + home('#contact') + '">Book a discovery call</a>' +
    '<button class="menu-btn" id="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">' +
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button></div>' +
    '</div></header>';

  var sysLinks = SYSTEMS.map(function (s) {
    return '<li><a href="' + root + 'systems/' + s[0] + '.html">' + s[1].replace('&', '&amp;') + '</a></li>';
  }).join('');

  var footerHTML =
    '<footer class="site-footer"><div class="wrap">' +
    '<div class="foot-grid">' +
    '<div class="foot-brand"><a class="brand" href="' + (isHome ? '#' : root + 'index.html') + '" aria-label="Vyntra Automations home">' +
    '<img src="' + root + 'assets/img/logo-dark.svg" alt="Vyntra Automations" width="177" height="40"></a>' +
    '<p>Front-desk automation that answers, books and follows up for dental practices.</p></div>' +
    '<div><h4>Systems</h4><ul>' + sysLinks + '</ul></div>' +
    '<div><h4>Company</h4><ul>' +
    '<li><a href="' + home('#solutions') + '">Solutions</a></li>' +
    '<li><a href="' + home('#our-work') + '">Our Work</a></li>' +
    '<li><a href="' + home('#how-we-work') + '">How We Work</a></li>' +
    '<li><a href="' + home('#about') + '">About Us</a></li>' +
    '<li><a href="' + home('#contact') + '">Contact</a></li>' +
    (cfg.email ? '<li><a href="mailto:' + cfg.email + '">' + cfg.email + '</a></li>' : '') +
    (cfg.whatsapp ? '<li><a href="' + waUrl + '" target="_blank" rel="noopener">WhatsApp +92 342 6881848</a></li>' : '') +
    '</ul></div></div>' +
    '<div class="legal"><p>&copy; ' + new Date().getFullYear() + ' Vyntra Automations. All rights reserved.</p>' +
    '</div>' +
    '</div></footer>';

  var h = document.getElementById('site-header');
  var f = document.getElementById('site-footer');
  if (h) h.innerHTML = headerHTML;
  if (f) f.innerHTML = footerHTML;

  /* Floating WhatsApp button on every page */
  if (waUrl) {
    var wa = document.createElement('a');
    wa.className = 'wa-float'; wa.href = waUrl; wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Chat with Vyntra on WhatsApp');
    wa.innerHTML = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg><span>Chat on WhatsApp</span>';
    document.body.appendChild(wa);
  }

  var btn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav-links');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) { nav.classList.remove('open'); btn.setAttribute('aria-expanded', 'false'); }
    });
  }
})();

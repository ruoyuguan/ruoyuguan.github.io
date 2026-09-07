(function () {
  'use strict';
  var script = document.currentScript;
  var id = script.dataset.measurementId;
  var key = 'analytics-consent';
  var started = false;
  function choice() {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }
  function blocked() { return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1'; }
  function start() {
    if (choice() !== 'granted' || blocked()) return;
    window['ga-disable-' + id] = false;
    if (started) return;
    started = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', id, { allow_google_signals: false, allow_ad_personalization_signals: false });
    var tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(tag);
  }
  function display() {
    var status = document.getElementById('analytics-status');
    if (status) status.textContent = blocked() ? 'Analytics is off because your browser requests no tracking.' : choice() === 'granted' ? 'Analytics is enabled in this browser.' : 'Analytics is off in this browser.';
  }
  document.querySelectorAll('[data-analytics-choice]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.analyticsChoice;
      try { localStorage.setItem(key, value); } catch (error) { /* Do not load analytics if the choice cannot be saved. */ }
      if (value === 'granted') start();
      else {
        window['ga-disable-' + id] = true;
        document.cookie.split(';').forEach(function (cookie) {
          var name = cookie.split('=')[0].trim();
          if (!/^_ga(?:_|$)/.test(name)) return;
          ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(function (domain) {
            document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
          });
        });
      }
      display();
    });
  });
  start();
  display();
}());

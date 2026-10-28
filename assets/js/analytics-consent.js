(function () {
  'use strict';
  var script = document.currentScript;
  var id = script.dataset.measurementId;
  var key = 'analytics-consent';
  var started = false;
  var saveFailed = false;
  function choice() {
    try { return localStorage.getItem(key); } catch (error) { return null; }
  }
  function blocked() { return navigator.globalPrivacyControl === true || navigator.doNotTrack === '1'; }
  function start() {
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
  function stop() {
    // Disable collection before attempting cookie cleanup, which some browsers block.
    window['ga-disable-' + id] = true;
    try {
      document.cookie.split(';').forEach(function (cookie) {
        var name = cookie.split('=')[0].trim();
        if (!/^_ga(?:_|$)/.test(name)) return;
        ['', '; domain=' + location.hostname, '; domain=.' + location.hostname].forEach(function (domain) {
          document.cookie = name + '=; Max-Age=0; path=/' + domain + '; SameSite=Lax';
        });
      });
    } catch (error) { /* Collection stays disabled when cookies are inaccessible. */ }
  }
  function display(enabled) {
    var status = document.getElementById('analytics-status');
    if (status) status.textContent = blocked() ? 'Analytics is off because your browser requests no tracking.' : enabled ? 'Analytics is enabled in this browser.' : 'Analytics is off in this browser.';
  }
  function synchronize() {
    var enabled = !saveFailed && choice() === 'granted' && !blocked();
    window['ga-disable-' + id] = !enabled;
    if (enabled) start();
    else stop();
    display(enabled);
  }
  document.querySelectorAll('[data-analytics-choice]').forEach(function (button) {
    button.addEventListener('click', function () {
      var value = button.dataset.analyticsChoice;
      try {
        localStorage.setItem(key, value);
        saveFailed = false;
      } catch (error) {
        // An older stored grant must not override an unsaved withdrawal on this page.
        saveFailed = true;
      }
      synchronize();
    });
  });
  window.addEventListener('storage', function (event) {
    if (event.key !== key && event.key !== null) return;
    if (event.storageArea) {
      try { if (event.storageArea !== localStorage) return; }
      catch (error) { /* synchronize() will fail closed when storage is inaccessible. */ }
    }
    synchronize();
  });
  // Recheck restored pages as well as live tabs; BFCache can suspend storage events.
  window.addEventListener('pageshow', synchronize);
  synchronize();
}());

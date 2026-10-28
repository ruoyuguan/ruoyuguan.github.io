// Exercise consent state changes without a browser or real analytics requests.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import vm from 'node:vm';

const source = await readFile(new URL('../assets/js/analytics-consent.js', import.meta.url), 'utf8');
const key = 'analytics-consent';
const disabledKey = 'ga-disable-G-TEST';

function page({ stored = new Map(), dnt = null, gpc = false, readFails = false, writeFails = false, cookieFails = false } = {}) {
  const events = new Map();
  const scripts = [];
  const cookies = new Map([['_ga', 'test'], ['_ga_TEST', 'test'], ['unrelated', 'keep']]);
  const state = { readFails, writeFails, cookieFails };
  const status = { textContent: '' };
  const storage = {
    getItem(name) {
      if (state.readFails) throw new Error('Storage read denied');
      return stored.get(name) ?? null;
    },
    setItem(name, value) {
      if (state.writeFails) throw new Error('Storage write denied');
      stored.set(name, value);
    }
  };
  const buttons = Object.fromEntries(['granted', 'denied'].map(choice => {
    const button = { dataset: { analyticsChoice: choice }, addEventListener(name, callback) { this[name] = callback; } };
    return [choice, button];
  }));
  const window = { addEventListener(name, callback) { events.set(name, callback); } };
  const document = {
    currentScript: { dataset: { measurementId: 'G-TEST' } },
    head: { appendChild(script) { scripts.push(script); } },
    createElement() { return {}; },
    getElementById() { return status; },
    querySelectorAll() { return Object.values(buttons); },
    get cookie() {
      if (state.cookieFails) throw new Error('Cookie access denied');
      return [...cookies].map(([name, value]) => `${name}=${value}`).join('; ');
    },
    set cookie(value) {
      if (state.cookieFails) throw new Error('Cookie access denied');
      cookies.delete(value.split('=', 1)[0]);
    }
  };
  const navigator = { doNotTrack: dnt, globalPrivacyControl: gpc };
  vm.runInNewContext(source, { window, document, navigator, localStorage: storage, location: { hostname: 'example.test' } });
  return {
    window, navigator, state, stored, storage, status, scripts, cookies,
    click(choice) { buttons[choice].click(); },
    emit(name, event = {}) { events.get(name)?.(event); },
    storageEvent(name = key, storageArea = storage) { events.get('storage')({ key: name, storageArea }); }
  };
}

const fresh = page();
assert.equal(fresh.window[disabledKey], true, 'Default is disabled');
assert.equal(fresh.scripts.length, 0, 'No script before consent');
assert.equal(fresh.status.textContent, 'Analytics is off in this browser.');
assert.equal(fresh.cookies.has('_ga'), false, 'Accessible analytics cookies are cleared');
assert.equal(fresh.cookies.get('unrelated'), 'keep', 'Unrelated cookies are untouched');
fresh.click('granted');
assert.equal(fresh.window[disabledKey], false);
assert.equal(fresh.scripts.length, 1);
assert.equal(fresh.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=G-TEST');
assert.equal(fresh.window.dataLayer[1][2].allow_google_signals, false);
assert.equal(fresh.window.dataLayer[1][2].allow_ad_personalization_signals, false);
fresh.click('denied');
assert.equal(fresh.window[disabledKey], true);
fresh.click('granted');
fresh.emit('pageshow');
assert.equal(fresh.window[disabledKey], false);
assert.equal(fresh.scripts.length, 1, 'Re-enabling does not duplicate the tag');

const shared = new Map();
const first = page({ stored: shared });
const second = page({ stored: shared });
first.click('granted');
second.storageEvent();
assert.equal(second.window[disabledKey], false, 'Another tab sees a grant');
second.click('denied');
first.storageEvent();
assert.equal(first.window[disabledKey], true, 'Another tab sees withdrawal');
assert.equal(first.status.textContent, 'Analytics is off in this browser.');
shared.set(key, 'granted');
first.storageEvent('unrelated');
assert.equal(first.window[disabledKey], true, 'Unrelated storage keys are ignored');
first.storageEvent(key, {});
assert.equal(first.window[disabledKey], true, 'Session-storage events are ignored');
first.storageEvent();
assert.equal(first.window[disabledKey], false);
shared.clear();
first.storageEvent(null);
second.storageEvent(null);
assert.equal(first.window[disabledKey], true, 'localStorage.clear withdraws consent');
assert.equal(second.window[disabledKey], true);
shared.set(key, 'granted');
first.emit('pageshow');
assert.equal(first.window[disabledKey], false, 'Restored pages re-read consent');
shared.delete(key);
first.emit('pageshow');
assert.equal(first.window[disabledKey], true);

for (const privacy of [{ dnt: '1' }, { gpc: true }]) {
  const blocked = page({ stored: new Map([[key, 'granted']]), ...privacy });
  blocked.click('granted');
  blocked.emit('pageshow');
  assert.equal(blocked.window[disabledKey], true, 'Browser privacy signals override grants');
  assert.equal(blocked.scripts.length, 0);
  assert.match(blocked.status.textContent, /browser requests no tracking/);
}
first.navigator.globalPrivacyControl = true;
shared.set(key, 'granted');
first.emit('pageshow');
assert.equal(first.window[disabledKey], true, 'Restored pages recheck browser privacy signals');

const unreadable = page({ stored: new Map([[key, 'granted']]), readFails: true });
assert.equal(unreadable.window[disabledKey], true);
assert.equal(unreadable.scripts.length, 0, 'Unreadable storage fails closed');
const unsavable = page({ writeFails: true });
unsavable.click('granted');
assert.equal(unsavable.window[disabledKey], true);
assert.equal(unsavable.scripts.length, 0, 'Unsaved consent never loads the tag');
const staleGrant = page({ stored: new Map([[key, 'granted']]) });
staleGrant.state.writeFails = true;
staleGrant.click('denied');
staleGrant.emit('pageshow');
staleGrant.storageEvent();
assert.equal(staleGrant.window[disabledKey], true, 'An old saved grant cannot undo an unsaved withdrawal');
assert.equal(staleGrant.status.textContent, 'Analytics is off in this browser.');
staleGrant.state.writeFails = false;
staleGrant.click('granted');
assert.equal(staleGrant.window[disabledKey], false, 'An explicit successfully saved grant can re-enable');
assert.equal(staleGrant.scripts.length, 1);
staleGrant.state.readFails = true;
staleGrant.emit('pageshow');
assert.equal(staleGrant.window[disabledKey], true, 'Lost storage access disables an already-started integration');
const noCookies = page({ cookieFails: true });
noCookies.click('denied');
assert.equal(noCookies.window[disabledKey], true, 'Cookie restrictions do not break withdrawal');

console.log('Passed: default-off, grant/deny/re-grant, cross-tab storage and clear, pageshow, DNT/GPC, storage failures, cookie restrictions, and single tag injection.');

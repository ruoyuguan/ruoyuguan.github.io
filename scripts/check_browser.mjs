// Check responsive layouts and keyboard controls with the installed Chrome.
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdir, readdir, readFile } from 'node:fs/promises';

const site = process.argv[2] || 'http://127.0.0.1:4000';
const output = process.argv[3] || 'output/browser-check';
const photoNames = (await readdir('_portfolio')).filter(name => /\.(md|html)$/.test(name));
const photoSources = await Promise.all(photoNames.map(name => readFile('_portfolio/' + name, 'utf8')));
const expectedPhotos = photoSources.filter(source => /^published: true\s*$/m.test(source.split(/^---\s*$/m)[1])).length;
const photographyHidden = /^published: false\s*$/m.test((await readFile('_pages/portfolio.html', 'utf8')).split(/^---\s*$/m)[1]);
const pagePaths = ['/', '/publications/', '/cv/', '/talks/', '/research/', '/year-archive/', '/beyond-academia/'];
if (!photographyHidden) pagePaths.push('/portfolio/');
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const failures = [];
try {
  if (photographyHidden) {
    const context = await browser.newContext();
    const withdrawnPaths = photoSources.map((source, index) => {
      const permalink = source.split(/^---\s*$/m)[1].match(/^permalink:\s*["']?([^\s"']+)/m);
      return permalink ? permalink[1] : `/portfolio/${photoNames[index].replace(/\.(md|html)$/, '')}/`;
    });
    for (const path of ['/portfolio/', '/photography-drafts/', ...withdrawnPaths, '/images/photography/hk4-480.webp', '/images/photography/wh1-480.webp']) {
      assert.equal((await context.request.get(site + path)).status(), 404, `Withdrawn photography is not public: ${path}`);
    }
    await context.close();
  }
  for (const colorScheme of ['light', 'dark']) {
    for (const width of [1365, 390, 320]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme });
      await context.route(/googletagmanager|google-analytics/, route => route.fulfill({ status: 200, body: '' }));
      const page = await context.newPage();
      page.on('pageerror', error => failures.push(error.message));
      for (const path of pagePaths) {
        const response = await page.goto(site + path, { waitUntil: 'networkidle' });
        assert.equal(response.status(), 200, path);
        const metrics = await page.evaluate(() => ({
          width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
          math: !!document.querySelector('#MathJax-script'),
          analytics: !!document.querySelector('script[src*="googletagmanager.com"]'),
          headings: document.querySelectorAll('h1').length,
          images: [...document.images].filter(img => !img.loading || img.loading !== 'lazy').every(img => img.complete && img.naturalWidth > 0),
          colors: ['--global-fig-caption-color', '--global-link-color-hover', '--global-masthead-link-color-hover'].map(name => ({
            name, value: getComputedStyle(document.documentElement).getPropertyValue(name).trim(),
            valid: CSS.supports('color', getComputedStyle(document.documentElement).getPropertyValue(name).trim())
          }))
        }));
        assert.ok(metrics.scrollWidth <= metrics.width, `${path}: horizontal overflow ${JSON.stringify(metrics)}`);
        assert.equal(metrics.headings, 1, `${path}: exactly one H1`);
        assert.equal(metrics.math, false, `${path}: unnecessary MathJax`);
        assert.equal(metrics.analytics, false, `${path}: analytics loaded without consent`);
        assert.ok(metrics.images, `${path}: broken image`);
        assert.ok(metrics.colors.every(color => color.valid), `${path}: resolved theme colors ${JSON.stringify(metrics.colors)}`);
        if (photographyHidden) assert.equal(await page.locator('a[href="/portfolio/"]').count(), 0, `${path}: removed photography link`);
        if (path === '/portfolio/') {
          assert.equal(await page.locator('.photography-card').count(), expectedPhotos);
          await page.locator('.photography-card').last().scrollIntoViewIfNeeded();
          await page.waitForFunction(() => [...document.querySelectorAll('.photography-card img')].every(img => img.complete && img.naturalWidth > 0));
          assert.ok(await page.getByRole('link', { name: 'Manage photographs' }).isVisible());
        }
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.screenshot({ path: `${output}/${path.replaceAll('/', '') || 'home'}-${width}-${colorScheme}.png`, fullPage: true });
      }
      if (width <= 390) {
        const menu = page.getByRole('button', { name: 'More navigation links' });
        await menu.focus();
        await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        assert.ok(await page.locator('#navigation-overflow').isVisible());
        await page.screenshot({ path: `${output}/menu-${colorScheme}.png` });
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');

        const contact = page.locator('.author__urls-wrapper button');
        const contactLinks = page.locator('#author-links');
        async function checkContact(visible) {
          assert.equal(await contactLinks.isVisible(), visible, 'Contact menu visibility');
          assert.equal(await contact.getAttribute('aria-expanded'), String(visible), 'Contact menu accessibility state');
          assert.equal(await contact.evaluate(button => button.classList.contains('open')), visible, 'Contact menu button state');
        }
        await checkContact(false);
        await contact.click();
        await checkContact(true);
        await contact.click();
        await checkContact(false);
        await page.setViewportSize({ width: 1365, height: 900 });
        await page.waitForFunction(() => document.querySelector('.author__urls-wrapper button').getAttribute('aria-expanded') === 'true');
        await checkContact(true);
        assert.equal(await contactLinks.evaluate(links => links.style.display), '', 'Desktop display belongs to CSS');
        await page.setViewportSize({ width, height: 900 });
        await page.waitForFunction(() => document.querySelector('.author__urls-wrapper button').getAttribute('aria-expanded') === 'false');
        await checkContact(false);
        for (const [boundaryWidth, visible] of [[925, true], [924, false], [width, false]]) {
          await page.setViewportSize({ width: boundaryWidth, height: 900 });
          await page.waitForFunction(expected => document.querySelector('.author__urls-wrapper button').getAttribute('aria-expanded') === String(expected), visible);
          await checkContact(visible);
        }
        await contact.focus();
        await contact.evaluate(button => { for (let count = 0; count < 21; count++) button.click(); });
        await checkContact(true);
        await page.keyboard.press('Escape');
        await checkContact(false);
        assert.ok(await contact.evaluate(button => button === document.activeElement), 'Escape restores contact-button focus');
        await page.keyboard.press('Space');
        await checkContact(true);
        await contactLinks.locator('a').first().focus();
        await page.keyboard.press('Escape');
        await checkContact(false);
        await page.keyboard.press('Enter');
        await checkContact(true);
        await page.keyboard.press('Escape');
        await checkContact(false);
      }
      const toggle = page.locator('#theme-toggle-button');
      const before = await toggle.getAttribute('aria-pressed');
      await toggle.focus();
      await page.keyboard.press('Space');
      assert.notEqual(await toggle.getAttribute('aria-pressed'), before);
      await page.reload({ waitUntil: 'networkidle' });
      assert.notEqual(await toggle.getAttribute('aria-pressed'), before);
      await context.close();
    }
  }
  // Exercise consent without making a real analytics request.
  const context = await browser.newContext();
  await context.route(/googletagmanager|google-analytics/, route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  const page = await context.newPage();
  await page.goto(site + '/terms/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  assert.equal(await page.evaluate(() => localStorage.getItem('analytics-consent')), 'granted');
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 1);
  const secondTab = await context.newPage();
  await secondTab.goto(site + '/terms/', { waitUntil: 'networkidle' });
  await context.addCookies([{ name: '_ga', value: 'test-cookie', url: site }]);
  await secondTab.getByRole('button', { name: 'Disable analytics' }).click();
  await page.waitForFunction(() => window['ga-disable-G-PQFJ9TQXB7'] === true);
  assert.equal(await page.locator('#analytics-status').textContent(), 'Analytics is off in this browser.');
  assert.equal((await context.cookies()).filter(cookie => /^_ga(?:_|$)/.test(cookie.name)).length, 0, 'Withdrawal clears accessible analytics cookies');
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  await secondTab.waitForFunction(() => window['ga-disable-G-PQFJ9TQXB7'] === false);
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 1, 'Re-grant does not duplicate the tag');
  await secondTab.evaluate(() => localStorage.removeItem('analytics-consent'));
  await page.waitForFunction(() => window['ga-disable-G-PQFJ9TQXB7'] === true);
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  await secondTab.waitForFunction(() => window['ga-disable-G-PQFJ9TQXB7'] === false);
  await secondTab.evaluate(() => localStorage.clear());
  await page.waitForFunction(() => window['ga-disable-G-PQFJ9TQXB7'] === true);
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  await page.evaluate(() => {
    localStorage.setItem('analytics-consent', 'denied');
    window.dispatchEvent(new Event('pageshow'));
  });
  assert.equal(await page.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), true, 'Restored pages re-read consent');
  await secondTab.close();
  await page.getByRole('button', { name: 'Disable analytics' }).click();
  assert.equal(await page.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), true);
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  assert.equal(await page.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), false);
  await page.getByRole('button', { name: 'Disable analytics' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 0);
  await context.close();
  for (const signal of ['doNotTrack', 'globalPrivacyControl']) {
    const privacyContext = await browser.newContext();
    await privacyContext.route(/googletagmanager|google-analytics/, route => route.fulfill({ status: 200, body: '' }));
    await privacyContext.addInitScript(signal => {
      localStorage.setItem('analytics-consent', 'granted');
      Object.defineProperty(navigator, signal, { get: () => signal === 'doNotTrack' ? '1' : true });
    }, signal);
    const privacyPage = await privacyContext.newPage();
    await privacyPage.goto(site + '/terms/', { waitUntil: 'networkidle' });
    await privacyPage.getByRole('button', { name: 'Enable optional analytics' }).click();
    assert.equal(await privacyPage.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), true, signal);
    assert.equal(await privacyPage.locator('script[src*="googletagmanager.com"]').count(), 0, `${signal}: no analytics tag`);
    await privacyContext.close();
  }
  const noScriptContext = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noScriptPage = await noScriptContext.newPage();
  await noScriptPage.goto(site + '/', { waitUntil: 'networkidle' });
  for (const width of [320, 390, 924, 925, 1365]) {
    await noScriptPage.setViewportSize({ width, height: 844 });
    assert.ok(await noScriptPage.locator('#author-links').isVisible(), `${width}px: contacts available without JavaScript`);
    assert.equal(await noScriptPage.locator('.author__urls-wrapper button').isVisible(), false, `${width}px: inactive contact button hidden`);
    const profileLinks = await noScriptPage.locator('#author-links a').all();
    assert.ok(profileLinks.length > 0, 'Contact and profile links exist');
    await profileLinks[0].focus();
    for (let index = 0; index < profileLinks.length; index++) {
      const link = profileLinks[index];
      assert.ok(await link.isVisible(), `${width}px: visible profile link`);
      assert.ok(await link.evaluate(element => document.activeElement === element), `${width}px: profile links reachable with Tab`);
      if (index + 1 < profileLinks.length) await noScriptPage.keyboard.press('Tab');
    }
    assert.ok(await noScriptPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px: no-JavaScript contact layout`);
    await noScriptPage.screenshot({ path: `${output}/contacts-${width}-no-js.png` });
  }
  for (const path of ['/posts/2025/07/formless-freedom/', '/posts/2026/05/scientific-textbook-proofreading-skill-pre-release/']) {
    await noScriptPage.setViewportSize({ width: 390, height: 844 });
    await noScriptPage.goto(site + path, { waitUntil: 'networkidle' });
    assert.ok(await noScriptPage.locator('.page__toc').isVisible(), `${path}: TOC without JavaScript`);
    const toc = await noScriptPage.evaluate(() => ({
      links: [...document.querySelectorAll('.page__toc a')].map(link => ({
        text: link.textContent.trim(), target: !!document.getElementById(decodeURIComponent(link.hash.slice(1)))
      })),
      headings: document.querySelectorAll('.page__content h2[id], .page__content h3[id]').length,
      overflow: document.documentElement.scrollWidth > innerWidth
    }));
    assert.equal(toc.links.length, toc.headings, `${path}: every section has a TOC link`);
    assert.ok(toc.links.every(link => link.text && link.target), `${path}: valid TOC text and targets`);
    assert.equal(toc.overflow, false, `${path}: mobile TOC layout`);
    await noScriptPage.screenshot({ path: `${output}/toc-${path.includes('formless-freedom') ? 'essay' : 'skill'}-390-no-js.png` });
    if (path.includes('formless-freedom')) {
      await noScriptPage.locator('.page__toc a[href="#english-version"]').click();
      assert.equal(new URL(noScriptPage.url()).hash, '#english-version', 'Custom bilingual anchors remain usable');
      const anchorPosition = await noScriptPage.evaluate(() => ({
        heading: document.getElementById('english-version').getBoundingClientRect().top,
        masthead: document.querySelector('.masthead').getBoundingClientRect().bottom
      }));
      assert.ok(anchorPosition.heading >= Math.max(0, anchorPosition.masthead), 'Native TOC jumps keep headings visible below navigation');
    }
    await noScriptPage.setViewportSize({ width: 320, height: 844 });
    assert.ok(await noScriptPage.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path}: narrow no-JavaScript layout`);
    for (const link of await noScriptPage.locator('#site-nav .visible-links a').all()) {
      assert.ok(await link.isVisible(), 'All main navigation links remain available without JavaScript');
    }
    assert.equal(await noScriptPage.locator('#navigation-toggle').isVisible(), false, 'No inactive navigation toggle without JavaScript');
    assert.equal(await noScriptPage.locator('#theme-toggle-button').isVisible(), false, 'No inactive theme toggle without JavaScript');
  }
  await noScriptContext.close();
  const researchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
  const research = await researchContext.newPage();
  research.on('pageerror', error => failures.push(error.message));
  await research.goto(site + '/publications/residual-galactic-binary-foreground-lisa/', { waitUntil: 'networkidle' });
  await research.waitForSelector('mjx-container', { timeout: 20000 });
  assert.ok(await research.locator('mjx-container').count() > 5, 'Publication equations render');
  assert.ok(await research.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Publication mobile layout');
  await research.screenshot({ path: `${output}/preprint-390-dark.png`, fullPage: true });
  await research.goto(site + '/posts/2026/05/scientific-textbook-proofreading-skill-pre-release/', { waitUntil: 'networkidle' });
  assert.ok(await research.locator('.page__toc').isVisible(), 'TOC in dark theme');
  assert.ok(await research.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Dark mobile TOC layout');
  await research.screenshot({ path: `${output}/toc-skill-390-dark.png` });
  await research.goto(site + '/talkmap.html', { waitUntil: 'networkidle' });
  await research.locator('iframe').scrollIntoViewIfNeeded();
  const mapFrame = research.frameLocator('iframe');
  await mapFrame.locator('.leaflet-marker-icon').first().waitFor({ timeout: 20000 });
  assert.equal(await mapFrame.locator('.leaflet-marker-icon').count(), 2);
  assert.equal(await mapFrame.locator('body').evaluate(body => body.ownerDocument.compatMode), 'CSS1Compat', 'Map uses standards mode');
  assert.ok(!(await mapFrame.locator('body').innerText()).trimStart().startsWith('---'), 'No unparsed map front matter');
  assert.ok(!(await (await researchContext.request.get(site + '/sitemap.xml')).text()).includes('/talkmap/map.html'), 'Embedded map stays out of the sitemap');
  await research.screenshot({ path: `${output}/talkmap-390-dark.png`, fullPage: true });
  // Use the generated filename so this also works with a basic static preview.
  const posterResponse = await research.goto(site + '/talks/2024-12-01-pku-forum-poster.html', { waitUntil: 'networkidle' });
  assert.equal(posterResponse.status(), 200, 'Poster document loads');
  const email = await research.locator('.page__content a[href^="mailto:"]').first().getAttribute('href');
  assert.ok(email && email.slice('mailto:'.length).includes('@'), 'Poster has a usable direct contact link');
  assert.ok(!(await research.locator('.page__content').innerText()).includes('email address shown in the sidebar'), 'Poster does not refer to a missing sidebar');
  await researchContext.close();
  assert.deepEqual(failures, [], 'JavaScript runtime errors');
  console.log(`Passed: ${pagePaths.length * 6} desktop/mobile page renders, resolved theme colors, photography visibility, keyboard menus and breakpoint transitions, theme persistence, images, cross-tab analytics and privacy signals, no-JavaScript contacts at five widths and TOCs, equations, standards-mode map and poster contact.`);
} finally { await browser.close(); }

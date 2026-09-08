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
const pagePaths = ['/', '/publications/', '/cv/', '/talks/', '/research/'];
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
    for (const width of [1365, 390]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme });
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
          images: [...document.images].filter(img => !img.loading || img.loading !== 'lazy').every(img => img.complete && img.naturalWidth > 0)
        }));
        assert.ok(metrics.scrollWidth <= metrics.width, `${path}: horizontal overflow ${JSON.stringify(metrics)}`);
        assert.equal(metrics.headings, 1, `${path}: exactly one H1`);
        assert.equal(metrics.math, false, `${path}: unnecessary MathJax`);
        assert.equal(metrics.analytics, false, `${path}: analytics loaded without consent`);
        assert.ok(metrics.images, `${path}: broken image`);
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
      if (width === 390) {
        const menu = page.getByRole('button', { name: 'More navigation links' });
        await menu.focus();
        await page.keyboard.press('Enter');
        assert.equal(await menu.getAttribute('aria-expanded'), 'true');
        assert.ok(await page.locator('#navigation-overflow').isVisible());
        await page.screenshot({ path: `${output}/menu-${colorScheme}.png` });
        await page.keyboard.press('Escape');
        assert.equal(await menu.getAttribute('aria-expanded'), 'false');
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
  await page.getByRole('button', { name: 'Disable analytics' }).click();
  assert.equal(await page.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), true);
  await page.getByRole('button', { name: 'Enable optional analytics' }).click();
  assert.equal(await page.evaluate(() => window['ga-disable-G-PQFJ9TQXB7']), false);
  await page.getByRole('button', { name: 'Disable analytics' }).click();
  await page.reload({ waitUntil: 'networkidle' });
  assert.equal(await page.locator('script[src*="googletagmanager.com"]').count(), 0);
  await context.close();
  const researchContext = await browser.newContext({ viewport: { width: 390, height: 844 }, colorScheme: 'dark' });
  const research = await researchContext.newPage();
  research.on('pageerror', error => failures.push(error.message));
  await research.goto(site + '/publications/residual-galactic-binary-foreground-lisa/', { waitUntil: 'networkidle' });
  await research.waitForSelector('mjx-container', { timeout: 20000 });
  assert.ok(await research.locator('mjx-container').count() > 5, 'Publication equations render');
  assert.ok(await research.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'Publication mobile layout');
  await research.screenshot({ path: `${output}/preprint-390-dark.png`, fullPage: true });
  await research.goto(site + '/talkmap.html', { waitUntil: 'networkidle' });
  const mapFrame = research.frameLocator('iframe');
  await mapFrame.locator('.leaflet-marker-icon').first().waitFor({ timeout: 20000 });
  assert.equal(await mapFrame.locator('.leaflet-marker-icon').count(), 2);
  await research.screenshot({ path: `${output}/talkmap-390-dark.png`, fullPage: true });
  await researchContext.close();
  assert.deepEqual(failures, [], 'JavaScript runtime errors');
  console.log(`Passed: ${pagePaths.length * 4} desktop/mobile page renders, photography visibility, light/dark menus, keyboard theme control, persistence, images, analytics consent, publication equations and real map markers.`);
} finally { await browser.close(); }

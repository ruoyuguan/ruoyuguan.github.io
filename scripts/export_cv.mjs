// Export the CV from a running local preview using the installed Google Chrome.
import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

const site = process.argv[2] || 'http://127.0.0.1:4000';
const output = resolve(process.argv[3] || 'files/ruoyu-guan-cv.pdf');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ colorScheme: 'light' });
  // Never send analytics while exporting a document.
  await page.route(/googletagmanager|google-analytics/, route => route.abort());
  const response = await page.goto(new URL('/cv/', site).href, { waitUntil: 'networkidle' });
  if (!response.ok()) throw new Error('The local CV page could not be loaded.');
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => {
    document.querySelectorAll('a[href]').forEach(link => {
      const url = new URL(link.href);
      if (url.origin === location.origin) link.href = 'https://ruoyuguan.github.io' + url.pathname + url.search + url.hash;
    });
  });
  await mkdir(dirname(output), { recursive: true });
  await page.pdf({
    path: output, format: 'A4', preferCSSPageSize: true, printBackground: true,
    displayHeaderFooter: true, headerTemplate: '<span></span>',
    footerTemplate: '<div style="font-size:8px;width:100%;text-align:center;color:#555">Ruo-Yu Guan · <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    tagged: true, outline: true
  });
  console.log(`Exported ${output}`);
} finally { await browser.close(); }

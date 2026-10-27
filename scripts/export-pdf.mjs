import { chromium } from 'playwright';
import { existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const candidates = process.platform === 'win32' ? [
    path.join(process.env.PROGRAMFILES || 'C:/Program Files', 'Google/Chrome/Application/chrome.exe'),
    path.join(process.env['PROGRAMFILES(X86)'] || 'C:/Program Files (x86)', 'Microsoft/Edge/Application/msedge.exe'),
] : [];
const executablePath = process.env.CV_BROWSER_PATH || candidates.find(existsSync);
const browser = await chromium.launch({ executablePath });
try {
    const page = await browser.newPage();
    await page.goto(pathToFileURL(path.join(root, 'index.html')).href);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: 'print' });
    const overflow = await page.locator('.page').evaluateAll(pages => pages.map((page, index) => ({
        page: index + 1,
        overflow: page.scrollHeight > page.clientHeight + 1,
    })).filter(result => result.overflow));
    if (overflow.length) throw new Error(`CV content exceeds page height: ${JSON.stringify(overflow)}`);
    const output = path.join(root, 'Josiah_Prathaban.pdf');
    await page.pdf({ path: output, format: 'A4', preferCSSPageSize: true, printBackground: true, tagged: true });
    console.log(`Exported ${output}`);
} finally {
    await browser.close();
}

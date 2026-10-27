# Josiah Prathaban — CV

A static, responsive CV focused on frontend development, UI/UX design, and team and project leadership. Updated October 2026.

- `index.html`: CV content and browser preview.
- `index.css`: screen, mobile, and two-page A4 print styles.
- `Josiah_Prathaban.pdf`: current application PDF with selectable text and links.
- `archive/Josiah_Prathaban_previous.pdf`: unchanged copy of the previously updated PDF supplied for this revision.
- `docs/editorial-notes.md`: content sources and remaining details that could strengthen future revisions.
- `docs/cv-preview.png`: first-page preview of the current design.

Open `index.html` in a browser to view the CV. The Download PDF button saves the checked-in PDF; Print CV opens the browser print dialog. When printing, use A4, 100% scale, and disable browser headers and footers.

## Regenerate the PDF

Requires Node.js and Chrome or Edge on Windows, or Playwright's Chromium on other platforms.

```powershell
npm ci
npm run build:pdf
```

If no supported browser is installed, run `npx playwright install chromium` first. You can also set `CV_BROWSER_PATH` to a Chromium-based browser executable. Regenerate the PDF after editing the HTML or CSS so the download matches the preview.

No runtime packages, external fonts, analytics, or build step are needed to view or host the HTML CV.

# P2 regression checks

Install dependencies with `npm ci`, then run `npm run build` and `npm test`.
The tests serve the built `dist/` locally, launch headless Chromium, and block
external requests. They do not submit leads or send analytics to production.

On Windows the tests use installed Google Chrome. Elsewhere install Chromium
with `npx playwright install chromium`. Set `P2_BROWSER_CHANNEL` to use another
installed Playwright browser channel, for example `msedge`.

Coverage: complete Turkish WhatsApp brief, unchanged example prices and SEO
addon exclusivity, mobile exclusions at 320px, TR/EN/AZ menu focus/keyboard and
inert restoration, resize cleanup, translated motion controls, persistent video
pause, live/initial reduced motion, and desktop horizontal overflow.

Optional: set `P2_SCREENSHOT_DIR` to an existing directory to capture review
images. Tests always rebuild nothing implicitly: rerun the build after edits.

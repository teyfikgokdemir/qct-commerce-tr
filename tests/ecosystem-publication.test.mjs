import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

for (const [route, contact] of [['hakkimizda', '/iletisim/'], ['en/about', '/en/contact/'], ['az/haqqimizda', '/az/elaqe/']]) {
  test(`ecosystem roles and local enquiry route are published on ${route}`, () => {
    const html = readFileSync(`dist/${route}/index.html`, 'utf8');
    const section = html.match(/<section[^>]*aria-labelledby="ecosystem-title"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, 'About page must publish the ecosystem section');
    for (const url of ['https://qctstudio.com/', 'https://ctseg.com.tr/', 'https://teyfikgokdemir.com/', 'https://mythborn.co/']) {
      assert.ok(section.includes(`href="${url}"`), `Missing venture link ${url}`);
    }
    assert.ok(section.includes(`href="${contact}"`), 'Enquiry must remain in the current language');
    assert.equal((section.match(/<h2\b/g) || []).length, 1);
  });
}

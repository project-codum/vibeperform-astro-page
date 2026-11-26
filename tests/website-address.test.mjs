import test from 'node:test';
import assert from 'node:assert/strict';
import { parseWebsiteAddress } from '../src/lib/websiteAddress.js';

test('public website addresses support bare domains, paths and international names', () => {
  assert.equal(parseWebsiteAddress(' example.com/leistungen ').href, 'https://example.com/leistungen');
  assert.equal(parseWebsiteAddress('http://example.com/?page=2').href, 'https://example.com/?page=2');
  assert.equal(parseWebsiteAddress('gärtnerei.de').hostname, 'xn--grtnerei-0za.de');
});

test('the preview rejects non-web URLs, credentials, custom ports and local addresses', () => {
  for (const address of ['javascript:alert(1)', 'file:///tmp/test', 'localhost', '127.1', '[::1]', 'host.local.', '10.0.0.1.nip.io:1234', 'https://a@example.com', 'web seite.de']) {
    assert.equal(parseWebsiteAddress(address), null, address);
  }
});

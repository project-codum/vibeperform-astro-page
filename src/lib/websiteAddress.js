export function parseWebsiteAddress(value) {
  const address = value.trim();
  if (!address || /[\s\\]/u.test(address)) return null;

  try {
    const url = new URL(/^https?:\/\//i.test(address) ? address : `https://${address}`);
    // The visual preview is intended for public websites, with no credentials,
    // IP literals, custom ports or single-label intranet hostnames.
    const hostname = url.hostname.replace(/\.$/, '');
    if (url.username || url.password || url.port || hostname.length > 253) return null;
    if (!/^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z][a-z0-9-]{0,62}$/i.test(hostname)) return null;
    if (/\.(?:local|localhost|internal|test|invalid|example|onion)$/i.test(hostname)) return null;

    // Use HTTPS for the iframe even when an address was entered as HTTP.
    url.protocol = 'https:';
    url.hostname = hostname;
    return url;
  } catch {
    return null;
  }
}

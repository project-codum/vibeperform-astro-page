const WEBSITE_ID = 'f4d32a51-9990-49dc-8daf-388a72a62b74';

export function installUmami(win, doc) {
  if (!['vibeperform.com', 'www.vibeperform.com'].includes(win.location.hostname) || typeof win.__cmp !== 'function' || win.__vibeperformUmamiBound) return;
  win.__vibeperformUmamiBound = true;
  let loaded = false;
  let revoked = false;
  const allowed = () => {
    try {
      const data = win.__cmp('getCMPData');
      const groups = [data?.purposeConsents, data?.vendorConsents];
      return groups.every(group => group && Object.values(group).length > 0 && Object.values(group).every(value => value === true));
    } catch { return false; }
  };
  // Check consent again on every send, including after consent is withdrawn.
  win.__vibeperformUmamiBeforeSend = (_type, payload) => {
    if (revoked || !allowed()) return false;
    if (payload.referrer) {
      try { const url = new URL(payload.referrer); url.search = ''; url.hash = ''; payload = { ...payload, referrer: url.href }; }
      catch { payload = { ...payload, referrer: '' }; }
    }
    return payload;
  };
  const sync = event => {
    if (event === 'consentrejected' || !allowed()) {
      if (loaded) revoked = true;
      return;
    }
    if (loaded || revoked) return;
    loaded = true;
    const script = doc.createElement('script');
    script.defer = true;
    script.src = 'https://cloud.umami.is/script.js';
    script.dataset.websiteId = WEBSITE_ID;
    script.dataset.domains = 'vibeperform.com,www.vibeperform.com';
    script.dataset.excludeSearch = 'true';
    script.dataset.excludeHash = 'true';
    script.dataset.beforeSend = '__vibeperformUmamiBeforeSend';
    script.dataset.cmpAb = '1'; // Consent is enforced by this loader.
    doc.head.appendChild(script);
  };
  for (const event of ['settings', 'consent', 'consentapproved', 'consentrejected', 'consentcustom', 'vendorconsent', 'loadNotShowing']) win.__cmp('addEventListener', [event, sync, false], null);
  sync();
}

/** Consentmanager vendor s2631 is Microsoft Clarity. Never load before vendor opt-in. */
export function installClarity(win, doc, projectId) {
  if (!/^[a-z0-9]+$/i.test(projectId || '') || !['vibeperform.com', 'www.vibeperform.com'].includes(win.location.hostname)) return;
  if (win.__vibeperformClarityBound || typeof win.__cmp !== 'function') return;
  win.__vibeperformClarityBound = true;
  let loaded = false;
  let revoked = false;
  const sync = (eventName) => {
    let allowed = false;
    try { allowed = eventName !== 'consentrejected' && win.__cmp('getCMPData')?.vendorConsents?.s2631 === true; } catch { /* Missing CMP data never grants consent. */ }
    if (!allowed) {
      if (loaded && !revoked) {
        revoked = true;
        // consentv2 alone can continue cookieless measurement; stop collection as well.
        win.clarity('consentv2', { analytics_Storage: 'denied', ad_Storage: 'denied' });
        win.clarity('stop');
      }
      return;
    }
    // After revocation stay stopped for this document. A later navigation rechecks consent.
    if (loaded || revoked) return;
    loaded = true;
    win.clarity = win.clarity || function (...args) { (win.clarity.q = win.clarity.q || []).push(args); };
    win.clarity('consentv2', { analytics_Storage: 'granted', ad_Storage: 'denied' });
    const script = doc.createElement('script');
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${projectId}`;
    script.dataset.cmpAb = '1'; // This loader enforces the specific vendor consent itself.
    doc.head.appendChild(script);
  };
  for (const event of ['settings', 'consent', 'consentapproved', 'consentrejected', 'consentcustom', 'vendorconsent', 'loadNotShowing']) {
    win.__cmp('addEventListener', [event, sync, false], null);
  }
  sync();
}

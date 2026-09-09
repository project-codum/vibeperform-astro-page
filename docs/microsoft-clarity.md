# Microsoft Clarity — vorbereitete Einbindung

Stand: 9. September 2026. Code vorbereitet, noch nicht aktiviert: Projekt-ID fehlt. Kein Produktions-Deployment in diesem Arbeitsschritt.

## Konfiguration zum Aktivieren

- Clarity-Projekt-ID als öffentliche GitHub-Variable `PUBLIC_CLARITY_PROJECT_ID` im bestehenden Production-Environment bzw. Repository hinterlegen. Der vorhandene Actions-Build übernimmt sie. Lokal kann `.env.local` die Variable enthalten; localhost bleibt trotzdem vom Tracking ausgeschlossen.
- In Consentmanager CMP 172783 den Anbieter **Microsoft Clarity, s2631** hinzufügen und dem passenden Analysezweck zuordnen. Die eigene Integration liest ausdrücklich diese Anbieter-Einwilligung; „alle akzeptiert“ ohne Anbieter-Eintrag reicht nicht.
- Clarity-Projekteinstellungen und Datenschutzhinweise DE/EN vor Aktivierung abstimmen. Die tatsächliche Projektkonfiguration, Aufbewahrung und Microsoft-Datenverarbeitung müssen in den Hinweisen zutreffend beschrieben werden. Noch keine Änderung der Live-CMP oder Microsoft-Kontoeinstellungen vorgenommen.
- Consentv2 wird durch den lokalen Adapter gesteuert (`analytics_Storage` nach Einwilligung, `ad_Storage` bleibt denied). Keine zusätzliche automatische Consent-Mode-Integration parallel einschalten, die diese Signale überschreibt.

## Verhalten

`ConsentManagerHead.astro` bindet Clarity zentral auf den bestehenden Seiten ein. Ohne gültige Projekt-ID, ohne CMP-Daten, ohne Zustimmung zu s2631 und außerhalb von vibeperform.com/www.vibeperform.com wird das Microsoft-Script nicht geladen. Bereits gespeicherte Einwilligung und spätere CMP-Änderungen werden berücksichtigt. Mehrere Events erzeugen keinen doppelten Loader.

Bei Widerruf werden beide Consentv2-Signale auf denied gesetzt und `clarity('stop')` aufgerufen. Consentv2 denied allein reicht nicht, weil Microsoft auch eine cookiearme Messung unterstützt. Auch ein Widerruf während des Script-Downloads wird in der Warteschlange berücksichtigt. Nach Widerruf bleibt das aktuelle Dokument gestoppt; die nächste Navigation prüft eine inzwischen erneut erteilte Zustimmung. Kein automatischer Reload, der Formulareingaben verlieren könnte.

Der gesamte Anfragebereich einschließlich dynamischer Zusammenfassung und Bestätigung ist mit `data-clarity-mask="true"` maskiert. Es gibt keine identify-Aufrufe und keine Übergabe von E-Mail, Freitext oder Anfragenummer als Tags/Events. Übliche Eingabefelder maskiert Clarity zusätzlich selbst. Querystrings dürfen unabhängig davon keine personenbezogenen Formularangaben enthalten.

## Fachliche Abgrenzung

Clarity zeigt Website-Nutzung, Heatmaps und Sitzungsaufzeichnungen. Die verfügbaren aggregierten Google-Suchbegriffe kommen aus Search Console. Keine Zuordnung einer bestimmten Google-Suche zu einer identifizierten Sitzung. Die Landingpage-Darstellung ist eine ausdrücklich markierte Illustration, kein Kundenbericht und keine bereits angebundene Analyse.

## Prüfung

Automatisierte Adaptertests: fehlende ID, Vorschau-Hostname, fehlende CMP-Daten, falscher Anbieter, Zustimmung, wiederholte Events, Widerruf vor SDK-Laden und nach SDK-Laden. Keine echten Microsoft-Anfragen in Tests. Ein End-to-End-Test mit tatsächlicher Projekt-ID und CMP-Konfiguration steht bis zur Bereitstellung aus.

## Primärquellen

- [Consentmanager: Clarity und Anbieter s2631](https://www.consentmanager.net/en/help/how-to-guides/working-with-microsoft-clarity-consent-mode/)
- [Consentmanager: Anbieter-Einwilligung prüfen](https://www.consentmanager.net/en/help/developer-reference/checking-consent-for-a-vendor/)
- [Microsoft Consent API v2](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2)
- [Microsoft Masking](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-masking)
- [Microsoft SDK stop](https://github.com/microsoft/clarity/blob/master/packages/clarity-js/src/clarity.ts)
- [Microsoft Hinweise zur Datenschutzerklärung](https://learn.microsoft.com/en-us/clarity/setup-and-installation/privacy-disclosure)

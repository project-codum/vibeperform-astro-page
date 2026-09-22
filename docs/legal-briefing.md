# Briefing: Impressum und Datenschutz

Stand: 2. Juli 2026

Dieses Briefing sammelt die internen Pruefpunkte zu Impressum und Datenschutzerklaerung. Diese Punkte gehoeren nicht als Hinweistext in die oeffentlichen Legal-Seiten, sollten aber vor oder nach der Veroeffentlichung fachlich nachgehalten werden.

## Was aus den oeffentlichen Texten entfernt wurde

- Die Pruefboxen "Vor Veroeffentlichung pruefen" und "Check before publication" wurden aus Impressum und Legal Notice entfernt.
- Der Hinweis, dass im Projekt keine erlaubnispflichtige oder berufsrechtlich reglementierte Taetigkeit erkennbar ist, wurde aus dem oeffentlichen Impressum entfernt und hierher verschoben.
- Platzhalter fuer Umsatzsteuer-ID, Wirtschafts-ID, "falls vorhanden" und "add if applicable" wurden entfernt. Solche Angaben sollten nur veroeffentlicht werden, wenn sie sicher vorliegen und einschlaegig sind.
- Interne Formulierungen wie "im Projekt erkennbar", "nach Projektangabe" und "repository" wurden aus den Datenschutztexten entfernt.
- Technische interne Kennungen wie Google-Analytics-Mess-ID, Script-URL des Consent-Managers und genaue Chat-iframe-URL bleiben aus der Datenschutzerklaerung heraus, weil sie fuer die Nutzerinformation nicht erforderlich sind.

## Oeffentlicher Stand vom 2. Juli 2026 (historisch)

- Impressum und Legal Notice nennen Codum GmbH als Diensteanbieter und Vertragspartner, die Anschrift Zeller Str. 29, D-82067 Ebenhausen, das Register Amtsgericht Muenchen HRB 272656, die Umsatzsteuer-ID DE351537139, Isabella Hoesch als Geschaeftsfuehrung, die Kontakt-E-Mail und die Google-Calendar-Terminbuchung.
- Die Datenschutzerklaerung nennt Codum GmbH als Verantwortliche und deckt GitHub Pages, consentmanager, Google Analytics, Google Calendar/Google Workspace, E-Mail-Kontakt, Cloud Run/Chat-iframe und Gemini API ab.
- Die Google-Analytics-Mess-ID wird weiterhin technisch in den Seiten verwendet, aber nicht als sichtbare Angabe in der Datenschutzerklaerung genannt.
- Die Datenschutzerklaerung enthaelt die nach Art. 13 DSGVO wesentlichen Punkte: Verantwortlicher, Zwecke, Rechtsgrundlagen, Kategorien verarbeiteter Daten, Empfaenger bzw. Anbieter, Drittlandbezug, Speicherdauer bzw. Kriterien, Freiwilligkeit, Betroffenenrechte, Widerruf und Beschwerderecht.

## Erledigte Betreiberentscheidungen

Betreiberfreigabe vom 2. Juli 2026: Codum GmbH teilte ihre Umsatzsteuer-ID mit und bestaetigte die damaligen Betreiber-TODOs. Diese Freigabe galt fuer Codum GmbH und ist keine Bestaetigung fuer den nunmehrigen Einzelunternehmer.

- [x] ERLEDIGT - Umsatzsteuer-ID oder Wirtschafts-ID pruefen: Umsatzsteuer-ID DE351537139 wurde in Impressum und Legal Notice aufgenommen.
- [x] ERLEDIGT - Reglementierte oder erlaubnispflichtige Taetigkeit bestaetigen.
- [x] ERLEDIGT - Schnelle Kontaktaufnahme final festlegen.
- [x] ERLEDIGT - Datenschutzbeauftragten-Pflicht pruefen.
- [x] ERLEDIGT - Auftragsverarbeitung und Anbieterunterlagen belegen. Fuer Cloud Run/Gemini liegt der technische CLI-Snapshot in `docs/legal-google-cloud-run-gemini-evidence.md`.
- [x] ERLEDIGT - Consent-Setup live testen.
- [x] ERLEDIGT - Kontakt-CTAs und E-Mail-Kontakt konsolidieren.
- [x] ERLEDIGT - Speicherfristen mit Anbieter-Konten abgleichen.

## Quellen fuer die Pruefung

- DDG § 5 zu den Impressumspflichten: https://www.gesetze-im-internet.de/ddg/__5.html
- TDDDG § 25 fuer Zugriff/Speicherung auf Endeinrichtungen: https://www.gesetze-im-internet.de/ttdsg/__25.html
- DSGVO Art. 12, Art. 13, Art. 28 und Art. 37 zu Informationspflichten, Auftragsverarbeitung und Datenschutzbeauftragtem: https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- BDSG § 38 zur Benennung eines Datenschutzbeauftragten: https://www.gesetze-im-internet.de/bdsg_2018/__38.html
- Google Analytics Datenaufbewahrung: https://support.google.com/analytics/answer/7667196
- Google Cloud Logging Aufbewahrung: https://docs.cloud.google.com/logging/quotas
- Gemini API Data Logging and Sharing: https://ai.google.dev/gemini-api/docs/logs-policy
- Google Workspace/Vault Retention: https://support.google.com/vault/answer/2990828
- Google Workspace Log-Retention: https://knowledge.workspace.google.com/admin/reports/data-retention-and-lag-times
- GitHub Privacy Statement: https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement

## Migration zum Einzelunternehmen am 22. September 2026

- Anbieter und Verantwortlicher: Marlon Dietrich, Einzelunternehmer unter dem Geschaeftsauftritt VibePerform, Brecherspitzstrasse 9, 81541 Muenchen; Kontakt: contact@vibeperform.com. Diese Angaben stammen aus der aktuellen Betreiberbestaetigung.
- Der Betreiber bestaetigte, dass ihm bisher keine eigene Umsatzsteuer-Identifikationsnummer oder Wirtschafts-Identifikationsnummer erteilt wurde. Die fruehere Umsatzsteuer-ID gehoerte zur Codum GmbH und wird daher nicht in die neuen Seiten uebernommen. Die persoenliche Steuernummer ist nicht im Impressum oder in diesem Briefing festgehalten.
- Die aktuelle Implementierung liefert statische Seiten ueber Cloudflare Workers mit Workers Static Assets aus. Das Anfrageformular sendet Daten an den Worker, der sie in Cloudflare D1 speichert und per Cloudflare Email an contact@vibeperform.com weiterleitet. Die D1-Datenbank hat laut Projektunterlagen den Standort-Hinweis WEUR; das ist keine Zusicherung zur Datenresidenz.
- Consentmanager wird zentral geladen. Google Analytics wird nach Einwilligung aktiviert. Die Website verlinkt auf eine Google-Calendar-Buchungsseite; sie bindet keinen Chat und keinen Kalender als iframe ein. Microsoft Clarity ist nur vorbereitet und mangels Projekt-ID nicht aktiviert.
- Anfrageangaben umfassen E-Mail, Vorhaben, Betriebsart, Schwerpunkt, Website, weitere Taetigkeitsangaben und Freitext. Die IP-Adresse wird fuer das Rate-Limit verarbeitet. Die Codebasis hat keine automatische Loeschfrist fuer D1-Anfragen; Anfragen muessen nach Abschluss manuell auf Erforderlichkeit und Loeschung geprueft werden, soweit keine Aufbewahrungspflicht oder erforderlichen Rechtsansprueche entgegenstehen.
- Die Anbieter-/Vertragslage fuer Cloudflare, Google (Workspace, Analytics und Calendar) und consentmanager sollte dem Einzelunternehmen zugeordnet und im Rahmen der Auftragsverarbeitungspruefung bestaetigt werden. Die Vertraege und Kontoeinstellungen sind in diesem Codeprojekt nicht vollstaendig einsehbar.

### Amtliche und Anbieterquellen fuer den neuen Stand

- DDG § 5 (Name, Anschrift, elektronische Kontaktangaben und USt-/Wirtschafts-ID, sofern vorhanden): https://www.gesetze-im-internet.de/ddg/__5.html
- MStV § 18 (redaktionelle Verantwortung): https://www.gesetze-bayern.de/Content/Document/MStV
- DSGVO Art. 13 (Datenschutzhinweise): https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng
- TDDDG § 25 (Speichern und Auslesen auf Endgeraeten): https://www.gesetze-im-internet.de/ttdsg/__25.html
- Cloudflare D1 Datenstandort: https://developers.cloudflare.com/d1/configuration/data-location/
- Google Analytics Datenaufbewahrung: https://support.google.com/analytics/answer/7667196
- Google EU-U.S. Data Privacy Framework: https://policies.google.com/privacy/frameworks
- Consentmanager Datenschutzhinweise: https://www.consentmanager.net/en/privacy/
- BayLDA Kontakt (Beschwerden fuer nicht-oeffentliche Stellen in Bayern): https://www.lda.bayern.de/de/kontakt.html

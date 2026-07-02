# Briefing: Impressum und Datenschutz

Stand: 2. Juli 2026

Dieses Briefing sammelt die internen Pruefpunkte zu Impressum und Datenschutzerklaerung. Diese Punkte gehoeren nicht als Hinweistext in die oeffentlichen Legal-Seiten, sollten aber vor oder nach der Veroeffentlichung fachlich nachgehalten werden.

## Was aus den oeffentlichen Texten entfernt wurde

- Die Pruefboxen "Vor Veroeffentlichung pruefen" und "Check before publication" wurden aus Impressum und Legal Notice entfernt.
- Der Hinweis, dass im Projekt keine erlaubnispflichtige oder berufsrechtlich reglementierte Taetigkeit erkennbar ist, wurde aus dem oeffentlichen Impressum entfernt und hierher verschoben.
- Platzhalter fuer Umsatzsteuer-ID, Wirtschafts-ID, "falls vorhanden" und "add if applicable" wurden entfernt. Solche Angaben sollten nur veroeffentlicht werden, wenn sie sicher vorliegen und einschlaegig sind.
- Interne Formulierungen wie "im Projekt erkennbar", "nach Projektangabe" und "repository" wurden aus den Datenschutztexten entfernt.
- Technische interne Kennungen wie Google-Analytics-Mess-ID, Script-URL des Consent-Managers und genaue Chat-iframe-URL bleiben aus der Datenschutzerklaerung heraus, weil sie fuer die Nutzerinformation nicht erforderlich sind.

## Aktueller oeffentlicher Stand

- Impressum und Legal Notice nennen Codum GmbH als Diensteanbieter und Vertragspartner, die Anschrift Zeller Str. 29, D-82067 Ebenhausen, das Register Amtsgericht Muenchen HRB 272656, die Umsatzsteuer-ID DE351537139, Isabella Hoesch als Geschaeftsfuehrung, die Kontakt-E-Mail und die Google-Calendar-Terminbuchung.
- Die Datenschutzerklaerung nennt Codum GmbH als Verantwortliche und deckt GitHub Pages, consentmanager, Google Analytics, Google Calendar/Google Workspace, E-Mail-Kontakt, Cloud Run/Chat-iframe und Gemini API ab.
- Die Google-Analytics-Mess-ID wird weiterhin technisch in den Seiten verwendet, aber nicht als sichtbare Angabe in der Datenschutzerklaerung genannt.
- Die Datenschutzerklaerung enthaelt die nach Art. 13 DSGVO wesentlichen Punkte: Verantwortlicher, Zwecke, Rechtsgrundlagen, Kategorien verarbeiteter Daten, Empfaenger bzw. Anbieter, Drittlandbezug, Speicherdauer bzw. Kriterien, Freiwilligkeit, Betroffenenrechte, Widerruf und Beschwerderecht.

## Erledigte Betreiberentscheidungen

Betreiberfreigabe vom 2. Juli 2026: Codum GmbH hat die Umsatzsteuer-ID DE351537139 mitgeteilt und alle weiteren Betreiber-TODOs als erledigt bestaetigt. Die oeffentlichen Legal-Seiten wurden entsprechend finalisiert.

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

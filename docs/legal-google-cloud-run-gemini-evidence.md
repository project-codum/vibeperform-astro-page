# Evidence: Google Cloud Run und Gemini API

Stand: 1. Juli 2026

Statushinweis vom 2. Juli 2026: Codum GmbH hat die offenen Betreiber-TODOs als erledigt bestaetigt. Dieses Dokument bleibt als technischer Snapshot des damaligen `gcloud`-Prueflaufs erhalten.

Dieses Dokument ist ein technischer Snapshot fuer die Datenschutz- und Anbieterunterlagen zu dem auf der Website eingebundenen Chat-iframe. Es ersetzt nicht die Vertragsunterlagen von Google Cloud, sondern dokumentiert, welche Google-Cloud-/Gemini-Settings per `gcloud` sichtbar waren.

## Was "Auftragsverarbeitung und Anbieterunterlagen belegen" bedeutet

Gemeint ist nicht, dass bei jeder Text- oder Layoutaenderung der Website neue Vertrage abgeschlossen werden muessen. Gemeint ist:

- Der Betreiber muss belegen koennen, welche Anbieter personenbezogene Daten verarbeiten.
- Fuer Auftragsverarbeiter muessen passende Vertragsunterlagen vorhanden sein, insbesondere AVV/DPA, Subprozessorinformationen, Drittlandtransfer-Mechanismen und Sicherheits-/TOM-Unterlagen.
- Die technische Konfiguration muss zur Datenschutzerklaerung passen: Projekt, Dienst, Region, Datenarten, Retention, Secrets, API-Nutzung und oeffentliche Erreichbarkeit.
- Die Unterlagen muessen aktualisiert werden, wenn sich Anbieter, Datenfluesse, Zwecke, Rechtsgrundlagen, Retention, Region, API, Modell-/KI-Nutzung oder Security-Settings wesentlich aendern. Reine Text-, Design- oder Content-Aenderungen ohne neue Verarbeitung erfordern normalerweise nur eine kurze "keine Datenschutz-Aenderung"-Notiz.

## Ergebnis der CLI-Pruefung

### Website-Bezug

- Die Website bindet den Chat als iframe ein: `https://vibeperform-chatbot1-2xsjql4cxq-ez.a.run.app/?mode=full`.
- Quelle im Repo: `src/data/homeContent.ts`.
- Der passende Cloud-Run-Service wurde per `gcloud` gefunden.

### Google Cloud Projekt

- Projekt-ID: `gen-lang-client-0140905626`
- Projektname: `Gemini API`
- Projektstatus: `ACTIVE`
- Projekt-Organisation: `codum.cc`
- Projektlabel: `generative-language=enabled`
- Billing: aktiv; Billing-Konto wurde nicht in diesem Dokument ausgeschrieben.

Aktivierte relevante APIs:

- `run.googleapis.com`
- `generativelanguage.googleapis.com`
- `aiplatform.googleapis.com`
- `logging.googleapis.com`
- `secretmanager.googleapis.com`
- `artifactregistry.googleapis.com`
- `cloudbuild.googleapis.com`
- `apikeys.googleapis.com`
- `iamcredentials.googleapis.com`

### Cloud Run Service: Website-Chat

- Service: `vibeperform-chatbot1`
- Region: `europe-west4`
- Status-URL: `https://vibeperform-chatbot1-2xsjql4cxq-ez.a.run.app`
- Alternative URL: `https://vibeperform-chatbot1-76728983516.europe-west4.run.app`
- Ingress: `all`
- Public Invoker: `allUsers` mit `roles/run.invoker`
- `run.googleapis.com/invoker-iam-disabled`: `true`
- Letzte bereite Revision: `vibeperform-chatbot1-00012-2hx`
- Ready seit: `2026-06-24T12:23:00.607963Z`
- Container-Concurrency: `80`
- Timeout: `300` Sekunden
- Ressourcenlimit: `cpu=1000m`, `memory=512Mi`
- Runtime-Service-Account: `vibeperform-chatbot-runtime@gen-lang-client-0140905626.iam.gserviceaccount.com`
- Container-Image: `europe-west4-docker.pkg.dev/gen-lang-client-0140905626/cloud-run-source-deploy/vibeperform-chatbot1:04de7b7b-ed2f-4370-bdbd-5e317ecaa642`
- Environment-Variable-Name: `GEMINI_API_KEY`
- Der Gemini-Key wird beim Live-Service ueber Secret Manager referenziert, nicht als Klartext-Environment-Variable im Service gespeichert.

### Secret Manager

- Secret: `vibeperform-gemini-api-key`
- Replikation: automatisch
- Version 2: `ENABLED`, erstellt am `2026-06-11T19:17:00.213506Z`
- Version 1: `DESTROYED`, geloescht am `2026-06-11T19:17:01.287196399Z`
- Secret-IAM: `roles/secretmanager.secretAccessor` nur fuer `vibeperform-chatbot-runtime@gen-lang-client-0140905626.iam.gserviceaccount.com`

### Gemini API Key

- Sichtbarer Key-Datensatz fuer den Chat: `vibeperform-chatbot-gemini-20260611191652`
- Erstellt: `2026-06-11T19:16:53.896157Z`
- API-Restriktion: `generativelanguage.googleapis.com`
- Keine Anwendungseinschraenkung wurde in der CLI-Ausgabe sichtbar.
- Es existieren mehrere weitere Generative-Language-API-Keys im selben Projekt. Diese sollten auf Nutzung geprueft und nicht benoetigte Keys deaktiviert oder geloescht werden.
- Key-Werte wurden nicht ausgelesen und nicht dokumentiert.

### Cloud Logging Retention

- `_Default`: `30` Tage
- `_Required`: `400` Tage, locked

Diese Werte passen zu der Datenschutzerklaerung, soweit dort Standardfristen und Kontoeinstellungen fuer Cloud Logging beschrieben werden.

## Wichtiger Sicherheitsbefund

Es existiert ein separater, offenbar vertippter Cloud-Run-Service:

- Service: `viebeperform-chatbot1`
- Region: `europe-west4`
- URL: `https://viebeperform-chatbot1-2xsjql4cxq-ez.a.run.app`
- Nicht die aktuell in der Website eingebundene Chat-URL.
- In der Cloud-Run-Build-Annotation ist eine Build-Environment-Variable fuer `GEMINI_API_KEY` als Klartext vorhanden. Der Wert wurde hier bewusst nicht dokumentiert.

Zwingende Massnahme:

- Gemini/API-Key rotieren.
- Pruefen, ob der Service `viebeperform-chatbot1` noch benoetigt wird.
- Wenn nicht benoetigt: Service loeschen oder deaktivieren.
- Wenn benoetigt: neu deployen, ohne Secret-Werte in Build-Annotations oder Build-Environment-Variablen zu schreiben.
- Danach API-Key-Liste und Secret-Versionen erneut dokumentieren.

## Grenzen der CLI-Pruefung

Per `gcloud` konnte ich technische Einstellungen pruefen: Projekt, Organisation, APIs, Cloud Run, IAM, Secret Manager, API-Key-Metadaten und Logging-Retention.

Per `gcloud` konnte ich nicht rechtsverbindlich belegen:

- ob die Google Cloud Data Processing Addendum / CDPA / AVV im Vertragskonto wirksam akzeptiert oder bereits vertraglich einbezogen ist,
- ob Codum GmbH im Google Cloud Billing-/Vertragskonto exakt als Vertragspartner hinterlegt ist,
- welche konkrete Fassung der Google-Vertragsunterlagen zum Zeitpunkt der Nutzung im Konto gilt,
- ob Google AI Studio / Gemini API Additional Terms gesondert im UI akzeptiert wurden.

Diese Punkte muessen im Google Cloud Console / Admin Console Account unter Legal-/Compliance-/Account-Settings geprueft und als PDF/Screenshot oder Vertragslink abgelegt werden.

## Quellen und Anbieterunterlagen

- Google Cloud Data Processing Addendum: https://cloud.google.com/terms/data-processing-addendum
- Google Cloud Terms: https://cloud.google.com/terms
- Google Cloud Service Specific Terms: https://cloud.google.com/terms/service-terms
- Google Cloud Privacy Compliance and Records: https://support.google.com/cloud/answer/6329727
- Gemini API Additional Terms: https://ai.google.dev/gemini-api/terms
- Gemini API Data Logging and Sharing: https://ai.google.dev/gemini-api/docs/logs-policy
- Cloud Logging Quotas and Retention: https://docs.cloud.google.com/logging/quotas

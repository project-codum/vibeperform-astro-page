---
layout: "../../../layouts/BlogPostLayout.astro"
title: "PHP2Shell: Was die PHP-Sicherheitslücke für Ihre Webseite bedeutet"
seoTitle: "PHP2Shell: PHP-Sicherheitslücke verständlich erklärt"
kicker: "Sicherheit verständlich erklärt"
category: "website"
draft: false
websiteQuestionnaire: true
date: "2026-10-23"
lastModified: "2026-10-23"
author: "Marlon Dietrich"
authorType: "Person"
authorHref: "/de/ueber-uns/"
readTime: "4 Min. Lesezeit"
showExcerpt: false
excerpt: "PHP2Shell verständlich erklärt: Was hinter der PHP-Sicherheitslücke steckt, welche Rolle KI spielt und was das für Ihre Webseite bedeutet."
lang: "de"
coverImage: "/blog/php2shell/php2shell-wartung-1440.webp"
coverImageWebpSrcset: "/blog/php2shell/php2shell-wartung-640.webp 640w, /blog/php2shell/php2shell-wartung-960.webp 960w, /blog/php2shell/php2shell-wartung-1440.webp 1440w"
coverImageAlt: "Illustration eines Türschloss-Modells mit Laptop und Werkzeug auf einem hellen Arbeitstisch"
coverImageWidth: 1440
coverImageHeight: 810
coverImageDisclosure: "KI-generierte Illustration"
socialImage: "/blog/php2shell/php2shell-og-1200x630.jpg"
ctaTitle: "Zuständigkeiten für Ihre Webseite klären"
ctaBody: "Inhaltliche Pflege, technische Wartung und Weiterentwicklung brauchen einen klar vereinbarten Umfang. Lesen Sie, wie wir die Betreuung Ihrer Webseite planen."
ctaButtonText: "Webseiten-Betreuung ansehen"
ctaHref: "/de/website-betreuung/"
---

**Die PHP-Sicherheitslücke ist ernst**, aber sie bedeutet nicht automatisch, dass Ihre Webseite gehackt wurde. Sicherheitsupdates sind verfügbar. Lassen Sie Ihren Hoster oder technischen Betreuer prüfen, ob Ihre Webseite betroffen ist und ob die Korrekturen bereits aktiv sind.

Damit kennen Sie den wichtigsten ersten Schritt. Doch zwischen Meldungen über „**70 Prozent des Internets**“ und Warnungen vor KI-Angriffen bleibt oft unverständlich, was eigentlich passiert ist. Lassen Sie uns **nun die Zusammenhänge verstehen**, um solche Nachrichten besser einordnen zu können.

## Was ist PHP2Shell und warum betrifft das so viele Webseiten?

PHP2Shell bezeichnet zwei kritische Sicherheitslücken in PHP. Diese Programmiersprache arbeitet im Hintergrund vieler Webseiten, beispielsweise bei WordPress, Joomla oder Drupal. Die Schwachstellen können Angreifern ermöglichen, ohne Anmeldung eigene Befehle auf einem betroffenen System auszuführen. [Technischer Hintergrund beim PHP-Projekt](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w).

**Vereinfacht gesagt:** Sie sehen beim Aufrufen einer Webseite Texte, Bilder und Formulare. Auf dem Server, dem Rechner hinter der Webseite, sorgt Software wie PHP dafür, dass Inhalte verarbeitet und ausgeliefert werden. Ein Fehler darin kann deshalb viele unterschiedliche Webseiten betreffen, selbst wenn sie ganz verschieden aussehen.

Die PHP-Entwickler haben am 21. Oktober 2026 Sicherheitsupdates veröffentlicht. Für Betreiber kommt es darauf an, dass diese Korrekturen auch auf dem tatsächlich genutzten Server installiert und aktiv sind. [Sicherheitsmitteilung des PHP-Projekts](https://www.php.net/archive/2026.php#2026-10-21-5).

Ergänzung vom 23. Oktober 2026: PHP hat einen weiteren Sicherheitshinweis für eine ungewöhnliche Kombination von Einstellungen und Anwendungscode veröffentlicht. Lassen Sie Ihren Hoster auch diesen Hinweis berücksichtigen. [Aktueller Hinweis des PHP-Projekts](https://www.php.net/archive/2026.php).

## Wurden wirklich 70 Prozent des Internets gehackt?

**Nein.** Diese häufig genannte Zahl belegt keine erfolgreichen Angriffe. W3Techs untersucht, welche Technologien Webseiten verwenden, und veröffentlicht dazu Statistiken. Am 23. Oktober 2026 lag der PHP-Anteil dort bei 69,3 Prozent der Webseiten, deren serverseitige Programmiersprache W3Techs erkennen konnte. **Die Zahl beschreibt also die Verbreitung von PHP** in dieser untersuchten Gruppe, nicht den Anteil gehackter Webseiten. [PHP-Statistik von W3Techs](https://w3techs.com/technologies/details/pl-php).

Ein Türschloss macht den Unterschied anschaulich: Wird bei einem weit verbreiteten Schloss ein Fehler entdeckt, müssen betroffene Eigentümer handeln. Wie viele Gebäude dieses Schloss haben, sagt aber nicht, in wie viele bereits eingebrochen wurde.

Bei Webseiten gilt dasselbe. Eine verwundbare Installation, ein Angriffsversuch und ein erfolgreicher Einbruch sind verschiedene Dinge. Die große Verbreitung von PHP erklärt, warum die Warnung so viele Betreiber erreicht. Sie liefert keine weltweite Schadensbilanz.

### Abstufungen: von der Schwachstelle bis zum Einbruch

<div class="security-concepts" role="list" aria-label="Drei unterschiedliche Aussagen in Sicherheitsmeldungen">
  <div class="security-concept" role="listitem"><span class="security-concept-number" aria-hidden="true">01</span><h3>Schwachstelle</h3><p>Die Software hat einen Fehler, der einen Angriff ermöglichen kann.</p></div>
  <div class="security-concept" role="listitem"><span class="security-concept-number" aria-hidden="true">02</span><h3>Angriffsversuch</h3><p>Jemand versucht, diesen Fehler auszunutzen. Der Erfolg ist damit offen.</p></div>
  <div class="security-concept" role="listitem"><span class="security-concept-number" aria-hidden="true">03</span><h3>Erfolgreicher Einbruch</h3><p>Unbefugter Zugriff ist tatsächlich gelungen.</p></div>
</div>

## Welche Rolle spielt künstliche Intelligenz bei den Angriffen?

**KI half** Sicherheitsforschern, die **Lücken zu finden** und ihre Ausnutzbarkeit nachzuweisen. Dabei kamen auch Modelle von OpenAI zum Einsatz: Laut OpenAI entdeckte das Sicherheitsforschungsteam Calif eine kritische Schwachstelle mithilfe von **GPT-5.6 Sol** im Rahmen der Initiative „Patch the Planet“. [Bericht von OpenAI](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/).

Unabhängig davon untersuchte **Wiz**, ein Anbieter von Sicherheitssoftware für Cloud-Systeme, die Lücken. Wiz nennt dafür **Gemini 4 Argon von Google und GPT-5.6 Sol von OpenAI**. Die Modelle halfen bei der Untersuchung, der Entwicklung und Anpassung von Testangriffen sowie der Prüfung von Korrekturen. KI kann damit sowohl Angriffe erleichtern als auch die Abwehr unterstützen. [Forschungsbericht von Wiz](https://www.wiz.io/blog/php2shell-php-rce).

**Das verändert vor allem das Tempo:** Arbeit, für die viel Spezialwissen und wiederholtes Ausprobieren nötig ist, lässt sich teilweise beschleunigen. Daraus folgt jedoch nicht, dass hinter jedem beobachteten Angriff ein selbstständig handelnder KI-Agent steckt.

Dass die **Gefahr relevant ist**, zeigt ein Bericht des Cloud-Anbieters Amazon Web Services (AWS). Das Unternehmen beobachtete bereits am 17. Oktober 2026 einen Angriffsversuch gegen seine Überwachungssysteme, also vor der öffentlichen Veröffentlichung der Korrekturen. Ob diese frühen Versuche auf realen Systemen erfolgreich gewesen wären, war laut AWS unklar. [Beobachtungen von AWS](https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/).

Für uns **bei VibePerform** folgt daraus: **Auch Entwicklung und Wartung müssen mit diesem Tempo Schritt halten.** Unser Ansatz sind kurze Entwicklungs- und Updatezyklen, aktuelle Frameworks und eine schlanke technische Architektur mit möglichst wenigen unnötigen Abhängigkeiten im laufenden Betrieb. Das Ziel ist, Änderungen in überschaubaren Schritten prüfen und bereitstellen zu können. Sicherheitskorrekturen dürfen dabei nicht auf den nächsten großen Umbau warten. Das Alter einer Programmiersprache allein entscheidet jedoch nicht über Sicherheit; auch moderne Systeme brauchen Wartung. Welche laufenden Aufgaben wir übernehmen, wird für die jeweilige Webseite vereinbart.

Für Sie als Betreiber ist deshalb weniger entscheidend, welches Werkzeug ein Angreifer verwendet. Entscheidend ist, ob die betroffene Software Ihrer Webseite rechtzeitig geschützt wurde.

## Woran erkenne ich, ob meine Webseite betroffen ist?

Am Aussehen Ihrer Webseite lässt sich das nicht erkennen. Entscheidend sind die eingesetzte Servertechnik und die installierten Sicherheitskorrekturen. Diese Auskunft kann Ihr Hoster oder die für die technische Wartung zuständige Person geben.

Ein aktuelles WordPress oder ein aktualisiertes Plugin beantwortet die Frage noch nicht. Die Lücken liegen in der darunterliegenden PHP-Software. Ebenso ersetzt eine Firewall, die verdächtige Zugriffe herausfiltert, das notwendige PHP-Update nicht. [Hinweise von Cloudflare](https://blog.cloudflare.com/php-vulnerabilities-waf-protection).

WordPress.com bestätigt ausdrücklich, dass die bei ihm gehosteten Webseiten gegen diese beiden PHP-Lücken geschützt sind. Eine solche Schutzbestätigung gilt allerdings nicht automatisch für WordPress-Webseiten bei anderen Hostern. [Hinweise von WordPress.com](https://wordpress.com/support/php-security-update-october-2026-cve-2026-109618-and-cve-2026-109619-php2shell/).

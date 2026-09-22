import { bookingUrl, contactEmail } from '../lib/siteMetadata';
import { homeContent } from './homeContent';

const lastUpdatedDe = '22. September 2026';
const lastUpdatedEn = '22 September 2026';

export const legalContent = {
	de: {
		imprint: {
			nav: homeContent.de.nav,
			metaTitle: 'Impressum - Vibeperform',
			metaDescription: 'Impressum und Anbieterkennzeichnung von Vibeperform.',
			kicker: 'Rechtliches',
			title: 'Impressum',
			intro: [
				'Angaben nach § 5 Digitale-Dienste-Gesetz (DDG).',
				'VibePerform ist der Geschäftsauftritt von Marlon Dietrich als Einzelunternehmer.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: 'Diensteanbieter',
					paragraphs: [
						'Marlon Dietrich',
						'VibePerform',
						'Brecherspitzstraße 9',
						'81541 München',
						'Deutschland',
						'Einzelunternehmer',
					],
				},
				{
					title: 'Kontakt',
					paragraphs: [
						`E-Mail: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
						`Terminbuchung: <a href="${bookingUrl}" target="_blank" rel="noreferrer noopener">${bookingUrl}</a>`,
					],
				},
				{
					title: 'Verantwortlich für redaktionelle Inhalte',
					paragraphs: ['Marlon Dietrich, Anschrift wie oben.'],
				},
				{
					title: 'Tätigkeit',
					paragraphs: [
						'VibePerform bietet Leistungen rund um Unternehmenswebsites und Google-Unternehmensprofile an, darunter Erstellung, Betreuung, Suchmaschinenoptimierung, Inhalte und Grafiken. KI-Beratung ergänzt das Angebot.',
					],
				},
				{
					title: 'Verbraucherstreitbeilegung',
					paragraphs: [
						'Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.',
					],
				},
				{
					title: 'Haftung für eigene Inhalte und externe Links',
					paragraphs: [
						'Als Diensteanbieter sind wir für eigene Inhalte nach den allgemeinen Gesetzen verantwortlich. Externe Links prüfen wir bei Einbindung sorgfältig; für Inhalte externer Seiten sind ausschließlich deren Betreiber verantwortlich.',
						'Sollten rechtswidrige Inhalte über verlinkte Seiten bekannt werden, entfernen wir die entsprechenden Links nach Prüfung.',
					],
				},
			],
			updatedLabel: 'Stand',
			updated: lastUpdatedDe,
		},
		privacy: {
			nav: homeContent.de.nav,
			metaTitle: 'Datenschutzerklärung - Vibeperform',
			metaDescription:
				'Datenschutzerklärung von VibePerform für Website, Anfrageformular, Terminbuchung und Analyse-Dienste.',
			kicker: 'Datenschutz',
			title: 'Datenschutzerklärung',
			intro: [
				'Diese Datenschutzerklärung erklärt, wie personenbezogene Daten auf der Website von VibePerform verarbeitet werden.',
				'Sie umfasst den Websitebetrieb, das Anfrageformular, consentmanager, Google Analytics und die verlinkte Terminbuchung.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: '1. Verantwortlicher',
					paragraphs: [
						'Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
						'Marlon Dietrich<br />VibePerform<br />Brecherspitzstraße 9<br />81541 München<br />Deutschland',
						`E-Mail: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
					],
				},
				{
					title: '2. Websitebetrieb über Cloudflare',
					paragraphs: [
						'Die Website wird über Cloudflare Workers mit Workers Static Assets bereitgestellt. Cloudflare, Inc. und verbundene Unternehmen, darunter Cloudflare Germany GmbH, verarbeiten beim Aufruf technische Verbindungs- und Zugriffsdaten wie IP-Adresse, Zeitpunkt, angeforderte URL sowie Browser- und Geräteinformationen, um die Website auszuliefern und vor Missbrauch zu schützen.',
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im sicheren und zuverlässigen Betrieb der Website.',
						'Cloudflare betreibt ein globales Netzwerk; eine Verarbeitung außerhalb des Europäischen Wirtschaftsraums kann daher nicht ausgeschlossen werden. Cloudflares veröffentlichter Auftragsverarbeitungszusatz sieht für erforderliche Drittlandübermittlungen Standardvertragsklauseln vor. Welche Vertragsfassung für das Kundenkonto gilt, richtet sich nach dem dort geschlossenen Vertrag. Weitere Informationen: <a href="https://www.cloudflare.com/de-de/privacypolicy/" target="_blank" rel="noreferrer noopener">Cloudflare-Datenschutzhinweise</a> und <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noreferrer noopener">Cloudflare-Auftragsverarbeitungszusatz</a>.',
					],
				},
				{
					title: '3. Consent-Management',
					paragraphs: [
						'Wir verwenden consentmanager, um Ihre Auswahl zu Cookies und einwilligungsabhängigen Diensten abzufragen, zu speichern und umzusetzen. Dabei können Auswahl, Zeitpunkt, eine technische Kennung und Geräteinformationen verarbeitet werden.',
						'Rechtsgrundlage für die Einwilligungsverwaltung ist Art. 6 Abs. 1 lit. c DSGVO, soweit der Nachweis erteilter oder verweigerter Einwilligungen erforderlich ist, und Art. 6 Abs. 1 lit. f DSGVO für die technische Verwaltung. Das Speichern oder Auslesen von Informationen auf Ihrem Endgerät richtet sich zusätzlich nach § 25 TDDDG.',
						'Anbieter ist consentmanager AB in Schweden; vertrieben und vermarktet wird das Produkt auch durch consentmanager GmbH in Deutschland. Der Anbieter beschreibt die Verarbeitung für seine CMP-Kunden als Auftragsverarbeitung. Die Speicherdauer richtet sich nach den eingerichteten Einwilligungs- und Kontoeinstellungen. Weitere Informationen: <a href="https://www.consentmanager.net/en/privacy/" target="_blank" rel="noreferrer noopener">Datenschutzhinweise von consentmanager</a>.',
					],
				},
				{
					title: '4. Google Analytics',
					paragraphs: [
						'Diese Website verwendet Google Analytics. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.',
						'Wir verwenden Google Analytics, um die Nutzung der Website auszuwerten. Dazu können Seitenaufrufe, technische Geräte- und Browserinformationen sowie Interaktionen mit Links und Formularen verarbeitet werden. Die erfassten Interaktionen enthalten Bezeichnungen und Positionen von Schaltflächen, jedoch keine eingegebenen Formularinhalte.',
						'Google Analytics wird erst geladen, wenn Sie im Consent-Tool zugestimmt haben. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Sie können Ihre Einwilligung jederzeit über die Einstellungen des Consent-Tools mit Wirkung für die Zukunft widerrufen.',
						'Empfänger ist Google Ireland Limited. Eine Verarbeitung durch Google-Unternehmen in Drittländern, insbesondere den USA, kann nicht ausgeschlossen werden. Google verweist für Übermittlungen auf geeignete Garantien und seine Zertifizierung unter dem EU-U.S. Data Privacy Framework. Weitere Informationen: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noreferrer noopener">Google-Datenschutzerklärung</a>.',
						'Die Dauer der ereignisbezogenen Speicherung richtet sich nach der Einstellung der eingesetzten Google-Analytics-Property. Aggregierte Berichte können davon unabhängig länger verfügbar sein.',
					],
				},
				{
					title: '5. Terminbuchung über Google Calendar',
					paragraphs: [
						'Die Website verlinkt auf eine Google-Calendar-Buchungsseite; der Kalender ist nicht in die Website eingebettet. Erst wenn Sie den Link öffnen, verarbeitet Google Ihre Zugriffsdaten und die von Ihnen eingegebenen Buchungsdaten.',
						'Wenn Sie einen Termin buchen, verarbeiten wir die Angaben, die für Vorbereitung, Durchführung und Nachbereitung des Gesprächs erforderlich sind. Dazu können Name, E-Mail-Adresse, Terminzeit, Organisation, Anliegen und sonstige freiwillige Angaben gehören.',
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn die Buchung zur Anbahnung oder Durchführung einer Zusammenarbeit erfolgt; ergänzend Art. 6 Abs. 1 lit. f DSGVO für effiziente Terminplanung und Kommunikation.',
						'Google-Calendar-Termine bleiben standardmäßig im Google-Workspace-/Google-Konto gespeichert, bis sie durch uns, durch einen Administrator oder nach den dort eingerichteten Lösch- und Aufbewahrungsregeln gelöscht werden. Wenn Google Vault oder eigene Aufbewahrungsregeln verwendet werden, gelten diese Regeln vorrangig.',
					],
				},
				{
					title: '6. E-Mail-Kontakt',
					paragraphs: [
						`Wenn Sie uns per E-Mail an <a href="mailto:${contactEmail}">${contactEmail}</a> kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, den Inhalt der Nachricht und die dabei anfallenden technischen Metadaten. Die Nachricht wird in dem E-Mail-Dienst verarbeitet, den Sie und wir für den Versand und Empfang nutzen.`,
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Nachricht auf einen Vertrag oder eine vorvertragliche Anfrage gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO, weil wir berechtigte Anfragen beantworten.',
					],
				},
				{
					title: '7. Anfrageformular',
					paragraphs: [
						'Wenn Sie das Anfrageformular absenden, verarbeiten wir die von Ihnen angegebenen Kontaktdaten und Angaben zum Vorhaben: E-Mail-Adresse, gewünschte Website-Leistung, Betriebsart, Schwerpunkt, Website-Adresse, gegebenenfalls weitere Tätigkeitsangaben und Freitext. Die Anfrage wird in einer Cloudflare-D1-Datenbank gespeichert und zur Bearbeitung per E-Mail an contact@vibeperform.com weitergeleitet. Cloudflare verarbeitet außerdem die IP-Adresse für den Schutz vor missbräuchlichen Anfragen.',
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf vorvertragliche Maßnahmen oder einen Vertrag gerichtet ist, und im Übrigen Art. 6 Abs. 1 lit. f DSGVO für die Bearbeitung und Beantwortung geschäftlicher Anfragen. Empfänger für Speicherung und Versand sind Cloudflare, Cloudflare Email Service und Google Workspace für den Empfang der Nachricht.',
						'Wir verwenden die Angaben nur für die Bearbeitung der Anfrage und bewahren sie so lange auf, wie dies dafür erforderlich ist. Danach löschen wir sie, soweit keine gesetzlichen Aufbewahrungspflichten oder erforderliche Rechtsansprüche entgegenstehen. Eine Anfrage lässt sich auch direkt per E-Mail stellen.',
					],
				},
				{
					title: '8. Speicherdauer und Löschung',
					paragraphs: [
						'Wir speichern personenbezogene Daten nur so lange, wie es für den genannten Zweck erforderlich ist. Anfragen und Buchungsangaben löschen wir, sobald die Bearbeitung abgeschlossen ist und keine gesetzlichen Aufbewahrungspflichten oder erforderlichen Rechtsansprüche entgegenstehen. Für Anbieter-Dienste gelten zusätzlich deren jeweilige Einstellungen und Fristen.',
						'Geschäftliche Korrespondenz und Vertragsunterlagen bewahren wir auf, soweit gesetzliche handels- oder steuerrechtliche Aufbewahrungspflichten bestehen. Google-Analytics-Daten werden nach der für die Property eingestellten Frist gelöscht; aggregierte Berichte können länger bestehen bleiben.',
					],
				},
				{
					title: '9. Freiwilligkeit und automatisierte Entscheidungen',
					paragraphs: [
							'Die Nutzung von Terminbuchung, E-Mail-Kontakt und Anfrageformular ist freiwillig. Ohne die erforderlichen Angaben können wir die jeweilige Anfrage nicht bearbeiten.',
						'Eine automatisierte Entscheidungsfindung mit rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung findet nicht statt.',
					],
				},
				{
					title: '10. Ihre Rechte',
					paragraphs: [
						'Sie haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Soweit eine Verarbeitung auf Einwilligung beruht, können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.',
						'Außerdem können Sie sich bei einer Datenschutzaufsichtsbehörde beschweren. Für nicht-öffentliche Stellen in Bayern ist dies das <a href="https://www.lda.bayern.de/de/kontakt.html" target="_blank" rel="noreferrer noopener">Bayerische Landesamt für Datenschutzaufsicht (BayLDA)</a>.',
					],
				},
			],
			updatedLabel: 'Stand',
			updated: lastUpdatedDe,
		},
	},
	en: {
		legalNotice: {
			nav: homeContent.en.nav,
			metaTitle: 'Legal Notice - Vibeperform',
			metaDescription: 'Legal notice and provider identification for Vibeperform.',
			kicker: 'Legal',
			title: 'Legal Notice',
			intro: [
				'Information according to Section 5 of the German Digital Services Act (DDG).',
				'VibePerform is the business name used by Marlon Dietrich as a sole proprietor.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: 'Provider',
					paragraphs: [
						'Marlon Dietrich',
						'VibePerform',
						'Brecherspitzstraße 9',
						'81541 Munich',
						'Germany',
						'Sole proprietor',
					],
				},
				{
					title: 'Contact',
					paragraphs: [
						`Email: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
						`Appointment booking: <a href="${bookingUrl}" target="_blank" rel="noreferrer noopener">${bookingUrl}</a>`,
					],
				},
				{
					title: 'Responsible for editorial content',
					paragraphs: ['Marlon Dietrich, address as above.'],
				},
				{
					title: 'Business activity',
					paragraphs: [
						'VibePerform provides services for business websites and Google Business Profiles, including website creation, maintenance, search engine optimisation, content and graphics. AI consulting complements these services.',
					],
				},
					{
					title: 'Consumer dispute resolution',
					paragraphs: [
						'We are neither willing nor obliged to participate in dispute resolution proceedings before a consumer arbitration board.',
					],
				},
				{
					title: 'Responsibility for content and external links',
					paragraphs: [
						'As a service provider we are responsible for our own content under general law. External links are checked carefully when added; the operators of linked pages remain solely responsible for their content.',
						'If unlawful linked content becomes known, we will review and remove the respective links.',
					],
				},
			],
			updatedLabel: 'Last updated',
			updated: lastUpdatedEn,
		},
		privacy: {
			nav: homeContent.en.nav,
			metaTitle: 'Privacy Policy - Vibeperform',
			metaDescription:
				'Privacy policy for the VibePerform website, inquiry form, appointment booking and analytics services.',
			kicker: 'Privacy',
			title: 'Privacy Policy',
			intro: [
				'This Privacy Policy explains how personal data is processed on the VibePerform website.',
				'It covers website operation, the inquiry form, consentmanager, Google Analytics and the linked appointment booking service.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: '1. Controller',
					paragraphs: [
						'The controller within the meaning of the GDPR is:',
						'Marlon Dietrich<br />VibePerform<br />Brecherspitzstraße 9<br />81541 Munich<br />Germany',
						`Email: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
					],
				},
				{
						title: '2. Website operation via Cloudflare',
					paragraphs: [
						'The website is delivered through Cloudflare Workers with Workers Static Assets. Cloudflare, Inc. and its affiliates, including Cloudflare Germany GmbH, process technical connection and access data such as your IP address, request time, requested URL, and browser and device information to deliver the website and protect it from abuse.',
						'The legal basis is Art. 6(1)(f) GDPR. Our legitimate interest is the secure and reliable operation of the website.',
						'Cloudflare operates a global network, so processing outside the European Economic Area cannot be ruled out. Cloudflare’s published data processing addendum provides for Standard Contractual Clauses where required for restricted international transfers. The contract version applicable to a customer account depends on the agreement in place. More information: <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noreferrer noopener">Cloudflare Privacy Policy</a> and <a href="https://www.cloudflare.com/cloudflare-customer-dpa/" target="_blank" rel="noreferrer noopener">Cloudflare Data Processing Addendum</a>.',
					],
				},
				{
					title: '3. Consent management',
					paragraphs: [
						'We use consentmanager to ask for, record and implement your choices about cookies and services that require consent. Data may include your choice, the time of the choice, a technical identifier and device information.',
						'The legal basis for consent management is Art. 6(1)(c) GDPR insofar as evidence of consent or refusal is required, and Art. 6(1)(f) GDPR for technical administration. Storing or accessing information on your device is also subject to Section 25 TDDDG.',
						'The provider is consentmanager AB in Sweden; the product is also distributed and marketed by consentmanager GmbH in Germany. The provider describes its processing for CMP customers as processing on their behalf. Retention follows the configured consent and account settings. More information: <a href="https://www.consentmanager.net/en/privacy/" target="_blank" rel="noreferrer noopener">consentmanager privacy information</a>.',
					],
				},
				{
					title: '4. Google Analytics',
					paragraphs: [
						'This website uses Google Analytics. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.',
						'We use Google Analytics to understand how the website is used. Data may include page views, technical device and browser information, and interactions with links and forms. Tracked interactions include button labels and locations, but not form contents.',
						'Google Analytics is loaded only after you consent in the consent tool. The legal bases are Art. 6(1)(a) GDPR and Section 25(1) TDDDG. You can withdraw your consent at any time through the consent settings, with effect for the future.',
						'Event-level data is retained for the period configured in the Google Analytics property. Aggregated reports may remain available after that period.',
						'The recipient is Google Ireland Limited. Processing by Google companies in third countries, including the United States, cannot be ruled out. Google refers to appropriate safeguards and its certification under the EU-U.S. Data Privacy Framework for such transfers. More information: <a href="https://policies.google.com/privacy?hl=en" target="_blank" rel="noreferrer noopener">Google Privacy Policy</a>.',
					],
				},
				{
					title: '5. Appointment booking via Google Calendar',
					paragraphs: [
						'The website links to a Google Calendar booking page; the calendar is not embedded in the website. Google processes your access data and the booking details you enter only if you open the link.',
						'If you book an appointment, we process the information required to prepare, conduct and follow up on the meeting. This may include name, email address, appointment time, organisation, request details and other voluntary information.',
						'The legal basis is Art. 6(1)(b) GDPR where the booking relates to pre-contractual steps or collaboration; additionally Art. 6(1)(f) GDPR for efficient scheduling and communication.',
						'Google Calendar appointments remain stored in the Google Workspace/Google account by default until we, an administrator or the applicable deletion and retention settings delete them. If Google Vault or custom retention rules are used, those rules take precedence.',
					],
				},
				{
					title: '6. Email contact',
					paragraphs: [
						`If you contact us by email at <a href="mailto:${contactEmail}">${contactEmail}</a>, we process your email address, the content of your message and related technical metadata. The message is handled by the email service you and we use to send and receive it.`,
						'The legal basis is Art. 6(1)(b) GDPR where your message concerns a contract or pre-contractual request; otherwise Art. 6(1)(f) GDPR because we have a legitimate interest in answering genuine inquiries.',
					],
				},
				{
						title: '7. Inquiry form',
					paragraphs: [
						'When you submit the inquiry form, we process the contact details and project information you provide: email address, requested website service, type of business, priority, website address, any additional trade details and free-text message. The inquiry is stored in a Cloudflare D1 database and forwarded by email to contact@vibeperform.com. Cloudflare also processes your IP address to protect the form against abusive requests.',
						'The legal basis is Art. 6(1)(b) GDPR where your request concerns pre-contractual steps or a contract, and otherwise Art. 6(1)(f) GDPR for handling and responding to business inquiries. Recipients for storage and delivery are Cloudflare, Cloudflare Email Service and Google Workspace, which receives the message.',
						'We use the information only to handle the inquiry and retain it for as long as needed for that purpose. We then delete it unless statutory retention duties or the need to establish, exercise or defend legal claims apply. You may also make an inquiry directly by email.',
					],
				},
				{
						title: '8. Retention and deletion',
					paragraphs: [
						'We store personal data only for as long as required for the stated purpose. We delete inquiry and booking details when processing is complete unless statutory retention duties or the need to establish, exercise or defend legal claims apply. Provider services are also subject to their respective settings and retention periods.',
						'Business correspondence and contractual records are kept where statutory commercial or tax retention duties apply. Google Analytics data is deleted according to the period configured for the property; aggregated reports may remain available for longer.',
					],
				},
				{
					title: '9. Voluntary information and automated decisions',
					paragraphs: [
						'Using appointment booking, email contact and the inquiry form is voluntary. Without the required information, we cannot process the respective request.',
						'No automated decision-making with legal or similarly significant effects takes place.',
					],
				},
				{
					title: '10. Your rights',
					paragraphs: [
						'Subject to the GDPR requirements, you have rights of access, rectification, erasure, restriction of processing, data portability and objection. Where processing is based on consent, you may withdraw that consent at any time with effect for the future.',
						'You also have the right to lodge a complaint with a data protection supervisory authority. For private-sector organisations in Bavaria, this is the <a href="https://www.lda.bayern.de/de/kontakt.html" target="_blank" rel="noreferrer noopener">Bavarian State Office for Data Protection Supervision (BayLDA)</a>.',
					],
				},
			],
			updatedLabel: 'Last updated',
			updated: lastUpdatedEn,
		},
	},
} as const;

export type LegalLocale = keyof typeof legalContent;
export type LegalContent = (typeof legalContent)[LegalLocale][keyof (typeof legalContent)[LegalLocale]];

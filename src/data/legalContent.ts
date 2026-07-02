import { bookingUrl, contactEmail } from '../lib/siteMetadata';
import { homeContent } from './homeContent';

const lastUpdatedDe = '2. Juli 2026';
const lastUpdatedEn = '2 July 2026';

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
				'VibePerform ist eine Marke der Codum GmbH. Vertragspartner des Kunden ist die Codum GmbH.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: 'Diensteanbieter',
					paragraphs: [
						'Codum GmbH',
						'Zeller Str. 29',
						'D-82067 Ebenhausen',
						'Deutschland',
						'VibePerform ist eine Marke der Codum GmbH.',
						'Geschäftsführung: Isabella Hoesch',
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
					paragraphs: ['Isabella Hoesch, Anschrift wie oben.'],
				},
				{
					title: 'Tätigkeit',
					paragraphs: [
						'Vibeperform bietet anbieterunabhängige KI-Beratung, Workshops und Umsetzung für kleine und mittlere Unternehmen an.',
					],
				},
				{
					title: 'Register und Umsatzsteuer',
					paragraphs: [
						'Amtsgericht München, HRB 272656',
						'Umsatzsteuer-Identifikationsnummer nach § 27a UStG: DE351537139',
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
				'Datenschutzerklärung von Vibeperform für Website, Chat-iframe, Google Calendar Terminbuchung und Analyse-Dienste.',
			kicker: 'Datenschutz',
			title: 'Datenschutzerklärung',
			intro: [
				'Diese Datenschutzerklärung erklärt, wie personenbezogene Daten auf der Website von Vibeperform verarbeitet werden.',
				'Berücksichtigt sind die auf der Website eingesetzten Dienste: consentmanager, Google Analytics, Google Calendar Terminbuchung sowie ein eigener Chat-Snippet als iframe mit Gemini-API-Anbindung.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: '1. Verantwortlicher',
					paragraphs: [
						'Verantwortlich im Sinne der Datenschutz-Grundverordnung (DSGVO) ist:',
						'Codum GmbH<br />Zeller Str. 29<br />D-82067 Ebenhausen<br />Deutschland',
						'VibePerform ist eine Marke der Codum GmbH.',
						'Geschäftsführung: Isabella Hoesch',
						`E-Mail: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
					],
				},
				{
					title: '2. Hosting über GitHub Pages',
					paragraphs: [
						'Diese Website wird über GitHub Pages bereitgestellt. Anbieter ist GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.',
						'Beim Aufruf der Website werden technische Zugriffsdaten verarbeitet. Dazu können IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene URL, Referrer, Browser- und Betriebssystemdaten gehören.',
						'Rechtsgrundlage für den Betrieb der Website ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in einer sicheren, stabilen und effizienten Bereitstellung unseres Webangebots.',
						'Eine Verarbeitung in den USA kann dabei nicht ausgeschlossen werden. Die Speicherdauer technischer Protokoll- und Sicherheitsdaten richtet sich nach der Erforderlichkeit für Betrieb, Sicherheit und gesetzliche Pflichten.',
					],
				},
				{
					title: '3. Consent-Management',
					paragraphs: [
						'Wir verwenden ein Consent-Management-Tool von consentmanager. Damit können Einwilligungen abgefragt, dokumentiert und Dienste abhängig von Ihrer Auswahl blockiert oder freigegeben werden.',
						'Verarbeitet werden insbesondere Consent-Status, Zeitstempel, technische Kennungen und Browserinformationen. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. c DSGVO zur Erfüllung rechtlicher Nachweispflichten sowie Art. 6 Abs. 1 lit. f DSGVO für die technische Verwaltung der Einwilligungen. Soweit Informationen auf dem Endgerät gespeichert oder ausgelesen werden, gelten zusätzlich § 25 TDDDG.',
						'Consent-Daten werden nach den Einstellungen und Vertragsbedingungen im consentmanager-Konto gespeichert.',
					],
				},
				{
					title: '4. Google Analytics',
					paragraphs: [
						'Diese Website verwendet Google Analytics. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland.',
						'Google Analytics hilft uns zu verstehen, welche Inhalte genutzt werden und wie die Website verbessert werden kann. Dabei können Nutzungsdaten, technische Geräteinformationen, gekürzte oder anderweitig verarbeitete IP-Adressen, Seitenaufrufe und Interaktionen verarbeitet werden.',
						'Der Einsatz erfolgt nur auf Grundlage einer Einwilligung, soweit diese erforderlich ist. Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Eine erteilte Einwilligung kann über das Consent-Tool widerrufen werden.',
						'Google Analytics speichert nutzerbezogene und ereignisbezogene Daten standardmäßig für 2 Monate; je nach Property-Einstellung kann die Frist bei Standard-Properties auf 14 Monate gestellt sein. Aggregierte Berichte können länger verfügbar bleiben.',
						'Bei Google-Diensten kann eine Übermittlung in Drittländer, insbesondere die USA, nicht ausgeschlossen werden. Google stützt solche Übermittlungen nach eigenen Angaben auf geeignete Garantien wie Standardvertragsklauseln oder einschlägige Angemessenheitsmechanismen.',
					],
				},
				{
					title: '5. Terminbuchung über Google Calendar',
					paragraphs: [
						'Für die Buchung eines Gesprächs verlinkt die Website auf eine Google-Calendar-Buchungsseite. Beim Öffnen und Nutzen der Buchungsseite werden insbesondere technische Zugriffsdaten sowie die von Ihnen eingegebenen Buchungsdaten verarbeitet.',
						'Wenn Sie einen Termin buchen, verarbeiten wir die Angaben, die für Vorbereitung, Durchführung und Nachbereitung des Gesprächs erforderlich sind. Dazu können Name, E-Mail-Adresse, Terminzeit, Organisation, Anliegen und sonstige freiwillige Angaben gehören.',
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, wenn die Buchung zur Anbahnung oder Durchführung einer Zusammenarbeit erfolgt; ergänzend Art. 6 Abs. 1 lit. f DSGVO für effiziente Terminplanung und Kommunikation.',
						'Google-Calendar-Termine bleiben standardmäßig im Google-Workspace-/Google-Konto gespeichert, bis sie durch uns, durch einen Administrator oder nach den dort eingerichteten Lösch- und Aufbewahrungsregeln gelöscht werden. Wenn Google Vault oder eigene Aufbewahrungsregeln verwendet werden, gelten diese Regeln vorrangig.',
					],
				},
				{
					title: '6. E-Mail-Kontakt',
					paragraphs: [
						`Wenn Sie uns per E-Mail an <a href="mailto:${contactEmail}">${contactEmail}</a> kontaktieren, verarbeiten wir Ihre E-Mail-Adresse, den Inhalt der Nachricht und die dabei anfallenden technischen Metadaten.`,
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Nachricht auf einen Vertrag oder eine vorvertragliche Anfrage gerichtet ist; im Übrigen Art. 6 Abs. 1 lit. f DSGVO, weil wir berechtigte Anfragen beantworten.',
					],
				},
				{
					title: '7. Chat-iframe mit Gemini-API-Anbindung',
					paragraphs: [
						'Auf der deutschen Startseite ist ein eigener Chat-Snippet als iframe eingebunden. Der Chat dient als KI-gestützte Hilfe für Fragen zu Vibeperform.',
						'Wenn Sie den Chat nutzen, werden insbesondere Ihre Eingaben, der Gesprächskontext, technische Nutzungsdaten und ggf. von Ihnen freiwillig eingegebene Kontaktdaten verarbeitet. Der Chat ist an die Gemini API angebunden; Eingaben können daher zur Generierung der Antwort an Google-Dienste übermittelt werden.',
						'Bitte geben Sie im Chat keine vertraulichen Geschäftsgeheimnisse, keine besonderen Kategorien personenbezogener Daten nach Art. 9 DSGVO und keine Daten Dritter ein, sofern dies nicht erforderlich und rechtlich zulässig ist.',
						'Rechtsgrundlage ist Art. 6 Abs. 1 lit. a DSGVO, wenn der Chat aufgrund Ihrer aktiven Nutzung oder Einwilligung geladen wird; Art. 6 Abs. 1 lit. b DSGVO, wenn die Unterhaltung der Anbahnung einer Zusammenarbeit dient; ergänzend Art. 6 Abs. 1 lit. f DSGVO für die Bereitstellung eines effizienten Informationsangebots. Soweit durch den iframe Informationen auf Ihrem Endgerät gespeichert oder ausgelesen werden, gilt zusätzlich § 25 TDDDG.',
						'Technische Logs des Chat-Dienstes werden nach den Standardfristen der eingesetzten Google-Cloud-Dienste gespeichert. Für Cloud Logging gilt bei Standard-Log-Buckets typischerweise eine Aufbewahrung von 30 Tagen, sofern keine abweichende Retention konfiguriert wurde. Bei der Gemini API können Prompts, Antworten und technische Metadaten nach Googles Standardangaben bis zu 55 Tage zur Missbrauchserkennung und Dienstsicherheit gespeichert werden.',
					],
				},
				{
					title: '8. Speicherdauer',
					paragraphs: [
						'Wir speichern personenbezogene Daten nur so lange, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Kontakt- und Buchungsdaten werden gelöscht, wenn die Anfrage erledigt ist und keine gesetzlichen Aufbewahrungs- oder Nachweispflichten entgegenstehen.',
						'Für GitHub Pages, consentmanager, Google Workspace/Calendar, Google Analytics, Google Cloud Run und Gemini API gelten ergänzend die jeweiligen Standardfristen und Kontoeinstellungen der Anbieter, wie in den Abschnitten oben beschrieben.',
						'Geschäftliche Korrespondenz und Vertragsunterlagen bewahren wir nach den gesetzlichen handels- und steuerrechtlichen Aufbewahrungsfristen auf, soweit solche Pflichten bestehen.',
					],
				},
				{
					title: '9. Freiwilligkeit und automatisierte Entscheidungen',
					paragraphs: [
						'Die Nutzung von Terminbuchung, E-Mail-Kontakt und Chat ist freiwillig. Ohne die erforderlichen Angaben können wir die jeweilige Anfrage nicht bearbeiten.',
						'Eine automatisierte Entscheidungsfindung mit rechtlicher Wirkung oder ähnlich erheblicher Beeinträchtigung findet nicht statt.',
					],
				},
				{
					title: '10. Ihre Rechte',
					paragraphs: [
						'Sie haben nach Maßgabe der DSGVO insbesondere Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Soweit eine Verarbeitung auf Einwilligung beruht, können Sie diese Einwilligung jederzeit mit Wirkung für die Zukunft widerrufen.',
						'Außerdem haben Sie das Recht, sich bei einer Datenschutzaufsichtsbehörde zu beschweren.',
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
				'VibePerform is a brand of Codum GmbH. The customer contracting party is Codum GmbH.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: 'Provider',
					paragraphs: [
						'Codum GmbH',
						'Zeller Str. 29',
						'D-82067 Ebenhausen',
						'Germany',
						'VibePerform is a brand of Codum GmbH.',
						'Managing director: Isabella Hoesch',
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
					paragraphs: ['Isabella Hoesch, address as above.'],
				},
				{
					title: 'Business activity',
					paragraphs: [
						'Vibeperform provides vendor-independent AI consulting, workshops and implementation for small and medium-sized businesses.',
					],
				},
				{
					title: 'Commercial register and VAT',
					paragraphs: [
						'Commercial register: Local Court of Munich, HRB 272656',
						'VAT identification number under Section 27a German VAT Act: DE351537139',
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
				'Privacy policy for Vibeperform covering website usage, chat iframe, Google Calendar booking and analytics services.',
			kicker: 'Privacy',
			title: 'Privacy Policy',
			intro: [
				'This Privacy Policy explains how personal data is processed on the Vibeperform website.',
				'It reflects the services used on the website: consentmanager, Google Analytics, Google Calendar appointment booking, and a custom chat iframe connected to the Gemini API.',
			],
			noticeTitle: '',
			noticeItems: [],
			sections: [
				{
					title: '1. Controller',
					paragraphs: [
						'The controller within the meaning of the GDPR is:',
						'Codum GmbH<br />Zeller Str. 29<br />D-82067 Ebenhausen<br />Germany',
						'VibePerform is a brand of Codum GmbH.',
						'Managing director: Isabella Hoesch',
						`Email: <a href="mailto:${contactEmail}">${contactEmail}</a>`,
					],
				},
				{
					title: '2. Hosting via GitHub Pages',
					paragraphs: [
						'This website is hosted via GitHub Pages. The provider is GitHub, Inc., 88 Colin P Kelly Jr St, San Francisco, CA 94107, USA.',
						'When the website is accessed, technical access data is processed. This may include IP address, access time, requested URL, referrer, browser and operating system data.',
						'The legal basis for operating the website is Art. 6(1)(f) GDPR. Our legitimate interest is the secure, stable and efficient delivery of our website.',
						'Processing in the United States cannot be ruled out. The retention of technical log and security data depends on what is required for operation, security and legal obligations.',
					],
				},
				{
					title: '3. Consent management',
					paragraphs: [
						'We use a consent management tool from consentmanager. It is used to request and document consent and to block or enable services depending on your selection.',
						'Processed data may include consent status, timestamps, technical identifiers and browser information. Legal bases are Art. 6(1)(c) GDPR for legal documentation obligations and Art. 6(1)(f) GDPR for technical consent administration. Where information is stored on or read from the device, Section 25 TDDDG also applies.',
						'Consent data is retained according to the settings and contract terms in the consentmanager account.',
					],
				},
				{
					title: '4. Google Analytics',
					paragraphs: [
						'This website uses Google Analytics. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland.',
						'Google Analytics helps us understand which content is used and how the website can be improved. Usage data, technical device information, shortened or otherwise processed IP addresses, page views and interactions may be processed.',
						'The service is used only on the basis of consent where consent is required. Legal bases are Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Consent can be withdrawn through the consent tool.',
						'Google Analytics stores user-level and event-level data for 2 months by default; depending on the property setting, standard properties can be configured to 14 months. Aggregated reports may remain available for longer.',
						'For Google services, transfers to third countries, including the United States, cannot be ruled out. According to Google, such transfers rely on safeguards such as standard contractual clauses or applicable adequacy mechanisms.',
					],
				},
				{
					title: '5. Appointment booking via Google Calendar',
					paragraphs: [
						'For booking a meeting, the website links to a Google Calendar booking page. When the booking page is opened and used, technical access data and the booking data you enter are processed.',
						'If you book an appointment, we process the information required to prepare, conduct and follow up on the meeting. This may include name, email address, appointment time, organisation, request details and other voluntary information.',
						'The legal basis is Art. 6(1)(b) GDPR where the booking relates to pre-contractual steps or collaboration; additionally Art. 6(1)(f) GDPR for efficient scheduling and communication.',
						'Google Calendar appointments remain stored in the Google Workspace/Google account by default until we, an administrator or the applicable deletion and retention settings delete them. If Google Vault or custom retention rules are used, those rules take precedence.',
					],
				},
				{
					title: '6. Email contact',
					paragraphs: [
						`If you contact us by email at <a href="mailto:${contactEmail}">${contactEmail}</a>, we process your email address, the content of your message and related technical metadata.`,
						'The legal basis is Art. 6(1)(b) GDPR where your message concerns a contract or pre-contractual request; otherwise Art. 6(1)(f) GDPR because we have a legitimate interest in answering genuine inquiries.',
					],
				},
				{
					title: '7. Chat iframe connected to the Gemini API',
					paragraphs: [
						'The German home page embeds a custom chat snippet as an iframe. The chat provides AI-supported help for questions about Vibeperform.',
						'When you use the chat, your inputs, conversation context, technical usage data and any contact details voluntarily entered may be processed. The chat is connected to the Gemini API; inputs may therefore be transmitted to Google services to generate a response.',
						'Please do not enter confidential trade secrets, special categories of personal data under Art. 9 GDPR or data relating to third parties unless this is necessary and legally permitted.',
						'The legal basis is Art. 6(1)(a) GDPR where the chat is loaded based on your active use or consent; Art. 6(1)(b) GDPR where the conversation serves pre-contractual steps; additionally Art. 6(1)(f) GDPR for providing an efficient information service. If the iframe stores or reads information on your device, Section 25 TDDDG also applies.',
						'Technical logs of the chat service are stored according to the default retention periods of the Google Cloud services used. For Cloud Logging, standard log buckets typically retain logs for 30 days unless a different retention period is configured. For the Gemini API, prompts, responses and technical metadata may be stored under Google defaults for up to 55 days for abuse monitoring and service safety.',
					],
				},
				{
					title: '8. Retention',
					paragraphs: [
						'We store personal data only for as long as required for the respective purpose or by statutory retention obligations. Contact and booking data is deleted once the inquiry has been completed unless statutory retention or documentation obligations apply.',
						'For GitHub Pages, consentmanager, Google Workspace/Calendar, Google Analytics, Google Cloud Run and the Gemini API, the provider defaults and account settings described above apply in addition.',
						'Business correspondence and contractual records are retained according to statutory commercial and tax retention periods where such obligations apply.',
					],
				},
				{
					title: '9. Voluntary information and automated decisions',
					paragraphs: [
						'Using appointment booking, email contact and chat is voluntary. Without the required information, we cannot process the respective request.',
						'No automated decision-making with legal or similarly significant effects takes place.',
					],
				},
				{
					title: '10. Your rights',
					paragraphs: [
						'Subject to the GDPR requirements, you have rights of access, rectification, erasure, restriction of processing, data portability and objection. Where processing is based on consent, you may withdraw that consent at any time with effect for the future.',
						'You also have the right to lodge a complaint with a data protection supervisory authority.',
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

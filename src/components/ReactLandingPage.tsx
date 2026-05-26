import React from 'react';
import {
	BriefcaseIcon,
	ChartBarIcon,
	CheckBadgeIcon,
	CpuChipIcon,
	DocumentTextIcon,
	LightBulbIcon,
	RocketLaunchIcon,
	ScaleIcon,
	ShieldCheckIcon,
	SparklesIcon,
	UsersIcon,
} from './icons';

const App: React.FC = () => {
	return (
		<div className="bg-slate-900 text-slate-300 antialiased selection:bg-purple-500 selection:text-white">
			<div className="relative isolate overflow-hidden">
				<svg
					className="absolute inset-0 -z-10 h-full w-full stroke-slate-700 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
					aria-hidden="true"
				>
					<defs>
						<pattern
							id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
							width={200}
							height={200}
							x="50%"
							y={-1}
							patternUnits="userSpaceOnUse"
						>
							<path d="M.5 200V.5H200" fill="none" />
						</pattern>
					</defs>
					<rect width="100%" height="100%" strokeWidth={0} fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)" />
				</svg>
				<div
					className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
					aria-hidden="true"
				>
					<div
						className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
						style={{
							clipPath:
								'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64.3%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 1.4% 98.3%, 12.1% 75.2%, 22.1% 37.5%, 45.4% 18.9%, 29.8% 49.3%, 50.1% 57.8%, 73.6% 51.7%)',
						}}
					/>
				</div>

				<header className="absolute inset-x-0 top-0 z-50 p-6">
					<nav className="flex items-center justify-between" aria-label="Global">
						<div className="flex">
							<a href="#" className="-m-1.5 p-1.5 text-white font-bold text-xl flex items-center gap-2">
								<SparklesIcon className="h-6 w-6 text-purple-400" />
								<span>Vibeperform</span>
							</a>
						</div>
					</nav>
				</header>

				<main className="mx-auto max-w-7xl px-6 pb-24 pt-32 sm:pt-48 lg:px-8">
					<section className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
							KI schnell nutzbar machen – ohne große Projekte, ohne Risiko.
						</h1>
						<p className="mt-6 text-lg leading-8 text-slate-400 max-w-3xl mx-auto">
							Wir helfen Mittelständlern, konkrete KI-Use-Cases zu finden, zu bewerten und in wenigen Wochen erlebbar zu machen. Das Ergebnis: sichtbarer Nutzen und eine klare Entscheidungsgrundlage für den Rollout.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<a
								href="mailto:contact@vibeperform.com"
								className="rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200"
							>
								Intro-Call vereinbaren
							</a>
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Was wir liefern</h2>
							<p className="mt-4 text-lg text-slate-400">Ein klares Paket für schnelle, fundierte KI-Entscheidungen.</p>
						</div>
						<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
							<FeatureCard icon={<DocumentTextIcon />} title="Use-Case-Portfolio" description="10–20 Ideen, Top-3 priorisiert mit Nutzen/Komplexität." />
							<FeatureCard icon={<ScaleIcon />} title="Entscheidungsvorlage" description="Business-, Tech- und Risiko-Sicht je Use Case." />
							<FeatureCard icon={<CpuChipIcon />} title="Prototyp/PoC (optional)" description="Funktionierender Klick- oder Daten-Prototyp mit Messpunkten." />
							<FeatureCard icon={<UsersIcon />} title="Enablement" description="Ihr Team versteht, wo KI wirkt und wie Qualität gesichert wird." />
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Unser Vorgehen (bewährt & schlank)</h2>
						</div>
						<div className="mt-16 space-y-12">
							<ProcessStep number="1" title="Explore Workshop" subtitle="Wertvolle KI-Ideen finden">
								In 1 Tag (oder 2×½ Tage remote) identifizieren wir Herausforderungen, generieren Use Cases mit Karten/Leitfäden und priorisieren gemeinsam.
							</ProcessStep>
							<ProcessStep number="2" title="Design Workshop" subtitle="To-Be-Szenario definieren">
								Wir vertiefen 1–3 Favoriten: Journey, Daten, „Capability Idea Napkins“, Qualität/Verifikation, KPIs. Ergebnis: umsetzbarer Zielzustand.
							</ProcessStep>
							<ProcessStep number="3" title="Build Sprint (2–4 Wochen)" subtitle="Schneller Proof statt PowerPoint">
								Leichtgewichtiger Prototyp/PoC mit echten oder synthetischen Daten. Grundlage sind erprobte Ideation-Karten zu Fähigkeiten wie Zusammenfassen, Extraktion, RAG, Empfehlungen etc.
							</ProcessStep>
						</div>
						<div className="mt-12 text-center text-slate-400 bg-slate-800/50 rounded-lg p-4 max-w-md mx-auto">
							<span className="font-semibold text-white">Zeitbedarf intern:</span> Kernteam 6–12 Std. bis zur umsetzbaren Entscheidung.
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Typische Anwendungsfelder</h2>
						</div>
						<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="bg-slate-800/50 p-8 rounded-lg">
								<h3 className="text-xl font-semibold text-white flex items-center gap-3">
									<ChartBarIcon /> Vertrieb
								</h3>
								<ul className="mt-4 list-disc list-inside text-slate-400 space-y-2">
									<li>Lead-Priorisierung</li>
									<li>Angebots-/Mail-Assistent</li>
									<li>Call-Vorbereitung</li>
								</ul>
							</div>
							<div className="bg-slate-800/50 p-8 rounded-lg">
								<h3 className="text-xl font-semibold text-white flex items-center gap-3">
									<UsersIcon /> Kundenservice
								</h3>
								<ul className="mt-4 list-disc list-inside text-slate-400 space-y-2">
									<li>Wissensassistenz (RAG)</li>
									<li>Ticket-Triage</li>
									<li>Antwort-Entwürfe mit Qualitätscheck</li>
								</ul>
							</div>
							<div className="bg-slate-800/50 p-8 rounded-lg">
								<h3 className="text-xl font-semibold text-white flex items-center gap-3">
									<BriefcaseIcon /> Operations
								</h3>
								<ul className="mt-4 list-disc list-inside text-slate-400 space-y-2">
									<li>Dokumenten-Extraktion</li>
									<li>Prüf-/Freigabe-Assistenten</li>
									<li>Standardberichte</li>
								</ul>
							</div>
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-2xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
								Ergebnisse, die Wirkung zeigen
							</h2>
						</div>
						<div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
							<FeatureCard icon={<RocketLaunchIcon />} title="Greifbar" description="Demo/PoC statt Folien." />
							<FeatureCard icon={<CheckBadgeIcon />} title="Messbar" description="Klar definierte KPIs, Akzeptanz- und Qualitätskriterien." />
							<FeatureCard icon={<LightBulbIcon />} title="Entscheidungsreif" description="Invest-/Weiter- oder Stop-Empfehlung je Use Case." />
						</div>
					</section>

					<section className="mt-24 sm:mt-32 bg-slate-800/50 rounded-lg p-8 lg:p-12 flex flex-col md:flex-row items-center gap-8">
						<div className="flex-shrink-0">
							<ShieldCheckIcon className="h-24 w-24 text-purple-400" />
						</div>
						<div>
							<h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Datenschutz &amp; Sicherheit</h2>
							<p className="mt-4 text-slate-400">
								Wir arbeiten <strong className="text-white">DSGVO-konform</strong>, nutzen <strong className="text-white">sichere Setups</strong> (z. B. isolierte Tenants, API-basierte Verarbeitung, Datenminimierung), schließen bei Bedarf <strong className="text-white">NDA</strong> und unterstützen <strong className="text-white">On-Prem/Private Cloud</strong>.
							</p>
							<p className="mt-4 font-semibold text-purple-300">Kein Training auf Ihren proprietären Daten ohne ausdrückliche Freigabe.</p>
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-3xl text-center">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Für wen ist unser Angebot gemacht?</h2>
							<p className="mt-4 text-lg text-slate-400">
								Geschäftsführung, Bereichsleitungen (Vertrieb/Service/Operations), IT/Data-Teams, die <strong className="text-white">schnell belastbare KI-Entscheidungen</strong> treffen wollen.
							</p>
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-3xl">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Nächste Schritte</h2>
							<ul role="list" className="mt-12 space-y-6 text-slate-400">
								<li className="flex gap-x-3 items-start">
									<CheckBadgeIcon className="mt-1 h-5 w-5 flex-none text-purple-400" aria-hidden="true" />
									<span>
										<strong className="font-semibold text-white">Intro-Call (30 Min):</strong> Ziele &amp; Rahmen klären, Kandidaten-Use-Cases sammeln.
									</span>
								</li>
								<li className="flex gap-x-3 items-start">
									<CheckBadgeIcon className="mt-1 h-5 w-5 flex-none text-purple-400" aria-hidden="true" />
									<span>
										<strong className="font-semibold text-white">Starttermin fixieren:</strong> Explore Workshop einplanen, Stakeholder benennen, Datenzugänge definieren.
									</span>
								</li>
							</ul>
							<div className="mt-12 flex justify-center">
								<a
									href="https://calendar.app.google/utFQgw33PwJTiDk56"
									className="rounded-md bg-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors duration-200"
								>
									Jetzt Kontakt aufnehmen
								</a>
							</div>
						</div>
					</section>

					<section className="mt-24 sm:mt-32">
						<div className="mx-auto max-w-3xl">
							<h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">Kurz-FAQ</h2>
							<div className="mt-12 space-y-8">
								<FaqItem
									question="Wie minimieren wir Risiko?"
									answer="Durch kleine Schritte, klare Abnahmekriterien und frühe Nutzer-Tests."
								/>
								<FaqItem
									question="Brauchen wir viele Daten?"
									answer="Nein – oft reichen wenige, gezielte Quellen oder synthetische Testdaten für die ersten Prototypen."
								/>
								<FaqItem
									question="Wie stellen wir Qualität sicher?"
									answer="Wir setzen auf „Trust & Verification“: Ein Mix aus Regeln, Prüf-Metriken und Human-in-the-Loop-Prozessen."
								/>
							</div>
						</div>
					</section>
				</main>

				<footer className="mx-auto max-w-7xl px-6 lg:px-8 mt-16 sm:mt-24 pb-12">
					<div className="border-t border-slate-700 pt-8 text-center">
						<div className="mb-4">
							<p className="text-base text-slate-400">Kontakt:</p>
							<a href="mailto:contact@vibeperform.com" className="font-semibold text-purple-400 hover:text-purple-300">
								contact@vibeperform.com
							</a>
							<span className="mx-2 text-slate-600">|</span>
							<a
								href="https://vibeperform.com"
								target="_blank"
								rel="noopener noreferrer"
								className="font-semibold text-purple-400 hover:text-purple-300"
							>
								vibeperform.com
							</a>
						</div>
						<p className="text-sm text-slate-500 bg-slate-800/50 p-3 rounded-md inline-block">
							Sie wollen intern weiterleiten? Dieser One-Pager fasst Nutzen, Vorgehen und nächste Schritte zusammen – teilen erwünscht.
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
};

interface FeatureCardProps {
	icon: React.ReactElement<{ className?: string }>;
	title: string;
	description: string;
}
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
	<div className="flex flex-col items-center text-center bg-slate-800/50 p-8 rounded-lg transition-transform hover:scale-105 hover:bg-slate-800">
		<div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
			{React.cloneElement(icon, { className: 'h-6 w-6' })}
		</div>
		<h3 className="mt-6 text-lg font-semibold leading-8 text-white">{title}</h3>
		<p className="mt-2 text-base leading-7 text-slate-400">{description}</p>
	</div>
);

interface ProcessStepProps {
	number: string;
	title: string;
	subtitle: string;
	children: React.ReactNode;
}
const ProcessStep: React.FC<ProcessStepProps> = ({ number, title, subtitle, children }) => (
	<div className="flex flex-col md:flex-row items-start gap-6">
		<div className="flex items-center justify-center h-12 w-12 rounded-full bg-purple-600 text-white font-bold text-xl flex-shrink-0">
			{number}
		</div>
		<div>
			<h3 className="text-xl font-semibold text-white">{title}</h3>
			<p className="text-purple-300 mb-2">{subtitle}</p>
			<p className="text-slate-400">{children}</p>
		</div>
	</div>
);

interface FaqItemProps {
	question: string;
	answer: string;
}
const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => (
	<div className="p-6 bg-slate-800/50 rounded-lg">
		<h4 className="font-semibold text-lg text-white">{question}</h4>
		<p className="mt-2 text-slate-400">{answer}</p>
	</div>
);

export default App;

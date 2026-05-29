export const siteUrl = 'https://www.vibeperform.com';
export const brandName = 'Vibeperform';
export const contactEmail = 'contact@vibeperform.com';
export const bookingUrl = 'https://calendar.app.google/utFQgw33PwJTiDk56';

export type Locale = 'de' | 'en';

export const absoluteUrl = (pathname = '/') => new URL(pathname, siteUrl).toString();

export const jsonLd = (data: unknown) =>
	JSON.stringify(data).replace(/</g, '\\u003c');

export const organizationSchema = () => ({
	'@context': 'https://schema.org',
	'@type': 'Organization',
	'@id': absoluteUrl('/#organization'),
	name: brandName,
	url: absoluteUrl('/de/'),
	logo: absoluteUrl('/vibeperform-logo.png'),
	email: contactEmail,
	areaServed: ['München', 'Bayern', 'Deutschland', 'Europa'],
	description:
		'Vibeperform begleitet mittelständische Unternehmen mit unabhängiger KI-Beratung, Workshops und schlüsselfertiger Umsetzung.',
	sameAs: [absoluteUrl('/de/')],
});

export const websiteSchema = (locale: Locale) => ({
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	'@id': absoluteUrl(`/${locale}/#website`),
	name: brandName,
	url: absoluteUrl(`/${locale}/`),
	inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
	publisher: {
		'@id': absoluteUrl('/#organization'),
	},
});

export const serviceSchema = ({
	name,
	description,
	pathname,
	locale,
	serviceType,
}: {
	name: string;
	description: string;
	pathname: string;
	locale: Locale;
	serviceType: string;
}) => ({
	'@context': 'https://schema.org',
	'@type': 'Service',
	'@id': `${absoluteUrl(pathname)}#service`,
	name,
	description,
	serviceType,
	url: absoluteUrl(pathname),
	inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
	provider: {
		'@id': absoluteUrl('/#organization'),
	},
	areaServed: ['München', 'Bayern', 'Deutschland', 'Europa'],
	offers: {
		'@type': 'Offer',
		url: bookingUrl,
		availability: 'https://schema.org/InStock',
		priceSpecification: {
			'@type': 'PriceSpecification',
			priceCurrency: 'EUR',
		},
	},
});

export const offerCatalogSchema = ({
	name,
	description,
	pathname,
	locale,
	offers,
}: {
	name: string;
	description: string;
	pathname: string;
	locale: Locale;
	offers: Array<{ name: string; description: string }>;
}) => ({
	...serviceSchema({
		name,
		description,
		pathname,
		locale,
		serviceType: locale === 'de' ? 'KI-Workshop' : 'AI workshop',
	}),
	hasOfferCatalog: {
		'@type': 'OfferCatalog',
		name,
		itemListElement: offers.map((offer) => ({
			'@type': 'Offer',
			name: offer.name,
			description: offer.description,
			url: absoluteUrl(pathname),
			availability: 'https://schema.org/InStock',
			priceSpecification: {
				'@type': 'PriceSpecification',
				priceCurrency: 'EUR',
			},
		})),
	},
});

export const blogPostingSchema = ({
	title,
	description,
	pathname,
	image,
	datePublished,
	author,
	locale,
}: {
	title: string;
	description: string;
	pathname: string;
	image?: string;
	datePublished: string;
	author: string;
	locale: Locale;
}) => ({
	'@context': 'https://schema.org',
	'@type': 'BlogPosting',
	headline: title,
	description,
	url: absoluteUrl(pathname),
	image: image ? absoluteUrl(image) : undefined,
	datePublished,
	author: {
		'@type': 'Person',
		name: author,
	},
	publisher: {
		'@id': absoluteUrl('/#organization'),
	},
	inLanguage: locale === 'de' ? 'de-DE' : 'en-US',
});

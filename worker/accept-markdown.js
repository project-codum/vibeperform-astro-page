const PRODUCES = ['text/html', 'text/markdown'];
const STATIC_EXTENSION = /\.(?:css|js|mjs|map|png|jpe?g|webp|gif|svg|avif|ico|woff2?|ttf|otf|eot|xml|txt|json|md|pdf|mp4|webm|mp3|wav|ogg|zip)$/i;

export function parseAccept(header) {
	return header
		.split(',')
		.map((raw) => {
			const parts = raw.trim().split(';').map((part) => part.trim());
			const type = parts[0].toLowerCase();
			if (!type) return null;

			let q = 1;
			for (const parameter of parts.slice(1)) {
				const [name, value] = parameter.split('=').map((part) => part.trim());
				if (name !== 'q') continue;
				const parsed = Number(value);
				if (!Number.isNaN(parsed)) q = Math.max(0, Math.min(1, parsed));
			}

			const specificity = type === '*/*' ? 0 : type.endsWith('/*') ? 1 : 2;
			return { type, q, specificity };
		})
		.filter(Boolean);
}

function matches(entry, candidate) {
	if (entry.type === '*/*') return true;
	if (entry.type.endsWith('/*')) return candidate.startsWith(entry.type.slice(0, -1));
	return entry.type === candidate;
}

export function preferredType(header, produces = PRODUCES) {
	if (!header) return produces[0] ?? null;
	const entries = parseAccept(header);
	if (entries.length === 0) return produces[0] ?? null;

	let bestType = null;
	let bestQ = -1;
	let bestPosition = Number.POSITIVE_INFINITY;

	for (const candidate of produces) {
		let matched = null;
		let matchedPosition = Number.POSITIVE_INFINITY;

		for (let index = 0; index < entries.length; index += 1) {
			const entry = entries[index];
			if (!matches(entry, candidate)) continue;
			if (
				matched === null ||
				entry.specificity > matched.specificity ||
				(entry.specificity === matched.specificity && index < matchedPosition)
			) {
				matched = entry;
				matchedPosition = index;
			}
		}

		if (matched === null || matched.q <= 0) continue;
		if (matched.q > bestQ || (matched.q === bestQ && matchedPosition < bestPosition)) {
			bestQ = matched.q;
			bestPosition = matchedPosition;
			bestType = candidate;
		}
	}

	return bestType;
}

export function appendVaryAccept(headers) {
	const existing = headers.get('Vary');
	if (!existing) {
		headers.set('Vary', 'Accept');
		return;
	}

	const tokens = existing.split(',').map((token) => token.trim().toLowerCase());
	if (!tokens.includes('accept')) headers.set('Vary', `${existing}, Accept`);
}

export function markdownPath(pathname) {
	const clean = pathname.replace(/\/$/, '') || '/';
	if (clean === '/') return '/index.md';
	return `${clean}/index.md`;
}

function notAcceptable(message) {
	const response = new Response(`Not Acceptable\n\n${message}\n`, {
		status: 406,
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
	appendVaryAccept(response.headers);
	return response;
}

export async function handleRequest(request, env) {
	const url = new URL(request.url);
	if (STATIC_EXTENSION.test(url.pathname) || url.pathname.startsWith('/api/')) {
		return env.ASSETS.fetch(request);
	}

	const accept = request.headers.get('Accept');
	const chosen = preferredType(accept);
	if (chosen === null && accept) {
		return notAcceptable('Available representations: text/html, text/markdown');
	}

	if (chosen === 'text/markdown') {
		const markdownUrl = new URL(url);
		markdownUrl.pathname = markdownPath(url.pathname);
		const markdownResponse = await env.ASSETS.fetch(new Request(markdownUrl, request));

		if (markdownResponse.status === 200) {
			const response = new Response(markdownResponse.body, markdownResponse);
			response.headers.set('Content-Type', 'text/markdown; charset=utf-8');
			appendVaryAccept(response.headers);
			return response;
		}

		if (!preferredType(accept, ['text/html'])) {
			return notAcceptable('A Markdown representation is not available for this URL.');
		}
	}

	const assetResponse = await env.ASSETS.fetch(request);
	const response = new Response(assetResponse.body, assetResponse);
	appendVaryAccept(response.headers);

	if (response.headers.get('Content-Type')?.includes('text/html')) {
		const markdownUrl = new URL(url);
		markdownUrl.pathname = markdownPath(url.pathname);
		const probe = await env.ASSETS.fetch(new Request(markdownUrl, { method: 'HEAD' }));
		if (probe.status === 200) {
			const alternate = `<${markdownUrl.pathname}>; rel="alternate"; type="text/markdown"`;
			const existing = response.headers.get('Link');
			response.headers.set('Link', existing ? `${existing}, ${alternate}` : alternate);
		}
	}

	return response;
}

export default {
	fetch: handleRequest,
};

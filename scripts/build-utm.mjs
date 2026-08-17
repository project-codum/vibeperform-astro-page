const args = process.argv.slice(2);
const baseUrl = args.shift();

const usage = `Usage:
  npm run utm -- <url> --source <source> --medium <medium> --campaign <campaign> [--content <content>] [--term <term>] [--id <campaign-id>]

Example:
  npm run utm -- https://www.vibeperform.com/de/workshop/explore-workshop/ --source linkedin --medium social --campaign 2026-q3-explore-workshop --content founder-post-01`;

if (!baseUrl) {
	console.error(usage);
	process.exit(1);
}

const options = new Map();
for (let index = 0; index < args.length; index += 2) {
	const key = args[index];
	const value = args[index + 1];
	if (!key?.startsWith('--') || !value) {
		console.error(`Invalid argument near "${key ?? ''}".\n\n${usage}`);
		process.exit(1);
	}
	options.set(key.slice(2), value);
}

const required = ['source', 'medium', 'campaign'];
const missing = required.filter((key) => !options.get(key));
if (missing.length > 0) {
	console.error(`Missing required option(s): ${missing.map((key) => `--${key}`).join(', ')}\n\n${usage}`);
	process.exit(1);
}

const normalize = (value) => value
	.trim()
	.toLowerCase()
	.replace(/[^a-z0-9]+/g, '-')
	.replace(/^-+|-+$/g, '');

const url = new URL(baseUrl);
const mapping = {
	source: 'utm_source',
	medium: 'utm_medium',
	campaign: 'utm_campaign',
	content: 'utm_content',
	term: 'utm_term',
	id: 'utm_id',
};

for (const [option, parameter] of Object.entries(mapping)) {
	const value = options.get(option);
	if (value) url.searchParams.set(parameter, normalize(value));
}

console.log(url.toString());

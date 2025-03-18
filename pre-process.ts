import { readFile, writeFile, mkdir } from 'fs/promises';
import { load } from 'js-yaml';
import { join } from 'path';

export const preProcess = async () => {
	// Load internationalization strings from i18n.yml
	const i18nContent = await readFile(join('.', 'i18n.yml'), 'utf8');
	const i18n = load(i18nContent) as { [index: string]: string };

	// Load the main configuration from .upptimerc.yml in the parent directory
	const configContent = await readFile(join('..', '.upptimerc.yml'), 'utf8');
	const config = load(configContent) as {
		logoUrl?: string;
		name?: string;
		owner: string;
		repo: string;
		introTitle?: string;
		introMessage?: string;
		path: string;
		i18n?: { [index: string]: string };
		'status-website'?: {
			cname?: string;
			baseUrl?: string;
		};
	};

	if (!config.owner || !config.repo) {
		throw new Error('Owner/repo not set');
	}

	// Set the default path based on GitHub Pages URL,
	// then override if a custom domain (cname) is specified.
	config.path = `https://${config.owner}.github.io/${config.repo}`;
	if (config['status-website']?.cname) {
		config.path = `https://${config['status-website'].cname}${config['status-website']?.baseUrl ?? ''}`;
	}

	// Merge internationalization configuration
	config.i18n = { ...i18n, ...config.i18n };

	// Ensure the directory exists; mkdir with { recursive: true } works like ensureDir.
	const dataDir = join('.', 'src', 'data');
	await mkdir(dataDir, { recursive: true });

	// Write the final configuration to a JSON file.
	await writeFile(join(dataDir, 'config.json'), JSON.stringify(config, null, 2), 'utf8');
};

preProcess();

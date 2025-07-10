// post-process.ts
import fs from 'fs-extra';
import { load } from 'js-yaml';
import { join } from 'path';
import { execSync } from 'child_process';

export const postProcess = async () => {
  // 1) load your baseUrl+CNAME config
  const cfg = load(
    await fs.readFile(join('..', '.upptimerc.yml'), 'utf8')
  ) as {
    'status-website'?: {
      cname?: string;
      robotsText?: string;
      baseUrl?: string;
    };
  };
  const baseUrl = cfg['status-website']?.baseUrl || '/';

  // 2) run the SvelteKit build
  console.log('Running `npm run build`…');
  execSync('npm run build', { stdio: 'inherit' });

  const out = join('.', 'build');
  console.log('Output directory:', out);

  // 3) if you built under a sub-folder, hoist its contents up
  if (baseUrl !== '/') {
    const nested = join(out, baseUrl);
    if (await fs.pathExists(nested)) {
      console.log(`Moving files from ${nested} → ${out}`);
      await fs.copy(nested, out, { recursive: true });
      await fs.remove(nested);
    }
  }

  // 4) write CNAME if you have one
  const [owner, repo] = (process.env.GITHUB_REPOSITORY || '').split('/');
  const cname = cfg['status-website']?.cname;
  if (cname && cname !== 'demo.upptime.js.org') {
    console.log('Writing CNAME:', cname);
    await fs.writeFile(join(out, 'CNAME'), cname);
  } else if (
    cname === 'demo.upptime.js.org' &&
    owner === 'upptime' &&
    repo === 'upptime'
  ) {
    console.log('Writing CNAME for demo.upptime.js.org');
    await fs.writeFile(join(out, 'CNAME'), cname);
  }

  // 5) write robots.txt if specified
  const robots = cfg['status-website']?.robotsText;
  if (robots) {
    console.log('Writing robots.txt');
    await fs.writeFile(join(out, 'robots.txt'), robots);
  }

  // 6) make 404.html from service-worker index if present
  const sw = join(out, 'service-worker-index.html');
  if (await fs.pathExists(sw)) {
    console.log('Copying service-worker-index.html → 404.html');
    await fs.copyFile(sw, join(out, '404.html'));
  }

  console.log('Post-process complete.');
};

postProcess();

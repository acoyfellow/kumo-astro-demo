// Reads the REAL installed version of a Kumo package from its node_modules
// package.json at build time. Never hardcoded — this is the actual number
// npm resolved on disk, so the version badge can never drift from reality.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Anchor at the project root (two levels up from src/lib/), then walk into
// node_modules. Using a URL relative to this module keeps it independent of
// the process cwd.
const projectRoot = fileURLToPath(new URL('../../', import.meta.url));

export function installedVersion(pkg: string): string {
  const path = `${projectRoot}node_modules/${pkg}/package.json`;
  const json = JSON.parse(readFileSync(path, 'utf8')) as { version?: string };
  if (!json.version) throw new Error(`No version in ${pkg}/package.json`);
  return json.version;
}

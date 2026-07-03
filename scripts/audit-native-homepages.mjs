import { spawn, spawnSync } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { chromium } from 'playwright';

const ROUTES = ['/svelte', '/vue', '/solid'];
const EXPECTED_PLAYWRIGHT_REVISION = 'chromium-1228';
const EXPECTED_CHROMIUM_VERSION = '149.0.7827.55';
const PORT = 4329;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const OUTPUT_DIR = path.resolve('artifacts/native-homepage-audit');
const RECEIPT_PATH = path.join(OUTPUT_DIR, 'receipt.json');
const ACTION_TIMEOUT_MS = 4_000;

const receipt = {
  schemaVersion: 1,
  startedAt: new Date().toISOString(),
  baseUrl: BASE_URL,
  pinnedBrowser: {
    playwright: '1.61.1',
    revision: EXPECTED_PLAYWRIGHT_REVISION,
    expectedVersion: EXPECTED_CHROMIUM_VERSION,
  },
  build: { passed: false },
  routes: [],
  passed: false,
};

let server;
let browser;
let shuttingDown = false;

function stopServer() {
  if (!server || server.exitCode !== null) return;
  server.kill('SIGTERM');
  const force = setTimeout(() => server?.kill('SIGKILL'), 2_000);
  force.unref();
}

async function saveReceipt() {
  receipt.finishedAt = new Date().toISOString();
  await mkdir(OUTPUT_DIR, { recursive: true });
  await writeFile(RECEIPT_PATH, `${JSON.stringify(receipt, null, 2)}\n`);
}

async function shutdown(exitCode) {
  if (shuttingDown) return;
  shuttingDown = true;
  stopServer();
  await browser?.close().catch(() => {});
  await saveReceipt().catch((error) => console.error(`Could not write receipt: ${error.message}`));
  process.exitCode = exitCode;
}

for (const signal of ['SIGINT', 'SIGTERM']) {
  process.on(signal, () => void shutdown(1));
}

function waitForServer(timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs;
  return new Promise((resolve, reject) => {
    const probe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/svelte`, { signal: AbortSignal.timeout(1_000) });
        if (response.status === 200) return resolve();
      } catch {}
      if (Date.now() >= deadline) return reject(new Error(`Preview did not become ready within ${timeoutMs}ms`));
      setTimeout(probe, 150);
    };
    void probe();
  });
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function cell(page, name) {
  return page.locator('ul.grid > li').filter({
    has: page.getByRole('link', { name, exact: true }),
  }).first();
}

async function runStep(routeReceipt, name, action) {
  const startedAt = Date.now();
  try {
    const details = await action();
    routeReceipt.checks.push({ name, passed: true, durationMs: Date.now() - startedAt, ...details });
  } catch (error) {
    routeReceipt.checks.push({
      name,
      passed: false,
      durationMs: Date.now() - startedAt,
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

async function auditRoute(route) {
  const routeReceipt = { route, checks: [], consoleErrors: [], pageErrors: [], requestFailures: [] };
  receipt.routes.push(routeReceipt);
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.setDefaultTimeout(ACTION_TIMEOUT_MS);
  page.on('console', (message) => {
    if (message.type() === 'error') routeReceipt.consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => routeReceipt.pageErrors.push(error.message));
  page.on('requestfailed', (request) => routeReceipt.requestFailures.push({
    url: request.url(),
    error: request.failure()?.errorText ?? 'unknown request failure',
  }));

  await runStep(routeReceipt, 'route returns HTTP 200', async () => {
    const response = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 10_000 });
    assert(response, 'Navigation produced no HTTP response');
    assert(response.status() === 200, `Expected HTTP 200, received ${response.status()}`);
    return { status: response.status() };
  });

  await runStep(routeReceipt, 'native island hydrates', async () => {
    await page.locator('ul.grid > li').first().waitFor({ state: 'visible' });
    const count = await page.locator('ul.grid > li').count();
    assert(count === 36, `Expected 36 homepage component cells, found ${count}`);
    return { componentCells: count };
  });

  await runStep(routeReceipt, 'tabs respond to pointer input', async () => {
    const about = cell(page, 'Tabs').getByRole('tab', { name: 'About', exact: true });
    await about.click();
    const selected = await about.getAttribute('aria-selected');
    assert(selected === 'true', `About tab aria-selected remained ${JSON.stringify(selected)}`);
    return { selectedTab: 'About' };
  });

  await runStep(routeReceipt, 'text input accepts user input', async () => {
    const input = cell(page, 'Input').locator('input').first();
    await input.fill('native hydration works');
    assert(await input.inputValue() === 'native hydration works', 'Text input did not retain the entered value');
    return { value: await input.inputValue() };
  });

  await runStep(routeReceipt, 'textarea accepts user input', async () => {
    const textarea = cell(page, 'InputArea').locator('textarea');
    await textarea.fill('multiline interaction works');
    assert(await textarea.inputValue() === 'multiline interaction works', 'Textarea did not retain the entered value');
    return { value: await textarea.inputValue() };
  });

  await runStep(routeReceipt, 'select opens and chooses an option', async () => {
    const trigger = cell(page, 'Select').getByRole('combobox');
    await trigger.click();
    const options = page.getByRole('option').filter({ visible: true });
    const optionCount = await options.count();
    assert(optionCount >= 3, `Expected at least 3 visible select options, found ${optionCount}`);
    await page.getByRole('option', { name: 'All deployed versions', exact: true }).click();
    const text = (await trigger.textContent())?.trim() ?? '';
    assert(text.includes('All deployed versions'), `Select trigger did not reflect selection; text was ${JSON.stringify(text)}`);
    return { optionCount, selected: 'All deployed versions' };
  });

  await runStep(routeReceipt, 'combobox filters and chooses an option', async () => {
    const input = cell(page, 'Combobox').getByRole('combobox');
    await input.fill('bug');
    const option = cell(page, 'Combobox').getByRole('option', { name: 'bug', exact: true }).filter({ visible: true });
    await option.click();
    assert(await input.inputValue() === 'bug', `Combobox value was ${JSON.stringify(await input.inputValue())}`);
    return { selected: 'bug' };
  });

  for (const overlay of [
    { check: 'dialog opens and closes', cell: 'Dialog', trigger: 'Click me!', role: 'dialog', text: 'Hello!' },
    { check: 'dropdown opens and closes', cell: 'Dropdown', trigger: 'Add', role: 'menu', text: 'Worker' },
    { check: 'popover opens and closes', cell: 'Popover', trigger: 'Open Popover', role: 'dialog', text: 'Popover Title' },
  ]) {
    await runStep(routeReceipt, overlay.check, async () => {
      // Reload between overlay checks so a component that fails to dismiss cannot
      // contaminate the role queries for the next component.
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 10_000 });
      await page.locator('ul.grid > li').first().waitFor({ state: 'visible' });
      const trigger = cell(page, overlay.cell).getByRole('button', { name: overlay.trigger, exact: true });
      await trigger.click();
      const panel = page.getByRole(overlay.role).filter({ hasText: overlay.text }).filter({ visible: true });
      await panel.waitFor({ state: 'visible' });
      assert(await panel.getByText(overlay.text, { exact: true }).isVisible(), `${overlay.text} was not visible`);
      await page.keyboard.press('Escape');
      await panel.waitFor({ state: 'hidden' });
      return { openedText: overlay.text, escaped: true };
    });
  }

  await runStep(routeReceipt, 'pagination advances', async () => {
    const pagination = cell(page, 'Pagination');
    const input = pagination.getByRole('textbox', { name: 'Page number' });
    assert(await input.inputValue() === '1', `Expected initial page 1, found ${JSON.stringify(await input.inputValue())}`);
    await pagination.getByRole('button', { name: 'Next page' }).click();
    assert(await input.inputValue() === '2', `Expected page 2 after Next, found ${JSON.stringify(await input.inputValue())}`);
    return { page: 2 };
  });

  await runStep(routeReceipt, 'toast appears from its visible trigger', async () => {
    // Toasty portals its viewport to document.body (matching canonical React), so
    // the resulting status role lives OUTSIDE the grid cell -- query document-wide,
    // the same pattern already used for dialog/dropdown/popover below. Scoped to the
    // real Toast element because the page also has an unrelated SVG loader with
    // role=status elsewhere in the grid.
    const trigger = cell(page, 'Toast').getByRole('button', { name: 'Give me a toast', exact: true });
    await trigger.click();
    const status = page.locator('[role=status][data-kumo-component=Toast]').filter({ visible: true });
    await status.waitFor({ state: 'visible' });
    return { status: (await status.innerText()).trim() };
  });

  await runStep(routeReceipt, 'no hydration, console, or request errors', async () => {
    await page.waitForTimeout(250);
    assert(routeReceipt.consoleErrors.length === 0, `Console errors: ${routeReceipt.consoleErrors.join(' | ')}`);
    assert(routeReceipt.pageErrors.length === 0, `Page errors: ${routeReceipt.pageErrors.join(' | ')}`);
    assert(routeReceipt.requestFailures.length === 0, `Request failures: ${JSON.stringify(routeReceipt.requestFailures)}`);
    return {};
  });

  const screenshot = path.join(OUTPUT_DIR, `${route.slice(1)}.png`);
  await runStep(routeReceipt, 'full-page screenshot captured', async () => {
    await page.screenshot({ path: screenshot, fullPage: true });
    return { path: path.relative(process.cwd(), screenshot) };
  });

  routeReceipt.passed = routeReceipt.checks.length > 0 && routeReceipt.checks.every((check) => check.passed);
  await page.close();
}

async function main() {
  await rm(OUTPUT_DIR, { recursive: true, force: true });
  await mkdir(OUTPUT_DIR, { recursive: true });

  const build = spawnSync('npm', ['run', 'build'], { encoding: 'utf8', timeout: 120_000 });
  receipt.build = {
    passed: build.status === 0 && !build.error,
    exitCode: build.status,
    signal: build.signal,
    error: build.error?.message,
    stdoutTail: build.stdout?.slice(-4_000),
    stderrTail: build.stderr?.slice(-4_000),
  };
  assert(receipt.build.passed, 'Production build failed');

  server = spawn('npm', ['run', 'preview', '--', '--host', '127.0.0.1', '--port', String(PORT)], {
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let previewLog = '';
  server.stdout.on('data', (chunk) => { previewLog = `${previewLog}${chunk}`.slice(-4_000); });
  server.stderr.on('data', (chunk) => { previewLog = `${previewLog}${chunk}`.slice(-4_000); });
  await waitForServer();

  const executablePath = chromium.executablePath();
  assert(executablePath.includes(EXPECTED_PLAYWRIGHT_REVISION), `Expected ${EXPECTED_PLAYWRIGHT_REVISION}, got ${executablePath}`);
  browser = await chromium.launch({ headless: true, timeout: 15_000 });
  const version = browser.version();
  receipt.pinnedBrowser = { ...receipt.pinnedBrowser, executablePath, actualVersion: version };
  assert(version === EXPECTED_CHROMIUM_VERSION, `Expected Chromium ${EXPECTED_CHROMIUM_VERSION}, got ${version}`);

  for (const route of ROUTES) await auditRoute(route);
  receipt.previewLogTail = previewLog;
  receipt.passed = receipt.build.passed && receipt.routes.length === ROUTES.length && receipt.routes.every((route) => route.passed);
  for (const route of receipt.routes) {
    const failed = route.checks.filter((check) => !check.passed);
    console.log(`${route.passed ? 'PASS' : 'FAIL'} ${route.route}: ${route.checks.length - failed.length}/${route.checks.length} checks passed`);
    for (const check of failed) console.log(`  - ${check.name}: ${check.error.split('\n')[0]}`);
  }
  console.log(`Receipt: ${path.relative(process.cwd(), RECEIPT_PATH)}`);
  await shutdown(receipt.passed ? 0 : 1);
}

main().catch(async (error) => {
  receipt.fatalError = error instanceof Error ? error.stack : String(error);
  receipt.passed = false;
  console.error(receipt.fatalError);
  await shutdown(1);
});

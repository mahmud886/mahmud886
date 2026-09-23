// Renders /resume through headless Chrome (print stylesheet) into public/iqbal_mahmud_7_years.pdf.
// Usage: npm run build && npm run resume:pdf
import { spawn, execFileSync } from 'node:child_process';
import { resolve } from 'node:path';

const PORT = 3999;
const OUT = resolve('public/iqbal_mahmud_7_years.pdf');
const CHROME = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// Own process group, so the whole npx → next tree can be stopped together.
const server = spawn('npx', ['next', 'start', '-p', String(PORT)], { stdio: 'ignore', detached: true });
try {
  for (let i = 0; i < 60; i++) {
    try {
      if ((await fetch(`http://localhost:${PORT}/resume`)).ok) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  execFileSync(CHROME, [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=8000',
    `--print-to-pdf=${OUT}`,
    `http://localhost:${PORT}/resume`,
  ]);
  console.log(`Wrote ${OUT}`);
} finally {
  process.kill(-server.pid, 'SIGTERM');
}

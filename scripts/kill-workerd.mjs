/**
 * Pre-build step: kill any running workerd.exe processes that hold a file lock
 * on .open-next/assets, preventing the OpenNext build from cleaning up.
 * Fails silently if not on Windows or if no process is found.
 */
import { execSync } from 'node:child_process';
try {
  execSync('taskkill /F /IM workerd.exe', { stdio: 'ignore' });
  console.log('Stopped workerd.exe before build.');
} catch {
  // Not running or not Windows — nothing to do
}

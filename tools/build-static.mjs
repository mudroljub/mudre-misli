import { spawnSync } from 'node:child_process'

const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npmCommand, ['run', 'build'], {
  env: { ...process.env, STATIC_EXPORT: 'true' },
  stdio: 'inherit',
})

if (result.error) throw result.error
process.exit(result.status ?? 1)

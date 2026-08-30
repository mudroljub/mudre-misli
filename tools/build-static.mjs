import { spawnSync } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
await fs.rm(path.join(rootDir, '.next'), { recursive: true, force: true })

const npmCli = process.env.npm_execpath
const command = npmCli ? process.execPath : 'npm'
const args = npmCli ? [npmCli, 'run', 'build'] : ['run', 'build']
const result = spawnSync(command, args, {
  cwd: rootDir,
  env: { ...process.env, STATIC_EXPORT: 'true' },
  stdio: 'inherit',
})

if (result.error) throw result.error
process.exit(result.status ?? 1)

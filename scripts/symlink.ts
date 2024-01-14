import { existsSync } from 'node:fs'
import { symlink } from 'node:fs/promises'
import { resolve } from 'node:path'
import { argv, cwd, exit } from 'node:process'

const from = argv[2]
const to = argv[3]

const fromPath = resolve(cwd(), from)
const toPath = resolve(cwd(), to)

if (!existsSync(from)) {
  console.error(`⚠️ ERROR: path not found: ${from} relative to ${cwd()}`)
  exit(1)
}

if (!existsSync(toPath))
  await symlink(fromPath, toPath, 'junction')

else
  console.info(`Symlink in '${toPath}' already exists.`)

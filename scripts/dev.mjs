/**
 * Start Next dev with a canonical project path (fixes Windows Nedf vs nedf casing).
 */
import { spawn } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const canonicalRoot = fs.realpathSync.native(projectRoot)

process.chdir(canonicalRoot)

const nextBin = path.join(canonicalRoot, "node_modules", "next", "dist", "bin", "next")

console.log(`[dev] Using project root: ${canonicalRoot}`)

const child = spawn(process.execPath, [nextBin, "dev"], {
  cwd: canonicalRoot,
  stdio: "inherit",
  env: { ...process.env, NEXT_PROJECT_ROOT: canonicalRoot },
})

child.on("exit", (code) => process.exit(code ?? 0))

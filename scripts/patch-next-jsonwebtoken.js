#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const bundledJsonWebTokenPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'next',
  'dist',
  'compiled',
  'jsonwebtoken',
  'index.js'
)

const brokenSnippet = 'var n=t(300).Buffer;var i=t(300).SlowBuffer;'
const patchedSnippet = 'var n=t(300).Buffer;var i=t(300).SlowBuffer||t(300).Buffer;'

if (!fs.existsSync(bundledJsonWebTokenPath)) {
  process.exit(0)
}

const source = fs.readFileSync(bundledJsonWebTokenPath, 'utf8')

if (source.includes(patchedSnippet)) {
  console.log('[patch-next-jsonwebtoken] already patched')
  process.exit(0)
}

if (!source.includes(brokenSnippet)) {
  console.warn('[patch-next-jsonwebtoken] expected Next.js snippet not found')
  process.exit(0)
}

fs.writeFileSync(bundledJsonWebTokenPath, source.replace(brokenSnippet, patchedSnippet))
console.log('[patch-next-jsonwebtoken] patched Next bundled jsonwebtoken for modern Node')

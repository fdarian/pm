# pm

A CLI for smarter package manager operations in monorepos.

Wraps `pnpm` and `bun` with monorepo awareness — automatically detects your package manager, knows where you are in the workspace, and prevents accidental full-monorepo installs.

## Install

```bash
npm install -g better-pm
```

Or with Homebrew:

```bash
brew install fdarian/tap/better-pm
```

## Usage

```bash
# From inside a workspace package — installs only that package
pm i

# Target specific packages
pm i -F @myapp/web
pm i -F @myapp/web -F @myapp/api

# From monorepo root — requires explicit confirmation
pm i --sure
```

### What happens at the monorepo root

Running `pm i` from the root without flags shows a warning and lists workspace packages in a tree, then tells you how to proceed:

```
[WARNING] You are at the monorepo root. This will install ALL packages.

Workspace packages:
├── packages/
│   ├── core "@myapp/core"
│   └── utils "@myapp/utils"
└── apps/
    └── web "@myapp/web"

To install a specific package:
  pm i -F <package-name>

To install everything:
  pm i --sure
```

## How it works

1. **Detects your package manager** by walking up from the current directory looking for `pnpm-lock.yaml` or `bun.lock`/`bun.lockb`
2. **Detects monorepo context** — whether you're at the root or inside a workspace package
3. **Builds the right command** — `pnpm -F pkg... install` or `bun install --filter pkg`

## Supported package managers

- pnpm
- bun

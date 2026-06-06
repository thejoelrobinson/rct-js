import { defineConfig, configDefaults } from 'vitest/config'

// The repo keeps per-agent git worktrees under `.claude/worktrees/`. Each is a
// full checkout, so `vitest run --root .` would otherwise collect a stale COPY
// of every test from all ~18 worktrees and report phantom failures from code
// months behind `main`. Exclude them (and the scratch findings dir) so a run
// only ever reflects the real repo-root tests. See CLAUDE.md "Commands".
export default defineConfig({
  test: {
    exclude: [
      ...configDefaults.exclude,
      '.claude/worktrees/**',
      '.claude/scratch/**',
    ],
  },
})

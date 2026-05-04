#!/usr/bin/env bash
# .claude/hooks/format.sh
# PostToolUse hook: auto-formats TypeScript files after Claude writes/edits them.
# Uses local project binaries via pnpm.

set -euo pipefail

# ── 1. Read the JSON event Claude Code sends via stdin ────────────────────────
INPUT=$(cat)

# ── 2. Extract the file path ──────────────────────────────────────────────────
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

# Nothing to format if no file path was found
if [[ -z "$FILE_PATH" ]]; then
  exit 0
fi

# ── 3. Only process TypeScript / TSX files ────────────────────────────────────
if [[ ! "$FILE_PATH" =~ \.(ts|tsx)$ ]]; then
  exit 0
fi

# ── 4. Resolve to an absolute path ────────────────────────────────────────────
if [[ "$FILE_PATH" != /* ]]; then
  FILE_PATH="${CLAUDE_PROJECT_DIR}/${FILE_PATH}"
fi

# Make sure the file actually exists
if [[ ! -f "$FILE_PATH" ]]; then
  exit 0
fi

echo "[hook] Formatting: $FILE_PATH"

# ── 5. Run Prettier (local version via pnpm) ──────────────────────────────────
if command -v pnpm &>/dev/null; then
  pnpm exec prettier --write "$FILE_PATH" --log-level warn
else
  echo "[hook] WARNING: pnpm not found, skipping Prettier step"
fi

# ── 6. Run ESLint --fix (only if config exists) ────────────────────────────────
ESLINT_CONFIG=$(find "${CLAUDE_PROJECT_DIR}" -maxdepth 2 \
  \( -name "eslint.config.*" -o -name ".eslintrc*" \) 2>/dev/null | head -1)

if [[ -n "$ESLINT_CONFIG" ]]; then
  if command -v pnpm &>/dev/null; then
    pnpm exec eslint --fix "$FILE_PATH" --quiet || true
  else
    echo "[hook] WARNING: pnpm not found, skipping ESLint step"
  fi
fi

# Always exit 0 — PostToolUse hooks should never block Claude.
exit 0
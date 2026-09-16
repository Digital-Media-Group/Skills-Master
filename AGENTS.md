# Repository Instructions

## Persistent Change Workflow

For every completed repository change:

1. Review whether `README.md` and `README.en.md` need an update for new skills, categories, workflows, or user-facing behavior.
2. Regenerate catalogs and adapters with `npm run build` after source skill changes.
3. Run the relevant validation and tests before reporting completion.
4. Review `git status`, the complete diff, and generated artifacts.
5. Create a focused commit when the change is ready.
6. Push the current branch to its configured GitHub remote when the user has requested publication for the change.

Do not include `.env`, credentials, tokens, or other secrets in commits. Preserve unrelated user changes and never use destructive Git commands without explicit authorization.

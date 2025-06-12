# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## My Role
**I am a Worker (ワーカー)**

As a Worker, I will:
- Only work when there is a GitHub Issue assigned to me
- Follow Issue instructions exactly
- Never make independent decisions about what to implement
- Create Pull Requests for all work
- Wait for next instructions after completing tasks
- Check for new Issues every 30 minutes

## Essential First Steps

**ALWAYS** read `github-dev-roles.md` before starting any work - it contains critical workflow rules and role definitions.

Key rules from the workflow:
- Never work without a GitHub Issue
- Check Issues every 30 minutes for new instructions
- Always use Pull Requests (never push directly to develop/main)
- Create `.gitignore` first when starting a new project
- Close Issues after completing work
- Workers must wait for next instructions after task completion

## Development Workflow Commands

### Issue Management
```bash
# Check assigned issues
gh issue list --assignee @me --state open

# Comment on issue to start work
gh issue comment [ISSUE_NUMBER] --body "作業を開始します"

# Comment on issue completion
gh issue comment [ISSUE_NUMBER] --body "実装完了。PR: #[PR_NUMBER]"
```

### Branch and PR Workflow
```bash
# Create feature branch (include issue number)
git checkout -b feature/issue-[ISSUE_NUMBER]-[description]

# Create PR to develop branch
gh pr create --base develop --head feature/issue-[ISSUE_NUMBER] \
  --title "[#ISSUE_NUMBER] Feature description" \
  --body "Closes #[ISSUE_NUMBER]"

# Request review
gh pr comment [PR_NUMBER] --body "レビューをお願いします"
```

### Quality Checks
```bash
# Always run before committing
npm test
npm run build  
npm run lint

# Check git status to avoid committing unwanted files
git status
```

## Architecture

This repository manages GitHub development workflows with two main roles:

- **Workers (開発者)**: Implement features based on Issues, create PRs, wait for instructions
- **Directors (ディレクター/PM)**: Create Issues, review PRs, manage workflow

The workflow enforces strict Issue-based development where no work happens without a corresponding GitHub Issue.

## File Structure

- `github-dev-roles.md`: Complete workflow documentation and rules (Japanese)
- Branch strategy: `main` → `develop` → `feature/*` or `fix/*`

## Required .gitignore Template

When starting new projects, create this `.gitignore`:
```
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
.idea/
```

## Role-Specific Behavior

### If Acting as Worker
- Wait for Issues before starting work
- Follow Issue instructions exactly
- Create PR for all work
- Wait for next instructions after completion

### If Acting as Director  
- Create detailed Issues with acceptance criteria
- Review and merge PRs
- Provide clear start/stop instructions
- Monitor worker compliance with workflow
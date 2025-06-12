# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This repository is for developing a high-performance text editor for Mac using Electron + React + TypeScript. It follows strict GitHub development workflow guidelines (`github-dev-roles.md`) that define roles and procedures for collaborative development between directors and workers.

## Role Determination

**Important**: Your role (Director or Worker) should be determined by the context of your session:
- If you're asked to **create Issues**, **review PRs**, or **manage the project** → You are a Director
- If you're asked to **implement features**, **fix bugs**, or **work on specific Issues** → You are a Worker
- When in doubt, check existing Issues and project context to understand your expected role

## Critical Workflow Rules

### First Actions Required
1. **Always read `github-dev-roles.md` first** - This contains all workflow rules
2. **Check current GitHub Issues** using `gh issue list --assignee @me --state open`
3. **Determine your role**: Worker (developer) or Director (reviewer/PM)
4. **Never start work without an active Issue assignment**

### Core Development Commands
```bash
# Check for assigned issues (run every 30 minutes)
gh issue list --assignee @me --state open

# Create feature branch (include issue number)
git checkout -b feature/issue-[ISSUE_NUMBER]-[description]

# Create pull request (required - no direct pushes)
gh pr create --base develop --head feature/issue-[ISSUE_NUMBER] --title "[#ISSUE_NUMBER] Summary"

# Comment on issues (structured communication)
gh issue comment [ISSUE_NUMBER] --body "**From**: [Role]\n**To**: [Role]\n\n[Message]"
```

### .gitignore Requirements
Must create this file at project start:
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

## Role-Based Responsibilities

### If you are a Worker (Developer):
- **Wait for Issues** - Never work without assigned Issues
- **Follow exact Issue requirements** - No scope expansion
- **Create PRs for all changes** - Direct pushes to develop/main prohibited  
- **Stop work after completion** - Wait for next Issue assignment
- **Check for new Issues every 30 minutes** during waiting periods

### If you are a Director (PM/Reviewer):
- **Create detailed Issues** using the structured template in github-dev-roles.md
- **Review and merge PRs** - Workers cannot merge their own PRs
- **Monitor worker compliance** with workflow rules
- **Provide clear start/stop work instructions**

## Communication Protocol

All communication must follow "**From**: [Role] **To**: [Role]" format in Issue/PR comments. Use GitHub Issues and PRs exclusively - no external communication channels for work coordination.

## Branch Strategy
- `main`: Production
- `develop`: Development base
- `feature/*`: Feature branches (require Issues)
- `fix/*`: Bug fix branches (require Issues)

## Quality Checks
Before completing any task:
```bash
npm test       # Run tests
npm run build  # Verify build
npm run lint   # Check code style
```

## Critical Violations to Avoid
- Working without assigned Issues
- Direct pushes to develop/main (always use PRs)
- Including node_modules/ in commits
- Continuing work after task completion without new Issues
- Bypassing the director review process
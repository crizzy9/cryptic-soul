---
title: "Managing Git Workflows with Lazy Git"
description: "Lazygit is the perfect tool for Software Engineers to manage their git needs"
pubDate: "Feb 07 2025"
heroImage: "/lazygit.png"
tags: ["git"]
---

# Git Feature Branch Workflows

## Ideal Workflow

![hotfix_branches](public/hotfix_branches.svg)

## Suggested Git Tool

LazyGit (https://github.com/jesseduffield/lazygit)

? - To View all Keyboard shortcuts

### Lazyily Merge Conflict

just stage the changes you want in chunks as suggested automatically by lazygit at a glance using just Space

### Lazyily Ammend Commits

(r to reword commits, a to ammend commit details and authors)

### Lazyily Cherry Pick

pretty much drag and drop
(C to copy, P to paste)

### Lazyily Push and Pull

p to pull and P to push

### Lazyily stash

stash using s, pop using space

## Essential Git Commands

```sh
git checkout master (Space in lazygit, p to pull from origin)
git pull origin master --rebase

# Create and push feature branch
git checkout feature-branch
git push origin feature-feature-branch (P to push to origin in lazygit)

# Create JIRA branch
git checkout JIRA-1234

<Make Changes>
git add --all (space to add a file/line to staging area)
git commit -m "feat: commit 1"

<Make Changes>
git add --all
git commit -m "feat: commit 2"

git push origin JIRA-1234 (P to push to origin in lazygit)
<Create PR against feature-branch>
<Get changes reviewed>

# Merge PR
git checkout feature-branch
git merge --squash JIRA-1234 (m to merge, s to squash merge in lazygit)

<Create PR against master>
<Get changes reviewed>

# Merge PR
git checkout master
git merge --squash feature-branch
```

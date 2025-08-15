# CLAUDE.md - I Am Actor Coaching Program

This file provides workflow guidance for Claude Code when working on the I Am Actor project.

## Project Overview
**I Am Actor** - Landing page for Hans's acting coaching program

## Tech Stack
- Frontend: Vanilla JS, HTML, CSS
- Backend: Vercel Serverless Functions
- Deployment: Vercel
- Payments: Stripe Checkout

## 🎯 Core Workflow Rules
1. Think → Plan → Verify

First: Read and understand the codebase thoroughly
Then: Create a detailed plan in tasks/todo.md
Always: Break down work into simple, discrete tasks

2. Task Management

Create todo items that can be checked off: - [ ] Task description
Mark completed items: - [x] Completed task
Keep tasks small and focused (avoid complexity)

3. Plan Approval Process

CRITICAL: Always check with the user before beginning work
Present the plan clearly and wait for verification
Never start coding without explicit approval

4. Execution Standards

Work through todo items systematically
Mark each task as complete: - [x] when finished
Provide high-level explanations of changes (not implementation details)

5. Simplicity Principle

Make every change as simple as possible
Minimize code impact - affect as few files as possible
Avoid massive or complex modifications
When in doubt, choose the simpler approach

## 🛠️ Technical Best Practices

### Model Selection Strategy
- **Planning Phase**: Use /mod opus for complex planning and architectural decisions
- **Execution Phase**: Use /mod sonnet for implementation (saves costs while maintaining quality)
- Switch models intentionally based on task complexity

### Context Management
- Use `/clear` frequently to reduce hallucinations and save tokens
- Clear context after completing major features or task groups
- Don't let conversations run for hours without clearing
- Store context in `project-context/` for agent handoffs

### Agent Orchestration
Available specialized agents in `.claude/agents/`:
- **project-architect.md** - System design and architecture
- **feature-developer.md** - Feature implementation
- **bug-hunter.md** - Debugging and fixes
- **payment-integrator.md** - Stripe integration
- **qa-tester.md** - Testing and quality assurance

Use agents for complex tasks requiring specialized focus. Pass context through files, not conversation.

### File Management
- **Tasks**: Track in `tasks/todo.md`
- **Context**: Store in `project-context/`
- **Agents**: Define in `.claude/agents/`

### Security Protocol
After every feature implementation, run this security check:

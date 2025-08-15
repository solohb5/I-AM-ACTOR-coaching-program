# Claude Code Workflow Guide - I Am Actor Project

## How This Workflow Helps You

### 1. Task Management (`tasks/todo.md`)
Track what needs to be done persistently across sessions:
```markdown
- [ ] Add Stripe keys to Vercel
- [ ] Test full payment flow
- [x] Set up landing page
```

### 2. Context Files (`project-context/`)
Keep important info accessible without cluttering conversation:
- `current-state.md` - What's built and working
- `technical-decisions.md` - Why we chose certain approaches
- `next-steps.md` - Prioritized action items

### 3. Specialized Agents (`.claude/agents/`)
Use the right expert for each task:
- **conversion-optimizer** - Improve landing page conversions
- **payment-integrator** - Handle Stripe setup
- **bug-hunter** - Debug issues
- **qa-tester** - Test across devices

## Workflow in Action

### Example 1: Fixing Stripe Integration
```
You: "Help me get Stripe payments working"

Claude: *Reads payment-integrator agent prompt*
        *Checks current-state.md for context*
        *Creates plan in tasks/todo.md*
        *Implements step by step*
```

### Example 2: Improving Conversions
```
You: "Landing page isn't converting well"

Claude: *Uses conversion-optimizer agent*
        *Analyzes current implementation*
        *Suggests A/B tests*
        *Updates next-steps.md with recommendations*
```

## Key Commands

### Model Switching (Save Money)
- `/mod opus` - For complex planning (expensive, smart)
- `/mod sonnet` - For implementation (cheaper, capable)
- `/clear` - Reset context after completing features

### When to Clear Context
- After completing a major feature
- When switching to unrelated work
- If responses seem confused
- Every 2-3 hours of work

## Best Practices

### 1. Start Each Session
- Check `tasks/todo.md` for what's pending
- Read `current-state.md` if returning after time away
- Pick specific task to focus on

### 2. During Work
- Update todos as you complete them
- Write important decisions to context files
- Use appropriate agent for specialized tasks

### 3. End of Session
- Update `current-state.md` with changes made
- Mark completed todos
- Add any new discoveries to `next-steps.md`

## Project-Specific Workflows

### Adding New Feature
1. Check with conversion-optimizer agent
2. Plan in tasks/todo.md
3. Implement with feature-developer approach
4. Test with qa-tester checklist
5. Update current-state.md

### Debugging Issue
1. Use bug-hunter agent approach
2. Document issue in context
3. Test fix across browsers
4. Update technical-decisions.md if needed

### Optimizing Conversions
1. Consult conversion-optimizer agent
2. Create A/B test plan
3. Implement variations
4. Track in next-steps.md

## Remember
- **Agents** = Specialized expertise
- **Context files** = Persistent memory
- **Todo list** = Clear action items
- **Model switching** = Cost optimization
- **Clear command** = Fresh start

This workflow keeps you organized, reduces costs, and maintains consistency across sessions.
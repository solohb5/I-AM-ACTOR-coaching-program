# Project Context Directory

This directory contains context files for agent handoffs and information sharing.

## Purpose
- Store context between agent transitions
- Maintain project state across sessions
- Document decisions and rationale
- Share information without token overhead

## File Structure
- `current-feature.md` - Active feature being developed
- `technical-decisions.md` - Architecture and tech choices
- `known-issues.md` - Bugs and problems to address
- `handoff-notes.md` - Information for agent transitions

## Usage
1. Agents write context here before handoff
2. New agents read context to understand state
3. Keep files concise and updated
4. Clear old context when no longer needed
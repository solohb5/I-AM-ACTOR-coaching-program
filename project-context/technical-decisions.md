# Technical Decisions

## Architecture Choices

### Why No Backend Database
- **Decision**: Use Stripe as source of truth for purchases
- **Rationale**: 
  - Simpler to maintain
  - Stripe already stores customer data
  - Can always add database later if needed
  - Reduces security concerns

### Why Vanilla JS
- **Decision**: No framework (React/Vue/etc)
- **Rationale**:
  - Landing page doesn't need complex state
  - Faster load times
  - Easier to optimize
  - No build process needed

### Why Vercel
- **Decision**: Vercel for hosting and serverless
- **Rationale**:
  - Great DX for serverless functions
  - Automatic deployments from Git
  - Built-in environment variable management
  - Good performance out of the box

### Payment Flow
- **Decision**: Stripe Checkout (hosted)
- **Rationale**:
  - PCI compliance handled by Stripe
  - Trusted checkout experience
  - Mobile optimized
  - Handles all edge cases

## Future Considerations

### If We Need User Accounts
- Options: Auth0, Clerk, or Supabase Auth
- Keep it separate from payment flow

### If We Need to Track Sessions
- Start with Stripe metadata
- Move to Airtable or Notion API if needed
- Last resort: Add proper database

### If We Need Email Marketing
- ConvertKit or Mailchimp integration
- Triggered from Stripe webhooks
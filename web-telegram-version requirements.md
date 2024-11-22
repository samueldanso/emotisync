# EmotiSync Web & Telegram Version Requirements

## Project Structure

- Main Branch (emotisync.xyz)

  - Web version only
  - Google OAuth authentication
  - Core features

- CAPX Branch (feat/capx-auth)
  - Telegram mini app version
  - CAPX authentication
  - Core features + Telegram specific features

## Environment Setup

### Web Version (main)

```env
# Required
NEXT_PUBLIC_APP_URL=
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_KEY=
HUME_API_KEY=
HUME_SECRET_KEY=
```

### Telegram Version (feat/capx-auth)

```env
# All Web Version vars +
TELEGRAM_BOT_TOKEN=
CAPX_CLIENT_ID=
CAPX_CLIENT_SECRET=
CAPX_API_URL=
NEXT_PUBLIC_PRIVY_APP_ID=
NEXT_PUBLIC_CAPX_CHAIN_*= # Chain specific vars
```

## Implementation Steps

1. Clean Up Phase

   - Remove redundant auth directory
   - Clean up unused imports
   - Fix linter errors

2. Platform Detection

   - Keep platform detection in client.ts
   - Handle SSR cases
   - Proper Telegram WebApp detection

3. Provider Setup

   - Web: Basic providers without Telegram/CAPX
   - Telegram: Full provider stack with SDK

4. Authentication Flow

   - Web: Google OAuth via Supabase
   - Telegram: CAPX auth with init data

5. Feature Implementation
   - Core features shared between platforms
   - Platform-specific UI components
   - Conditional rendering based on platform

## Testing Requirements

### Web Version

- Google auth flow
- User onboarding
- Core app features
- No Telegram/CAPX code loaded

### Telegram Version

- CAPX auth flow
- Telegram SDK integration
- Privy wallet functionality
- Core app features
- Platform-specific features

## Deployment Strategy

### Web Version (main)

- Domain: emotisync.xyz
- Environment: Production
- Features: Web-only

### Telegram Version (feat/capx-auth)

- Domain: emotisync-capx.vercel.app
- Environment: Production
- Features: Telegram + CAPX

## Code Organization

### Shared Code

```typescript
/src
  /app
    /features      # Core features
    /components    # Shared components
  /lib
    /utils        # Shared utilities
    /types        # Shared types
```

### Platform-Specific Code

```typescript
/src
  /features
    /web          # Web-specific features
    /telegram     # Telegram-specific features
  /providers
    /web          # Web providers
    /telegram     # Telegram providers
```

## Error Handling

- Platform-specific error boundaries
- Proper error messages per platform
- Fallback UI for each platform

## Performance Requirements

- No unnecessary code loading
- Platform-specific code splitting
- Optimized bundle sizes

## Security Requirements

- Proper auth token handling
- Secure environment variables
- Platform-specific security measures

## Maintenance Guidelines

1. Keep branches separate
2. No merging between platforms
3. Core features added to main first
4. Platform-specific features in respective branches

## Launch Checklist

- [ ] Remove all console.logs
- [ ] Environment variables set
- [ ] Error boundaries in place
- [ ] Performance optimized
- [ ] Security measures implemented
- [ ] Testing completed
- [ ] Documentation updated

## Reference Points

- CAPX Auth Requirements
- Telegram Mini App Guidelines
- Next.js Best Practices
- Vercel Deployment Guidelines

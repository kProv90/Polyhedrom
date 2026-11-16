# Polyhedrom

A sleek, responsive web-based tabletop companion app for Dungeon Masters, players, and everything in-between. Designed to streamline prep and play at the table by intelligently organizing campaigns, enabling powerful no-code custom sheet creation, and fostering a creator-friendly community.

**Core Identity**: The intelligent hub that combines flexible content organization (Virtual Drive), deep customization (Workshop), thoughtful character creation with AI assistance, and a generous creator marketplace — all system-agnostic and built for both casual and dedicated gamers.

## Tech Stack
- **Frontend**: Vue 3 + Vuetify (compact density) + Pinia
- **Backend**: Google Firebase (Auth, Storage for files/images/assets, Firestore for metadata)
- **Key Libraries**: Pixi.js (for future basic maps)
- **Design Approach**: Responsive web app with desktop excellence for organization and editing, mobile excellence for sheets, dice, and quick reference. Progressive enhancement and strict performance budgets.

## Development Principles
1. **Desktop excellence** for campaign management, organization, and detailed editing tools
2. **Mobile excellence** for character sheets, dice rolling, and quick reference at the table
3. **AI Assistant** as a meaningful competitive edge
4. **Community-first & creator-friendly** pricing and features (affordable tiers + 95% creator revenue share)
5. **System-agnostic** design to serve the entire TTRPG ecosystem, including heavy homebrew and indie systems
6. **Progressive enhancement** with graceful degradation for older devices
7. **Performance-first** mindset (fast load times, smooth interactions)

## Monetization (Hybrid Model)
Flexible options for every type of gamer:

**Subscription Tiers (via Stripe)**
- **Free**: 1 campaign, 3 character sheets, basic dice, 500 MB storage, browse Bazaar only
- **Bronze** ($2.99/mo or $29/yr): 5 campaigns, 20 sheets, full dice + inventory, 2 GB storage, Bazaar selling (creators keep 95%), basic AI
- **Silver** ($4.99/mo or $49/yr) – Popular: Unlimited sheets, 5 GB storage, full Workshop, enhanced AI, full campaign tracking + note linking
- **Gold** ($7.99/mo or $79/yr): Unlimited core features, 10 GB+ storage, priority Bazaar visibility, collaboration tools, advanced AI, analytics

**One-time Lifetime Option**
- **Polyhedrom Pro** – $49 (includes Silver-level features forever: unlimited sheets, full Workshop, etc.)

**Bazaar Revenue Model**: Flat 5% platform fee (creators keep 95%) to sustain the platform while maximizing creator earnings.

## Current Progress & Phase 1 – MVP (Launch Ready)
Focus: Deliver a polished, focused core experience centered on organization and creation.

### Core Infrastructure
- **Virtual Drive**: Multi-root content curator (My Drive, Trash, Shared, Favorites, Recent) with CRUD, breadcrumbs, and Firebase backend. In-progress: drag-and-drop, context menus, thumbnails.
- **Workshop (Sheet Designer)**: Powerful no-code 17x22 print-friendly grid canvas with ribbon controls, variable/expression bindings for live auto-calculation, edit/preview/form modes. Landing page complete; editor foundation in progress.
- **Character Designer**: 100-question guided questionnaire + AI fleshing that flows directly into Workshop sheets.
- Responsive design optimized for both desktop and mobile use.
- Subscription system + Stripe integration.
- Basic dice roller with history, inventory tracking, markdown Campaign Tracking with note linking.

### Essential Tools at Launch
- Intelligent **Virtual Drive** as the central campaign hub
- **Workshop** for dynamic, auto-calculating custom sheets (any system)
- **Character Designer** with AI assistance
- Campaign notes and basic party management
- Forum (LFG + discussion) and private Messaging
- Initial **Bazaar** marketplace for sharing and selling creations (Workshop templates, assets, images, audio)

**Stretch Goals** (to accelerate development and deliver extra value):
1. **Virtual Drive Mastery** — Full drag-and-drop, right-click context menus, thumbnail previews, improved breadcrumbs
2. **Workshop Evolution** — Complete ribbon toolbar, grid snapping + free placement, visual expression builder, desktop/phone viewport previews
3. **AI Assistant Unlock** — Full Character Designer integration + basic AI tools (loot generator, simple plot hooks)
4. **Bazaar & Creator Economy** — Enhanced selling tools, search/filtering, featured listings, and backer template pack
5. **Basic Battle Maps** — Simple 2D grid maps with Pixi.js: map upload/import, grid overlay (square/hex), token placement/movement, desktop editor + mobile read-only viewer, integrated with Virtual Drive
6. **Collaboration Boost** — Party sharing, improved real-time messaging, initiative tracker, session planning templates
7. **Premium Polish** — Higher storage limits, advanced AI usage, exclusive backer content (dice skins matching app colors, printable assets)

## Phase 2 – Differentiation Features (Post-Launch, ~1 Year)
- Expanded **AI Integration**: NPC dialogue, plot hooks, session recaps, rules helper, encounter balancer
- Enhanced community tools: fuller LFG/forum features, user profiles, ratings/reviews
- Improved session tools: condition tracker, shared notes, basic collaboration
- Light map improvements based on user feedback

## Phase 3 – Advanced Features (Year 2+)
- Full Creator Marketplace enhancements (modules, token packs, dice themes, analytics dashboard)
- Real-time co-editing, relationship mapping, campaign wiki system
- **Advanced Map Features** (if prioritized): dynamic lighting, fog of war, line of sight, measurement tools, weather effects
- Offline/PWA support with service workers
- Discord bot integration, calendar sync, PDF export, and import tools from other platforms

## Phase 4 – Premium / Long-Term Vision
- Deep analytics and campaign insights
- Public API and webhooks for third-party integrations
- Potential native mobile apps or Electron desktop app (only if PWA insufficient)
- Expanded ecosystem integrations

**Key Philosophy**: Launch with a strong, focused MVP centered on Virtual Drive + Workshop + Character Designer. Use stretch goals to polish core features and add high-value additions like basic maps without compromising quality or timeline. Maps will start simple and evolve based on community demand rather than competing directly with dedicated VTTs early on.

*Document last updated: March 2026*  
*Built by gamers, for gamers — organizing the chaos, empowering creators, and making every session more enjoyable.*
// ─────────────────────────────────────────────────────────────────────────────
// FAKE STAND-IN DATA
// All data in this file is temporary. Replace each export with a real API call
// when the backend is ready.
// ─────────────────────────────────────────────────────────────────────────────

// ── Characters ────────────────────────────────────────────────────────────────

export const fakeCharacters: Character[] = [
  { id: 1, name: 'Valdris Stonebrow', race: 'Dwarf', class: 'Fighter', level: 7, status: 'In Campaign', campaign: 'The Shattered Isles', traits: ['Gruff', 'Loyal'], created: '2026-01-04' },
  { id: 2, name: 'Seraphine Lux', race: 'Aasimar', class: 'Cleric', level: 5, status: 'In Campaign', campaign: 'Curse of the Ember Throne', traits: ['Pious', 'Healer'], created: '2026-01-09' },
  { id: 3, name: 'Krix Nettlewood', race: 'Goblin', class: 'Rogue', level: 1, status: 'Concept', campaign: null, traits: ['Sneaky', 'Greedy'], created: '2026-01-15' },
  { id: 4, name: 'Thorn Ashveil', race: 'Half-Elf', class: 'Ranger', level: 1, status: 'Concept', campaign: null, traits: ['Brooding', 'Tracker'], created: '2026-01-18' },
  { id: 5, name: 'Mira of the Tide', race: 'Triton', class: 'Druid', level: 6, status: 'In Campaign', campaign: 'The Shattered Isles', traits: ['Calm', 'Nature Bond'], created: '2026-01-20' },
  { id: 6, name: 'Barric Vane', race: 'Human', class: 'Paladin', level: 12, status: 'Retired', campaign: null, traits: ['Noble', 'Oath-Bound'], created: '2025-11-02' },
  { id: 7, name: 'Nyss Witherwick', race: 'Tiefling', class: 'Warlock', level: 1, status: 'Concept', campaign: null, traits: ['Mysterious', 'Pact-Bound'], created: '2026-01-22' },
  { id: 8, name: 'Gorath the Unbroken', race: 'Half-Orc', class: 'Barbarian', level: 9, status: 'In Campaign', campaign: 'Heist at the Clockwork Spire', traits: ['Fierce', 'Reckless'], created: '2026-01-25' },
]

// ── Campaigns ─────────────────────────────────────────────────────────────────

export const fakeCampaigns: Campaign[] = [
  {
    id: 1,
    title: 'The Shattered Isles',
    description: 'A seafaring adventure across fractured archipelagos hiding the ruins of an ancient empire.',
    image: 'https://picsum.photos/seed/isles/600/300',
    status: 'Active',
    players: [
      { name: 'Theron Drake', avatar: 'https://i.pravatar.cc/150?u=theron' },
      { name: 'Zara Nightwood', avatar: 'https://i.pravatar.cc/150?u=zara' },
      { name: 'Marcus Ironfist', avatar: 'https://i.pravatar.cc/150?u=marcus' },
      { name: 'Luna Ashveil', avatar: 'https://i.pravatar.cc/150?u=luna' },
    ],
  },
  {
    id: 2,
    title: 'Curse of the Ember Throne',
    description: 'An undead king stirs in the north. The party must unite three warring clans before the frost takes all.',
    image: 'https://picsum.photos/seed/ember/600/300',
    status: 'Active',
    players: [
      { name: 'Theron Drake', avatar: 'https://i.pravatar.cc/150?u=theron' },
      { name: 'Marcus Ironfist', avatar: 'https://i.pravatar.cc/150?u=marcus' },
      { name: 'Soren Vex', avatar: 'https://i.pravatar.cc/150?u=soren' },
      { name: 'Elia Mourne', avatar: 'https://i.pravatar.cc/150?u=elia' },
      { name: 'Cass Vander', avatar: 'https://i.pravatar.cc/150?u=cass' },
      { name: 'Ryke Holt', avatar: 'https://i.pravatar.cc/150?u=ryke' },
    ],
  },
  {
    id: 3,
    title: 'Shadows Over Valdren',
    description: 'A city noir mystery — someone is draining the life force of prominent guild members one by one.',
    image: 'https://picsum.photos/seed/valdren/600/300',
    status: 'Paused',
    players: [
      { name: 'Zara Nightwood', avatar: 'https://i.pravatar.cc/150?u=zara' },
      { name: 'Luna Ashveil', avatar: 'https://i.pravatar.cc/150?u=luna' },
      { name: 'Dax Korel', avatar: 'https://i.pravatar.cc/150?u=dax' },
    ],
  },
  {
    id: 4,
    title: 'The Last Concordat',
    description: 'Planar diplomacy gone wrong. The party must negotiate peace between three hostile elemental courts.',
    image: 'https://picsum.photos/seed/concordat/600/300',
    status: 'Completed',
    players: [
      { name: 'Theron Drake', avatar: 'https://i.pravatar.cc/150?u=theron' },
      { name: 'Zara Nightwood', avatar: 'https://i.pravatar.cc/150?u=zara' },
      { name: 'Marcus Ironfist', avatar: 'https://i.pravatar.cc/150?u=marcus' },
    ],
  },
  {
    id: 5,
    title: 'Heist at the Clockwork Spire',
    description: 'Break into the most secure vault in the known world. The score? A stolen god.',
    image: 'https://picsum.photos/seed/clockspire/600/300',
    status: 'Active',
    players: [
      { name: 'Luna Ashveil', avatar: 'https://i.pravatar.cc/150?u=luna' },
      { name: 'Soren Vex', avatar: 'https://i.pravatar.cc/150?u=soren' },
      { name: 'Cass Vander', avatar: 'https://i.pravatar.cc/150?u=cass' },
      { name: 'Dax Korel', avatar: 'https://i.pravatar.cc/150?u=dax' },
    ],
  },
]

// ── Dashboard ─────────────────────────────────────────────────────────────────

export const fakeDashboardStats = [
  { label: 'Characters', value: 8, icon: 'mdi-account', color: 'primary', route: 'Characters', details: [{ value: 5, label: 'Active' }, { value: 3, label: 'Concept' }] },
  { label: 'Campaigns', value: 5, icon: 'mdi-book', color: 'secondary', route: 'Campaigns', details: [{ value: 3, label: 'Active' }, { value: 2, label: 'Archived' }] },
  { label: 'Unread Messages', value: 3, icon: 'mdi-email', color: 'info', route: 'Messages', details: [{ value: 2, label: 'From Players' }, { value: 1, label: 'From Guild' }] },
  { label: 'Bazaar Purchases', value: 12, icon: 'mdi-storefront', color: 'warning', route: 'Bazaar', details: [{ value: 10, label: 'Owned' }, { value: 2, label: 'Wishlist' }] },
]

export const fakeUpcomingSessions = [
  { id: 1, title: 'Session 14 — Into the Depths', campaign: 'The Shattered Isles', time: 'Sat, Apr 4 · 7:00 PM', month: 'Apr', day: 4, players: 5, type: 'In Person', color: 'secondary' },
  { id: 2, title: 'Session 8 — The Heist Begins', campaign: 'Heist at the Clockwork Spire', time: 'Tue, Apr 7 · 6:30 PM', month: 'Apr', day: 7, players: 4, type: 'Online', color: 'info' },
  { id: 3, title: 'Session 11 — Ashes of the Throne', campaign: 'Curse of the Ember Throne', time: 'Sat, Apr 12 · 7:00 PM', month: 'Apr', day: 12, players: 4, type: 'In Person', color: 'secondary' },
]

export const fakeRecentActivity = [
  { id: 1, text: 'Zara Nightwood uploaded "Session Notes — Ch.13"', icon: 'mdi-file-upload-outline', color: 'success', time: '2 hours ago' },
  { id: 2, text: 'You levelled up Valdris Stonebrow to level 8', icon: 'mdi-shield-account', color: 'primary', time: '5 hours ago' },
  { id: 3, text: 'Theron Drake sent you a message', icon: 'mdi-message-outline', color: 'info', time: 'Yesterday' },
  { id: 4, text: 'New campaign "Heist at the Clockwork Spire" was created', icon: 'mdi-map-legend', color: 'secondary', time: 'Yesterday' },
  { id: 5, text: 'You purchased "Premium DM Toolkit" from the Bazaar', icon: 'mdi-storefront-outline', color: 'warning', time: '2 days ago' },
  { id: 6, text: 'Luna Ashveil joined "The Shattered Isles"', icon: 'mdi-account-plus-outline', color: 'success', time: '3 days ago' },
]

// ── Bazaar ────────────────────────────────────────────────────────────────────

export const fakeBazaarItems: BazaarItem[] = [
  { id: 1, title: 'Arcane Scholar Character Sheet', description: 'A beautifully crafted sheet for spellcasters with auto-calculated spell slots.', fullDescription: 'A richly detailed character sheet template built specifically for arcane spellcasters. Features auto-calculated spell slots per level, a dedicated components pouch tracker, concentration reminder, and cantrip quick-reference panel. Compatible with D&D 5e and Pathfinder 2e.', image: 'https://picsum.photos/seed/arcane/600/300', price: 0, category: 'Character Sheet', seller: 'Zara Nightwood', rating: 4.5, reviews: 142, tags: ['D&D 5e', 'Spellcaster', 'Free', 'Auto-calc'] },
  { id: 2, title: 'The Forgotten Realm Campaign Starter', description: 'A full campaign template with 10 pre-built sessions, NPCs, and plot hooks.', fullDescription: 'Jump straight into your campaign with this comprehensive starter pack. Includes 10 fully written session outlines, 25 named NPCs with personality traits and secrets, 3 faction relationship maps, and a complete world-building guide. Perfect for new DMs.', image: 'https://picsum.photos/seed/realm/600/300', price: 9.99, category: 'Campaign', seller: 'Theron Drake', rating: 5, reviews: 89, tags: ['Campaign', 'Beginner Friendly', 'NPCs', '10 Sessions'] },
  { id: 3, title: 'Dungeon Encounter Pack Vol. 1', description: '20 ready-to-use tactical encounter maps with enemy stat blocks included.', fullDescription: 'Save hours of prep time with 20 fully designed dungeon encounters. Each includes a tactical grid map, enemy stat blocks, loot tables, environmental hazards, and DM notes. Scales for levels 1–10. Designed for 5e but adaptable to any system.', image: 'https://picsum.photos/seed/dungeon/600/300', price: 4.99, category: 'Encounters', seller: 'Marcus Ironfist', rating: 4, reviews: 203, tags: ['Encounters', '5e', 'Tactical', 'Maps'] },
  { id: 4, title: 'Hand-Drawn World Map — The Shattered Isles', description: 'A stunning illustrated world map with layered regions and lore annotations.', fullDescription: 'Immerse your players in The Shattered Isles — a detailed world map featuring 8 distinct regions, 40+ labeled locations, hidden dungeon markers, and full lore annotations. Provided in both DM (spoilers) and Player (fog of war) versions.', image: 'https://picsum.photos/seed/worldmap/600/300', price: 14.99, category: 'Map', seller: 'Luna Ashveil', rating: 5, reviews: 57, tags: ['World Map', 'Illustrated', 'Lore', 'Two Versions'] },
  { id: 5, title: 'NPC Relationship Web Template', description: 'Track complex NPC relationships, allegiances, and secrets across your campaign.', fullDescription: 'Never lose track of your NPCs again. This Workshop template gives you a dynamic relationship web with faction tracking, secret slots per character, alliance/rivalry markers, and session-by-session update logs. Supports up to 50 NPCs.', image: 'https://picsum.photos/seed/npc/600/300', price: 0, category: 'Character Sheet', seller: 'Theron Drake', rating: 4, reviews: 318, tags: ['NPCs', 'Free', 'Workshop', 'Campaign'] },
  { id: 6, title: 'Premium DM Toolkit', description: 'The ultimate DM bundle: session planner, encounter builder, and initiative tracker.', fullDescription: 'Everything a Dungeon Master needs in one polished toolkit. Includes a weekly session planner, encounter difficulty calculator, dynamic initiative tracker with status effects, a treasure hoard generator, and a weather & random events table. Regularly updated with new tools.', image: 'https://picsum.photos/seed/toolkit/600/300', price: 24.99, category: 'Premium', seller: 'DM Guild', rating: 5, reviews: 431, tags: ['DM Tools', 'Bundle', 'Initiative', 'Encounter Builder'] },
  { id: 7, title: 'Tavern & Town Generator', description: 'Instantly generate fully fleshed-out taverns and towns with unique NPCs.', fullDescription: 'Roll (or click) to generate richly detailed taverns and towns on the fly. Each result includes a name, architectural style, 3–5 notable NPCs with rumors, a menu or trade goods list, and a hidden plot hook. Great for improvised sessions.', image: 'https://picsum.photos/seed/tavern/600/300', price: 2.99, category: 'Campaign', seller: 'Zara Nightwood', rating: 4.5, reviews: 176, tags: ['Generator', 'Towns', 'NPCs', 'Improvisation'] },
  { id: 8, title: 'Combat Tracker — Status Effect Edition', description: 'Track HP, conditions, spell durations, and turn order in one compact sheet.', fullDescription: 'Streamline your combat rounds with this purpose-built tracker. Supports up to 12 combatants, tracks HP, AC, conditions (with duration countdowns), concentration spells, legendary actions, and lair actions. Color-coded and optimized for fast lookup at the table.', image: 'https://picsum.photos/seed/combat/600/300', price: 0, category: 'Encounters', seller: 'Marcus Ironfist', rating: 3.5, reviews: 94, tags: ['Combat', 'Free', 'Conditions', 'Initiative'] },
]

// ── Messages ──────────────────────────────────────────────────────────────────

export const fakePinnedMessages: Record<number, PinnedMessage[]> = {
  1: [
    { id: 1, author: 'Theron Drake', text: 'She believes one of the party members carries a relic her guild has been seeking for decades.', time: '2:18 PM' },
    { id: 2, author: 'You', text: 'Big reveal mid-session — DO NOT SPOIL 🔒', time: '2:21 PM' },
  ],
  2: [
    { id: 1, author: 'Zara Nightwood', text: 'Going Arcane Trickster at level 7 — remember to update the shared sheet!', time: '11:09 AM' },
  ],
  3: [],
  4: [
    { id: 1, author: 'Luna Ashveil', text: 'Campaign template link: shared via Virtual Drive /Campaigns/Arc1/', time: '6:52 PM' },
  ],
  5: [
    { id: 1, author: 'DM Guild', text: 'New homebrew ruleset posted — voting closes Friday.', time: '2:00 PM' },
  ],
}

export const fakeConversations: Conversation[] = [
  {
    id: 1,
    name: 'Theron Drake',
    avatar: 'https://i.pravatar.cc/150?u=theron',
    lastMessage: 'Are we still on for Saturday?',
    time: '2m',
    unread: 2,
    messages: [
      { id: 1, dateDivider: 'Today', text: "Hey! Quick question about the campaign.", time: '2:14 PM', fromMe: false },
      { id: 2, text: "Of course, what's up?", time: '2:15 PM', fromMe: true },
      { id: 3, text: "I was thinking of introducing a new NPC — a tiefling artificer who's been tracking the party for a while.", time: '2:15 PM', fromMe: false },
      { id: 4, text: "Oh that sounds amazing. What's their motivation?", time: '2:17 PM', fromMe: true },
      { id: 5, text: "She believes one of the party members carries a relic her guild has been seeking for decades.", time: '2:18 PM', fromMe: false },
      { id: 6, text: "Does Marcus's character know about this?", time: '2:19 PM', fromMe: true },
      { id: 7, text: "No, that's the fun part 😅 Big reveal mid-session.", time: '2:20 PM', fromMe: false },
      { id: 8, text: "Love it. Are we still on for Saturday?", time: '2:22 PM', fromMe: true },
      { id: 9, text: "Are we still on for Saturday?", time: '2:23 PM', fromMe: false },
    ],
  },
  {
    id: 2,
    name: 'Zara Nightwood',
    avatar: 'https://i.pravatar.cc/150?u=zara',
    lastMessage: 'I leveled up! Check out my new build',
    time: '1h',
    messages: [
      { id: 1, dateDivider: 'Today', text: "Okay so I just hit level 7 and I'm going Arcane Trickster.", time: '11:05 AM', fromMe: false },
      { id: 2, text: "Oh that's going to be so broken with your current gear lmao", time: '11:08 AM', fromMe: true },
      { id: 3, text: "I know 😈 I spent 2 hours on the Workshop building the character sheet.", time: '11:09 AM', fromMe: false },
      { id: 4, text: "Did you try the expression builder for ability modifiers?", time: '11:12 AM', fromMe: true },
      { id: 5, text: "Yes!! It saved so much time. I leveled up! Check out my new build", time: '11:15 AM', fromMe: false },
    ],
  },
  {
    id: 3,
    name: 'Marcus Ironfist',
    avatar: 'https://i.pravatar.cc/150?u=marcus',
    lastMessage: 'Roll for initiative 🎲',
    time: '3h',
    messages: [
      { id: 1, dateDivider: 'Today', text: "Dude the session recap you posted in the forum was hilarious", time: '9:30 AM', fromMe: false },
      { id: 2, text: "Ha, I had to document the goat incident somehow", time: '9:32 AM', fromMe: true },
      { id: 3, text: "My character would NOT have done that under normal circumstances", time: '9:33 AM', fromMe: false },
      { id: 4, text: "A natural 1 is a natural 1, Marcus", time: '9:34 AM', fromMe: true },
      { id: 5, text: "Roll for initiative 🎲", time: '9:35 AM', fromMe: false },
    ],
  },
  {
    id: 4,
    name: 'Luna Ashveil',
    avatar: 'https://i.pravatar.cc/150?u=luna',
    lastMessage: 'Can you share the campaign template?',
    time: 'Yesterday',
    messages: [
      { id: 1, dateDivider: 'Yesterday', text: "Hey! Really enjoying the virtual drive for storing session notes.", time: '6:45 PM', fromMe: false },
      { id: 2, text: "It's way better than dumping files in Discord", time: '6:48 PM', fromMe: true },
      { id: 3, text: "Totally. I organized everything by campaign arc now.", time: '6:49 PM', fromMe: false },
      { id: 4, text: "Smart. Did you put them in the shared folder?", time: '6:51 PM', fromMe: true },
      { id: 5, text: "Can you share the campaign template?", time: '6:52 PM', fromMe: false },
    ],
  },
  {
    id: 5,
    name: 'DM Guild',
    avatar: 'https://i.pravatar.cc/150?u=dmguild',
    lastMessage: 'New homebrew ruleset posted!',
    time: 'Mon',
    unread: 5,
    messages: [
      { id: 1, dateDivider: 'Monday', text: "Welcome to the DM Guild channel! 🐉", time: '10:00 AM', fromMe: false },
      { id: 2, text: "Just finished my first campaign arc on Polyhedrom. The campaign manager is incredible.", time: '11:22 AM', fromMe: false },
      { id: 3, text: "The Workshop template for encounter tracking is a total game changer.", time: '12:05 PM', fromMe: false },
      { id: 4, text: "Has anyone checked the Bazaar? Found some awesome pre-built character sheets.", time: '12:30 PM', fromMe: false },
      { id: 5, text: "New homebrew ruleset posted!", time: '2:00 PM', fromMe: false },
    ],
  },
]

// ── Workshop ──────────────────────────────────────────────────────────────────

export const fakeWorkshopTemplates = [
  {
    id: '1',
    name: 'D&D 5e Character Sheet',
    createdOn: new Date('2026-01-15'),
    updatedOn: new Date('2026-01-18'),
    usedIn: ['D&D 5e', 'Pathfinder'],
    tags: ['Character Sheet', 'RPG'],
    isShared: false,
  },
  {
    id: '2',
    name: 'Generic NPC Sheet',
    createdOn: new Date('2026-01-10'),
    updatedOn: new Date('2026-01-16'),
    usedIn: ['D&D 5e'],
    tags: ['NPC Sheet', 'Shared'],
    isShared: true,
  },
]

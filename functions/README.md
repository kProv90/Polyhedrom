# Firebase Cloud Functions

This directory contains the backend logic that replaces the `/api` directory from the Vercel setup.

## Structure

```
src/
├── index.ts          # HTTP Cloud Functions (main API)
├── auth.ts           # User creation webhook handler
├── init.ts           # Firebase Admin initialization
└── services/
    └── drive.ts      # Drive management logic (Firestore-based)
```

## Functions

### HTTP Functions (via Express)

All routes are prefixed with `/api/` and require Firebase Auth token in `Authorization: Bearer {token}` header.

#### `api` (main handler)
Routes:
- `GET /api/drive` - Fetch entire drive structure
- `POST /api/drive` - Create folder or upload file
- `PUT /api/drive` - Move node
- `PATCH /api/drive` - Update node
- `DELETE /api/drive` - Delete node
- `GET /api/user` - Fetch current user info

### Webhook Functions

#### `onClerkUserCreated`
Triggered when a new user is created in Clerk (requires webhook configuration).
- Creates user document in Firestore
- Initializes drive structure
- Sets plan to "free"

## Local Development

### Start Emulator
```bash
firebase emulators:start
```

This starts:
- Firestore emulator on port 8080
- Storage emulator
- Functions emulator on port 5001

### Test Functions
```bash
# With emulator running
curl -X GET http://localhost:5001/polyhedrom-x81/us-central1/api/drive \
  -H "Authorization: Bearer YOUR_ID_TOKEN"
```

## Environment Variables

Create `.env` in this directory:
```
FIREBASE_DATABASE_EMULATOR_HOST=localhost:9000
FIRESTORE_EMULATOR_HOST=localhost:8080
```

## Deployment

```bash
# Deploy functions to Firebase
firebase deploy --only functions

# Deploy specific function
firebase deploy --only functions:api
```

## Troubleshooting

### Functions are slow on first call
This is normal — Firebase warms up instances. Subsequent calls are fast.

### "Admin SDK not initialized"
Check `init.ts` — `admin.initializeApp()` must be called before using Firestore.

### Upload fails with 413 (Payload Too Large)
Cloud Functions have a 100MB limit. For larger files, implement resumable uploads using the client SDK directly.

# Content Server Setup

## Quick Start

### Start the Content Server
```bash
# Make scripts executable (first time only)
chmod +x start-content-server.sh stop-content-server.sh

# Start the server
./start-content-server.sh
```

The server will start on port 3001 and create the necessary directories:
- `public/content/` - Main content files
- `public/content/versions/` - Version history

### Stop the Content Server
```bash
./stop-content-server.sh
```

## Manual Server Control

### Start Manually
```bash
cd server
node content-server.js
```

### Install Dependencies (if needed)
```bash
# The dependencies should already be installed via the main project
# But if needed, you can install them separately:
npm install express cors
```

## Verification

1. **Check server health:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Test save endpoint:**
   ```bash
   curl -X POST http://localhost:3001/api/content/save \
     -H "Content-Type: application/json" \
     -d '{"schema":{"id":"test","route":"/","title":"Test","version":1,"sections":[],"metadata":{"createdAt":"2024-01-01T00:00:00Z","updatedAt":"2024-01-01T00:00:00Z"}}}'
   ```

3. **Test load endpoint:**
   ```bash
   curl "http://localhost:3001/api/content/load?route=/"
   ```

## Homepage Integration

The homepage (`/`) is now wrapped with SpartiBuilder and configured for content editing:

- **Edit Mode**: Click "Edit with Sparti Builder" to enter edit mode
- **Save Changes**: Click "Save" to store content with version history
- **Content Areas**: All main sections are editable (hero, trials, about, etc.)
- **Protected Areas**: Navigation and footer remain non-editable

## File Structure After Setup

```
server/
├── content-server.js        # Express server
public/content/
├── home.json               # Homepage content (auto-created)
└── versions/
    └── home.json          # Homepage version history
```

## Troubleshooting

### Port Already in Use
If port 3001 is busy, change the PORT in `server/content-server.js`:
```javascript
const PORT = process.env.PORT || 3002; // Change to different port
```

### Permission Errors
Ensure the `public/content/` directory is writable:
```bash
chmod 755 public/content
```

### Content Not Saving
1. Check browser console for errors
2. Verify server is running: `curl http://localhost:3001/api/health`
3. Check server logs for error messages
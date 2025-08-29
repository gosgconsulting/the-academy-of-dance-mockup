const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Content directory
const CONTENT_DIR = path.join(__dirname, '../public/content');
const VERSIONS_DIR = path.join(CONTENT_DIR, 'versions');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.mkdir(VERSIONS_DIR, { recursive: true });
    console.log('Content directories initialized');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Helper functions
function getPageFileName(route) {
  const safeName = route.replace(/\//g, '_').replace(/[^a-zA-Z0-9_-]/g, '') || 'home';
  return `${safeName}.json`;
}

function getVersionFileName(route, version) {
  const safeName = route.replace(/\//g, '_').replace(/[^a-zA-Z0-9_-]/g, '') || 'home';
  return `${safeName}_v${version}.json`;
}

async function loadVersions(route) {
  try {
    const versionsFile = path.join(VERSIONS_DIR, `${getPageFileName(route)}`);
    const data = await fs.readFile(versionsFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveVersions(route, versions) {
  try {
    const versionsFile = path.join(VERSIONS_DIR, `${getPageFileName(route)}`);
    await fs.writeFile(versionsFile, JSON.stringify(versions, null, 2));
  } catch (error) {
    console.error('Error saving versions:', error);
  }
}

async function createBackup(route, schema) {
  try {
    const versions = await loadVersions(route);
    const newVersion = {
      version: versions.length + 1,
      timestamp: new Date().toISOString(),
      schema: schema,
      author: 'System'
    };

    versions.push(newVersion);

    // Keep only last 10 versions to save space
    if (versions.length > 10) {
      versions.splice(0, versions.length - 10);
    }

    await saveVersions(route, versions);
    return newVersion.version;
  } catch (error) {
    console.error('Error creating backup:', error);
    return 1;
  }
}

// API Routes

// Save page content
app.post('/api/content/save', async (req, res) => {
  try {
    const { schema, comment } = req.body;
    
    if (!schema || !schema.route) {
      return res.status(400).json({
        success: false,
        error: 'Invalid schema or missing route'
      });
    }

    const fileName = getPageFileName(schema.route);
    const filePath = path.join(CONTENT_DIR, fileName);

    // Create backup version
    const version = await createBackup(schema.route, schema);

    // Update schema version
    schema.version = version;
    schema.metadata.updatedAt = new Date().toISOString();

    // Save current version
    await fs.writeFile(filePath, JSON.stringify(schema, null, 2));

    console.log(`Saved page: ${schema.route} (v${version})`);

    res.json({
      success: true,
      version: version,
      timestamp: schema.metadata.updatedAt
    });
  } catch (error) {
    console.error('Error saving page:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save page'
    });
  }
});

// Load page content
app.get('/api/content/load', async (req, res) => {
  try {
    const { route } = req.query;
    
    if (!route) {
      return res.status(400).json({
        success: false,
        error: 'Route parameter is required'
      });
    }

    const fileName = getPageFileName(route);
    const filePath = path.join(CONTENT_DIR, fileName);

    try {
      const data = await fs.readFile(filePath, 'utf8');
      const schema = JSON.parse(data);

      res.json({
        success: true,
        schema: schema
      });
    } catch (fileError) {
      if (fileError.code === 'ENOENT') {
        res.status(404).json({
          success: false,
          error: 'Page not found'
        });
      } else {
        throw fileError;
      }
    }
  } catch (error) {
    console.error('Error loading page:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load page'
    });
  }
});

// Get page versions
app.get('/api/content/versions', async (req, res) => {
  try {
    const { route } = req.query;
    
    if (!route) {
      return res.status(400).json({
        success: false,
        error: 'Route parameter is required'
      });
    }

    const versions = await loadVersions(route);
    res.json(versions);
  } catch (error) {
    console.error('Error fetching versions:', error);
    res.status(500).json([]);
  }
});

// Load specific version
app.get('/api/content/version', async (req, res) => {
  try {
    const { route, version } = req.query;
    
    if (!route || !version) {
      return res.status(400).json({
        success: false,
        error: 'Route and version parameters are required'
      });
    }

    const versions = await loadVersions(route);
    const targetVersion = versions.find(v => v.version === parseInt(version));

    if (!targetVersion) {
      return res.status(404).json({
        success: false,
        error: 'Version not found'
      });
    }

    res.json({
      success: true,
      schema: targetVersion.schema
    });
  } catch (error) {
    console.error('Error loading version:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load version'
    });
  }
});

// Delete page
app.delete('/api/content/delete', async (req, res) => {
  try {
    const { route } = req.body;
    
    if (!route) {
      return res.status(400).json({
        success: false,
        error: 'Route is required'
      });
    }

    const fileName = getPageFileName(route);
    const filePath = path.join(CONTENT_DIR, fileName);
    const versionsFile = path.join(VERSIONS_DIR, fileName);

    // Delete main file and versions
    await Promise.all([
      fs.unlink(filePath).catch(() => {}), // Ignore errors if file doesn't exist
      fs.unlink(versionsFile).catch(() => {})
    ]);

    console.log(`Deleted page: ${route}`);

    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting page:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete page'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await ensureDirectories();
  
  app.listen(PORT, () => {
    console.log(`Content server running on port ${PORT}`);
    console.log(`Content directory: ${CONTENT_DIR}`);
    console.log(`Versions directory: ${VERSIONS_DIR}`);
  });
}

startServer().catch(console.error);

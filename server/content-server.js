const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Content directories
const CONTENT_DIR = path.join(__dirname, '../public/content');
const SECTIONS_DIR = path.join(CONTENT_DIR, 'sections');
const PAGES_DIR = path.join(CONTENT_DIR, 'pages');

// Ensure directories exist
async function ensureDirectories() {
  try {
    await fs.mkdir(CONTENT_DIR, { recursive: true });
    await fs.mkdir(SECTIONS_DIR, { recursive: true });
    await fs.mkdir(PAGES_DIR, { recursive: true });
    console.log('Content directories initialized');
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Helper functions
function getSectionFileName(sectionId) {
  const safeName = sectionId.replace(/[^a-zA-Z0-9_-]/g, '');
  return `${safeName}.json`;
}

function getPageFileName(route) {
  const safeName = route.replace(/\//g, '_').replace(/[^a-zA-Z0-9_-]/g, '') || 'home';
  return `${safeName}.json`;
}

// API Routes

// Save section content
app.post('/api/content/sections/save', async (req, res) => {
  try {
    const { sectionId, content } = req.body;
    
    if (!sectionId || !content) {
      return res.status(400).json({
        success: false,
        error: 'Section ID and content are required'
      });
    }

    const fileName = getSectionFileName(sectionId);
    const filePath = path.join(SECTIONS_DIR, fileName);

    // Add metadata
    const sectionData = {
      ...content,
      metadata: {
        sectionId,
        updatedAt: new Date().toISOString(),
        version: 1
      }
    };

    // Save section
    await fs.writeFile(filePath, JSON.stringify(sectionData, null, 2));

    console.log(`Saved section: ${sectionId}`);

    res.json({
      success: true,
      sectionId,
      timestamp: sectionData.metadata.updatedAt
    });
  } catch (error) {
    console.error('Error saving section:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to save section'
    });
  }
});

// Load section content
app.get('/api/content/sections/load', async (req, res) => {
  try {
    const { sectionId } = req.query;
    
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        error: 'Section ID is required'
      });
    }

    const fileName = getSectionFileName(sectionId);
    const filePath = path.join(SECTIONS_DIR, fileName);

    try {
      const data = await fs.readFile(filePath, 'utf8');
      const sectionData = JSON.parse(data);

      res.json({
        success: true,
        content: sectionData
      });
    } catch (fileError) {
      if (fileError.code === 'ENOENT') {
        res.status(404).json({
          success: false,
          error: 'Section not found'
        });
      } else {
        throw fileError;
      }
    }
  } catch (error) {
    console.error('Error loading section:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to load section'
    });
  }
});

// Save page content (references to sections)
app.post('/api/content/save', async (req, res) => {
  try {
    const { schema } = req.body;
    
    if (!schema || !schema.route) {
      return res.status(400).json({
        success: false,
        error: 'Invalid schema or missing route'
      });
    }

    // Save individual sections
    const savedSections = [];
    if (schema.sections) {
      for (const section of schema.sections) {
        try {
          const fileName = getSectionFileName(section.id);
          const filePath = path.join(SECTIONS_DIR, fileName);
          
          const sectionData = {
            ...section,
            metadata: {
              sectionId: section.id,
              updatedAt: new Date().toISOString(),
              version: 1
            }
          };

          await fs.writeFile(filePath, JSON.stringify(sectionData, null, 2));
          savedSections.push(section.id);
          console.log(`Saved section: ${section.id}`);
        } catch (sectionError) {
          console.error(`Error saving section ${section.id}:`, sectionError);
        }
      }
    }

    // Save page metadata
    const fileName = getPageFileName(schema.route);
    const filePath = path.join(PAGES_DIR, fileName);

    const pageData = {
      id: schema.id,
      route: schema.route,
      title: schema.title,
      sections: schema.sections ? schema.sections.map(s => ({ id: s.id, type: s.type, order: s.order })) : [],
      metadata: {
        updatedAt: new Date().toISOString(),
        version: 1
      }
    };

    await fs.writeFile(filePath, JSON.stringify(pageData, null, 2));

    console.log(`Saved page: ${schema.route} with ${savedSections.length} sections`);

    res.json({
      success: true,
      savedSections,
      timestamp: pageData.metadata.updatedAt
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
    const filePath = path.join(PAGES_DIR, fileName);

    try {
      const data = await fs.readFile(filePath, 'utf8');
      const pageData = JSON.parse(data);

      // Load section content
      const sectionsWithContent = [];
      if (pageData.sections) {
        for (const sectionRef of pageData.sections) {
          try {
            const sectionFileName = getSectionFileName(sectionRef.id);
            const sectionFilePath = path.join(SECTIONS_DIR, sectionFileName);
            const sectionData = await fs.readFile(sectionFilePath, 'utf8');
            const sectionContent = JSON.parse(sectionData);
            sectionsWithContent.push(sectionContent);
          } catch (sectionError) {
            console.warn(`Could not load section ${sectionRef.id}:`, sectionError.message);
            // Add empty section placeholder
            sectionsWithContent.push({
              id: sectionRef.id,
              type: sectionRef.type,
              order: sectionRef.order,
              elements: []
            });
          }
        }
      }

      const schema = {
        ...pageData,
        sections: sectionsWithContent
      };

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

// List all sections
app.get('/api/content/sections', async (req, res) => {
  try {
    const files = await fs.readdir(SECTIONS_DIR);
    const sections = [];
    
    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const filePath = path.join(SECTIONS_DIR, file);
          const data = await fs.readFile(filePath, 'utf8');
          const sectionData = JSON.parse(data);
          sections.push({
            id: sectionData.metadata?.sectionId || file.replace('.json', ''),
            type: sectionData.type,
            updatedAt: sectionData.metadata?.updatedAt
          });
        } catch (error) {
          console.warn(`Error reading section file ${file}:`, error.message);
        }
      }
    }
    
    res.json(sections);
  } catch (error) {
    console.error('Error listing sections:', error);
    res.status(500).json([]);
  }
});

// Delete section
app.delete('/api/content/sections/delete', async (req, res) => {
  try {
    const { sectionId } = req.body;
    
    if (!sectionId) {
      return res.status(400).json({
        success: false,
        error: 'Section ID is required'
      });
    }

    const fileName = getSectionFileName(sectionId);
    const filePath = path.join(SECTIONS_DIR, fileName);

    await fs.unlink(filePath).catch(() => {}); // Ignore errors if file doesn't exist

    console.log(`Deleted section: ${sectionId}`);

    res.json({
      success: true,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error deleting section:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete section'
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
    const filePath = path.join(PAGES_DIR, fileName);

    await fs.unlink(filePath).catch(() => {}); // Ignore errors if file doesn't exist

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
    console.log(`Sections directory: ${SECTIONS_DIR}`);
    console.log(`Pages directory: ${PAGES_DIR}`);
  });
}

startServer().catch(console.error);

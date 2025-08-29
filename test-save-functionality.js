// Test script for verifying save functionality
const fetch = require('node-fetch');

// Configuration
const contentServerUrl = 'http://localhost:3001';
const testRoute = '/';
const testPageId = 'home';

// Test data
const testSchema = {
  id: `page-${testPageId}`,
  route: testRoute,
  title: 'The Academy of Dance - Test',
  version: 1,
  sections: [
    {
      id: `section-test-${Date.now()}`,
      type: 'content',
      order: 0,
      elements: [
        {
          id: `element-test-${Date.now()}`,
          type: 'text',
          tagName: 'p',
          content: `Test content saved at ${new Date().toISOString()}`
        }
      ],
      settings: {
        className: 'test-section',
        styles: {
          padding: '20px',
          margin: '10px'
        },
        attributes: {
          'data-test': 'true'
        }
      }
    }
  ],
  metadata: {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    description: 'Test page for save functionality'
  }
};

// Helper functions
async function checkServerHealth() {
  try {
    console.log('Checking content server health...');
    const response = await fetch(`${contentServerUrl}/api/health`);
    
    if (!response.ok) {
      throw new Error(`Server health check failed: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Server health:', data);
    return true;
  } catch (error) {
    console.error('Server health check failed:', error.message);
    return false;
  }
}

async function testSaveContent() {
  try {
    console.log('Testing save functionality...');
    const response = await fetch(`${contentServerUrl}/api/content/save`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        schema: testSchema,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`Save failed: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Save result:', result);
    return result.success;
  } catch (error) {
    console.error('Save test failed:', error.message);
    return false;
  }
}

async function testLoadContent() {
  try {
    console.log('Testing load functionality...');
    const response = await fetch(`${contentServerUrl}/api/content/load?route=${encodeURIComponent(testRoute)}`);
    
    if (!response.ok) {
      throw new Error(`Load failed: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('Load result:', result);
    return result.success && result.schema;
  } catch (error) {
    console.error('Load test failed:', error.message);
    return false;
  }
}

async function verifyContentSaved(savedSchema) {
  try {
    console.log('Verifying saved content...');
    const fs = require('fs').promises;
    const path = require('path');
    
    const contentDir = path.join(__dirname, 'public/content');
    const pagesDir = path.join(contentDir, 'pages');
    const fileName = testPageId.replace(/[^a-zA-Z0-9_-]/g, '') || 'home';
    const filePath = path.join(pagesDir, `${fileName}.json`);
    
    const fileExists = await fs.access(filePath)
      .then(() => true)
      .catch(() => false);
    
    if (!fileExists) {
      console.error('Content file not found:', filePath);
      return false;
    }
    
    const fileContent = await fs.readFile(filePath, 'utf8');
    const savedContent = JSON.parse(fileContent);
    
    console.log('File content:', savedContent);
    return true;
  } catch (error) {
    console.error('Verification failed:', error.message);
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('=== SAVE FUNCTIONALITY TEST ===');
  
  // Step 1: Check if server is running
  const serverRunning = await checkServerHealth();
  if (!serverRunning) {
    console.error('Content server is not running. Please start it first.');
    process.exit(1);
  }
  
  // Step 2: Test save functionality
  const saveSuccess = await testSaveContent();
  if (!saveSuccess) {
    console.error('Save functionality test failed.');
    process.exit(1);
  }
  
  // Step 3: Test load functionality
  const loadedSchema = await testLoadContent();
  if (!loadedSchema) {
    console.error('Load functionality test failed.');
    process.exit(1);
  }
  
  // Step 4: Verify content was saved to file
  const verifySuccess = await verifyContentSaved(loadedSchema);
  if (!verifySuccess) {
    console.error('Content verification failed.');
    process.exit(1);
  }
  
  console.log('✅ All tests passed! Save functionality is working correctly.');
}

runTests().catch(console.error);

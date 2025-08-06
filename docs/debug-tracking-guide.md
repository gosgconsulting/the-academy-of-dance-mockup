# Debug & Bug Tracking Guide
*Academy of Dance Mockup - Development Debug System*

## Overview

This document outlines the comprehensive bug tracking and debugging system for the Academy of Dance project, especially during Payload CMS integration and custom feature development.

## Debug Strategy

### 1. Multi-Level Logging System

#### Level 1: Console Logging (Development)
```typescript
// utils/logger.ts
export const debugLog = {
  info: (message: string, data?: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data);
    }
  },
  error: (message: string, error?: any) => {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error);
  },
  warn: (message: string, data?: any) => {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data);
  },
  payload: (operation: string, data?: any) => {
    console.log(`[PAYLOAD] ${new Date().toISOString()}: ${operation}`, data);
  }
};
```

#### Level 2: File Logging (Production)
```typescript
// utils/fileLogger.ts
import fs from 'fs';
import path from 'path';

export class FileLogger {
  private logDir = './logs';

  constructor() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  log(level: string, message: string, data?: any) {
    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level,
      message,
      data: data || null,
      environment: process.env.NODE_ENV
    };

    const filename = `${new Date().toISOString().split('T')[0]}.log`;
    const filepath = path.join(this.logDir, filename);
    
    fs.appendFileSync(filepath, JSON.stringify(logEntry) + '\n');
  }
}
```

#### Level 3: Database Logging (Critical Issues)
```typescript
// utils/dbLogger.ts
export interface BugReport {
  id: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high' | 'critical';
  category: 'payload' | 'frontend' | 'database' | 'api' | 'integration';
  title: string;
  description: string;
  stackTrace?: string;
  userAgent?: string;
  userId?: string;
  reproduction_steps?: string[];
  environment: 'development' | 'staging' | 'production';
  status: 'open' | 'investigating' | 'resolved' | 'closed';
  assignee?: string;
  tags: string[];
}
```

### 2. Bug Tracking Categories

#### Payload CMS Integration Issues
- Authentication problems
- Database connection errors
- Collection configuration issues
- Migration failures
- API endpoint conflicts

#### Frontend Development Issues
- Component rendering errors
- State management bugs
- Routing problems
- API integration failures
- Performance issues

#### Database Issues
- Query optimization problems
- Connection pool exhaustion
- Migration conflicts
- Data integrity issues

#### Environment & Deployment Issues
- Build failures
- Environment variable conflicts
- Docker container issues
- SSL/TLS problems

## Debug Page Implementation

### Frontend Debug Dashboard
Location: `/src/pages/Debug.tsx`

Features:
- Real-time error monitoring
- Log viewer with filtering
- Performance metrics
- Database status checks
- API endpoint testing
- Environment variable validation

### Debug Route Setup
```typescript
// Add to your router configuration
{
  path: '/debug',
  element: <Debug />,
  // Protect in production
  guard: process.env.NODE_ENV === 'development'
}
```

## Bug Report Template

### GitHub Issue Template
```markdown
## Bug Report

**Severity:** [Low | Medium | High | Critical]
**Category:** [Payload | Frontend | Database | API | Integration]
**Environment:** [Development | Staging | Production]

### Description
Brief description of the issue

### Reproduction Steps
1. Step one
2. Step two
3. Step three

### Expected Behavior
What should happen

### Actual Behavior
What actually happens

### Error Messages
```
Paste error messages or stack traces here
```

### Environment Details
- Node.js version:
- Browser (if applicable):
- Database version:
- Payload version:
- Commit hash:

### Additional Context
Any additional context, screenshots, or logs

### Checklist
- [ ] Bug reproduced in clean environment
- [ ] Error logged in debug system
- [ ] Relevant logs attached
- [ ] Steps to reproduce documented
```

## Logging Best Practices

### 1. Structured Logging
```typescript
// Good
logger.error('Database connection failed', {
  host: dbConfig.host,
  port: dbConfig.port,
  database: dbConfig.database,
  error: error.message
});

// Avoid
console.log('DB error:', error);
```

### 2. Context-Rich Errors
```typescript
try {
  await payload.create({
    collection: 'posts',
    data: postData
  });
} catch (error) {
  logger.error('Failed to create post', {
    collection: 'posts',
    userId: req.user?.id,
    postTitle: postData.title,
    error: error.message,
    stackTrace: error.stack
  });
}
```

### 3. Performance Monitoring
```typescript
const startTime = Date.now();
const result = await expensiveOperation();
logger.info('Operation completed', {
  operation: 'expensiveOperation',
  duration: Date.now() - startTime,
  resultSize: JSON.stringify(result).length
});
```

## Debug Tools & Extensions

### Development Tools
1. **React Developer Tools**
2. **Redux DevTools** (if using Redux)
3. **Payload DevTools**
4. **Network Inspector**
5. **Database GUI** (pgAdmin, TablePlus)

### Monitoring in Production
1. **Error Tracking**: Sentry, Bugsnag
2. **Performance**: New Relic, DataDog
3. **Logs**: ELK Stack, Splunk
4. **Uptime**: Pingdom, StatusCake

## Debug Commands

### Quick Debug Commands
```bash
# View recent logs
tail -f logs/$(date +%Y-%m-%d).log

# Search for specific errors
grep -r "ERROR" logs/

# Check database status
npx payload migrate:status

# Test API endpoints
curl -X GET http://localhost:3000/api/health

# Payload admin access
open http://localhost:3000/admin
```

### Debug Environment Setup
```bash
# Enable debug mode
export DEBUG=payload:*,app:*

# Increase log verbosity
export LOG_LEVEL=debug

# Enable SQL query logging
export DB_LOGGING=true
```

## Automated Bug Detection

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint && npm run type-check && npm run test"
    }
  }
}
```

### CI/CD Integration
```yaml
# .github/workflows/debug-checks.yml
name: Debug Checks
on: [push, pull_request]
jobs:
  debug-analysis:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run Debug Analysis
        run: |
          npm install
          npm run debug-check
          npm run vulnerability-check
```

## Debug Data Collection

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('React Error Boundary', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack
    });
    
    // Send to debug system
    debugSystem.reportError({
      type: 'react-error',
      error,
      errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent
    });
  }
}
```

### API Error Interceptors
```typescript
// axios interceptor for API errors
axios.interceptors.response.use(
  response => response,
  error => {
    logger.error('API Error', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);
```

## Quick Start Checklist

- [ ] Create debug utilities (`utils/logger.ts`)
- [ ] Set up debug page component
- [ ] Configure error boundaries
- [ ] Set up file logging
- [ ] Create GitHub issue templates
- [ ] Configure development tools
- [ ] Set up monitoring (if production)
- [ ] Create debug documentation
- [ ] Train team on debug procedures
- [ ] Test debug system with sample errors

## Debug Workflow

1. **Issue Discovery**
   - Automatic detection via monitoring
   - User reports
   - Developer discovery

2. **Initial Triage**
   - Severity assessment
   - Category assignment
   - Immediate impact evaluation

3. **Investigation**
   - Log analysis
   - Reproduction attempts
   - Root cause analysis

4. **Resolution**
   - Fix implementation
   - Testing
   - Documentation updates

5. **Prevention**
   - Add monitoring/tests
   - Update procedures
   - Team knowledge sharing

---

*This debug system evolves with the project. Update regularly based on new issues and requirements.*

**Last Updated:** August 6, 2025
**Version:** 1.0.0

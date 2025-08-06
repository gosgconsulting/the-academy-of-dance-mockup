// Debug and logging utilities for Academy of Dance

export interface LogEntry {
  timestamp: Date;
  level: 'info' | 'warn' | 'error' | 'debug' | 'payload';
  message: string;
  data?: any;
  category?: string;
  userId?: string;
  sessionId?: string;
}

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

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory

  private addLog(level: LogEntry['level'], message: string, data?: any, category?: string) {
    const logEntry: LogEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      category,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId()
    };

    this.logs.push(logEntry);
    
    // Keep only the most recent logs
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Console logging for development
    if (this.isDevelopment()) {
      const consoleMethod = level === 'error' ? 'error' : level === 'warn' ? 'warn' : 'log';
      console[consoleMethod](`[${level.toUpperCase()}] ${message}`, data || '');
    }

    // Store in localStorage for persistence
    this.persistLog(logEntry);
  }

  info(message: string, data?: any, category?: string) {
    this.addLog('info', message, data, category);
  }

  warn(message: string, data?: any, category?: string) {
    this.addLog('warn', message, data, category);
  }

  error(message: string, error?: any, category?: string) {
    const errorData = error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : error;
    
    this.addLog('error', message, errorData, category);
  }

  debug(message: string, data?: any, category?: string) {
    this.addLog('debug', message, data, category);
  }

  payload(operation: string, data?: any) {
    this.addLog('payload', `Payload CMS: ${operation}`, data, 'payload');
  }

  // Get all logs or filtered logs
  getLogs(filter?: {
    level?: LogEntry['level'];
    category?: string;
    since?: Date;
    limit?: number;
  }): LogEntry[] {
    let filteredLogs = this.logs;

    if (filter) {
      if (filter.level) {
        filteredLogs = filteredLogs.filter(log => log.level === filter.level);
      }
      if (filter.category) {
        filteredLogs = filteredLogs.filter(log => log.category === filter.category);
      }
      if (filter.since) {
        filteredLogs = filteredLogs.filter(log => log.timestamp >= filter.since!);
      }
      if (filter.limit) {
        filteredLogs = filteredLogs.slice(-filter.limit);
      }
    }

    return filteredLogs;
  }

  // Export logs as formatted string
  exportLogs(format: 'json' | 'csv' | 'txt' = 'txt'): string {
    if (format === 'json') {
      return JSON.stringify(this.logs, null, 2);
    } else if (format === 'csv') {
      const headers = 'timestamp,level,message,category,data\n';
      const csvData = this.logs.map(log => 
        `"${log.timestamp.toISOString()}","${log.level}","${log.message}","${log.category || ''}","${JSON.stringify(log.data || '')}"`
      ).join('\n');
      return headers + csvData;
    } else {
      return this.logs.map(log => 
        `[${log.timestamp.toISOString()}] ${log.level.toUpperCase()}: ${log.message}${log.data ? ' | Data: ' + JSON.stringify(log.data) : ''}`
      ).join('\n');
    }
  }

  // Clear all logs
  clearLogs() {
    this.logs = [];
    localStorage.removeItem('debug_logs');
  }

  private isDevelopment(): boolean {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  }

  private getCurrentUserId(): string | undefined {
    // Implement based on your auth system
    return undefined;
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('debug_session_id');
    if (!sessionId) {
      sessionId = Math.random().toString(36).substring(2, 15);
      sessionStorage.setItem('debug_session_id', sessionId);
    }
    return sessionId;
  }

  private persistLog(log: LogEntry) {
    try {
      const existingLogs = localStorage.getItem('debug_logs');
      const logs = existingLogs ? JSON.parse(existingLogs) : [];
      logs.push(log);
      
      // Keep only last 100 logs in localStorage
      if (logs.length > 100) {
        logs.splice(0, logs.length - 100);
      }
      
      localStorage.setItem('debug_logs', JSON.stringify(logs));
    } catch (error) {
      console.error('Failed to persist log:', error);
    }
  }

  // Load persisted logs
  loadPersistedLogs() {
    try {
      const persistedLogs = localStorage.getItem('debug_logs');
      if (persistedLogs) {
        const logs = JSON.parse(persistedLogs).map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp)
        }));
        this.logs = [...logs, ...this.logs];
      }
    } catch (error) {
      console.error('Failed to load persisted logs:', error);
    }
  }
}

// Bug tracking utilities
class BugTracker {
  private bugs: BugReport[] = [];

  reportBug(bug: Omit<BugReport, 'id' | 'timestamp'>): string {
    const bugReport: BugReport = {
      ...bug,
      id: this.generateBugId(),
      timestamp: new Date()
    };

    this.bugs.push(bugReport);
    this.persistBug(bugReport);
    
    // Log the bug
    logger.error(`Bug reported: ${bug.title}`, {
      bugId: bugReport.id,
      severity: bug.severity,
      category: bug.category
    });

    return bugReport.id;
  }

  getBugs(filter?: {
    severity?: BugReport['severity'];
    category?: BugReport['category'];
    status?: BugReport['status'];
  }): BugReport[] {
    let filteredBugs = this.bugs;

    if (filter) {
      if (filter.severity) {
        filteredBugs = filteredBugs.filter(bug => bug.severity === filter.severity);
      }
      if (filter.category) {
        filteredBugs = filteredBugs.filter(bug => bug.category === filter.category);
      }
      if (filter.status) {
        filteredBugs = filteredBugs.filter(bug => bug.status === filter.status);
      }
    }

    return filteredBugs;
  }

  updateBugStatus(bugId: string, status: BugReport['status']) {
    const bug = this.bugs.find(b => b.id === bugId);
    if (bug) {
      bug.status = status;
      this.persistBug(bug);
      logger.info(`Bug status updated: ${bugId} -> ${status}`);
    }
  }

  private generateBugId(): string {
    return `BUG-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
  }

  private persistBug(bug: BugReport) {
    try {
      const existingBugs = localStorage.getItem('debug_bugs');
      const bugs = existingBugs ? JSON.parse(existingBugs) : [];
      const existingIndex = bugs.findIndex((b: BugReport) => b.id === bug.id);
      
      if (existingIndex >= 0) {
        bugs[existingIndex] = bug;
      } else {
        bugs.push(bug);
      }
      
      localStorage.setItem('debug_bugs', JSON.stringify(bugs));
    } catch (error) {
      console.error('Failed to persist bug:', error);
    }
  }

  loadPersistedBugs() {
    try {
      const persistedBugs = localStorage.getItem('debug_bugs');
      if (persistedBugs) {
        this.bugs = JSON.parse(persistedBugs).map((bug: any) => ({
          ...bug,
          timestamp: new Date(bug.timestamp)
        }));
      }
    } catch (error) {
      console.error('Failed to load persisted bugs:', error);
    }
  }
}

// Global error handler
class ErrorHandler {
  private logger: Logger;
  private bugTracker: BugTracker;

  constructor(logger: Logger, bugTracker: BugTracker) {
    this.logger = logger;
    this.bugTracker = bugTracker;
    this.setupGlobalHandlers();
  }

  private setupGlobalHandlers() {
    // Handle unhandled JavaScript errors
    window.addEventListener('error', (event) => {
      this.logger.error('Unhandled JavaScript error', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack
      });

      // Auto-report critical errors as bugs
      if (this.isCriticalError(event.error)) {
        this.bugTracker.reportBug({
          severity: 'critical',
          category: 'frontend',
          title: `Unhandled Error: ${event.message}`,
          description: `Error occurred at ${event.filename}:${event.lineno}:${event.colno}`,
          stackTrace: event.error?.stack,
          userAgent: navigator.userAgent,
          environment: this.getEnvironment(),
          status: 'open',
          tags: ['auto-reported', 'unhandled-error']
        });
      }
    });

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logger.error('Unhandled promise rejection', {
        reason: event.reason,
        promise: event.promise
      });

      // Auto-report as bug if it's a significant rejection
      this.bugTracker.reportBug({
        severity: 'high',
        category: 'frontend',
        title: 'Unhandled Promise Rejection',
        description: `Promise rejection: ${event.reason}`,
        userAgent: navigator.userAgent,
        environment: this.getEnvironment(),
        status: 'open',
        tags: ['auto-reported', 'promise-rejection']
      });
    });
  }

  private isCriticalError(error: Error): boolean {
    if (!error) return false;
    
    const criticalPatterns = [
      /cannot read prop/i,
      /is not a function/i,
      /network error/i,
      /failed to fetch/i,
      /syntax error/i
    ];

    return criticalPatterns.some(pattern => pattern.test(error.message));
  }

  private getEnvironment(): 'development' | 'staging' | 'production' {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'development';
    } else if (hostname.includes('staging') || hostname.includes('dev')) {
      return 'staging';
    } else {
      return 'production';
    }
  }
}

// Create global instances
export const logger = new Logger();
export const bugTracker = new BugTracker();
export const errorHandler = new ErrorHandler(logger, bugTracker);

// Initialize persisted data
logger.loadPersistedLogs();
bugTracker.loadPersistedBugs();

// Development helpers
export const debugUtils = {
  // Quick way to test error reporting
  testError: () => {
    throw new Error('Test error for debugging');
  },
  
  // Test promise rejection
  testPromiseRejection: () => {
    Promise.reject('Test promise rejection');
  },
  
  // Generate sample bug report
  generateSampleBug: () => {
    return bugTracker.reportBug({
      severity: 'medium',
      category: 'frontend',
      title: 'Sample bug for testing',
      description: 'This is a sample bug report generated for testing the debug system',
      environment: 'development',
      status: 'open',
      tags: ['sample', 'test']
    });
  },

  // Performance monitoring
  measurePerformance: (name: string, fn: () => Promise<any> | any) => {
    const start = performance.now();
    const result = fn();
    
    if (result instanceof Promise) {
      return result.finally(() => {
        const duration = performance.now() - start;
        logger.info(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` });
      });
    } else {
      const duration = performance.now() - start;
      logger.info(`Performance: ${name}`, { duration: `${duration.toFixed(2)}ms` });
      return result;
    }
  }
};

export default { logger, bugTracker, errorHandler, debugUtils };

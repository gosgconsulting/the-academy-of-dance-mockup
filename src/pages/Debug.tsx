import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bug, 
  AlertCircle, 
  CheckCircle, 
  Clock, 
  Database, 
  Server, 
  Monitor, 
  FileText,
  RefreshCw,
  Download,
  Filter
} from 'lucide-react';
import { logger, bugTracker, debugUtils } from '@/lib/debug';
import type { BugReport, LogEntry } from '@/lib/debug';

interface SystemStatus {
  database: 'healthy' | 'warning' | 'error';
  api: 'healthy' | 'warning' | 'error';
  payload: 'healthy' | 'warning' | 'error';
  frontend: 'healthy' | 'warning' | 'error';
}

const Debug = () => {
  const [bugs, setBugs] = useState<BugReport[]>([]);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    database: 'healthy',
    api: 'healthy',
    payload: 'healthy',
    frontend: 'healthy'
  });
  const [logs, setLogs] = useState<string[]>([]);
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockBugs: BugReport[] = [
      {
        id: '1',
        timestamp: new Date(),
        severity: 'high',
        category: 'payload',
        title: 'Database connection timeout',
        description: 'Payload CMS losing connection to PostgreSQL database intermittently',
        status: 'investigating',
        environment: 'development',
        assignee: 'dev-team',
        tags: ['database', 'connection', 'timeout']
      },
      {
        id: '2',
        timestamp: new Date(Date.now() - 86400000),
        severity: 'medium',
        category: 'frontend',
        title: 'Component re-render issue',
        description: 'EventCard component causing unnecessary re-renders',
        status: 'open',
        environment: 'development',
        tags: ['performance', 'react', 'optimization']
      }
    ];
    setBugs(mockBugs);

    const mockLogs = [
      '[INFO] 2025-08-06T10:30:00Z: Application started successfully',
      '[ERROR] 2025-08-06T10:35:00Z: Database connection failed - retrying...',
      '[WARN] 2025-08-06T10:36:00Z: High memory usage detected',
      '[PAYLOAD] 2025-08-06T10:40:00Z: Collection sync completed'
    ];
    setLogs(mockLogs);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const severityMatch = filterSeverity === 'all' || bug.severity === filterSeverity;
    const categoryMatch = filterCategory === 'all' || bug.category === filterCategory;
    return severityMatch && categoryMatch;
  });

  const testApiEndpoint = async (endpoint: string) => {
    try {
      const response = await fetch(endpoint);
      console.log(`Testing ${endpoint}:`, response.status);
      // Update system status based on response
    } catch (error) {
      console.error(`Error testing ${endpoint}:`, error);
    }
  };

  const exportLogs = () => {
    const logData = logs.join('\n');
    const blob = new Blob([logData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Bug className="h-8 w-8" />
            Debug Dashboard
          </h1>
          <p className="text-muted-foreground">
            Monitor bugs, logs, and system health for Academy of Dance
          </p>
        </div>
        <Button onClick={() => window.location.reload()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                <span>Database</span>
              </div>
              {getStatusIcon(systemStatus.database)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Server className="h-5 w-5" />
                <span>API</span>
              </div>
              {getStatusIcon(systemStatus.api)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span>Payload CMS</span>
              </div>
              {getStatusIcon(systemStatus.payload)}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                <span>Frontend</span>
              </div>
              {getStatusIcon(systemStatus.frontend)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bugs" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bugs">Bug Reports</TabsTrigger>
          <TabsTrigger value="logs">System Logs</TabsTrigger>
          <TabsTrigger value="tests">API Tests</TabsTrigger>
          <TabsTrigger value="reports">Generate Report</TabsTrigger>
        </TabsList>

        <TabsContent value="bugs" className="space-y-4">
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <select 
                value={filterSeverity} 
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border rounded px-2 py-1"
            >
              <option value="all">All Categories</option>
              <option value="payload">Payload</option>
              <option value="frontend">Frontend</option>
              <option value="database">Database</option>
              <option value="api">API</option>
              <option value="integration">Integration</option>
            </select>
          </div>

          {/* Bug List */}
          <div className="space-y-4">
            {filteredBugs.map((bug) => (
              <Card key={bug.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{bug.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {bug.description}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getSeverityColor(bug.severity)}>
                        {bug.severity}
                      </Badge>
                      <Badge variant="outline">{bug.category}</Badge>
                      <Badge variant="secondary">{bug.status}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{bug.timestamp.toLocaleString()}</span>
                    <div className="flex gap-2">
                      {bug.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Recent System Logs</h3>
            <Button onClick={exportLogs} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
          </div>
          <Card>
            <CardContent className="p-4">
              <div className="bg-black text-green-400 p-4 rounded font-mono text-sm max-h-96 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="mb-1">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tests" className="space-y-4">
          <h3 className="text-lg font-semibold">API Endpoint Testing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Health Checks</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  onClick={() => testApiEndpoint('/api/health')}
                  variant="outline" 
                  className="w-full"
                >
                  Test API Health
                </Button>
                <Button 
                  onClick={() => testApiEndpoint('/api/payload/health')}
                  variant="outline" 
                  className="w-full"
                >
                  Test Payload Health
                </Button>
                <Button 
                  onClick={() => testApiEndpoint('/api/database/ping')}
                  variant="outline" 
                  className="w-full"
                >
                  Test Database Connection
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Environment Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div><strong>Environment:</strong> development</div>
                  <div><strong>Build Version:</strong> 1.0.0</div>
                  <div><strong>Timestamp:</strong> {new Date().toISOString()}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <h3 className="text-lg font-semibold">Debug Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Bug Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Total Bugs:</span>
                    <span>{bugs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Critical:</span>
                    <span>{bugs.filter(b => b.severity === 'critical').length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Open:</span>
                    <span>{bugs.filter(b => b.status === 'open').length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  Export Bug Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download System Dump
                </Button>
                <Button variant="outline" className="w-full">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Clear Debug Cache
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Development Only Warning */}
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          This debug dashboard is only available in development mode. 
          It will be automatically disabled in production.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Debug;

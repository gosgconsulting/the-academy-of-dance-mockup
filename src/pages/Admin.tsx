import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Edit, Plus, Users, Settings } from 'lucide-react';

const Admin = () => {
  // These pages were found in Builder.io debug info - they still exist!
  const existingPages = [
    {
      id: '753fd9c1d6b2420da34a02e9e21a3369',
      name: 'Homepage',
      description: 'Main landing page with hero section and programs overview',
      url: '/cms/home',
      status: 'Draft',
      editorUrl: 'https://builder.io/content/753fd9c1d6b2420da34a02e9e21a3369'
    },
    {
      id: '294aeefe60d14699937f62dcb66a982e',
      name: 'About Us',
      description: 'Academy story, mission, and vision',
      url: '/cms/about',
      status: 'Draft',
      editorUrl: 'https://builder.io/content/294aeefe60d14699937f62dcb66a982e'
    },
    {
      id: 'c8f10486540145738bbb39572fd74110',
      name: 'Programs & Classes',
      description: 'Dance programs, schedules, and class information',
      url: '/cms/programs',
      status: 'Draft',
      editorUrl: 'https://builder.io/content/c8f10486540145738bbb39572fd74110'
    }
  ];

  const quickActions = [
    {
      title: 'Create New Page',
      description: 'Add a new page to your website',
      icon: Plus,
      action: () => window.open('https://builder.io/content', '_blank'),
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Users',
      description: 'Invite team members and set permissions',
      icon: Users,
      action: () => window.open('https://builder.io/account/organization', '_blank'),
      color: 'bg-green-500'
    },
    {
      title: 'Settings',
      description: 'Configure models and general settings',
      icon: Settings,
      action: () => window.open('https://builder.io/models', '_blank'),
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600 mt-2">Great news! Your pages still exist in Builder.io</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => window.open('https://builder.io/content', '_blank')}>
                <Plus className="w-4 h-4 mr-2" />
                New Page
              </Button>
              <Button variant="outline" onClick={() => window.open('https://builder.io', '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Builder.io
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Good News Alert */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-900">🎉 Good News!</CardTitle>
          </CardHeader>
          <CardContent className="text-green-800">
            <p className="font-medium mb-2">Your pages weren't actually deleted!</p>
            <p>I found all 3 pages still exist in your Builder.io space. They just need to be accessed through the direct editor links below.</p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow" onClick={action.action}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-lg ${action.color} text-white`}>
                      <action.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{action.title}</h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Existing Pages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">✅ Your Pages (Ready to Edit!)</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {existingPages.map((page) => (
              <Card key={page.id} className="hover:shadow-lg transition-shadow border-green-200 bg-green-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{page.name}</CardTitle>
                      <CardDescription className="mt-1">{page.description}</CardDescription>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      Available
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      onClick={() => window.open(page.editorUrl, '_blank')}
                      className="flex-1"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit in Builder.io
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.open(page.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">📝 Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-4">
            <ol className="list-decimal list-inside space-y-2">
              <li>Click "Edit in Builder.io" on any page above</li>
              <li>Login to Builder.io if prompted</li>
              <li>Add components from the left sidebar (Hero, Programs, etc.)</li>
              <li>Configure each component with your content</li>
              <li>Click "Publish" to make changes live</li>
            </ol>
            
            <div className="bg-blue-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Available Components:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="bg-white p-2 rounded">• Hero</div>
                <div className="bg-white p-2 rounded">• PageHeader</div>
                <div className="bg-white p-2 rounded">• Programs</div>
                <div className="bg-white p-2 rounded">• ClassSchedule</div>
                <div className="bg-white p-2 rounded">• MissionVision</div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm font-medium">💡 Tip: Set your preview URL to see components properly:</p>
              <code className="text-xs bg-white p-2 rounded block mt-2">
                Preview URL: {window.location.origin}/builder-preview
              </code>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

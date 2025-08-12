import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Edit, Plus, Users, Settings } from 'lucide-react';

const Admin = () => {
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

  const missingPages = [
    {
      name: 'Contact',
      description: 'Contact information and location details',
      url: '/cms/contact',
      components: ['PageHeader'],
      content: {
        title: 'Contact Elite Dance Academy',
        description: 'Get in touch to learn more about our programs or schedule a trial class.',
      }
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

  const openEditor = (contentId: string) => {
    window.open(`https://builder.io/content/${contentId}`, '_blank');
  };

  const previewPage = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
              <p className="text-gray-600 mt-2">Manage your website content with Builder.io visual editor</p>
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

        {/* Content Pages */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Website Pages</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {requiredPages.map((page, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-orange-200 bg-orange-50">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{page.name}</CardTitle>
                      <CardDescription className="mt-1">{page.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">
                      Needs Recreation
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <strong>Title:</strong> {page.content.title}
                    </div>
                    <div className="text-sm">
                      <strong>Components:</strong> {page.components.join(', ')}
                    </div>
                    <Button
                      size="sm"
                      onClick={() => window.open('https://builder.io/content', '_blank')}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create This Page
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recreation Instructions */}
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-900">🚨 Content Needs Recreation</CardTitle>
          </CardHeader>
          <CardContent className="text-red-800 space-y-4">
            <p className="font-medium">Your pages were deleted. Follow these steps to recreate them:</p>

            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Step-by-Step Recreation:</h3>
              <ol className="list-decimal list-inside space-y-2">
                <li>Click "Create This Page" on each page above</li>
                <li>In Builder.io, set the page name and URL path</li>
                <li>Add the suggested components from the component menu</li>
                <li>Fill in the provided title and description</li>
                <li>Publish each page when complete</li>
              </ol>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Available Components:</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                <div className="bg-white p-2 rounded">• Hero</div>
                <div className="bg-white p-2 rounded">• PageHeader</div>
                <div className="bg-white p-2 rounded">• Programs</div>
                <div className="bg-white p-2 rounded">• ClassSchedule</div>
                <div className="bg-white p-2 rounded">• MissionVision</div>
              </div>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Preview URLs to Set:</h3>
              <p className="text-sm mb-2">In Builder.io model settings, set:</p>
              <code className="text-xs bg-white p-2 rounded block">
                Preview URL: {window.location.origin}/builder-preview
              </code>
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">📚 Content Templates</CardTitle>
          </CardHeader>
          <CardContent className="text-blue-800 space-y-4">
            <div className="space-y-3">
              <div className="bg-blue-100 p-3 rounded-lg">
                <h4 className="font-semibold">Homepage Content:</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• Hero: "Elite Dance Academy" + "Where Passion Meets Excellence"</li>
                  <li>• Programs: Ballet, Contemporary, Hip Hop, Jazz</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-3 rounded-lg">
                <h4 className="font-semibold">About Us Content:</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PageHeader: "About Us" + "Our Story & Commitment"</li>
                  <li>• MissionVision: Add your academy's mission and vision</li>
                </ul>
              </div>

              <div className="bg-blue-100 p-3 rounded-lg">
                <h4 className="font-semibold">Programs Content:</h4>
                <ul className="text-sm mt-2 space-y-1">
                  <li>• PageHeader: "Programs & Classes"</li>
                  <li>• ClassSchedule: Weekly schedule with times and ages</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;

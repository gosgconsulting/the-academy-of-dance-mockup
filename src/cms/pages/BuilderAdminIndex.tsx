import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registry } from '@/cms/content/registry'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import BuilderEditor from '../components/BuilderEditor'
import { BUILDER_MODELS } from '../builderConfig'
import { 
  FileText, 
  Settings, 
  Edit3, 
  Eye, 
  ExternalLink, 
  Search,
  Palette,
  Layout,
  FileEdit,
  Users,
  MapPin,
  Calendar,
  BookOpen,
  MessageSquare,
  Award
} from 'lucide-react'

const getIconForPage = (key: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    homepage: <Layout className="h-4 w-4" />,
    blog: <BookOpen className="h-4 w-4" />,
    header: <Settings className="h-4 w-4" />,
    footer: <Settings className="h-4 w-4" />,
    'privacy-policy': <FileText className="h-4 w-4" />,
    'terms-conditions': <FileText className="h-4 w-4" />
  }
  return iconMap[key] || <FileEdit className="h-4 w-4" />
}

const getIconForModel = (model: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    page: <Layout className="h-4 w-4" />,
    section: <Palette className="h-4 w-4" />,
    component: <Settings className="h-4 w-4" />,
    'blog-post': <BookOpen className="h-4 w-4" />,
    testimonial: <MessageSquare className="h-4 w-4" />,
    teacher: <Users className="h-4 w-4" />,
    location: <MapPin className="h-4 w-4" />,
    programme: <Award className="h-4 w-4" />,
    event: <Calendar className="h-4 w-4" />
  }
  return iconMap[model] || <FileEdit className="h-4 w-4" />
}

export default function BuilderAdminIndex() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedModel, setSelectedModel] = useState<string>('')

  const filteredPages = Object.entries(registry).filter(([key, entry]) =>
    entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    key.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const builderModels = Object.entries(BUILDER_MODELS).map(([key, value]) => ({
    key,
    value,
    title: key.split(/(?=[A-Z])/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '),
    description: `Manage ${key} content with Builder.io visual editor`
  }))

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Content Management System</h1>
          <p className="text-gray-600 mt-1">
            Manage your website content with traditional forms or Builder.io visual editor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">CMS v2.0</Badge>
          <Badge variant="secondary">Builder.io Integrated</Badge>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <Tabs defaultValue="traditional" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="traditional">Traditional Editor</TabsTrigger>
          <TabsTrigger value="builder">Visual Editor</TabsTrigger>
          <TabsTrigger value="hybrid">Hybrid Editing</TabsTrigger>
        </TabsList>

        <TabsContent value="traditional" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileEdit className="h-5 w-5" />
                Form-Based Content Editor
              </CardTitle>
              <CardDescription>
                Edit content using structured forms with your existing schemas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPages.map(([key, entry]) => (
                  <Card key={key} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getIconForPage(key)}
                          <CardTitle className="text-base">{entry.title}</CardTitle>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          Form
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center gap-2">
                        <Button asChild size="sm" className="flex-1">
                          <Link to={`/admin/content/${key}`}>
                            <Edit3 className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <Link to={`/${key === 'homepage' ? '' : key}`} target="_blank">
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="builder" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Builder.io Visual Editor
              </CardTitle>
              <CardDescription>
                Create and edit content with drag-and-drop visual interface
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {builderModels.map((model) => (
                  <Card key={model.key} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getIconForModel(model.value)}
                          <CardTitle className="text-base">{model.title}</CardTitle>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          Visual
                        </Badge>
                      </div>
                      <CardDescription className="text-sm">
                        {model.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0 space-y-3">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            const builderUrl = `https://builder.io/models/${model.value}`
                            window.open(builderUrl, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <Palette className="h-4 w-4 mr-1" />
                          Create/Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const url = `https://builder.io/models`
                            window.open(url, '_blank', 'noopener,noreferrer')
                          }}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedModel && (
            <Card>
              <CardHeader>
                <CardTitle>Visual Editor - {selectedModel}</CardTitle>
                <CardDescription>
                  Use Builder.io's drag-and-drop interface to create stunning content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BuilderEditor model={selectedModel} />
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="hybrid" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Hybrid Content Management
              </CardTitle>
              <CardDescription>
                Combine the power of structured forms with visual editing capabilities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Existing Content</h3>
                  <div className="space-y-2">
                    {filteredPages.slice(0, 3).map(([key, entry]) => (
                      <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-2">
                          {getIconForPage(key)}
                          <span className="font-medium">{entry.title}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button asChild size="sm" variant="outline">
                            <Link to={`/admin/content/${key}`}>Form</Link>
                          </Button>
                          <Button size="sm" variant="secondary">
                            Visual
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Quick Start</h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                    <h4 className="font-semibold text-blue-800">Getting Started with Builder.io</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>1. Set your Builder.io API key</li>
                      <li>2. Create visual content models</li>
                      <li>3. Use both editors as needed</li>
                      <li>4. Preview and publish changes</li>
                    </ul>
                    <Button size="sm" className="w-full">
                      Setup Builder.io
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Content Strategy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      Use forms for structured data and Builder.io for creative layouts
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Team Collaboration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      Developers use forms, designers use visual editor
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Manage Users
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      Best Practices
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      Tips for combining both editing approaches effectively
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      View Guide
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

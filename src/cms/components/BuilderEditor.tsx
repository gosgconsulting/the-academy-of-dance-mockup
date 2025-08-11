import React, { useState, useEffect } from 'react'
import { BuilderComponent, builder } from '@builder.io/react'
import { BUILDER_API_KEY, BUILDER_MODELS } from '../builderConfig'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Eye, Code, Settings, Save, ExternalLink } from 'lucide-react'

interface BuilderEditorProps {
  model?: string
  contentId?: string
  initialContent?: any
  onSave?: (content: any) => void
  className?: string
}

export function BuilderEditor({ 
  model = BUILDER_MODELS.page, 
  contentId,
  initialContent,
  onSave,
  className = ""
}: BuilderEditorProps) {
  const [content, setContent] = useState(initialContent)
  const [isLoading, setIsLoading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [builderUrl, setBuilderUrl] = useState('')

  useEffect(() => {
    if (BUILDER_API_KEY && BUILDER_API_KEY !== 'YOUR_BUILDER_API_KEY_HERE') {
      const editorUrl = `https://builder.io/content/${contentId || 'new'}?model=${model}&apiKey=${BUILDER_API_KEY}`
      setBuilderUrl(editorUrl)
    }
  }, [model, contentId])

  const handleOpenBuilder = () => {
    if (builderUrl) {
      window.open(builderUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const loadContent = async () => {
    if (!contentId) return
    
    setIsLoading(true)
    try {
      const content = await builder.get(model, { 
        url: window.location.pathname,
        userAttributes: { urlPath: window.location.pathname }
      }).toPromise()
      
      if (content) {
        setContent(content)
      }
    } catch (error) {
      console.error('Error loading Builder content:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (contentId) {
      loadContent()
    }
  }, [contentId, model])

  if (BUILDER_API_KEY === 'YOUR_BUILDER_API_KEY_HERE') {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Builder.io Setup Required
          </CardTitle>
          <CardDescription>
            To use the visual editor, you need to configure your Builder.io API key.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-800 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-yellow-700 space-y-1 list-decimal list-inside">
              <li>Sign up for a free Builder.io account at <a href="https://builder.io" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">builder.io</a></li>
              <li>Get your API key from the Builder.io dashboard</li>
              <li>Set the environment variable: <code className="bg-yellow-100 px-1 rounded">VITE_BUILDER_API_KEY=your_api_key</code></li>
              <li>Restart your development server</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-semibold">Benefits of Builder.io Integration:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Visual drag-and-drop page editing</li>
              <li>• Real-time preview of changes</li>
              <li>• No-code content management</li>
              <li>• A/B testing capabilities</li>
              <li>• Personalization features</li>
              <li>• Collaborative editing</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Visual Editor</h3>
          <Badge variant="secondary">{model}</Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            {previewMode ? <Code className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button
            onClick={handleOpenBuilder}
            size="sm"
            className="gap-2"
          >
            <ExternalLink className="h-4 w-4" />
            Open in Builder.io
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="editor">Visual Editor</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
        </TabsList>
        
        <TabsContent value="editor" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Builder.io Visual Editor</CardTitle>
              <CardDescription>
                Click "Open in Builder.io" to edit this content with the visual drag-and-drop editor.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <div className="text-gray-500">Visual Editor</div>
                  <Button onClick={handleOpenBuilder} variant="outline" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    Launch Builder.io Editor
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="preview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Live Preview</CardTitle>
              <CardDescription>
                Preview how your content will appear to visitors.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                {isLoading ? (
                  <div className="aspect-video bg-gray-50 flex items-center justify-center">
                    <div className="text-gray-500">Loading preview...</div>
                  </div>
                ) : content ? (
                  <BuilderComponent model={model} content={content} />
                ) : (
                  <div className="aspect-video bg-gray-50 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <div className="text-gray-500">No content found</div>
                      <Button onClick={handleOpenBuilder} variant="outline" size="sm">
                        Create Content
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default BuilderEditor

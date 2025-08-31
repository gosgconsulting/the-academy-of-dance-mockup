import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface AIAgentRequest {
  prompt: string;
  context: any;
  selectedElements?: any[];
  mode: 'chat' | 'edit' | 'analyze' | 'generate';
  capabilities: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, context, selectedElements = [], mode, capabilities }: AIAgentRequest = await req.json();
    
    console.log('AI Agent request:', { prompt, mode, selectedElementsCount: selectedElements.length });

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build context-aware system prompt
    const systemPrompt = buildSystemPrompt(context, selectedElements, mode, capabilities);
    
    // Prepare user message with context
    const userMessage = buildUserMessage(prompt, context, selectedElements, mode);

    console.log('System prompt length:', systemPrompt.length);
    console.log('User message length:', userMessage.length);

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4.1-2025-04-14',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        max_completion_tokens: 2000,
        response_format: { type: 'json_object' }
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI API error:', error);
      throw new Error(`OpenAI API error: ${response.status} ${error}`);
    }

    const data = await response.json();
    const aiResponse = JSON.parse(data.choices[0].message.content);
    
    console.log('AI response:', aiResponse);

    // Process and validate the response
    const processedResponse = processAIResponse(aiResponse, mode, selectedElements);

    return new Response(JSON.stringify(processedResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in ai-agent-processor:', error);
    return new Response(JSON.stringify({ 
      message: `Sorry, I encountered an error: ${error.message}`,
      success: false,
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function buildSystemPrompt(context: any, selectedElements: any[], mode: string, capabilities: any): string {
  const frameworks = context.frameworks?.map((f: any) => f.name).join(', ') || 'None';
  const a11yScore = context.pageStructure?.accessibility?.score || 'Unknown';
  const elementsCount = context.pageStructure?.elements?.length || 0;
  
  return `You are an advanced AI web development assistant integrated into Sparti Builder, a visual web editor. You help users analyze, edit, and improve web pages through natural language conversations.

CURRENT CONTEXT:
- Mode: ${mode}
- Page Elements: ${elementsCount}
- Detected Frameworks: ${frameworks}
- Accessibility Score: ${a11yScore}/100
- Selected Elements: ${selectedElements.length}

CAPABILITIES:
${JSON.stringify(capabilities, null, 2)}

YOUR ROLE BASED ON MODE:
${getModeInstructions(mode)}

RESPONSE FORMAT:
Always respond with valid JSON in this format:
{
  "message": "Your conversational response to the user",
  "actions": [
    {
      "id": "unique_id",
      "type": "edit|create|delete|analyze",
      "elements": ["element_ids"],
      "changes": [
        {
          "property": "textContent|style.property|attr.attribute",
          "oldValue": "current_value",
          "newValue": "new_value",
          "element": "element_id"
        }
      ],
      "prompt": "user_request",
      "result": {
        "success": true,
        "message": "Change description"
      }
    }
  ],
  "suggestions": [
    {
      "type": "improvement|fix|enhancement|alternative",
      "title": "Suggestion title",
      "description": "Detailed description",
      "code": "optional_code_example",
      "confidence": 0.8,
      "impact": "low|medium|high"
    }
  ],
  "code": "Generated code when applicable",
  "success": true
}

IMPORTANT GUIDELINES:
1. Be conversational and helpful in your message
2. Provide specific, actionable suggestions
3. When editing elements, use precise CSS properties and values
4. Consider accessibility, performance, and best practices
5. Explain your reasoning and offer alternatives
6. If you can't complete a request, explain why and suggest alternatives
7. Always prioritize user experience and web standards
8. For framework-specific requests, use appropriate classes and patterns
9. Consider responsive design implications
10. Validate your suggestions against current web standards`;
}

function getModeInstructions(mode: string): string {
  switch (mode) {
    case 'chat':
      return `CHAT MODE: Provide helpful conversation, analysis, and guidance. Focus on understanding the user's needs and providing educational value. Suggest improvements and answer questions about the page structure and elements.`;
    
    case 'edit':
      return `EDIT MODE: Make specific changes to selected elements. Generate precise actions to modify content, styles, or attributes. Focus on implementing the requested changes accurately while maintaining design consistency.`;
    
    case 'analyze':
      return `ANALYZE MODE: Provide detailed analysis of the page or selected elements. Identify issues, opportunities for improvement, accessibility problems, performance concerns, and design inconsistencies. Offer specific suggestions with confidence scores.`;
    
    case 'generate':
      return `GENERATE MODE: Create new code, components, or content based on the user's request. Focus on generating clean, modern, accessible code that follows best practices and integrates well with the existing page structure.`;
    
    default:
      return `GENERAL MODE: Provide helpful assistance with web development tasks, focusing on the user's specific needs and the current page context.`;
  }
}

function buildUserMessage(prompt: string, context: any, selectedElements: any[], mode: string): string {
  let message = `User Request: ${prompt}\n\n`;
  
  if (selectedElements.length > 0) {
    message += `SELECTED ELEMENTS:\n`;
    selectedElements.forEach((el, index) => {
      message += `${index + 1}. ${el.element.tagName} (${el.element.selector})\n`;
      message += `   - Content: ${el.element.textContent || 'N/A'}\n`;
      message += `   - Key Styles: ${Object.entries(el.element.styles || {}).slice(0, 5).map(([k, v]) => `${k}: ${v}`).join(', ')}\n`;
      message += `   - Attributes: ${Object.keys(el.element.attributes || {}).join(', ')}\n\n`;
    });
  }
  
  if (context.pageStructure?.accessibility?.issues?.length > 0) {
    message += `ACCESSIBILITY ISSUES:\n`;
    context.pageStructure.accessibility.issues.slice(0, 3).forEach((issue: any, index: number) => {
      message += `${index + 1}. ${issue.rule}: ${issue.message}\n`;
    });
    message += `\n`;
  }
  
  if (context.frameworks?.length > 0) {
    message += `AVAILABLE FRAMEWORKS:\n`;
    context.frameworks.forEach((framework: any) => {
      message += `- ${framework.name}: ${framework.classes.slice(0, 10).join(', ')}...\n`;
    });
    message += `\n`;
  }
  
  message += `Please ${mode === 'chat' ? 'help with this request and provide guidance' : 
                mode === 'edit' ? 'make the requested changes to the selected elements' :
                mode === 'analyze' ? 'analyze the page/elements and provide detailed insights' :
                'generate the requested code/content'}.`;
  
  return message;
}

function processAIResponse(response: any, mode: string, selectedElements: any[]): any {
  // Ensure response has required structure
  const processedResponse = {
    message: response.message || 'AI response processed successfully',
    success: true,
    actions: response.actions || [],
    suggestions: response.suggestions || [],
    code: response.code || null
  };

  // Validate actions for edit mode
  if (mode === 'edit' && processedResponse.actions.length === 0 && selectedElements.length > 0) {
    processedResponse.suggestions.push({
      type: 'enhancement',
      title: 'No specific changes generated',
      description: 'The AI didn\'t generate specific edit actions. Try being more specific about what you want to change.',
      confidence: 0.7,
      impact: 'low'
    });
  }

  // Add default suggestions for analyze mode
  if (mode === 'analyze' && processedResponse.suggestions.length === 0) {
    processedResponse.suggestions.push({
      type: 'improvement',
      title: 'General Recommendations',
      description: 'Consider improving accessibility, performance, and responsive design.',
      confidence: 0.6,
      impact: 'medium'
    });
  }

  return processedResponse;
}
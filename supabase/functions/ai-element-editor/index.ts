import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, elementContext, elementType } = await req.json();

    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    const systemPrompt = `You are an expert web developer helping to modify website elements. You will receive:
1. A user prompt describing what they want to change
2. Context about the current element (content, styles, attributes)
3. The element type

Your job is to return ONLY a JSON object with the changes needed. Format:
{
  "content": "new content if content should change",
  "styles": {
    "property": "value"
  },
  "attributes": {
    "attribute": "value"
  },
  "explanation": "Brief explanation of changes made"
}

Rules:
- Only include fields that need to change
- For styles, use CSS properties as keys
- Use Tailwind CSS classes when possible
- Keep changes minimal and focused
- Ensure accessibility and responsive design
- For colors, use semantic tokens (primary, secondary, etc.) when available

Element Type: ${elementType}
Current Element Context: ${JSON.stringify(elementContext)}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    let aiResponse;
    try {
      // Try to parse the AI response as JSON
      aiResponse = JSON.parse(data.choices[0].message.content);
    } catch (parseError) {
      // If parsing fails, return a structured error
      aiResponse = {
        error: "AI response was not valid JSON",
        rawResponse: data.choices[0].message.content
      };
    }

    return new Response(JSON.stringify(aiResponse), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in ai-element-editor function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'Check Supabase function logs for more details'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
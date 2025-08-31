import React, { useEffect, useRef } from 'react';
import type { AIAgentContext } from '../types/ai-agent-types';

interface MonacoEditorProps {
  context: AIAgentContext | null;
}

export const MonacoEditor: React.FC<MonacoEditorProps> = ({ context }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<any>(null);

  useEffect(() => {
    if (editorRef.current && !monacoRef.current) {
      initializeMonaco();
    }
  }, []);

  const initializeMonaco = async () => {
    try {
      // Load Monaco Editor dynamically
      const monaco = await import('monaco-editor');
      
      if (!editorRef.current) return;

      // Configure Monaco for HTML/CSS/JS
      monaco.languages.html.htmlDefaults.setOptions({
        format: {
          tabSize: 2,
          insertSpaces: true,
        },
        suggest: {
          html5: true,
        },
      });

      // Create editor instance
      const editor = monaco.editor.create(editorRef.current, {
        value: getInitialCode(),
        language: 'html',
        theme: 'vs-dark',
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        automaticLayout: true,
        wordWrap: 'on',
        tabSize: 2,
        insertSpaces: true,
      });

      // Add custom completions
      if (context) {
        addCustomCompletions(monaco, context);
      }

      monacoRef.current = { monaco, editor };

      // Handle changes
      editor.onDidChangeModelContent(() => {
        const value = editor.getValue();
        console.log('Code changed:', value);
      });

    } catch (error) {
      console.error('Error initializing Monaco:', error);
      // Fallback to simple textarea
      if (editorRef.current) {
        editorRef.current.innerHTML = `
          <textarea 
            placeholder="Monaco Editor failed to load. Fallback editor..." 
            style="width: 100%; height: 100%; border: none; outline: none; resize: none; font-family: monospace; padding: 10px;"
          ></textarea>
        `;
      }
    }
  };

  const getInitialCode = (): string => {
    return `<!-- AI Agent Code Editor -->
<!DOCTYPE html>
<html>
<head>
    <title>Your Page</title>
    <style>
        /* Add your styles here */
    </style>
</head>
<body>
    <!-- Your HTML content here -->
    <div class="container">
        <h1>Hello World</h1>
        <p>Edit this code with AI assistance!</p>
    </div>
    
    <script>
        // Add your JavaScript here
    </script>
</body>
</html>`;
  };

  const addCustomCompletions = (monaco: any, context: AIAgentContext) => {
    // Add CSS class completions from detected frameworks
    const cssClassCompletions = context.frameworks.flatMap(framework => 
      framework.classes.map(className => ({
        label: className,
        kind: monaco.languages.CompletionItemKind.Class,
        documentation: `${framework.name} class`,
        insertText: className,
        range: null
      }))
    );

    // Register HTML completion provider
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model: any, position: any) => {
        const word = model.getWordUntilPosition(position);
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        };

        const suggestions = [
          ...cssClassCompletions.map(completion => ({
            ...completion,
            range
          })),
          // Add custom element suggestions
          {
            label: 'div.container',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<div class="container">\n\t$0\n</div>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Container div',
            range
          },
          {
            label: 'button.btn',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: '<button class="btn btn-primary">$1</button>',
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Button element',
            range
          }
        ];

        return { suggestions };
      }
    });

    // Register CSS completion provider
    monaco.languages.registerCompletionItemProvider('css', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: 'flex-center',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: 'display: flex;\njustify-content: center;\nalign-items: center;',
            documentation: 'Flex center layout',
            range: null
          }
        ];

        return { suggestions };
      }
    });
  };

  return (
    <div className="h-full border rounded-lg overflow-hidden">
      <div className="h-8 bg-muted/50 border-b flex items-center px-3 text-xs font-medium">
        Code Editor - Press Ctrl+Space for AI completions
      </div>
      <div ref={editorRef} className="h-[calc(100%-2rem)]" />
    </div>
  );
};
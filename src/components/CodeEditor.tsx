import React, { useRef, useState, useEffect } from 'react';
import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import { Button } from '@/components/ui/button';
import { setupMonacoSTLanguage } from '@/lib/monaco-st-setup';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, readOnly = false }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [isLanguageReady, setIsLanguageReady] = useState(false);
  const setupPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize language setup once
  useEffect(() => {
    if (!setupPromiseRef.current) {
      setupPromiseRef.current = setupMonacoSTLanguage()
        .then(() => {
          setIsLanguageReady(true);
        })
        .catch((error) => {
          console.error('Language setup failed:', error);
          // Still render editor even if setup fails (will just lack highlighting)
          setIsLanguageReady(true);
        });
    }
  }, []);

  const handleEditorDidMount: OnMount = (editor) => {
    editorRef.current = editor;
  };

  const handleEditorChange: OnChange = (newValue) => {
    onChange(newValue || '');
  };

  const handleCopy = () => {
    editorRef.current?.trigger('CodeEditor', 'editor.action.clipboardCopyAction', null);
  };

  const handleCut = () => {
    editorRef.current?.trigger('CodeEditor', 'editor.action.clipboardCutAction', null);
  };

  const handlePaste = () => {
    editorRef.current?.trigger('CodeEditor', 'editor.action.clipboardPasteAction', null);
  };

  return (
    <div className="h-full w-full flex flex-col bg-background rounded-lg overflow-hidden border border-border">
      <div className="flex-shrink-0 bg-muted/50 border-b border-border p-1 flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={handleCopy}>
          Copy
        </Button>
        <Button size="sm" variant="ghost" onClick={handleCut}>
          Cut
        </Button>
        <Button size="sm" variant="ghost" onClick={handlePaste}>
          Paste
        </Button>
      </div>
      <div className="flex-grow">
        {!isLanguageReady ? (
          <div className="h-full w-full flex items-center justify-center bg-[#1e1e1e] text-gray-400">
            Loading editor...
          </div>
        ) : (
          <Editor
            width="100%"
            height="100%"
            language="structured-text"
            theme="vs-dark"
            value={value}
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              readOnly: readOnly,
              minimap: { enabled: true },
              fontSize: 14,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CodeEditor;

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { highlightCode } from '@/lib/st-parser';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, readOnly = false }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [lineCount, setLineCount] = useState(1);

  const updateLineNumbers = useCallback(() => {
    const lines = value.split('\n').length;
    setLineCount(lines);
  }, [value]);

  useEffect(() => {
    updateLineNumbers();
  }, [updateLineNumbers]);

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current && lineNumbersRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      
      onChange(newValue);
      
      // Restore cursor position
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const highlightedCode = highlightCode(value);

  return (
    <div className="relative h-full flex bg-background rounded-lg overflow-hidden border border-border">
      {/* Line Numbers */}
      <div 
        ref={lineNumbersRef}
        className="flex-shrink-0 w-12 bg-muted/50 text-muted-foreground font-mono text-sm select-none overflow-hidden border-r border-border"
      >
        <div className="py-3 px-2 text-right">
          {Array.from({ length: lineCount }, (_, i) => (
            <div key={i + 1} className="h-6 leading-6">
              {i + 1}
            </div>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 relative">
        {/* Syntax Highlighted Layer */}
        <div
          ref={highlightRef}
          className="absolute inset-0 font-mono text-sm p-3 whitespace-pre overflow-auto pointer-events-none code-editor custom-scrollbar"
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
          style={{ lineHeight: '1.5rem' }}
        />

        {/* Textarea Layer */}
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onScroll={syncScroll}
          onKeyDown={handleKeyDown}
          readOnly={readOnly}
          className="absolute inset-0 w-full h-full font-mono text-sm p-3 bg-transparent text-transparent caret-foreground resize-none outline-none custom-scrollbar"
          style={{ lineHeight: '1.5rem' }}
          spellCheck={false}
        />
      </div>
    </div>
  );
};

export default CodeEditor;

import { loader } from '@monaco-editor/react';
import type * as Monaco from 'monaco-editor';
import { loadWASM } from 'onigasm';
import { Registry } from 'monaco-textmate';
import { wireTmGrammars } from 'monaco-editor-textmate';

let wasmLoaded = false;

/**
 * Sets up the Monaco editor with Structured Text (IEC 61131-3) syntax highlighting.
 * Uses TextMate grammar for accurate tokenization.
 */
export async function setupMonacoSTLanguage(): Promise<void> {
  try {
    // Get the same Monaco instance that @monaco-editor/react uses
    const monaco = await loader.init();

    // Load onigasm WASM (only once)
    if (!wasmLoaded) {
      await loadWASM('/onigasm.wasm');
      wasmLoaded = true;
    }

    // Register the language FIRST before wiring grammars
    monaco.languages.register({ id: 'structured-text' });

    const registry = new Registry({
      getGrammarDefinition: async (scopeName: string) => {
        if (scopeName === 'source.st') {
          const response = await fetch('/structured-text.tmLanguage.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch grammar: ${response.status} ${response.statusText}`);
          }
          const grammar = await response.json();
          return {
            format: 'json',
            content: grammar,
          };
        }
        return null;
      },
    });

    // Map Monaco language ID to TextMate scope name
    const grammars = new Map<string, string>();
    grammars.set('structured-text', 'source.st');

    await wireTmGrammars(monaco as typeof Monaco, registry, grammars);
  } catch (error) {
    console.error('Error setting up Structured Text language in Monaco:', error);
    throw error;
  }
}

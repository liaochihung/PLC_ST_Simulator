
import { useState, useCallback } from 'react';
import { Project, ProgramBlock, DEFAULT_PROJECT } from '@/lib/default-project';

export function useProgramBlocks() {
  const [project, setProject] = useState<Project>(DEFAULT_PROJECT);
  const [activeBlockId, setActiveBlockId] = useState<string | null>('main');

  const getActiveBlock = useCallback(() => {
    return project.blocks.find(b => b.id === activeBlockId) || null;
  }, [project.blocks, activeBlockId]);

  const selectBlock = useCallback((id: string) => {
    setActiveBlockId(id);
  }, []);

  const addBlock = useCallback((type: ProgramBlock['type']) => {
    const id = `block_${Date.now()}`;
    const newBlock: ProgramBlock = {
      id,
      name: 'New Block',
      type,
      code: type === 'init' ? 'VAR\nEND_VAR' :
        type === 'program' ? 'PROGRAM NewProgram\nVAR\nEND_VAR\n\nEND_PROGRAM' :
          'FUNCTION_BLOCK NewFB\nVAR_INPUT\nEND_VAR\nVAR_OUTPUT\nEND_VAR\nVAR\nEND_VAR\n\nEND_FUNCTION_BLOCK'
    };

    setProject(prev => ({
      ...prev,
      blocks: [...prev.blocks, newBlock]
    }));
    setActiveBlockId(id);
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setProject(prev => ({
      ...prev,
      blocks: prev.blocks.filter(b => b.id !== id)
    }));
    if (activeBlockId === id) {
      setActiveBlockId(null);
    }
  }, [activeBlockId]);

  const toggleBlock = useCallback((id: string) => {
    // Implement toggle logic if needed (e.g. enable/disable block)
    console.log('Toggle block', id);
  }, []);

  const renameBlock = useCallback((id: string, name: string) => {
    setProject(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, name } : b)
    }));
  }, []);

  const updateBlockCode = useCallback((id: string, code: string) => {
    setProject(prev => ({
      ...prev,
      blocks: prev.blocks.map(b => b.id === id ? { ...b, code } : b)
    }));
  }, []);

  const getCombinedCode = useCallback(() => {
    // Simple concatenation for now - in a real system we'd smart link
    // Global vars first, then FBs, then Main
    const globals = project.blocks.filter(b => b.type === 'init').map(b => b.code).join('\n\n');
    const fbs = project.blocks.filter(b => b.type === 'function_block' || b.type === 'function').map(b => b.code).join('\n\n');
    const programs = project.blocks.filter(b => b.type === 'program' || b.type === 'scan').map(b => b.code).join('\n\n');

    return `${globals}\n\n${fbs}\n\n${programs}`;
  }, [project.blocks]);

  return {
    project,
    activeBlockId,
    getActiveBlock,
    selectBlock,
    addBlock,
    deleteBlock,
    toggleBlock,
    renameBlock,
    updateBlockCode,
    getCombinedCode
  };
}

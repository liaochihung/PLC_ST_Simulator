
import { useState, useCallback } from 'react';
import { ProgramProject, ProgramBlock } from '@/types/program-blocks';
import { DEFAULT_PROJECT } from '@/lib/default-project';

export function useProgramBlocks() {
  const [project, setProject] = useState<ProgramProject>(DEFAULT_PROJECT);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(DEFAULT_PROJECT.activeBlockId);

  const getActiveBlock = useCallback(() => {
    // Flatten blocks including children to find by ID
    const findBlock = (blocks: ProgramBlock[], id: string): ProgramBlock | null => {
      for (const block of blocks) {
        if (block.id === id) return block;
        if (block.children) {
          const found = findBlock(block.children, id);
          if (found) return found;
        }
      }
      return null;
    };

    return activeBlockId ? findBlock(project.blocks, activeBlockId) : null;
  }, [project.blocks, activeBlockId]);

  const selectBlock = useCallback((id: string) => {
    setActiveBlockId(id);
  }, []);

  const addBlock = useCallback((type: ProgramBlock['type'], parentId?: string) => {
    const id = `block_${Date.now()}`;
    const newBlock: ProgramBlock = {
      id,
      name: 'New Block',
      type,
      code: type === 'init' ? 'VAR_GLOBAL\nEND_VAR' :
        type === 'scan' ? 'PROGRAM NewProgram\n  VAR\n  END_VAR\n\n  (* Logic *)\nEND_PROGRAM' :
          type === 'function-block' ? 'FUNCTION_BLOCK NewFB\n  VAR_INPUT\n  END_VAR\n  VAR_OUTPUT\n  END_VAR\n  VAR\n  END_VAR\nEND_FUNCTION_BLOCK' :
            '(* Subroutine *)\n',
      enabled: true,
      scanInterval: type === 'scan' ? 100 : undefined
    };

    setProject(prev => {
      // If adding child (subroutine)
      if (parentId) {
        const addFixedChild = (blocks: ProgramBlock[]): ProgramBlock[] => {
          return blocks.map(b => {
            if (b.id === parentId) {
              return { ...b, children: [...(b.children || []), { ...newBlock, parentId }] };
            }
            if (b.children) {
              return { ...b, children: addFixedChild(b.children) };
            }
            return b;
          });
        };
        return { ...prev, blocks: addFixedChild(prev.blocks) };
      }

      // Add to root
      return {
        ...prev,
        blocks: [...prev.blocks, newBlock]
      };
    });
    setActiveBlockId(id);
  }, []);

  const deleteBlock = useCallback((id: string) => {
    setProject(prev => {
      const deleteFromBlocks = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.filter(b => b.id !== id).map(b => ({
          ...b,
          children: b.children ? deleteFromBlocks(b.children) : undefined
        }));
      };
      return { ...prev, blocks: deleteFromBlocks(prev.blocks) };
    });
    if (activeBlockId === id) {
      setActiveBlockId(null);
    }
  }, [activeBlockId]);

  const toggleBlock = useCallback((id: string) => {
    setProject(prev => {
      const toggleInBlocks = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(b => {
          if (b.id === id) return { ...b, enabled: !b.enabled };
          if (b.children) return { ...b, children: toggleInBlocks(b.children) };
          return b;
        });
      };
      return { ...prev, blocks: toggleInBlocks(prev.blocks) };
    });
  }, []);

  const renameBlock = useCallback((id: string, name: string) => {
    setProject(prev => {
      const renameInBlocks = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(b => {
          if (b.id === id) return { ...b, name };
          if (b.children) return { ...b, children: renameInBlocks(b.children) };
          return b;
        });
      };
      return { ...prev, blocks: renameInBlocks(prev.blocks) };
    });
  }, []);

  const updateBlockCode = useCallback((id: string, code: string) => {
    setProject(prev => {
      const updateInBlocks = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(b => {
          if (b.id === id) return { ...b, code };
          if (b.children) return { ...b, children: updateInBlocks(b.children) };
          return b;
        });
      };
      return { ...prev, blocks: updateInBlocks(prev.blocks) };
    });
  }, []);

  const getCombinedCode = useCallback(() => {
    const flatten = (blocks: ProgramBlock[]): ProgramBlock[] => {
      let res: ProgramBlock[] = [];
      for (const b of blocks) {
        if (b.enabled) {
          res.push(b);
          if (b.children) res = res.concat(flatten(b.children));
        }
      }
      return res;
    };

    const allBlocks = flatten(project.blocks);

    const globals = allBlocks.filter(b => b.type === 'init').map(b => b.code).join('\n\n');
    const fbs = allBlocks.filter(b => b.type === 'function-block').map(b => b.code).join('\n\n');
    const programs = allBlocks.filter(b => b.type === 'scan').map(b => b.code).join('\n\n');
    const subroutines = allBlocks.filter(b => b.type === 'subroutine').map(b => b.code).join('\n\n');

    return [globals, fbs, programs, subroutines].filter(s => s).join('\n\n');
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

import { useState, useCallback } from 'react';
import { ProgramProject, ProgramBlock } from '@/types/program-blocks';
import { MachineLayout } from '@/types/machine-editor';
import { DEFAULT_PROJECT } from '@/lib/default-project';

export function useProgramBlocks() {
  const [project, setProject] = useState<ProgramProject>(DEFAULT_PROJECT);
  const [activeBlockId, setActiveBlockId] = useState<string | null>(DEFAULT_PROJECT.activeBlockId);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);


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
            type === 'data-type' ? 'TYPE NewType :\n  STRUCT\n    Member : BOOL;\n  END_STRUCT;\nEND_TYPE' :
              type === 'global-var' ? 'VAR_GLOBAL\n  MyVar : BOOL;\nEND_VAR' :
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

  const duplicateBlock = useCallback((id: string) => {
    setProject(prev => {
      const findAndDuplicateBlock = (blocks: ProgramBlock[]): { blocks: ProgramBlock[], duplicated?: ProgramBlock } => {
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];

          if (block.id === id) {
            // Found the block to duplicate
            const newId = `block_${Date.now()}`;
            const duplicatedBlock: ProgramBlock = {
              ...block,
              id: newId,
              name: `${block.name}_copy`,
              children: block.children ? duplicateChildren(block.children) : undefined
            };

            // Insert duplicated block right after the original
            const newBlocks = [...blocks];
            newBlocks.splice(i + 1, 0, duplicatedBlock);

            return { blocks: newBlocks, duplicated: duplicatedBlock };
          }

          // Check children
          if (block.children) {
            const result = findAndDuplicateBlock(block.children);
            if (result.duplicated) {
              return {
                blocks: blocks.map(b => b.id === block.id ? { ...b, children: result.blocks } : b),
                duplicated: result.duplicated
              };
            }
          }
        }

        return { blocks };
      };

      // Helper to duplicate children recursively
      const duplicateChildren = (children: ProgramBlock[]): ProgramBlock[] => {
        return children.map(child => ({
          ...child,
          id: `block_${Date.now()}_${Math.random()}`,
          children: child.children ? duplicateChildren(child.children) : undefined
        }));
      };

      const result = findAndDuplicateBlock(prev.blocks);
      if (result.duplicated) {
        // Select the newly duplicated block
        setActiveBlockId(result.duplicated.id);
      }

      return { ...prev, blocks: result.blocks };
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

  // Code Assembly Logic
  const getCombinedCode = useCallback(() => {
    // 1. Collect all Function Blocks first (they must be defined before use)
    const findBlocksByType = (blocks: ProgramBlock[], type: ProgramBlock['type']): ProgramBlock[] => {
      let results: ProgramBlock[] = [];
      for (const block of blocks) {
        if (block.type === type) {
          results.push(block);
        }
        if (block.children) {
          results = results.concat(findBlocksByType(block.children, type));
        }
      }
      return results;
    };

    // NOTE: Data Types are currently not included in the combined code
    // because the ST parser does not support TYPE definitions yet.
    // This prevents parser errors when renaming or modifying data types.
    // const typeBlocks = findBlocksByType(project.blocks, 'data-type');
    // const typeCode = typeBlocks
    //   .filter(b => b.enabled)
    //   .map(b => b.code)
    //   .join('\n\n');

    const fbBlocks = findBlocksByType(project.blocks, 'function-block');
    const fbCode = fbBlocks
      .filter(b => b.enabled)
      .map(b => b.code)
      .join('\n\n');

    // 2. Parse and merge Main Program blocks (Init and Scan)
    const initBlocks = findBlocksByType(project.blocks, 'init');

    // Helper to extract VAR...END_VAR and Body
    const parseBlock = (code: string) => {
      // Updated regex to handle VAR, VAR_GLOBAL, VAR_INPUT, etc.
      const varRegex = /(?:VAR|VAR_GLOBAL|VAR_INPUT|VAR_OUTPUT)([\s\S]*?)END_VAR/g;
      let vars: string[] = [];
      let body = code;

      let match;
      while ((match = varRegex.exec(code)) !== null) {
        if (match[1]) {
          const varContent = match[1].trim();
          if (varContent) vars.push(varContent);
        }
      }

      body = body.replace(varRegex, '').trim();
      return { vars, body };
    };

    let mainVars: string[] = ['_init_done : BOOL := FALSE;', 'idx : INT; (* General Index *)'];
    let mainBodyParts: string[] = [];

    // Process Global Variable Blocks
    const globalVarBlocks = findBlocksByType(project.blocks, 'global-var');
    globalVarBlocks.filter(b => b.enabled).forEach(b => {
      const { vars } = parseBlock(b.code);
      mainVars.push(...vars);
    });

    // Process Init Blocks
    if (initBlocks.length > 0) {
      let initBodies: string[] = [];
      initBlocks.filter(b => b.enabled).forEach(b => {
        const { vars, body } = parseBlock(b.code);
        mainVars.push(...vars);
        if (body) initBodies.push(body);
      });

      if (initBodies.length > 0) {
        mainBodyParts.push(`
    (* Initialization Block *)
    IF NOT _init_done THEN
        ${initBodies.join('\n\n        ')}
        
        _init_done := TRUE;
    END_IF;
            `);
      }
    }

    // Process Scan Blocks in Tree Order
    const collectScanCode = (blocks: ProgramBlock[]): void => {
      for (const block of blocks) {
        if (!block.enabled) continue;

        if (block.type === 'scan' || block.type === 'subroutine') {
          const { vars, body } = parseBlock(block.code);
          mainVars.push(...vars);
          if (body) {
            mainBodyParts.push(`    (* Block: ${block.name} *)\n    ${body}`);
          }
        }

        if (block.children && block.children.length > 0) {
          collectScanCode(block.children);
        }
      }
    };

    collectScanCode(project.blocks);

    const mainProgram = `
PROGRAM Main
    VAR
        ${mainVars.join('\n        ')}
    END_VAR

${mainBodyParts.join('\n\n')}

END_PROGRAM
`;

    // NOTE: typeCode is excluded (see comment above)
    return `${fbCode}\n\n${mainProgram}`;
  }, [project.blocks]);

  // Project Management Functions
  const loadProject = useCallback(async (id: string) => {
    // Dynamic import to avoid circular dependencies if any, though Service is clean
    const { ProjectService } = await import('@/lib/services/ProjectService');
    const loadedProj = await ProjectService.getProject(id);
    if (loadedProj) {
      setProject(loadedProj);
      setActiveBlockId(loadedProj.activeBlockId);
      setCurrentProjectId(loadedProj.id);
    }
  }, []);

  const saveProject = useCallback(async (currentLayout?: MachineLayout) => {
    setIsSaving(true);
    try {
      const { ProjectService } = await import('@/lib/services/ProjectService');

      const projectToSave = {
        ...project,
        activeBlockId, // Ensure current active block is saved
        visualDesign: currentLayout ? { layout: currentLayout } : project.visualDesign
      };

      if (currentProjectId) {
        // Update existing
        projectToSave.id = currentProjectId;
        await ProjectService.updateProject(projectToSave);
      } else {
        // Create new
        const newId = await ProjectService.createProject(projectToSave);
        if (newId) setCurrentProjectId(newId);
      }
    } catch (e) {
      console.error("Failed to save project", e);
      throw e;
    } finally {
      setIsSaving(false);
    }
  }, [project, activeBlockId, currentProjectId]);

  const newProject = useCallback(() => {
    setProject(DEFAULT_PROJECT);
    setActiveBlockId(DEFAULT_PROJECT.activeBlockId);
    setCurrentProjectId(null);
  }, []);

  return {
    project,
    activeBlockId,
    getActiveBlock,
    selectBlock,
    addBlock,
    deleteBlock,
    toggleBlock,
    renameBlock,
    duplicateBlock,
    updateBlockCode,
    getCombinedCode,
    // Project Mgmt
    currentProjectId,
    isSaving,
    loadProject,
    saveProject,
    newProject
  };
}

import { useState, useCallback } from 'react';
import { 
  ProgramBlock, 
  ProgramProject, 
  BlockType,
  ScanInterval,
  createDefaultProject,
  DEFAULT_MAIN_SCAN_CODE,
  DEFAULT_STATION_CONTROL_CODE
} from '@/types/program-blocks';

export function useProgramBlocks() {
  const [project, setProject] = useState<ProgramProject>(createDefaultProject);

  // 取得當前選中的區塊
  const getActiveBlock = useCallback((): ProgramBlock | null => {
    if (!project.activeBlockId) return null;
    
    const findBlock = (blocks: ProgramBlock[]): ProgramBlock | null => {
      for (const block of blocks) {
        if (block.id === project.activeBlockId) return block;
        if (block.children) {
          const found = findBlock(block.children);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findBlock(project.blocks);
  }, [project]);

  // 選擇區塊
  const selectBlock = useCallback((blockId: string) => {
    setProject(prev => ({
      ...prev,
      activeBlockId: blockId
    }));
  }, []);

  // 新增區塊
  const addBlock = useCallback((type: BlockType, parentId?: string) => {
    const newId = `block-${Date.now()}`;
    
    const getDefaultCode = () => {
      switch (type) {
        case 'scan':
          return DEFAULT_MAIN_SCAN_CODE;
        case 'subroutine':
          return DEFAULT_STATION_CONTROL_CODE;
        case 'function-block':
          return `(* 功能塊 *)\n(* Function Block *)\n`;
        default:
          return '';
      }
    };

    const newBlock: ProgramBlock = {
      id: newId,
      name: type === 'scan' ? '新掃描區塊' : type === 'subroutine' ? '新子程式' : '新功能塊',
      type,
      code: getDefaultCode(),
      scanInterval: type === 'scan' ? 100 : undefined,
      enabled: true,
      parentId: parentId || null,
    };

    setProject(prev => {
      if (parentId) {
        // 新增到父區塊的 children
        const updateChildren = (blocks: ProgramBlock[]): ProgramBlock[] => {
          return blocks.map(block => {
            if (block.id === parentId) {
              return {
                ...block,
                children: [...(block.children || []), newBlock]
              };
            }
            if (block.children) {
              return {
                ...block,
                children: updateChildren(block.children)
              };
            }
            return block;
          });
        };

        return {
          ...prev,
          blocks: updateChildren(prev.blocks),
          activeBlockId: newId
        };
      } else {
        // 新增到頂層
        return {
          ...prev,
          blocks: [...prev.blocks, newBlock],
          activeBlockId: newId
        };
      }
    });
  }, []);

  // 刪除區塊
  const deleteBlock = useCallback((blockId: string) => {
    setProject(prev => {
      const removeBlock = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks
          .filter(block => block.id !== blockId)
          .map(block => ({
            ...block,
            children: block.children ? removeBlock(block.children) : undefined
          }));
      };

      const newBlocks = removeBlock(prev.blocks);
      const newActiveId = prev.activeBlockId === blockId 
        ? (newBlocks[0]?.id || null)
        : prev.activeBlockId;

      return {
        ...prev,
        blocks: newBlocks,
        activeBlockId: newActiveId
      };
    });
  }, []);

  // 切換啟用/停用
  const toggleBlock = useCallback((blockId: string) => {
    setProject(prev => {
      const updateEnabled = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(block => {
          if (block.id === blockId) {
            return { ...block, enabled: !block.enabled };
          }
          if (block.children) {
            return { ...block, children: updateEnabled(block.children) };
          }
          return block;
        });
      };

      return {
        ...prev,
        blocks: updateEnabled(prev.blocks)
      };
    });
  }, []);

  // 重新命名區塊
  const renameBlock = useCallback((blockId: string, newName: string) => {
    setProject(prev => {
      const updateName = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(block => {
          if (block.id === blockId) {
            return { ...block, name: newName };
          }
          if (block.children) {
            return { ...block, children: updateName(block.children) };
          }
          return block;
        });
      };

      return {
        ...prev,
        blocks: updateName(prev.blocks)
      };
    });
  }, []);

  // 更新區塊程式碼
  const updateBlockCode = useCallback((blockId: string, code: string) => {
    setProject(prev => {
      const updateCode = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(block => {
          if (block.id === blockId) {
            return { ...block, code };
          }
          if (block.children) {
            return { ...block, children: updateCode(block.children) };
          }
          return block;
        });
      };

      return {
        ...prev,
        blocks: updateCode(prev.blocks)
      };
    });
  }, []);

  // 更新掃描週期
  const updateScanInterval = useCallback((blockId: string, interval: ScanInterval) => {
    setProject(prev => {
      const updateInterval = (blocks: ProgramBlock[]): ProgramBlock[] => {
        return blocks.map(block => {
          if (block.id === blockId && block.type === 'scan') {
            return { ...block, scanInterval: interval };
          }
          if (block.children) {
            return { ...block, children: updateInterval(block.children) };
          }
          return block;
        });
      };

      return {
        ...prev,
        blocks: updateInterval(prev.blocks)
      };
    });
  }, []);

  // 取得所有啟用的區塊（用於執行）
  const getEnabledBlocks = useCallback(() => {
    const enabled: ProgramBlock[] = [];
    
    const collectEnabled = (blocks: ProgramBlock[]) => {
      for (const block of blocks) {
        if (block.enabled) {
          enabled.push(block);
        }
        if (block.children) {
          collectEnabled(block.children);
        }
      }
    };
    
    collectEnabled(project.blocks);
    return enabled;
  }, [project.blocks]);

  // 組合所有程式碼（用於解譯器）
  const getCombinedCode = useCallback(() => {
    const enabledBlocks = getEnabledBlocks();
    
    // 依類型排序：init -> scan (依週期排序) -> others
    const sorted = [...enabledBlocks].sort((a, b) => {
      if (a.type === 'init') return -1;
      if (b.type === 'init') return 1;
      if (a.type === 'scan' && b.type === 'scan') {
        return (a.scanInterval || 100) - (b.scanInterval || 100);
      }
      return 0;
    });

    // 目前簡單合併，之後可以更精細處理
    return sorted.map(b => b.code).join('\n\n');
  }, [getEnabledBlocks]);

  return {
    project,
    getActiveBlock,
    selectBlock,
    addBlock,
    deleteBlock,
    toggleBlock,
    renameBlock,
    updateBlockCode,
    updateScanInterval,
    getEnabledBlocks,
    getCombinedCode,
  };
}

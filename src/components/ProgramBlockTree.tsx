import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { 
  ChevronRight, 
  ChevronDown,
  Zap,
  RefreshCw,
  Code,
  Box,
  Plus,
  MoreVertical,
  Trash2,
  Copy,
  Edit2,
  Power
} from 'lucide-react';
import { 
  ProgramBlock, 
  ProgramProject, 
  BlockType,
  getBlockTypeName,
  getBlockTypeColor,
  ScanInterval
} from '@/types/program-blocks';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

interface ProgramBlockTreeProps {
  project: ProgramProject;
  onBlockSelect: (blockId: string) => void;
  onBlockAdd: (type: BlockType, parentId?: string) => void;
  onBlockDelete: (blockId: string) => void;
  onBlockToggle: (blockId: string) => void;
  onBlockRename: (blockId: string, newName: string) => void;
  isRunning: boolean;
}

const BlockIcon: React.FC<{ type: BlockType; className?: string }> = ({ type, className }) => {
  const iconClass = cn("w-4 h-4", getBlockTypeColor(type), className);
  
  switch (type) {
    case 'init':
      return <Zap className={iconClass} />;
    case 'scan':
      return <RefreshCw className={iconClass} />;
    case 'subroutine':
      return <Code className={iconClass} />;
    case 'function-block':
      return <Box className={iconClass} />;
  }
};

interface BlockItemProps {
  block: ProgramBlock;
  isActive: boolean;
  isRunning: boolean;
  depth: number;
  onSelect: () => void;
  onDelete: () => void;
  onToggle: () => void;
  onAddChild?: () => void;
  children?: React.ReactNode;
}

const BlockItem: React.FC<BlockItemProps> = ({
  block,
  isActive,
  isRunning,
  depth,
  onSelect,
  onDelete,
  onToggle,
  onAddChild,
  children
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = block.children && block.children.length > 0;
  const canAddChild = block.type === 'scan';

  return (
    <div>
      <div
        className={cn(
          "group flex items-center gap-1 py-1.5 px-2 rounded cursor-pointer transition-colors",
          isActive ? "bg-primary/20 text-foreground" : "hover:bg-muted/50 text-muted-foreground",
          !block.enabled && "opacity-50"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
        onClick={onSelect}
      >
        {/* 展開/收合按鈕 */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-0.5 hover:bg-muted rounded"
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3" />
            ) : (
              <ChevronRight className="w-3 h-3" />
            )}
          </button>
        ) : (
          <div className="w-4" />
        )}

        {/* 區塊圖示 */}
        <BlockIcon type={block.type} />

        {/* 區塊名稱 */}
        <span className="flex-1 text-sm truncate">{block.name}</span>

        {/* 掃描週期標籤 */}
        {block.type === 'scan' && block.scanInterval && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
            {block.scanInterval}ms
          </span>
        )}

        {/* 執行中指示器 */}
        {isRunning && block.enabled && (
          <div className="w-2 h-2 rounded-full bg-success animate-industrial-pulse" />
        )}

        {/* 操作選單 */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-muted rounded transition-opacity"
            >
              <MoreVertical className="w-3 h-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40 bg-popover border-border">
            {canAddChild && (
              <>
                <DropdownMenuItem onClick={onAddChild}>
                  <Plus className="w-3 h-3 mr-2" />
                  新增子程式
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem onClick={onToggle}>
              <Power className="w-3 h-3 mr-2" />
              {block.enabled ? '停用' : '啟用'}
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="w-3 h-3 mr-2" />
              複製
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit2 className="w-3 h-3 mr-2" />
              重新命名
            </DropdownMenuItem>
            {block.type !== 'init' && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={onDelete}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  刪除
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 子項目 */}
      {hasChildren && isExpanded && (
        <div>{children}</div>
      )}
    </div>
  );
};

const ProgramBlockTree: React.FC<ProgramBlockTreeProps> = ({
  project,
  onBlockSelect,
  onBlockAdd,
  onBlockDelete,
  onBlockToggle,
  onBlockRename,
  isRunning
}) => {
  const renderBlock = (block: ProgramBlock, depth: number = 0) => {
    return (
      <BlockItem
        key={block.id}
        block={block}
        isActive={project.activeBlockId === block.id}
        isRunning={isRunning}
        depth={depth}
        onSelect={() => onBlockSelect(block.id)}
        onDelete={() => onBlockDelete(block.id)}
        onToggle={() => onBlockToggle(block.id)}
        onAddChild={block.type === 'scan' ? () => onBlockAdd('subroutine', block.id) : undefined}
      >
        {block.children?.map(child => renderBlock(child, depth + 1))}
      </BlockItem>
    );
  };

  // 分組顯示
  const initBlocks = project.blocks.filter(b => b.type === 'init');
  const scanBlocks = project.blocks.filter(b => b.type === 'scan');
  const fbBlocks = project.blocks.filter(b => b.type === 'function-block');

  return (
    <div className="h-full flex flex-col bg-card text-foreground">
      {/* 標題 */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">{project.name}</h3>
            <p className="text-xs text-muted-foreground">程式區塊</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <Plus className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover border-border">
              <DropdownMenuItem onClick={() => onBlockAdd('scan')}>
                <RefreshCw className="w-3 h-3 mr-2 text-primary" />
                新增掃描區塊
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBlockAdd('function-block')}>
                <Box className="w-3 h-3 mr-2 text-chart-4" />
                新增功能塊
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 區塊列表 */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {/* 初始化區塊 */}
        {initBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              初始化
            </div>
            {initBlocks.map(block => renderBlock(block))}
          </div>
        )}

        {/* 掃描區塊 */}
        {scanBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              掃描區塊
            </div>
            {scanBlocks.map(block => renderBlock(block))}
          </div>
        )}

        {/* 功能塊 */}
        {fbBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              功能塊
            </div>
            {fbBlocks.map(block => renderBlock(block))}
          </div>
        )}
      </div>

      {/* 狀態欄 */}
      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{project.blocks.length} 個區塊</span>
          {isRunning && (
            <span className="flex items-center gap-1 text-success">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              執行中
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramBlockTree;

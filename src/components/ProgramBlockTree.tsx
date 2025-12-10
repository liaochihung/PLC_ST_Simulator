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
  Power,
  Database,
  Globe
} from 'lucide-react';
import RenameDialog from '@/components/RenameDialog';
import ConfirmDialog from '@/components/ConfirmDialog';
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
  onBlockDuplicate: (blockId: string) => void;
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
    case 'data-type':
      return <Database className={iconClass} />;
    case 'global-var':
      return <Globe className={iconClass} />;
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
  onRename: (newName: string) => void;
  onDuplicate: () => void;
  onAddChild?: () => void;
  children?: React.ReactNode;
  isDefaultGlobalVar?: boolean;
}

const BlockItem: React.FC<BlockItemProps> = ({
  block,
  isActive,
  isRunning,
  depth,
  onSelect,
  onDelete,
  onToggle,
  onRename,
  onDuplicate,
  onAddChild,
  children,
  isDefaultGlobalVar = false
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [renameDialogOpen, setRenameDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const hasChildren = block.children && block.children.length > 0;
  const canAddChild = block.type === 'scan';

  // Determine which menu items to show based on block type
  const showRename = block.type !== 'init' && !isDefaultGlobalVar;
  const showDuplicate = block.type !== 'init';
  const showDisable = block.type === 'init' || block.type === 'scan' || block.type === 'subroutine';
  const showToggleInMenu = block.type === 'init'; // Only show in menu for init
  const canDelete = block.type !== 'init';

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
        {/* Expand/Collapse Button */}
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

        {/* Block Icon */}
        <BlockIcon type={block.type} />

        {/* Block Name */}
        <span className="flex-1 text-sm truncate">{block.name}</span>

        {/* Scan Interval Label */}
        {block.type === 'scan' && block.scanInterval && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-primary/10 text-primary">
            {block.scanInterval}ms
          </span>
        )}

        {/* Running Indicator */}
        {isRunning && block.enabled && (
          <div className="w-2 h-2 rounded-full bg-success animate-industrial-pulse" />
        )}

        {/* Toggle Switch */}
        {(block.type === 'scan' || block.type === 'subroutine') && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
            className={cn(
              "p-1 rounded hover:bg-muted transition-all",
              block.enabled
                ? "text-primary"
                : "text-muted-foreground opacity-50 hover:opacity-100 hover:text-foreground"
            )}
            title={block.enabled ? "Disable" : "Enable"}
          >
            <Power className="w-3.5 h-3.5" />
          </button>
        )}

        {/* Operation Menu */}
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
                  Add Subroutine
                </DropdownMenuItem>
                <DropdownMenuSeparator />
              </>
            )}
            {showToggleInMenu && (
              <DropdownMenuItem onClick={onToggle}>
                <Power className="w-3 h-3 mr-2" />
                {block.enabled ? 'Disable' : 'Enable'}
              </DropdownMenuItem>
            )}
            {showDuplicate && (
              <DropdownMenuItem onClick={onDuplicate}>
                <Copy className="w-3 h-3 mr-2" />
                Duplicate
              </DropdownMenuItem>
            )}
            {showRename && (
              <DropdownMenuItem onClick={() => setRenameDialogOpen(true)}>
                <Edit2 className="w-3 h-3 mr-2" />
                Rename
              </DropdownMenuItem>
            )}
            {canDelete && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => setDeleteDialogOpen(true)}
                  className="text-destructive focus:text-destructive"
                >
                  <Trash2 className="w-3 h-3 mr-2" />
                  Delete
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Rename Dialog */}
      <RenameDialog
        open={renameDialogOpen}
        onOpenChange={setRenameDialogOpen}
        currentName={block.name}
        onConfirm={onRename}
        title="Rename Block"
        description="Enter a new name for this block."
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={onDelete}
        title="Delete Block"
        description={`Are you sure you want to delete "${block.name}"? This action cannot be undone.`}
        confirmText="Delete"
        variant="destructive"
      />

      {/* Children */}
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
  onBlockDuplicate,
  isRunning
}) => {
  const renderBlock = (block: ProgramBlock, depth: number = 0, isDefaultGlobalVar: boolean = false) => {
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
        onRename={(newName) => onBlockRename(block.id, newName)}
        onDuplicate={() => onBlockDuplicate(block.id)}
        onAddChild={block.type === 'scan' ? () => onBlockAdd('subroutine', block.id) : undefined}
        isDefaultGlobalVar={isDefaultGlobalVar}
      >
        {block.children?.map(child => renderBlock(child, depth + 1))}
      </BlockItem>
    );
  };

  // Grouped display
  const initBlocks = project.blocks.filter(b => b.type === 'init');
  const scanBlocks = project.blocks.filter(b => b.type === 'scan');
  const fbBlocks = project.blocks.filter(b => b.type === 'function-block');
  const typeBlocks = project.blocks.filter(b => b.type === 'data-type');
  const globalVarBlocks = project.blocks.filter(b => b.type === 'global-var');

  return (
    <div className="h-full flex flex-col bg-card text-foreground">
      {/* Header */}
      <div className="p-3 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-sm">{project.name}</h3>
            <p className="text-xs text-muted-foreground">Program Blocks</p>
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
                Add Scan Block
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBlockAdd('function-block')}>
                <Box className="w-3 h-3 mr-2 text-chart-4" />
                Add Function Block
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBlockAdd('data-type')}>
                <Database className="w-3 h-3 mr-2 text-purple-500" />
                Add Data Type
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onBlockAdd('global-var')}>
                <Globe className="w-3 h-3 mr-2 text-orange-500" />
                Add Global Variable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Block List */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {/* Data Types */}
        {typeBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 flex items-center justify-between">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Data Types
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5"
                onClick={() => onBlockAdd('data-type')}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            {typeBlocks.map(block => renderBlock(block))}
          </div>
        )}

        {/* Global Variables */}
        {globalVarBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Global Variables
            </div>
            {globalVarBlocks.map(block => {
              // Check if this is a default global variable (Variables or IO Mapping)
              const isDefault = block.name === 'Variables' || block.name === 'IO Mapping';
              return renderBlock(block, 0, isDefault);
            })}
          </div>
        )}

        {/* Initialization Blocks */}
        {initBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Initialization
            </div>
            {initBlocks.map(block => renderBlock(block))}
          </div>
        )}

        {/* Scan Blocks */}
        {scanBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Scan Blocks
            </div>
            {scanBlocks.map(block => renderBlock(block))}
          </div>
        )}

        {/* Function Blocks */}
        {fbBlocks.length > 0 && (
          <div>
            <div className="px-2 py-1 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Function Blocks
            </div>
            {fbBlocks.map(block => renderBlock(block))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="p-2 border-t border-border text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>{project.blocks.length} Blocks</span>
          {isRunning && (
            <span className="flex items-center gap-1 text-success">
              <div className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
              Running
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramBlockTree;

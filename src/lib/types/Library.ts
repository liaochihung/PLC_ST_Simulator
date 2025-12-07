
// Basic variable definition (for interface parsing)
export interface VariableDefinition {
    name: string;
    type: string;
    defaultValue?: string;
    comment?: string;
}

// A single Function Block definition
export interface FunctionBlockDefinition {
    name: string;
    type: 'FUNCTION_BLOCK' | 'FUNCTION';
    sourceCode: string; // The full ST implementation body including VAR...END_VAR
    inputs: VariableDefinition[];
    outputs: VariableDefinition[];
    vars: VariableDefinition[]; // Internal variables
}

// A collection of FBs (The "Library")
export interface Library {
    id: string;
    name: string;
    description?: string;
    isPublic: boolean;
    ownerId?: string;
    content: {
        functionBlocks: FunctionBlockDefinition[];
    };
    created_at: string;
    updated_at: string;
}

// For Import Selection
export interface LibrarySummary {
    id: string;
    name: string;
    description?: string;
}

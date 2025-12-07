
import { supabase } from '@/lib/supabase';
import { Library, LibrarySummary } from '@/lib/types/Library';

export class LibraryService {

    // Fetch list of public libraries
    static async getPublicLibraries(): Promise<LibrarySummary[]> {
        const { data, error } = await supabase
            .from('libraries')
            .select('id, name, description')
            .eq('is_public', true)
            .order('name');

        if (error) {
            console.error('Error fetching libraries:', error);
            return []; // Fallback empty
        }

        return data || [];
    }

    // Get full library content including FBs
    static async getLibraryDetails(id: string): Promise<Library | null> {
        const { data, error } = await supabase
            .from('libraries')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching library ${id}:`, error);
            return null;
        }

        return data as Library;
    }

    // For testing: Create a standard library if none exists
    // (In a real app, this would be an Admin function or Migration)
    static async seedStandardLibrary() {
        // Check if exists
        const { count } = await supabase
            .from('libraries')
            .select('*', { count: 'exact', head: true })
            .eq('name', 'Standard Motion Lib');

        if (count && count > 0) return; // Already exists

        const standardMotionLib = {
            name: 'Standard Motion Lib',
            description: 'Basic cylinder and motor control blocks',
            is_public: true,
            content: {
                functionBlocks: [
                    {
                        name: 'FB_Cylinder',
                        type: 'FUNCTION_BLOCK',
                        inputs: [
                            { name: 'i_ExtendCmd', type: 'BOOL' },
                            { name: 'i_RetractCmd', type: 'BOOL' }
                        ],
                        outputs: [
                            { name: 'q_Extended', type: 'BOOL' },
                            { name: 'q_Retracted', type: 'BOOL' }
                        ],
                        vars: [
                            { name: 'state', type: 'INT' }
                        ],
                        sourceCode: `
FUNCTION_BLOCK FB_Cylinder
    VAR_INPUT
        i_ExtendCmd : BOOL;
        i_RetractCmd : BOOL;
    END_VAR
    VAR_OUTPUT
        q_Extended : BOOL;
        q_Retracted : BOOL;
    END_VAR
    VAR
        // Internal Simulation State
        pos : REAL := 0.0;
    END_VAR

    // Simplified Logic
    IF i_ExtendCmd AND NOT i_RetractCmd THEN
        pos := pos + 1.0;
        IF pos > 100.0 THEN pos := 100.0; END_IF;
    ELSIF i_RetractCmd AND NOT i_ExtendCmd THEN
        pos := pos - 1.0;
        IF pos < 0.0 THEN pos := 0.0; END_IF;
    END_IF;

    q_Extended := (pos >= 100.0);
    q_Retracted := (pos <= 0.0);
END_FUNCTION_BLOCK
                        `
                    }
                ]
            }
        };

        await supabase.from('libraries').insert(standardMotionLib);
        console.log('Seeded Standard Motion Lib');
    }
}

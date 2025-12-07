
import { supabase } from '@/lib/supabase';
import { ProgramProject } from '@/types/program-blocks';

export interface ProjectSummary {
    id: string;
    name: string;
    description: string | null;
    updated_at: string;
}

export class ProjectService {

    // Get all projects for the current user
    static async getProjects(): Promise<ProjectSummary[]> {
        const { data, error } = await supabase
            .from('projects')
            .select('id, name, description, updated_at')
            .order('updated_at', { ascending: false });

        if (error) {
            console.error('Error fetching projects:', error);
            throw error;
        }

        return data || [];
    }

    // Get a full project by ID
    static async getProject(id: string): Promise<ProgramProject | null> {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching project ${id}:`, error);
            return null;
        }

        // Map DB structure back to ProgramProject
        return {
            id: data.id,
            name: data.name,
            blocks: data.blocks, // Assumes jsonb structure matches ProgramBlock[]
            activeBlockId: data.active_block_id
        };
    }

    // Create a new project
    static async createProject(project: Omit<ProgramProject, 'id'>, description?: string): Promise<string | null> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('User not authenticated');

        const { data, error } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                name: project.name,
                description: description,
                blocks: project.blocks,
                active_block_id: project.activeBlockId
            })
            .select('id')
            .single();

        if (error) {
            console.error('Error creating project:', error);
            throw error;
        }

        return data?.id || null;
    }

    // Update an existing project
    static async updateProject(project: ProgramProject, description?: string): Promise<boolean> {
        const updates: any = {
            name: project.name,
            blocks: project.blocks,
            active_block_id: project.activeBlockId,
            updated_at: new Date().toISOString()
        };

        if (description !== undefined) {
            updates.description = description;
        }

        const { error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', project.id);

        if (error) {
            console.error('Error updating project:', error);
            throw error;
        }

        return true;
    }

    // Delete a project
    static async deleteProject(id: string): Promise<boolean> {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting project:', error);
            throw error;
        }

        return true;
    }
}

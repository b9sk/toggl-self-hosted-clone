declare module 'model-types' {
    interface Task {
        id: string;
        start_time: Date;
        user_id: number;
        project_id?: number;
        text?: string;
        end_time?: Date;
        created_at?: Date;
        updated_at?: Date;
    }

    interface Project {
        id: number;
        name: string;
        client_id: number | null;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: number;
    }

    interface Client {
        id: number;
        user_id: number;
        name: string;
        created_at: Date | null;
        updated_at: Date | null;
    }
}

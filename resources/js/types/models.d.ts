declare module 'model-types' {
    interface Task {
        id: string;
        project_id: number | null;
        start_time: Date;
        end_time: Date | null;
        text: string | null;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: number;
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

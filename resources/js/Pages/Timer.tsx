import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ModelTypes from 'model-types';

interface DashboardProps extends PageProps {
    tasks: ModelTypes.Task[],
    projects: ModelTypes.Project[],
    clients: ModelTypes.Client[]
}

export default function HelloWorld({auth}: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Timer</h2>}
        >
            <Head title="Timer" />
            <div className="py-0 px-0">
                <h1>Hello World!</h1>
            </div>
            TODO latest tasks here
        </AuthenticatedLayout>
    );
};

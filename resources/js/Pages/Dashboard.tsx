import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ModelTypes from 'model-types';

interface DashboardProps extends PageProps {
    tasks: ModelTypes.Task[],
    projects: ModelTypes.Project[],
    clients: ModelTypes.Client[]
}

export default function Dashboard({ auth, tasks, projects, clients }: DashboardProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />
            <div>MAYBE TODO some fancy statisc here</div>

            <div className="py-12">
                <div className="max-w-12xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h3>Tasks</h3>
                            <ul>
                                {tasks.map(task => (
                                    <li key={task.id || undefined}>
                                        {task.text || '(no task text)'}<br />
                                        {task.start_time.toLocaleString()}
                                    </li>
                                ))}
                            </ul>
                            <h3>Projects</h3>
                            <ul>
                                {projects.map(project => (
                                    <li key={project.id || undefined}>
                                        {project.name}
                                    </li>
                                ))}
                            </ul>
                            <h3>Clients</h3>
                            <ul>
                                {clients.map(client => (
                                    <li key={client.id || undefined}>
                                        {client.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

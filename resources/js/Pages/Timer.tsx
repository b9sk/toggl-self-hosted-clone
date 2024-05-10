import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import ModelTypes from 'model-types';
import Popup from '@/Components/Popups/BasicPopup';

interface DashboardProps extends PageProps {
    tasks: ModelTypes.Task[],
    projects: ModelTypes.Project[],
    clients: ModelTypes.Client[]
}

function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    alert('TODO: submit form');
}

export default function HelloWorld({ auth, tasks }: DashboardProps) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Timer</h2>}
        >
            <Head title="Timer" />

            <Popup>
                <p>This is the content inside the popup.</p>
                {/* You can add more complex components here */}
            </Popup>

            <div className="py-3 px-1 bg-white dark:bg-gray-800">
                <form className="flex items-center"  onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
                        placeholder="Type your task here"
                    />
                    <button className="px-4 py-2 text-gray-200 bg-blue-600 border border-blue-600 rounded-r-md hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className='py-3 px-1'>
                <h3>Tasks</h3>

                <ul>
                    {tasks.map(task => (
                        <li key={task.id || undefined}>
                            {task.text || '(no task text)'}<br />
                            {task.start_time.toLocaleString()}
                        </li>
                    ))}
                </ul></div>
        </AuthenticatedLayout>
    );
};


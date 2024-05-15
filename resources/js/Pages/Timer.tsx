import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { PageProps } from '@/types';
import ModelTypes from 'model-types';
import { v4 as uuidv4 } from 'uuid';
import { router } from '@inertiajs/react'


interface DashboardProps extends PageProps {
    tasks: ModelTypes.Task[],
    projects: ModelTypes.Project[],
    clients: ModelTypes.Client[]
}

interface FormDataInterface extends ModelTypes.Task {}

export default function HelloWorld({ auth, tasks }: DashboardProps) {
    // States
    const [isOngoing, setIsOngoing] = useState<boolean | null>(null);
    const [formData, setFormData] = useState<FormDataInterface>({
        text: '',
        start_time: undefined,
        user_id: auth.user.id,
        id: '',
    });

    // Refs
    const textInputRef = useRef<HTMLInputElement>(null);

    // Event handlers
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        // Get the input element using the ref
        const textInputElement = textInputRef.current;
        if (textInputElement) {
            textInputElement.blur();
        }

        // get the data from the form
        const data = new FormData(e.target as HTMLFormElement);
        data.get('text');

        if (!isOngoing) {
            setFormData({
                text: data.get('text') as string,
                start_time: new Date(),
                user_id: auth.user.id,
                id: uuidv4()
            });
        } else {
            // set the end time
            setFormData({
                ...formData,
                end_time: new Date(),
                updated_at: new Date(),
            });

            // submit the form to backend
            router.post(
                '/api/timer/create',
                // @ts-ignore
                formData,
                {
                    onSuccess: () => {
                        // reset the form
                        setFormData({
                            text: '',
                            start_time: undefined,
                            user_id: auth.user.id,
                            id: '',
                        });
                    },
                }
            );
        }

        // change state of the form
        setIsOngoing(!isOngoing);
    }

    // Debug
    console.log("isOngoing inside the component", isOngoing);
    console.log(formData);

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Timer</h2>}
        >
            <Head title="Timer" />
            <div className="py-3 px-1 bg-white dark:bg-gray-800">
                <form className="flex items-center" onSubmit={handleSubmit}>
                    <input
                        name='text'
                        type="text"
                        ref={textInputRef}
                        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-300 rounded-l-md dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 focus:outline-none"
                        style={ isOngoing ? {background: 'none', border: 'none', fontWeight: 'bolder'} : {} }
                        placeholder="Type your task here"
                        value={formData.text}
                        onChange={(e) => { setFormData({ ...formData, text: e.target.value }) }}
                    />

                    {/* The project picker draft */}
                    <div className="p-2 px-3 text-gray-400 border-r border-gray-300 dark:text-gray-500 dark:border-gray-600 cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                    </div>
                    {/* The project picker draft */}

                    <button className="px-4 py-2 text-gray-200 bg-blue-600 border border-blue-600 rounded-r-md hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {!isOngoing ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )
                        }
                    </button>
                </form>
            </div>
            <div className='py-3 px-1'>
                <h3>Tasks</h3>

                <ul>
                    {tasks.map(task => (
                        <li key={task.id || undefined}>
                            {task.text || '(no task text)'}<br />
                            {task.start_time?.toLocaleString()}
                        </li>
                    ))}
                </ul></div>
        </AuthenticatedLayout>
    );
};


import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState, useRef } from 'react';
import { PageProps } from '@/types';
import ModelTypes from 'model-types';
import { v4 as uuidv4 } from 'uuid';
import { router } from '@inertiajs/react'
import { PlayCircleIcon } from '@heroicons/react/24/outline'
import { StopCircleIcon } from '@heroicons/react/24/outline'
import { FolderIcon } from '@heroicons/react/24/solid'
import TimerCounter from '@/Components/Timer/TimerCounter';

interface DashboardProps extends PageProps {
    tasks: ModelTypes.Task[],
    projects: ModelTypes.Project[],
    clients: ModelTypes.Client[]
}

interface FormDataInterface extends ModelTypes.Task {}

export default function HelloWorld({ auth, tasks }: DashboardProps) {
    // States
    const [title, setTitle] = useState<string>('Timer');
    const [isOngoing, setIsOngoing] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormDataInterface>({
        text: '',
        start_time: undefined,
        user_id: auth.user.id,
        id: '',
    });
    const [timerActive, setTimerActive] = useState(false);

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
            // start the timer
            setTimerActive(true)

            const initFormData = {
                ...formData,
                text: data.get('text') as string,
                start_time: new Date(),
                user_id: auth.user.id,
                id: uuidv4()
            }
            setTitle(initFormData.text);

            router.post(
                '/api/timer/store',
                {
                    ...initFormData
                },
                {
                    onFinish: () => {
                        setFormData({
                            ...initFormData
                        });
                        console.log("task created", initFormData);
                    },
                }
            )
        } else {
            // stop the timer
            setTimerActive(false)

            setTitle('Timer');

            // submit the form to backend
            router.post(
                '/api/timer/store',
                {
                    ...formData,
                    end_time: new Date(),
                },
                {
                    onFinish: (response) => {
                        // reset the form
                        setFormData({
                            text: '',
                            start_time: undefined,
                            user_id: auth.user.id,
                            id: '',
                        });
                        console.log("task updated", response.data);
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
            <Head title={title} />
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
                        <FolderIcon className="h-6 w-6" />
                    </div>
                    {/* The project picker draft */}

                    <div
                        className="p-2 px-3 text-gray-400 border-r border-gray-300 dark:text-gray-500 dark:border-gray-600 text-left"
                        style={ {minWidth: '86px'} }
                    ><TimerCounter isActive={timerActive} headTitle={title} /></div>

                    <button className="px-4 py-2 text-gray-200 bg-blue-600 border border-blue-600 rounded-r-md hover:bg-blue-700 hover:border-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {!isOngoing ? (
                                <PlayCircleIcon className="h-6 w-6 text-white" />
                            ) : (
                                <StopCircleIcon className="h-6 w-6 text-white" />

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


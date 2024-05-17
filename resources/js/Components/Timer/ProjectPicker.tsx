import React from 'react'
import { FolderIcon } from '@heroicons/react/24/solid'

type Props = {}

export default function ProjectPicker({ }: Props) {
    return (
        <div className="p-2 px-3 text-gray-400 border-r border-gray-300 dark:text-gray-500 dark:border-gray-600 cursor-pointer">
            <FolderIcon className="h-6 w-6" />
        </div>
    )
}

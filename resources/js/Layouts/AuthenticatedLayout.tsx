import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import ProfileDropdown from '@/Components/ProfileDropdown';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="h-screen flex overflow-hidden bg-gray-100 dark:bg-gray-900">

            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 h-full">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 pb-4 bg-white dark:bg-gray-800 border-r dark:border-gray-600 border-gray-200 overflow-y-auto">
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 space-y-1">
                                <ProfileDropdown user={user} />
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                                <div className="border-t border-gray-200 dark:border-gray-600 my-3" />
                                Timer
                                <div className="border-t border-gray-200 dark:border-gray-600 my-3" />
                                Reports
                                <div className="border-t border-gray-200 dark:border-gray-600 my-3" />
                                Projects
                                Clients
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <main className="flex-1 relative z-0 overflow-y-auto pt-2 pb-6 focus:outline-none md:py-6" tabIndex={0}>
                    {header && (
                        <header className="bg-white dark:bg-gray-800 shadow">
                            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                        </header>
                    )}
                    {children}
                </main>
            </div>
        </div>
    );

}

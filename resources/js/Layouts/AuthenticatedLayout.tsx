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


            {/* Static sidebar for desktop */}
            <div className="hidden md:flex md:flex-shrink-0">
                <div className="flex flex-col w-64 h-full">
                    {/* Sidebar component, swap this element with another sidebar if you like */}
                    <div className="flex flex-col flex-grow pt-5 pb-4 bg-white dark:bg-gray-800 border-r dark:border-gray-600 border-gray-200 overflow-y-auto">
                        <div className="flex-shrink-0 px-4">
                            <Link href="/">
                                <ApplicationLogo className="h-8 w-auto fill-current text-gray-800 dark:text-gray-200" />
                            </Link>
                        </div>
                        <div className="mt-5 flex-1 flex flex-col">
                            <nav className="flex-1 px-2 space-y-1">
                                <ProfileDropdown user={user} />
                                <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                                    Dashboard
                                </NavLink>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                    <button
                        className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
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

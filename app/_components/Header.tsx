import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// Custom Components
import { Button } from '@/components/ui/button'

async function Header() {
    const { 
        getUser,
        isAuthenticated,
    } = getKindeServerSession();

    const user = await getUser();
    const isUserAuthenticated = await isAuthenticated();

  return (
    <header
        id='navbar-container'
        className="bg-gray-950 border-b border-gray-800/50 backdrop-blur-sm sticky top-0 z-50"
    >
        <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Link
                href='/'
                className="flex items-center gap-2 group"
            >
                <div className="relative overflow-hidden rounded-full p-1 bg-gradient-to-tr from-blue-600 to-purple-600 transition-all duration-300 group-hover:shadow-md group-hover:shadow-purple-500/20">
                    <Image
                        src='/assets/brainstormer_01.webp'
                        alt='App Icon'
                        width={36}
                        height={36}
                        className='rounded-full'
                    />
                </div>
                <span className="font-semibold text-white text-lg tracking-tight hidden sm:inline-block">
                    Brainstormer
                </span>
            </Link>

            <div className="flex items-center">
                <div className="flex items-center gap-3">
                    {isUserAuthenticated && user?.picture ? (
                        <div className="flex items-center gap-3">
                            <div className="relative h-8 w-8 overflow-hidden rounded-full border border-gray-700">
                                {user.picture && (
                                    <Image
                                        src={user.picture}
                                        alt={user.given_name || 'User'}
                                        fill
                                        className="object-cover"
                                    />
                                )}
                            </div>
                            <Button
                                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-purple-900/20"
                            >
                                <LogoutLink>
                                    Log out
                                </LogoutLink>
                            </Button>
                        </div>
                    ) : (
                        <>
                            <Button
                                variant="ghost"
                                className="text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-full"
                            >
                                <LoginLink>
                                    Login
                                </LoginLink>
                            </Button>
                            <Button
                                className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-sm shadow-purple-500/20"
                            >
                                <RegisterLink>
                                    Register
                                </RegisterLink>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
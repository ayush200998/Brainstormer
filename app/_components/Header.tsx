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
        className="bg-gray-950 border-b-2 border-slate-800"
    >
        <div className="mx-auto flex justify-between h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8">
            <Link
                href='/'
            >
                <Image
                    src='/assets/brainstormer_01.webp'
                    alt='App Icon'
                    width={40}
                    height={40}
                    className='rounded-full'
                />
            </Link>

            <div className="flex items-center justify-end md:justify-between">
                <div className="flex items-center gap-4">
                    <div className="sm:flex sm:gap-4">
                        {isUserAuthenticated && user?.picture ? (
                            <Button>
                                <LogoutLink>
                                    Log out
                                </LogoutLink>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    variant='transparent'
                                >
                                    <LoginLink>
                                        Login
                                    </LoginLink>
                                </Button>
                                <Button>
                                    <RegisterLink>
                                        Register
                                    </RegisterLink>
                                </Button>
                            </>
                        )}
                    </div>

                    <button
                    className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
                    >
                    <span className="sr-only">Toggle menu</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
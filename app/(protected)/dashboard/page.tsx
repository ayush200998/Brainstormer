'use client'
import React, { useEffect } from 'react'

import { api } from '@/convex/_generated/api';
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useMutation, useConvex } from 'convex/react';
import DashboardMainArea from './_components/DashboardMainArea';

function DashboardPage() {
    const {
        user,
    } : any = useKindeBrowserClient();

    const convex = useConvex();
    const createUser = useMutation(api.user.createUser);

    useEffect(() => {
        if (user) {
            checkAndCreateUser();
        }
    }, [user]);

    // If user is authenticated with Kinde and currentUser does not exists in convex DB then create the user
    const checkAndCreateUser = async() => {
        const users = await convex.query(api.user.getUser, { email: user.email });

        if (!users?.length) {
            createUser({
                name: user.given_name,
                email: user.email,
                image: user.picture,
            })
        }
    }

  return (
        <DashboardMainArea />
  )
}

export default DashboardPage
'use client'

import React, { useState, useTransition } from 'react'
import Image from 'next/image'
import { api } from '@/convex/_generated/api'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

// Custom Components
import { UsersIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useMutation } from 'convex/react'
import { toast } from 'sonner'
import { redirect } from 'next/navigation'
import Loader from '@/components/loader'

function CreateTeamPage() {
  const { user } = useKindeBrowserClient();
  
  const [pending, startTransition] = useTransition();
  
  const [teamName, setTeamName] = useState('');
  
  const createTeam = useMutation(api.teams.createTeam);

  // Create a new team and redirect to dashboard
  const createNewTeam = () => {
    startTransition(async () => {
        if (user?.email) {
        const response = await createTeam({
          name: teamName,
          createdBy: user.email,
        });
  
        if (response) {
          toast('Team created successfully');
          redirect('/dashboard');
        }
      } else {
        toast.error('User email not found');
      }
    })
  }
  
  return (
    <section
      id='create-teams-page'
      className="h-[100vh] flex flex-col items-center justify-center w-full gap-10 p-6"
    >
      <div className='flex items-center gap-6 p-4'>
        <Image
          src='/assets/brainstormer_01.webp'
          alt='App Icon'
          width={40}
          height={40}
          className='rounded-full'
        />
        <div
          className='bg-gray-700 rounded-lg p-2 flex items-center gap-2'
        >
          <UsersIcon />
          <p>
            Team Name
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-lg text-center">
        <h2 className="text-3xl font-bold text-white">
          What should we call your team ?
        </h2>

        <p className="sm:mt-4 sm:block text-gray-300">
          You can always change this later from the settings.
        </p>
      </div>

      <div
        className='max-w-lg w-full mx-auto flex flex-col gap-2'
      >
        <Label htmlFor="team_name">Team name</Label>
        <Input
          type="text"
          id="team_name"
          placeholder="Name"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
        />
      </div>

      <Button
        size='lg'
        className='max-w-sm w-full'
        disabled={!teamName || pending}
        onClick={() => createNewTeam()}
      >
        {pending ? <Loader /> : 'Create Team'}
      </Button>
    </section>
  )
}

export default CreateTeamPage
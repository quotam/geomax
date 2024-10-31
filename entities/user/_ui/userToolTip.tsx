import { Tooltip, TooltipContent, TooltipTrigger } from '@front/shared/ui/tooltip'
import Link from 'next/link'
import React from 'react'

import { Profile, getProfileDisplayName } from '../profile'
import { ProfileAvatar } from './profileAvatar'

const UserToolTip = ({ profile }: { profile?: Profile | null }) => {
	if (!profile) return null
	return (
		<Tooltip>
			<TooltipTrigger className="cursor-pointer p-0 font-bold">
				{profile ? getProfileDisplayName(profile) : 'неизвестен'}
			</TooltipTrigger>
			<TooltipContent className="flex flex-col justify-center items-center gap-3 p-3">
				<ProfileAvatar profile={profile} />
				<ul>
					<li>
						email{' '}
						<Link className="font-bold underline hover:no-underline" href={`mailto:${profile?.email}`}>
							{profile?.email!}
						</Link>
					</li>
					<li>
						role: <strong>{profile?.role}</strong>
					</li>
				</ul>
			</TooltipContent>
		</Tooltip>
	)
}

export default UserToolTip

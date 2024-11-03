import { cn } from '@front/shared/lib/utils'
import { Avatar, AvatarFallback } from '@front/shared/ui/avatar'
import Image from 'next/image'

import { Profile } from '../_domain/types'
import { getProfileLetters } from '../profile'

export const ProfileAvatar = ({
	profile,
	width = 200,
	height = 200,
	className
}: {
	profile: Profile
	width?: number
	height?: number
	className?: string
}) => {
	const lat = getProfileLetters(profile)
	return (
		<Avatar className={cn(className, 'flex font-bold text-primary justify-center items-center')}>
			{profile.image ? (
				<Image
					width={width}
					height={height}
					src={profile.image!}
					className="w-full flex h-full object-cover"
					alt={lat}
				/>
			) : (
				<AvatarFallback>{lat}</AvatarFallback>
			)}
		</Avatar>
	)
}

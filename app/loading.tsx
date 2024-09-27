import LogoIcon from '@front/shared/ui/logoIcon'
import React from 'react'

const Loading = () => {
	return (
		<div className="w-screen h-[calc(100vh-20rem)] flex items-center justify-center">
			<LogoIcon className="animate-pulse w-1/4 h-1/4 text-primary" />
		</div>
	)
}

export default Loading

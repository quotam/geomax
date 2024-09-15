import { ThemeSwither } from '@front/kernel/lib/next-theme/themeSwither'
import React from 'react'

const Footer = () => {
	return (
		<footer className="mt-auto p-1">
			<div className="container">
				<ThemeSwither />
			</div>
		</footer>
	)
}

export default Footer

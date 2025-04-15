'use client'

import { ArrowUp } from 'lucide-react'
import React, { useEffect, useState } from 'react'

import { cn } from '../lib/utils'
import { Button } from './button'

const ScrollToTopButton = () => {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		const toggleVisibility = () => {
			if (window.scrollY > 300) {
				setIsVisible(true)
			} else {
				setIsVisible(false)
			}
		}

		window.addEventListener('scroll', toggleVisibility)

		return () => window.removeEventListener('scroll', toggleVisibility)
	}, [])

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		})
	}

	return (
		<div>
			{isVisible && (
				<Button onClick={scrollToTop} className={cn(`fixed bottom-10 right-10 p-3 animate-fadeIn`)}>
					Наверх <ArrowUp className="w-4 h-4 ml-2" />
				</Button>
			)}
		</div>
	)
}

export default ScrollToTopButton

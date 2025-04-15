'use client'

import React from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'

import { cn } from '../lib/utils'

interface NativeScrollProps extends React.HTMLAttributes<HTMLDivElement> {
	wrapperClassName?: string
}

const NativeScroll = React.forwardRef<HTMLDivElement, NativeScrollProps>(
	({ className, wrapperClassName, ...props }, ref) => {
		const scrollContainerRef = React.useRef<HTMLDivElement>(null)
		React.useImperativeHandle(ref, () => scrollContainerRef.current!)

		const [showLeftArrow, setShowLeftArrow] = React.useState(false)
		const [showRightArrow, setShowRightArrow] = React.useState(false)

		React.useEffect(() => {
			const container = scrollContainerRef.current
			if (!container) return

			const handleResize = () => {
				setShowLeftArrow(container.scrollLeft > 0)
				setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth)
			}

			const observer = new ResizeObserver(handleResize)
			observer.observe(container)

			return () => {
				observer.disconnect()
			}
		}, [])

		const scroll = (direction: 'left' | 'right') => {
			const container = scrollContainerRef.current
			if (!container) return

			const scrollAmount = container.clientWidth * 0.8 // 80% ширины контейнера
			const delta = direction === 'left' ? -scrollAmount : scrollAmount

			container.scrollBy({ left: delta, behavior: 'smooth' })
		}

		const handleScroll = React.useCallback(() => {
			const container = scrollContainerRef.current
			if (!container) return

			setShowLeftArrow(container.scrollLeft > 0)
			setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth)
		}, [])

		const handleWheel = React.useCallback((event: React.WheelEvent<HTMLDivElement>) => {
			const container = scrollContainerRef.current
			if (!container) return

			container.scrollBy({ left: event.deltaY * 1.245, behavior: 'smooth' })
		}, [])

		return (
			<div className={cn('relative', wrapperClassName)}>
				{showLeftArrow && (
					<button
						onClick={e => {
							e.preventDefault()
							scroll('left')
						}}
						className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full flex items-center justify-start bg-gradient-to-r from-background to-transparent"
					>
						<ChevronLeft strokeWidth={3} className="w-5 h-5 sm:w-4 sm:h-4  text-accent-foreground" />
					</button>
				)}
				<div
					{...props}
					ref={scrollContainerRef}
					onScroll={handleScroll}
					onWheel={handleWheel}
					className={cn(
						'overflow-x-auto scrollbar-hide flex gap-4 overscroll-contain snap-mandatory snap-x snap-start scroll-p-4',
						className
					)}
				/>
				{showRightArrow && (
					<button
						onClick={e => {
							e.preventDefault()
							scroll('right')
						}}
						className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-full flex items-center justify-end bg-gradient-to-l from-background to-transparent"
					>
						<ChevronRight strokeWidth={3} className="w-5 h-5 sm:w-4 sm:h-4 text-accent-foreground" />
					</button>
				)}
			</div>
		)
	}
)

NativeScroll.displayName = 'NativeScroll'

export default NativeScroll

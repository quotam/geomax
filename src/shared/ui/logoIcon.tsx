import React from 'react'

const LogoIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			width="22"
			height="29"
			viewBox="0 0 22 29"
			className={className}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12.192 5.77871L5.72447 9.5859L0 29L6.71181 25.2002L9.05457 16.9029L8.62455 16.7928C7.28976 16.4513 6.36623 15.2684 6.36623 13.7632C6.36623 12.0597 7.43425 10.2945 8.94793 10.68L10.6852 11.1242L12.192 5.77871ZM22 0L15.2366 3.98342L13.0521 11.7263L13.7023 11.8915C15.0371 12.2329 15.9533 13.9013 15.9533 15.4066L16.0466 14.5261C16.0466 16.2296 14.8926 18.3935 13.3789 18.008L11.4214 17.5087L9.73229 23.493L16.6402 19.583L22 0Z"
				fill="currentColor"
			/>
		</svg>
	)
}

export default LogoIcon

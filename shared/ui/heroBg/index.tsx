'use client'

import React, { useEffect } from 'react'
import './style.css'
import { useInView } from 'react-intersection-observer'

//NOTE : AI GENERATED module
//

const Hero = ({ className }: { className?: string }) => {
	const { ref, inView } = useInView({
		threshold: 0
	})

	useEffect(() => {
		document.getElementById('hero')?.classList.toggle('active', inView)
	}, [inView])

	return (
		<svg
			id="hero"
			ref={ref}
			className={className}
			viewBox="0 0 2293 1301"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<line
				x1="-6.89076e-08"
				y1="1172"
				x2="2293"
				y2="1172"
				stroke="url(#paint0_linear_134_533)"
				strokeWidth="2"
				className="hero-1"
			></line>
			<line
				x1="-6.89076e-08"
				y1="1042"
				x2="2293"
				y2="1042"
				stroke="url(#paint1_linear_134_533)"
				strokeWidth="2"
				className="hero-2"
			></line>
			<line
				x1="-6.89076e-08"
				y1="912"
				x2="2293"
				y2="912"
				stroke="url(#paint2_linear_134_533)"
				strokeWidth="2"
				className="hero-3"
			></line>
			<line
				x1="-6.89076e-08"
				y1="782"
				x2="2293"
				y2="782"
				stroke="url(#paint3_linear_134_533)"
				strokeWidth="2"
				className="hero-4"
			></line>
			<line
				x1="-6.89076e-08"
				y1="652"
				x2="2293"
				y2="652"
				stroke="url(#paint4_linear_134_533)"
				strokeWidth="2"
				className="hero-5"
			></line>
			<line
				x1="-6.89076e-08"
				y1="522"
				x2="2293"
				y2="522"
				stroke="url(#paint5_linear_134_533)"
				strokeWidth="2"
				className="hero-6"
			></line>
			<line
				x1="-6.89076e-08"
				y1="392"
				x2="2293"
				y2="391.999"
				stroke="url(#paint6_linear_134_533)"
				strokeWidth="2"
				className="hero-7"
			></line>
			<line
				x1="-6.89076e-08"
				y1="262"
				x2="2293"
				y2="261.999"
				stroke="url(#paint7_linear_134_533)"
				strokeWidth="2"
				className="hero-8"
			></line>
			<line
				x1="1926"
				y1="1301"
				x2="1926"
				y2="-0.000121958"
				stroke="url(#paint8_linear_134_533)"
				strokeWidth="2"
				className="hero-9"
			></line>
			<line
				x1="1796"
				y1="1301"
				x2="1796"
				y2="-0.000121958"
				stroke="url(#paint9_linear_134_533)"
				strokeWidth="2"
				className="hero-10"
			></line>
			<line
				x1="1666"
				y1="1301"
				x2="1666"
				y2="-0.000121958"
				stroke="url(#paint10_linear_134_533)"
				strokeWidth="2"
				className="hero-11"
			></line>
			<line
				x1="1536"
				y1="1301"
				x2="1536"
				y2="-0.000121958"
				stroke="url(#paint11_linear_134_533)"
				strokeWidth="2"
				className="hero-12"
			></line>
			<line
				x1="1406"
				y1="1301"
				x2="1406"
				y2="-0.000121958"
				stroke="url(#paint12_linear_134_533)"
				strokeWidth="2"
				className="hero-13"
			></line>
			<line
				x1="1276"
				y1="1301"
				x2="1276"
				y2="-0.000121958"
				stroke="url(#paint13_linear_134_533)"
				strokeWidth="2"
				className="hero-14"
			></line>
			<line
				x1="1146"
				y1="1301"
				x2="1146"
				y2="-0.000121958"
				stroke="url(#paint14_linear_134_533)"
				strokeWidth="2"
				className="hero-15"
			></line>
			<line
				x1="1016"
				y1="1301"
				x2="1016"
				y2="-0.000121958"
				stroke="url(#paint15_linear_134_533)"
				strokeWidth="2"
				className="hero-16"
			></line>
			<line
				x1="886"
				y1="1301"
				x2="885.999"
				y2="-0.000121958"
				stroke="url(#paint16_linear_134_533)"
				strokeWidth="2"
				className="hero-17"
			></line>
			<line
				x1="755.999"
				y1="1301"
				x2="755.999"
				y2="-0.000121958"
				stroke="url(#paint17_linear_134_533)"
				strokeWidth="2"
				className="hero-18"
			></line>
			<line
				x1="625.999"
				y1="1301"
				x2="625.999"
				y2="-0.000121958"
				stroke="url(#paint18_linear_134_533)"
				strokeWidth="2"
				className="hero-19"
			></line>
			<line
				x1="495.999"
				y1="1301"
				x2="495.999"
				y2="0.000122183"
				stroke="url(#paint19_linear_134_533)"
				strokeWidth="2"
				className="hero-20"
			></line>
			<line
				x1="365.999"
				y1="1301"
				x2="365.999"
				y2="0.000122183"
				stroke="url(#paint20_linear_134_533)"
				strokeWidth="2"
				className="hero-21"
			></line>
			<defs>
				<linearGradient
					id="paint0_linear_134_533"
					x1="3.44538e-08"
					y1="1173.5"
					x2="2293"
					y2="1173.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint1_linear_134_533"
					x1="3.44538e-08"
					y1="1043.5"
					x2="2293"
					y2="1043.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint2_linear_134_533"
					x1="3.44538e-08"
					y1="913.5"
					x2="2293"
					y2="913.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint3_linear_134_533"
					x1="3.44538e-08"
					y1="783.5"
					x2="2293"
					y2="783.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint4_linear_134_533"
					x1="3.44538e-08"
					y1="653.5"
					x2="2293"
					y2="653.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint5_linear_134_533"
					x1="3.44538e-08"
					y1="523.5"
					x2="2293"
					y2="523.5"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint6_linear_134_533"
					x1="3.44538e-08"
					y1="393.5"
					x2="2293"
					y2="393.499"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint7_linear_134_533"
					x1="3.44538e-08"
					y1="263.5"
					x2="2293"
					y2="263.499"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="transparent"></stop>
					<stop offset="0.365" stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint8_linear_134_533"
					x1="1927.5"
					y1="1301"
					x2="1927.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="transparent"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint9_linear_134_533"
					x1="1797.5"
					y1="1301"
					x2="1797.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint10_linear_134_533"
					x1="1667.5"
					y1="1301"
					x2="1667.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint11_linear_134_533"
					x1="1537.5"
					y1="1301"
					x2="1537.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint12_linear_134_533"
					x1="1407.5"
					y1="1301"
					x2="1407.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint13_linear_134_533"
					x1="1277.5"
					y1="1301"
					x2="1277.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint14_linear_134_533"
					x1="1147.5"
					y1="1301"
					x2="1147.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint15_linear_134_533"
					x1="1017.5"
					y1="1301"
					x2="1017.5"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint16_linear_134_533"
					x1="887.5"
					y1="1301"
					x2="887.499"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint17_linear_134_533"
					x1="757.499"
					y1="1301"
					x2="757.499"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint18_linear_134_533"
					x1="627.499"
					y1="1301"
					x2="627.499"
					y2="-0.000122127"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint19_linear_134_533"
					x1="497.499"
					y1="1301"
					x2="497.499"
					y2="0.000122014"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="currentColor"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
				<linearGradient
					id="paint20_linear_134_533"
					x1="367.499"
					y1="1301"
					x2="367.499"
					y2="0.000122014"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="currentColor"></stop>
					<stop offset="0.66" stopColor="transparent"></stop>
					<stop offset="1" stopColor="transparent"></stop>
				</linearGradient>
			</defs>
		</svg>
	)
}

export default Hero

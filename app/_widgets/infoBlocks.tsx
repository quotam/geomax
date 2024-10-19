import InfoBlock from '@front/shared/ui/infoBlock'
import { MapPin, TagIcon } from 'lucide-react'
import React from 'react'

const InfoBlocks = () => {
	return (
		<section className="mt-32 sm:mt-16" id="about">
			<div className="container md:px-8 flex justify-between  items-center md:flex-wrap md:gap-y-9">
				<div className="flex flex-col gap-7 mr-16 md:mr-0">
					<h3 className="text-[6.4rem] sm:text-heading leading-[7.2rem]">
						Добро пожаловать в <span className="text-primary">GPSAGRO!</span>
					</h3>
					<p>
						Мы — динамично развивающаяся компания нового типа, команда с инновационным
						мышлением и свежим взглядом на управление растениеводством. Наша цель —
						разрушить устоявшиеся стереотипы о сельском хозяйстве и создать новую
						формацию в этой сфере.
					</p>
					<p>
						В GPSAGRO мы активно внедряем современные цифровые технологии, следуя
						последним тенденциям и постоянно повышая уровень профессионализма. Мы
						понимаем, что наши преимущества основаны на знании, опыте и безупречной
						деловой репутации.{' '}
					</p>{' '}
					<p>
						Специализируясь на продаже и установке высокоточных цифровых систем для
						сельского хозяйства, мы стремимся сделать ваш бизнес более эффективным и
						устойчивым. Присоединяйтесь к нам на пути к инновационному будущему в
						агросекторе!{' '}
					</p>
				</div>
				<div>
					<InfoBlock
						className="md:w-80 sm:w-full"
						icon={<MapPin className="h-12 w-12 text-primary" />}
						data={{
							title: 'Работаем и выезжаем',
							desc:
								'На установку GPS-систем более чем в 17 регионов России и Казахстана.',
							link: 'Смотреть на карту охвата',
							href: '#coverage'
						}}
					/>
					<InfoBlock
						icon={<TagIcon className="h-12 w-12 text-primary" />}
						className="mt-12 md:w-80  sm:w-full"
						data={{
							title: 'Мы уверенно гарантируем',
							desc:
								'Что цена на оборудование будет соответствовать рыночным условиям, обеспечивая справедливую и конкурентоспособную стоимость.',
							link: 'Ознакомится с каталогом',
							href: '/catalog'
						}}
					/>
				</div>
				<div className="mt-16 ml-12 md:m-0">
					<InfoBlock
						className="md:w-80 sm:w-full"
						icon={<TagIcon className="h-12 w-12 text-primary" />}
						data={{
							title: 'Подбираем и устанавливаем',
							desc:
								'Подбираем и устанавливаем только проверенное оборудование, исходя из потребностей Вашего парка техники.',
							link: 'Заявка на консультацию',
							href: '/?modal#about'
						}}
					/>
					<InfoBlock
						icon={<TagIcon className="h-12 w-12 text-primary" />}
						className="mt-12 md:w-80 sm:w-full"
						variant="primary"
						data={{
							title: 'Осуществляем \n поддержку',
							desc: 'на весь период работы оборудования. Даем гарантию на все работы.',
							link: 'Задать вопрос',
							href: '/contacts'
						}}
					/>
				</div>
			</div>
		</section>
	)
}

export default InfoBlocks

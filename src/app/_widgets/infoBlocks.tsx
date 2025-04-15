import InfoBlock from '@front/shared/ui/infoBlock'
import { Headset, MapPin, MousePointer2, TagIcon } from 'lucide-react'

const InfoBlocks = () => {
	return (
		<section className="mt-20 sm:mt-16" id="about">
			<div className="container md:px-2 flex justify-between  items-center md:flex-wrap md:gap-y-9">
				<div className="flex flex-col gap-7 mr-16 md:mr-0">
					<h3 className="text-[6.4rem] sm:text-heading">
						Добро пожаловать в <span className="text-primary">GPSAGRO!</span>
					</h3>
					<p>
						Мы динамично развивающаяся компания нового типа, сосредоточенная на внедрении современных
						цифровых технологий в растениеводство. В команде работают профессионалы с богатым опытом
						автоматизации процессов в сельском хозяйстве. Мы разрушаем устаревшие стереотипы в механизации
						растениеводства.
					</p>
					<p>
						Наша основная цель — сделать цифровые технологии доступными и легко применяемыми в каждом
						фермерском хозяйстве. Благодаря нашим усилиям, сельскохозяйственные машины становятся умнее и
						производительнее, что существенно облегчает жизнь аграриев и улучшает условия их труда.
					</p>
					<p>
						Предоставляем полный набор инструментов для управления хозяйством и автоматизации полевых
						работ. Это включает в себя сбор и анализ данных, что позволяет принимать быстрые и
						экономически обоснованные решения.
					</p>
				</div>
				<div>
					<InfoBlock
						className="sm:w-full"
						icon={<MapPin className="size-12 text-primary" />}
						data={{
							title: 'Работаем и выезжаем',
							desc: 'На установку GPS-систем более чем в 17 регионов России и Казахстана.',
							link: 'Смотреть на карту охвата',
							href: '#coverage'
						}}
					/>
					<InfoBlock
						icon={<TagIcon className="h-12 w-12 text-primary" />}
						className="mt-12  sm:w-full"
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
						className="sm:w-full"
						icon={<MousePointer2 className="size-12 text-primary" />}
						data={{
							title: 'Подбираем и устанавливаем',
							desc:
								'Подбираем и устанавливаем только проверенное оборудование, исходя из потребностей Вашего парка техники.',
							link: 'Заявка на консультацию',
							href: '/?modal#about'
						}}
					/>
					<InfoBlock
						icon={<Headset className="h-12 w-12 text-primary" />}
						className="mt-12  sm:w-full"
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

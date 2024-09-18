import SvgMap from '@front/shared/ui/map'
import React from 'react'

const Coverage = () => {
	return (
		<section id="coverage">
			<div className="container pt-35 flex items-center justify-between">
				<SvgMap className="px-10 py-30 border-b-8 border-r-8 border-t-[.2rem] border-l-[.2rem] rounded-lg rounded-ss-[6.2rem] border-secondary box-content" />
				<div className="px-8 w-2/5 flex flex-col gap-9">
					<h4 className="text-heading font-bold">
						Широкая сеть регионального обслуживания
					</h4>
					<p className="text-muted-foreground">
						Наша организация выполняет выездную установку и настройку поставляемого
						оборудования <span className="text-primary">более чем в 17 регионах</span>{' '}
						Российской Федерации,{' '}
						<span className="text-primary">а также в Казахстане.</span>
					</p>
					<ul className="list-disc ml-4">
						<li>Омская область (домашний регион)</li>
						<li>Алтайский край</li>
						<li>Кемеровская область</li>
						<li>Красноярский край</li>
						<li>Курганская область</li>
						<li>Новосибирская область</li>
						<li>Оренбургская область</li>
						<li>Пермский край</li>
						<li>Республика Алтай</li>
						<li>Республика Башкортостан</li>
						<li>Самарская область</li>
						<li>Свердловская область</li>
						<li>Томская область</li>
						<li>Тюменская область</li>
						<li>Ханты-Мансийский автономный округ - Югра</li>
						<li>Челябинская область</li>
					</ul>
				</div>
			</div>
		</section>
	)
}

export default Coverage

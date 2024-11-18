const MetrikaFallback = ({ id }: { id: string }) => {
	return (
		<noscript>
			<div>
				<img
					src={`https://mc.yandex.ru/watch/${id}`}
					style={{ position: 'absolute', left: '-9999px' }}
					alt="mt"
				/>
			</div>
		</noscript>
	)
}

export default MetrikaFallback

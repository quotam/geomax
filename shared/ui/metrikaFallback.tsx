const MetrikaFallback = ({ id }: { id: string }) => {
	return (
		<div>
			<img
				src={`https://mc.yandex.ru/watch/${id}`}
				style={{ position: 'absolute', left: '-9999px' }}
				alt=""
			/>
		</div>
	)
}

export default MetrikaFallback

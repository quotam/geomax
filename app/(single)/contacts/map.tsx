'use client'

import { publicConfig } from '@front/shared/config/publicConfig'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'
import React from 'react'

const MapWidget = () => {
	return (
		<YMaps>
			<div className="h-full w-full">
				<Map className="w-full h-full" defaultState={{ center: [55.031324, 73.369775], zoom: 10 }}>
					<Placemark geometry={publicConfig.contacts.address.mapCordinate} />
				</Map>
			</div>
		</YMaps>
	)
}

export default MapWidget

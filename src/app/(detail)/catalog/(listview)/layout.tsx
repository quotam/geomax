import React from 'react'

import Sidebar from '@front/features/sidebar/pub/sidebar'

const CatalogListViewLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<main className="container flex justify-between gap-12 md:flex-col py-20 px-4">
			<Sidebar />
			{children}
		</main>
	)
}

export default CatalogListViewLayout

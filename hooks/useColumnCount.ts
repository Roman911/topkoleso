import { useEffect, useState } from 'react';

export const useColumnCount = (columns: number) => {
	const [ columnCount, setColumnCount ] = useState(3); // default: desktop

	useEffect(() => {
		const update = () => {
			const width = window.innerWidth;
			if(width < 768) {
				setColumnCount(1); // mobile
			} else {
				setColumnCount(columns); // desktop/tablet
			}
		};

		update(); // init
		window.addEventListener('resize', update);
		return () => window.removeEventListener('resize', update);
	}, []);

	return columnCount;
};

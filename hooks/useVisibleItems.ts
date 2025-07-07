import { useEffect, useRef, useState } from 'react';

export const useVisibleItems = <T extends Element>(
	id: number,
	onVisible: () => void,
	options: IntersectionObserverInit = { threshold: 0.3 }
) => {
	const ref = useRef<T>(null);
	const [ seen, setSeen ] = useState(false);

	useEffect(() => {
		const el = ref.current;
		if(!el || seen) return;

		const observer = new IntersectionObserver(([ entry ]) => {
			if(entry.isIntersecting && !seen) {
				setSeen(true);
				onVisible();
			}
		}, options);

		observer.observe(el);
		return () => observer.disconnect();
	}, [ seen, onVisible ]);

	return ref;
};

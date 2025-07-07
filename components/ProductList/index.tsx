'use client';
import { FC, useRef, useState } from 'react';
import { useColumnCount } from '@/hooks/useColumnCount';
import ObservedProductCard from './ObservedProductCard';
import type { Data, Product } from '@/models/products';
import { onItemViewList } from '@/event';

interface Props {
	classnames?: string;
	data: Data;
	columns: number;
}

const ProductList: FC<Props> = ({ classnames = '', data, columns }) => {
	const columnCount = useColumnCount(columns);
	const viewedItemsRef = useRef<Set<number>>(new Set());
	const bufferRef = useRef<Product[]>([]);
	const [, setViewedCount] = useState(0);

	const handleItemAppear = (item: Product) => {
		setViewedCount(prev => {
			if (viewedItemsRef.current.has(item.product_id)) {
				return prev;
			}

			viewedItemsRef.current.add(item.product_id);
			const newCount = prev + 1;

			if (columnCount === 1) {
				onItemViewList([item]);
			} else {
				bufferRef.current.push(item);

				if (bufferRef.current.length === columns) {
					onItemViewList(bufferRef.current);
					bufferRef.current = [];
				}

				if (newCount === data.products.length && bufferRef.current.length > 0) {
					onItemViewList(bufferRef.current);
					bufferRef.current = [];
				}
			}

			return newCount;
		});
	};


	return (
		<div className={ `grid gap-3 ${ classnames }` }>
			{ data.products.map(item => (
				<ObservedProductCard
					key={ item.product_id }
					item={ item }
					onAppear={ () => handleItemAppear(item) }
				/>
			)) }
		</div>
	);
};

export default ProductList;
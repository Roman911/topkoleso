import { FC } from 'react';
import ProductCard from './Card';
import { useVisibleItems } from '@/hooks/useVisibleItems';
import type { Product } from '@/models/products';

interface Props {
	item: Product;
	onAppear: () => void;
}

const ObservedProductCard: FC<Props> = ({ item, onAppear }) => {
	const ref = useVisibleItems<HTMLDivElement>(item.product_id, onAppear);

	return (
		<div ref={ ref }>
			<ProductCard item={ item }/>
		</div>
	);
};

export default ObservedProductCard;

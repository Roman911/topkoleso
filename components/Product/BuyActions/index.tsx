'use client';

import { FC } from 'react';
import { Button } from '@heroui/button';
import { useDisclosure } from '@heroui/modal';
import { useAppSelector } from '@/hooks/redux';
import QuickOrder from '@/components/Product/QuickOrder';
import { Language } from '@/models/language';
import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import { useTranslations } from 'next-intl';
import { onAddToCart } from '@/event';
import CartModal from './CartModal';

interface Props {
	locale: Language
	offerId: number
	quantity: number
	section: Section
	data: ProductProps
	onSubmit: () => void
}

const BuyActions: FC<Props> = ({ locale, offerId, quantity, section, data, onSubmit }) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const t = useTranslations('Main');
	const { cartItems } = useAppSelector(state => state.cartReducer);

	const handleClickBuy = () => {
		onAddToCart(data?.data, t(section), quantity);
		onSubmit();
		onOpen();
	}

	return (
		<div className='buttons-buy flex flex-col md:flex-row gap-4 mt-4'>
			{ cartItems.find(item => +item.id === offerId) ?
				<Button color='success' size='lg' radius='full' onPress={ onOpen } className='uppercase font-bold'>
					{ t('in cart') }
				</Button> :
				<Button onPress={ handleClickBuy } color='primary' radius='full' size='lg' className='uppercase w-full font-bold'>
					{ t('buy') }
				</Button>
			}
			<QuickOrder
				offerId={ offerId }
				quantity={ quantity }
				section={ section }
				data={ data.data }
				offerItem={ data?.data?.offers?.find(item => item.offer_id === +offerId) }
			/>
			{ isOpen && <CartModal locale={ locale } isOpen={ isOpen } onOpenChange={ onOpenChange } cartItems={ cartItems } /> }
		</div>
	)
};

export default BuyActions;

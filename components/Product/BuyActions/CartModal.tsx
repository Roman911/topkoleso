'use client';

import { FC, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@heroui/button';
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/modal';
import { useAppDispatch } from '@/hooks/redux';
import { Language } from '@/models/language';
import { useTranslations } from 'next-intl';
import { useAppGetProducts } from '@/hooks/getProducts';
import { addToStorage, getFromStorage, removeFromStorage } from '@/lib/localeStorage';
import { removeCart, setQuantity } from '@/store/slices/cartSlice';
import CartComponent from '@/components/Cart';
import NoResult from '@/components/UI/NoResult';
import Spinner from '@/components/UI/Spinner';

interface Props {
	locale: Language
	isOpen: boolean
	onOpenChange: () => void
	cartItems: { id: number, section: string, quantity: number }[]
}

const CartModal: FC<Props> = ({ locale, isOpen, onOpenChange, cartItems }) => {
	const router = useRouter();
	const t = useTranslations('Main');
	const dispatch = useAppDispatch();
	const { tires, cargo, disks, battery, isLoading } = useAppGetProducts(cartItems, 'reducerCart', true);

	const dataTotal = useMemo(() => ({
		result: true,
		data: {
			total_count: cartItems.length,
			products: [...tires, ...cargo, ...disks, ...battery],
		},
	}), [tires, cargo, disks, battery, cartItems.length]);

	const removeProduct = (id: number) => {
		removeFromStorage('reducerCart', id);
		dispatch(removeCart(id));
	};

	const onSetQuantity = (id: number, quantity: number) => {
		const storage = getFromStorage('reducerCart');
		const item = storage.find((i: { id: number, section: string, quantity: number }) => i.id === id);
		addToStorage('reducerCart', [ ...storage.filter((i: { id: number }) => i.id !== id), { ...item, quantity } ]);
		dispatch(setQuantity({ ...item, quantity }));
	}

	const handleClick = () => {
		router.push(`/${ locale }/order`)
	}

	return (
		<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } size='4xl' placement='top'>
			<ModalContent>
				{ (onClose) => (
					<>
						<ModalHeader>{ t('cart') }</ModalHeader>
						<ModalBody>
							<Spinner height='h-40' show={ isLoading }>
								{ cartItems.length > 0 && dataTotal?.result ? <CartComponent
										data={ dataTotal }
										cartItems={ cartItems }
										removeProduct={ removeProduct }
										setQuantity={ onSetQuantity }
									/> :
									<NoResult noResultText='no product to cart'/> }
							</Spinner>
						</ModalBody>
						<ModalFooter>
							<Button variant='bordered' size='lg' className='uppercase font-bold hidden lg:block' radius='full'
											onPress={ onClose }>
								{ t('continue shopping') }
							</Button>
							<Button color='primary' size='lg' className='uppercase font-bold' radius='full' onPress={ handleClick }>
								{ t('place an order') }
							</Button>
						</ModalFooter>
					</>
				) }
			</ModalContent>
		</Modal>
	)
};

export default CartModal;

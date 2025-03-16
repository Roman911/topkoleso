import { FC } from 'react';
import { Link } from '@/i18n/routing';
import { Button } from '@heroui/button';
// import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/modal';
import { useAppSelector } from '@/hooks/redux';
import QuickOrder from '@/components/Product/QuickOrder';
import { Language } from '@/models/language';
import { Section } from '@/models/filter';
import { ProductProps } from '@/models/product';
import { useTranslations } from 'next-intl';

interface Props {
	locale: Language
	offerId: number
	quantity: number
	section: Section
	data: ProductProps
	onSubmit: () => void
}

const BuyActions: FC<Props> = ({ locale, offerId, quantity, section, data, onSubmit }) => {
	// const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const t = useTranslations('Main');
	const { cartItems } = useAppSelector(state => state.cartReducer);

	return (
		<div className='buttons-buy flex flex-col gap-2'>
			{ cartItems.find(item => +item.id === offerId) ?
				// <Button color='success' size='lg' radius='full' onPress={ onOpen } className='uppercase font-bold'>
				// 	{ t('in cart') }
				// </Button> :
				<Link href={ `/cart` } className='btn bg-success uppercase text-black rounded-full font-bold w-full md:w-72'>
					<span className='ml-2.5'>{ locale === Language.UK ? 'Перейти до кошика' : 'Перейти в корзину' }</span>
				</Link> :
				<Button onPress={ onSubmit } color='primary' radius='full' size='lg' className='uppercase w-full font-bold md:w-72'>
					{ t('buy') }
				</Button>
			}
			<QuickOrder
				locale={ locale }
				offerId={ offerId }
				quantity={ quantity }
				section={ section }
				offerItem={ data?.data?.offers?.find(item => item.offer_id === +offerId) }
			/>
			{/*<Modal isOpen={ isOpen } onOpenChange={ onOpenChange } size='3xl'>*/}
			{/*	<ModalContent>*/}
			{/*		{ (onClose) => (*/}
			{/*			<>*/}
			{/*				<ModalHeader>{ t('cart') }</ModalHeader>*/}
			{/*				<ModalBody>*/}
			{/*					*/}
			{/*				</ModalBody>*/}
			{/*				<ModalFooter>*/}
			{/*					<Link href={ `/order` }>*/}
			{/*						<Button color='primary' size='lg' className='uppercase font-bold' radius='full'>*/}
			{/*							Оформление заказа*/}
			{/*						</Button>*/}
			{/*					</Link>*/}
			{/*				</ModalFooter>*/}
			{/*			</>*/}
			{/*		)}*/}
			{/*	</ModalContent>*/}
			{/*</Modal>*/}
		</div>
	)
};

export default BuyActions;

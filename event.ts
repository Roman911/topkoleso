import { Product } from '@/models/product';
import { Product as Products, ProductsProps } from '@/models/products';

export const onItemView = (data: Product | undefined, section: string) => {
	if(!data) return;

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${data.id}`,
		item_name: data.full_name,
		price: +data.min_price,
		item_brand: data.brand.name,
		item_category: section,
		item_category2: data.model.name,
		quantity: 1,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "view_item",
		currency: 'UAN',
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onItemViewList = (data: Products[]) => {
	if(!data) return;

	const items = data.map((item) => {

		return {
			item_id: `SKU_${item.sku}`,
			item_name: item.full_name,
			price: +item.min_price,
			item_brand: item.brand_name,
			item_category: item.types === 3 ? 'Диски' : item.types === 4 ? 'Акумулятори' : 'Шини',
			item_variant: item.model.name,
			quantity: 1,
		}
	});

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "view_item_list",
		currency: 'UAN',
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onAddToCart = (data: Product | Products | undefined, section: string, quantity: number) => {
	if (!data) return;

	let id;
	let brand;

	if ("id" in data) {
		id = data.id;
		brand = data.brand.name;
	} else {
		id = data.group;
		brand = data.brand_name;
	}

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${id}`,
		item_name: data.full_name,
		price: +data.min_price,
		item_brand: brand,
		item_category: section === 'tires' ? 'Шини' : section === 'disks' ? 'Диски' : section === 'battery' ? 'Акумулятори' : '',
		item_category2: data.model.name,
		quantity,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "add_to_cart",
		currency: 'UAN',
		ecommerce: {
			items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onRemoveFromCart = (data: { id: number, full_name: string, price: string, brand: string, model: string }, section: string, quantity: number) => {
	if (!data) return;

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${data.id}`,
		item_name: data.full_name,
		price: +data.price,
		item_brand: data.brand,
		item_category: section === 'tires' ? 'Шини' : section === 'disks' ? 'Диски' : section === 'battery' ? 'Акумулятори' : '',
		item_category2: data.model,
		quantity,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "remove_from_cart",
		currency: 'UAN',
		ecommerce: {
			items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const beginCheckout = (data: { id: number, full_name: string, price: string, brand: string, model: string, section: string, quantity: number }[]) => {
	if (!data) return;

	const items = data.map((item) => {
		return {
			currency: 'UAN',
			item_id: `SKU_${item.id}`,
			item_name: item.full_name,
			price: +item.price,
			item_brand: item.brand,
			item_category: item.section === 'tires' ? 'Шини' : item.section === 'disks' ? 'Диски' : item.section === 'battery' ? 'Акумулятори' : '',
			item_category2: item.model,
			quantity: item.quantity,
		}
	});

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "begin_checkout",
		currency: 'UAN',
		ecommerce: {
			items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onSelectItem = (data: Product | Products | undefined, section: string, quantity: number) => {
	if (!data) return;

	let id;
	let brand;

	if ("id" in data) {
		id = data.id;
		brand = data.brand.name;
	} else {
		id = data.group;
		brand = data.brand_name;
	}

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${id}`,
		item_name: data.full_name,
		price: data.min_price,
		item_brand: brand,
		item_category: section === 'tires' ? 'Шини' : section === 'disks' ? 'Диски' : section === 'battery' ? 'Акумулятори' : '',
		item_category2: data.model.name,
		quantity,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "select_item",
		currency: 'UAN',
		ecommerce: {
			items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onOrderMakeEnd = (data: ProductsProps | undefined, cartItem: {id: number, quantity: number, section: string}[], orderId: number) => {
	if(!data) return;

	const items = data?.data.products.map((item) => {
		const cart = cartItem.find((product) => product.id === item.best_offer.id);

		return {
			item_id: `SKU_${item.group}`,
			item_name: item.full_name,
			price: +item.min_price,
			item_brand: item.brand_name,
			item_category: cart?.section === 'tires' ? 'Шини' : cart?.section === 'disks' ? 'Диски' : cart?.section === 'battery' ? 'Акумулятори' : '',
			item_variant: item.model.name,
			quantity: cart?.quantity || 0,
		}
	});

	const totalSum = items.reduce((sum, item) => {
		return sum + (item.price * item.quantity);
	}, 0);

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "purchase",
		ecommerce: {
			transaction_id: orderId,
			affiliation: 'main',
			value: totalSum,
			currency: 'UAN',
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onCallBack = (id: number, name: string, phone: string, quantity: number) => {
	if(!name) return;

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${id}`,
		quantity,
		name,
		phone,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "zvorotniy_dzvinok",
		currency: 'UAN',
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

export const onQuickOrder = (id: number, name: string, phone: string, quantity: number, price: number) => {
	if(!name) return;

	const items = [{
		currency: 'UAN',
		item_id: `SKU_${id}`,
		quantity,
		name,
		phone,
		price,
	}];

	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push({ ecommerce: null });

	const outData = {
		event: "shvidke_zamovlennya",
		currency: 'UAN',
		ecommerce: {
			items: items
		},
	};

	console.log('outData', outData);
	(window.dataLayer as unknown as { push: (data: Record<string, unknown>) => void })?.push(outData);
};

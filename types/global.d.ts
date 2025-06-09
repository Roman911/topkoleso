export {};

declare global {
	interface DataLayerItem {
		event: string;
		ecommerce?: {
			transaction_id?: number | string;
			affiliation?: string;
			value?: number;
			currency?: string;
			items?: Array<{
				item_name: string;
				item_id: string | number;
				price: number;
				item_brand?: string;
				item_category?: string;
				item_category2?: string;
				item_variant?: string;
				quantity: number;
			}>;
		};
		[key: string]: unknown; // дозволити інші поля, але без `any`
	}

	interface Window {
		dataLayer: DataLayerItem[];
	}
}
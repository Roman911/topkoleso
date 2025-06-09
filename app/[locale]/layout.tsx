import Script from 'next/script';
import localFont from 'next/font/local'
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import StoreProvider from '@/app/StoreProvider';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import '../colors.css';
import '../globals.css';
import { Language } from '@/models/language';
import { ToastProvider } from "@heroui/toast";

const gilroy = localFont({
	src: [
		{
			path: '../../public/fonts/Gilroy-Regular.woff',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-SemiBold.woff',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../../public/fonts/Gilroy-Bold.woff',
			weight: '700',
			style: 'normal',
		},
	],
})

async function getSettings() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/settings`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

async function getAlias() {
	const res = await fetch(`${process.env.SERVER_URL}/baseData/StatiAlias`, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Credentials': 'true',
		}
	});
	return await res.json();
}

export default async function RootLayout(
	{
		children,
		params,
	}: Readonly<{
		children: React.ReactNode;
		params: Promise<{ locale: Language }>;
	}>) {
	const { locale } = await params;
	const messages = await getMessages();
	const response = await getSettings();
	const alias = await getAlias();

	return (
		<html lang={ locale }>
		<head>
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			{ response[0].head_html && <Script
				id="binotel-widget"
				strategy="afterInteractive"
				dangerouslySetInnerHTML={{
					__html: response[0].head_html,
				}}
			/> }
			{/* Google Tag Manager */}
			<Script id="gtm-head" strategy="beforeInteractive">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-P5L5HCLB');
        `}
			</Script>
			{/* End Google Tag Manager */}
		</head>
		<body className={ gilroy.className }>
		<StoreProvider>
			<NextIntlClientProvider messages={ messages }>
				<Header settings={ response } alias={ alias } />
				<main>
					{ children }
				</main>
				<Footer settings={ response } alias={ alias } />
			</NextIntlClientProvider>
			<ToastProvider placement='top-right' />
		</StoreProvider>
		</body>
		{/* Google Tag Manager (noscript) */}
		<noscript>
			<iframe
				src="https://www.googletagmanager.com/ns.html?id=GTM-P5L5HCLB"
				height="0"
				width="0"
				style={{ display: 'none', visibility: 'hidden' }}
			></iframe>
		</noscript>
		{/* End Google Tag Manager (noscript) */}
		</html>
	);
};

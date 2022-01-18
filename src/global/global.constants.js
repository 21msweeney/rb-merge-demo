import getConfig from 'next/config';

export const isOnServer = typeof window === 'undefined';
const { publicRuntimeConfig = {} } = getConfig();

const globals = {
	adobeLaunchUrl: publicRuntimeConfig.adobeLaunch?.url || '',
	adobeLaunchGlobalUrl: publicRuntimeConfig.adobeLaunch?.globalUrl || '',
	adobeMediaTrackingEnabled: publicRuntimeConfig.adobeMediaTrackingEnabled,
	affirmPublicApiKey: publicRuntimeConfig.affirmPublicApiKey || '',
	affirmScriptUrl: publicRuntimeConfig.affirmScriptUrl || '',
	apiUrl: publicRuntimeConfig.ssrApiUrl || '',
	curalateApiUrl: publicRuntimeConfig.curalateApiUrl || '',
	curalateProductDataSourceId: publicRuntimeConfig.curalateProductDataSourceId || '',
	curalateProductFanreelId: publicRuntimeConfig.curalateProductFanreelId || '',
	curalateStoresDataSourceId: publicRuntimeConfig.curalateStoresDataSourceId || '',
	curalateStoresFanreelId: publicRuntimeConfig.curalateStoresFanreelId || '',
	DateMaster: {},
	dynaSitePath: publicRuntimeConfig.dynaSitePath || '',
	doubleClickAdvertiserId: publicRuntimeConfig.doubleClickAdvertiserId,
	doubleClickEnabled: publicRuntimeConfig.doubleClickEnabled,
	etTemplateEmailPrefCenter: publicRuntimeConfig.etTemplateEmailPrefCenter || '',
	facebookPixelId: publicRuntimeConfig.facebookPixelId,
	googleApiKey: publicRuntimeConfig.googleAPIKey || '',
	googleTrackingKey: publicRuntimeConfig.googleTrackingKey,
	gtmContainerId: publicRuntimeConfig.gtmContainerId || '',
	igdEnabled: publicRuntimeConfig.igdEnabled,
	igdTrackingEnabled: publicRuntimeConfig.igdTrackingEnabled,
	imagePath: publicRuntimeConfig.imagePath || '',
	isEngage: publicRuntimeConfig.isEngage,
	isEngageTraining: publicRuntimeConfig.isEngageTraining,
	isGtmEnabled: publicRuntimeConfig.isGtmEnabled,
	isKiosk: publicRuntimeConfig.isKiosk,
	isMobile: publicRuntimeConfig.isMobile || false,
	isOnProductPage: publicRuntimeConfig.isOnProductPage,
	isOnServer,
	isOnShop: publicRuntimeConfig.isOnShop,
	liveChatEnabled: publicRuntimeConfig.liveChatEnabled,
	monetateEnabled: publicRuntimeConfig.monetateEnabled,
	monetateTagType: publicRuntimeConfig.monetateTagType || 'p',
	newRelic: publicRuntimeConfig.newRelic,
	pdfPath: publicRuntimeConfig.pdfPath || '',
	pinterestPixelId: publicRuntimeConfig.pinterestPixelId,
	recaptchaEnabled: publicRuntimeConfig.recaptchaEnabled && process.browser && !window.Cypress,
	recaptchaSiteKey: publicRuntimeConfig.recaptchaSiteKey || '',
	recommendationsApiUrl: publicRuntimeConfig.recommendationsApiUrl,
	recommendationsEnabled: publicRuntimeConfig.recommendationsEnabled,
	legacyReflektionPath: publicRuntimeConfig.legacyReflektionPath || '',
	reflektionPath: publicRuntimeConfig.reflektionPath || '',
	releaseDateMessage: publicRuntimeConfig.releaseDateMessage || '',
	reviewsApiKey: publicRuntimeConfig.reviewsApiKey || '',
	reviewsMerchantGroupId: publicRuntimeConfig.reviewsMerchantGroupId || '',
	reviewsMerchantId: publicRuntimeConfig.reviewsMerchantId || '',
	rootRelativeDynaSitePath: publicRuntimeConfig.rootRelativeDynaSitePath || '',
	rootRelativeMobileSitePath: publicRuntimeConfig.rootRelativeMobileSitePath || '/m',
	s7ContentPath: publicRuntimeConfig.s7ContentPath || '',
	s7ImagePath: publicRuntimeConfig.s7ImagePath || '',
	searchApiUrl: publicRuntimeConfig.searchApiUrl || '',
	searchRecUrl: publicRuntimeConfig.searchRecUrl || '',
	showRevision: Boolean(publicRuntimeConfig.showRevision),
	sitePath: publicRuntimeConfig.sitePath || '',
	siteCatalystAccount: publicRuntimeConfig.siteCatalystAccount,
	styliticsEnvironment: publicRuntimeConfig.styliticsEnvironment,
	giftCardsBuyUrl: publicRuntimeConfig.giftCardsBuyUrl,
	giftCardsBalanceUrl: publicRuntimeConfig.giftCardsBalanceUrl,
};

// Figure out how to move this to global dynamic
if (!isOnServer) {
	const firstDir = window.location.pathname.split('/')[1].toString();

	globals.isMobile = firstDir === 'm';
	globals.dpr = window.devicePixelRatio || 1;
	globals.apiUrl = publicRuntimeConfig.clientApiUrl || '';
}

export const {
	affirmPublicApiKey,
	affirmScriptUrl,
	adobeLaunchGlobalUrl,
	adobeLaunchUrl,
	adobeMediaTrackingEnabled,
	apiUrl,
	curalateApiUrl,
	curalateProductDataSourceId,
	curalateProductFanreelId,
	curalateStoresDataSourceId,
	curalateStoresFanreelId,
	DateMaster,
	dynaSitePath,
	doubleClickAdvertiserId,
	doubleClickEnabled,
	etTemplateEmailPrefCenter,
	facebookPixelId,
	googleApiKey,
	giftCardsBalanceUrl,
	giftCardsBuyUrl,
	googleTrackingKey,
	gtmContainerId,
	igdEnabled,
	igdTrackingEnabled,
	imagePath,
	isEngage,
	isEngageTraining,
	isGtmEnabled,
	isKiosk,
	isMobile,
	isOnProductPage,
	isOnShop,
	legacyReflektionPath,
	liveChatEnabled,
	monetateEnabled,
	monetateTagType,
	newRelic,
	pdfPath,
	pinterestPixelId,
	recaptchaEnabled,
	recaptchaSiteKey,
	recommendationsApiUrl,
	recommendationsEnabled,
	reflektionPath,
	releaseDateMessage,
	reviewsApiKey,
	reviewsMerchantGroupId,
	reviewsMerchantId,
	rootRelativeDynaSitePath,
	rootRelativeMobileSitePath,
	searchApiUrl,
	searchRecUrl,
	showRevision,
	s7ContentPath,
	s7ImagePath,
	sitePath,
	siteCatalystAccount,
	styliticsEnvironment,
} = globals;
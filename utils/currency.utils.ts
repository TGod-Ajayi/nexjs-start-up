/** Utility function for displaying currency in US format */
export const displayCurrencyUtil = new Intl.NumberFormat('en-US', {
	style: 'currency',
	currency: 'USD',
});

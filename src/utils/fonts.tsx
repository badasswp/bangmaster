import { Platform } from 'react-native';
import { APP_FONT } from '../utils/constants';

/**
 * Helvetica Neue fonts.
 *
 * @module helveticaFonts
 */
export const helveticaFonts = {
	'HelveticaNeue-Thin': require('../../assets/fonts/HelveticaNeue-Thin.ttf'),
	'HelveticaNeue-Light': require('../../assets/fonts/HelveticaNeue-Light.ttf'),
	'HelveticaNeue-Regular': require('../../assets/fonts/HelveticaNeue-Regular.ttf'),
	'HelveticaNeue-Bold': require('../../assets/fonts/HelveticaNeue-Bold.ttf'),
};

/**
 * Android fonts.
 *
 * Helvetica Neue fonts
 * based on weight for Android use.
 *
 * @module androidFonts
 */
export const androidFonts: any = {
	'200': 'HelveticaNeue-Thin',
	'300': 'HelveticaNeue-Light',
	'400': 'HelveticaNeue-Regular',
	'700': 'HelveticaNeue-Bold',
};

/**
 * Get App font.
 *
 * @param {string} weight Font weight.
 * @returns {string}
 */
export const getAppFont = (weight: string = '400'): string => {
	if (Platform.OS === 'ios') {
		return APP_FONT;
	}
	// Fallback for Android.
	return androidFonts[weight];
};

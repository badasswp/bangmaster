import { configureStore } from '@reduxjs/toolkit';

import trackReducer from './slices/trackSlice';

/**
 * Store.
 *
 * This module defines the Redux store used for storing
 * the global state of the application. It utilises the Redux
 * toolkit & thunk middleware alongside.
 *
 * @module store
 * @returns {Object}  Global store.
 */
export const store = configureStore({
	reducer: {
		track: trackReducer,
	},
});

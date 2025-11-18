import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
	name: 'track',
	initialState: {
		selection: 0,
	},
	reducers: {
		updateSelection(state, action) {
			state.selection = action.payload;
		},
	},
});

export const { updateSelection } = trackSlice.actions;
export default trackSlice.reducer;

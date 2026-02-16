import { createSlice } from '@reduxjs/toolkit';
import { tracks } from '../../utils/data';

const trackSlice = createSlice({
	name: 'track',
	initialState: {
		selection: tracks[0].trackId,
	},
	reducers: {
		updateSelection(state, action) {
			state.selection = action.payload;
		},
	},
});

export const { updateSelection } = trackSlice.actions;
export default trackSlice.reducer;

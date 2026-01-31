import reducer, { updateSelection } from '../../../src/store/slices/trackSlice';

describe('trackSlice', () => {
	it('should return the initial state when passed an empty action', () => {
		const initialState = {
			selection: 0,
		};

		const result = reducer(undefined, { type: '' });

		expect(result).toEqual(initialState);
	});

	it('should handle updateSelection', () => {
		const previousState = {
			selection: 0,
		};

		const action = updateSelection(5);
		const result = reducer(previousState, action);

		expect(result.selection).toBe(5);
	});

	it('should overwrite an existing selection value', () => {
		const previousState = {
			selection: 2,
		};

		const result = reducer(previousState, updateSelection(10));

		expect(result.selection).toBe(10);
	});

	it('should create the correct action object', () => {
		const action = updateSelection(3);

		expect(action).toEqual({
			type: 'track/updateSelection',
			payload: 3,
		});
	});
});

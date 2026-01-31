import { renderHook, act } from '@testing-library/react-native';
import { useDispatch, useSelector } from 'react-redux';

import useSelection from '../../../src/store/hooks/useSelection';
import { updateSelection } from '../../../src/store/slices/trackSlice';

jest.mock('react-redux', () => ({
	useDispatch: jest.fn(),
	useSelector: jest.fn(),
}));

jest.mock('../../../src/store/slices/trackSlice', () => ({
	updateSelection: jest.fn(),
}));

describe('useSelection', () => {
	const mockDispatch = jest.fn();

	beforeEach(() => {
		(useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('returns the current selection from the store', () => {
		(useSelector as unknown as jest.Mock).mockImplementation(selectorFn =>
			selectorFn({
				track: {
					selection: 3,
				},
			})
		);

		const { result } = renderHook(() => useSelection());

		expect(result.current.selection).toBe(3);
	});

	it('dispatches updateSelection when setSelection is called', () => {
		(useSelector as unknown as jest.Mock).mockImplementation(selectorFn =>
			selectorFn({
				track: {
					selection: 1,
				},
			})
		);

		const { result } = renderHook(() => useSelection());

		act(() => {
			result.current.setSelection(5);
		});

		expect(updateSelection).toHaveBeenCalledWith(5);
		expect(mockDispatch).toHaveBeenCalledWith(updateSelection(5));
	});
});

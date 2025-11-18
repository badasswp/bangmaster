import { useDispatch, useSelector } from 'react-redux';
import { updateSelection } from '../slices/trackSlice';

const useSelection = () => {
	const dispatch = useDispatch();

	return {
		selection: useSelector((state: any) => state.track.selection),
		setSelection: (value: number) => {
			dispatch(updateSelection(value));
		},
	};
};

export default useSelection;

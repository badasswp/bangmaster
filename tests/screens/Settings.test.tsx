import { render, act, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '../../src/store';
import Settings from '../../src/screens/Settings';

const mockDispatch = jest.fn();

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		navigate: jest.fn(),
	}),
	NavigationContainer: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: (selector: any) => selector({ track: { selection: 0 } }),
	useDispatch: () => mockDispatch,
}));

const renderWithRedux = (ui: React.ReactElement) => {
	return render(<Provider store={store}>{ui}</Provider>);
};

describe('Settings Screen', () => {
	afterEach(() => jest.clearAllMocks());

	it('matches snapshot', () => {
		const container = renderWithRedux(<Settings />);
		expect(container).toMatchSnapshot();
	});
});

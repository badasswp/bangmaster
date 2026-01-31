import { render, act, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '../../src/store';
import { tracks } from '../../src/utils/data';
import Presets from '../../src/screens/Presets';

const mockGoBack = jest.fn();
const mockSetSelection = jest.fn();

jest.mock('../../src/store/hooks/useSelection', () => ({
	__esModule: true,
	default: jest.fn(() => ({
		setSelection: mockSetSelection,
	})),
}));

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		goBack: mockGoBack,
	}),
	NavigationContainer: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

const renderWithRedux = (ui: React.ReactElement) => {
	return render(<Provider store={store}>{ui}</Provider>);
};

describe('Presets Screen', () => {
	afterEach(() => jest.clearAllMocks());

	it('matches snapshot', () => {
		const container = renderWithRedux(<Presets />);
		expect(container).toMatchSnapshot();
	});

	it('displays the Track names & speed correctly', () => {
		const { getByText } = renderWithRedux(<Presets />);

		tracks.forEach(({ name, bpm }) => {
			expect(getByText(name)).toBeVisible();
			expect(getByText(`Tempo: ${bpm} bpm`)).toBeVisible();
		});
	});

	it('calls the onPress handler when a Track is pressed', async () => {
		const { getByTestId } = renderWithRedux(<Presets />);

		const track3 = getByTestId('track-2');

		await act(async () => {
			fireEvent.press(track3);
		});

		expect(mockSetSelection).toHaveBeenCalledTimes(1);
		expect(mockSetSelection).toHaveBeenCalledWith(2);
		expect(mockGoBack).toHaveBeenCalled();
	});

	it('displays the default styles in Presets Screen', () => {
		const { getByTestId } = renderWithRedux(<Presets />);

		const presetsContainer = getByTestId('presetsView');
		const presetsHeader = getByTestId('presetsHeader');
		const presetsBody = getByTestId('presetsBody');
		const presetsTitle = getByTestId('presetsTitle');
		const presetsCaption = getByTestId('presetsCaption');

		expect(presetsContainer).toHaveStyle({
			flex: 1,
			backgroundColor: '#3c3b52',
		});

		expect(presetsHeader).toHaveStyle({
			flex: 0.5,
			backgroundColor: '#2d2b43',
			paddingTop: 75,
			paddingLeft: 20,
		});

		expect(presetsBody).toHaveStyle({
			flex: 3,
		});

		expect(presetsCaption).toHaveStyle({
			fontSize: 36,
			fontWeight: 700,
			fontFamily: 'Helvetica Neue',
			color: '#fff',
		});

		expect(presetsTitle).toHaveStyle({
			color: '#fff',
			textAlign: 'center',
			fontSize: 18,
		});
	});
});

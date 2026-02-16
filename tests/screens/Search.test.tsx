import { act, fireEvent, render, within } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import { store } from '../../src/store';
import { APP_THEME_COLOR } from '../../src/utils/constants';

import Search from '../../src/screens/Search';

const mockBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		navigate: jest.fn(),
		goBack: mockBack,
	}),
	NavigationContainer: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

const renderWithRedux = (ui: React.ReactElement) => {
	return render(<Provider store={store}>{ui}</Provider>);
};
describe('Unit tests for Search Screen', () => {
	it('matches snapshot', () => {
		const container = renderWithRedux(<Search />);

		expect(container).toMatchSnapshot();
	});

	it('displays the list of tracks', () => {
		const { getByTestId } = renderWithRedux(<Search />);

		const { getByText } = within(getByTestId('tracksBody'));

		expect(getByText('Worship Beat')).toBeVisible();
		expect(getByText('3/4 Time')).toBeVisible();
		expect(getByText('Praise Groove')).toBeVisible();
		expect(getByText('Rock Praise')).toBeVisible();
	});

	it('matches the styles', () => {
		const { getByTestId } = renderWithRedux(<Search />);

		const searchView = getByTestId('searchView');

		expect(searchView).toHaveStyle({
			flex: 1,
			backgroundColor: APP_THEME_COLOR,
		});
	});

	it('tests the search input value', async () => {
		const { getByTestId } = renderWithRedux(<Search />);

		const searchInput = getByTestId('TrackInput');

		await act(async () => {
			fireEvent.changeText(searchInput, 'worship');
		});

		expect(searchInput.props.value).toBe('worship');
	});

	it('tests the filtered displayed track', async () => {
		const { getByTestId, queryByText } = renderWithRedux(<Search />);

		const searchInput = getByTestId('TrackInput');

		await act(async () => {
			fireEvent.changeText(searchInput, 'worship');
		});

		expect(queryByText('Worship Beat')).toBeVisible();

		await act(async () => {
			fireEvent.changeText(searchInput, '3');
		});

		expect(queryByText('3/4 Time')).toBeVisible();
	});

	it('mocks the navigation', async () => {
		const { getByTestId, queryByText, getByText } = renderWithRedux(<Search />);

		const searchInput = getByTestId('TrackInput');

		await act(async () => {
			fireEvent.changeText(searchInput, 'worship');
		});

		expect(queryByText('Worship Beat')).toBeVisible();

		const worshipTrackBtn = getByText('Worship Beat');

		await act(async () => {
			fireEvent.press(worshipTrackBtn);
		});

		expect(mockBack).toHaveBeenCalledTimes(1);
	});
});

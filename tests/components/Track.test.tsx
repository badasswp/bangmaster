import { act, fireEvent, render } from '@testing-library/react-native';
import { Provider } from 'react-redux';

import Track from '../../src/components/Track';
import { store } from '../../src/store';

const mockGoBack = jest.fn();

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			goBack: mockGoBack,
		}),
	};
});

describe('Track snapshot', () => {
	it('matches the snapshot', () => {
		const container = render(
			<Provider store={store}>
				<Track />
			</Provider>
		);

		expect(container).toMatchSnapshot();
	});

	it('renders the Track label', () => {
		const { getByText } = render(
			<Provider store={store}>
				<Track name="What a Wonderful World" />
			</Provider>
		);

		const TrackLabel = getByText('What a Wonderful World');

		expect(TrackLabel).toBeVisible();
	});

	it('uses the default styles', () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Track />
			</Provider>
		);

		const TrackBtn = getByTestId('track');

		expect(TrackBtn).toHaveStyle({
			borderBottomWidth: 1,
			borderBottomColor: '#302f47',
			borderTopWidth: 1,
			borderTopColor: '#504f65',
			padding: 20,
			gap: 3,
		});
	});

	it('calls the onPress handler of the TrackBtn', async () => {
		const { getByTestId } = render(
			<Provider store={store}>
				<Track />
			</Provider>
		);

		const TrackBtn = getByTestId('track');

		await act(async () => {
			fireEvent.press(TrackBtn);
		});

		expect(mockGoBack).toHaveBeenCalledTimes(1);
	});
});

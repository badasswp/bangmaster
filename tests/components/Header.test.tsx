import { act, fireEvent, render } from '@testing-library/react-native';

import Header from '../../src/components/Header';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
}));

describe('Header component', () => {
	it('renders Header snapshot', () => {
		const container = render(<Header />);

		expect(container).toMatchSnapshot();
	});

	it('displays the label and icon', () => {
		const { getByTestId } = render(<Header />);

		const searchIconBtn = getByTestId('searchButton');

		expect(searchIconBtn).toBeVisible();
	});

	it('displays the correct styles', () => {
		const { getByTestId } = render(<Header />);

		const headerContainer = getByTestId('headerContainer');

		expect(headerContainer).toHaveStyle({
			width: '100%',
			display: 'flex',
			alignItems: 'flex-end',
			position: 'absolute',
			paddingHorizontal: 25,
			top: 75,
			left: 0,
		});
	});

	it('mocks the navigation when the onPress handler of the icon is called', async () => {
		const { getByTestId } = render(<Header />);

		const searchIconBtn = getByTestId('searchButton');

		await act(async () => {
			fireEvent.press(searchIconBtn);
		});

		expect(mockNavigate).toHaveBeenCalled();
	});
});

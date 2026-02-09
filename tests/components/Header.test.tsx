import { act, fireEvent, render } from '@testing-library/react-native';

import Header from '../../src/components/Header';

const mockBack = jest.fn();

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		goBack: mockBack,
	}),
}));

describe('Header component', () => {
	it('renders Header snapshot', () => {
		const container = render(<Header />);
		expect(container).toMatchSnapshot();
	});

	it('displays the label and icon', () => {
		const { getByText, getByTestId } = render(<Header />);
		
		const bangMasterCaption = getByText('Bangmaster');
		const searchIconBtn = getByTestId('searchButton');
		
		expect(bangMasterCaption).toBeVisible();
		expect(searchIconBtn).toBeVisible();
	});

	it('displays the correct styles', () => {
		const { getByTestId } = render(<Header />);
		const headerContainer = getByTestId('headerContainer');
		expect(headerContainer).toHaveStyle({
			width: '100%',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			backgroundColor: '#2d2b43',
			padding: 20,
			position: 'absolute',
			top: 0,
			left: 0,
			zIndex: 10,
		});
	});

	it('mocks the navigation when the onPress handler of the icon is called', async () => {
		const { getByTestId } = render(<Header />);
		const searchIconBtn = getByTestId('searchButton');

		await act(async () => {
			fireEvent.press(searchIconBtn);
		});

		expect(mockBack).toHaveBeenCalled();
	});
});

import * as React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import Tabs from '../../src/components/Tabs';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => {
	const actualNav = jest.requireActual('@react-navigation/native');
	return {
		...actualNav,
		useNavigation: () => ({
			navigate: mockNavigate,
		}),
	};
});

describe('Tabs', () => {
	it('matches the snapshot', () => {
		const container = render(<Tabs />);

		expect(container).toMatchSnapshot();
	});

	it('renders the Preset and Settings tabs', () => {
		const { getByText } = render(<Tabs />);

		const Presets = getByText('Presets');
		const Settings = getByText('Settings');

		expect(Presets).toBeVisible();
		expect(Settings).toBeVisible();
	});

	it('uses the default styles', () => {
		const { getByTestId } = render(<Tabs />);

		const TabView = getByTestId('Tabs');

		expect(TabView).toHaveStyle({
			backgroundColor: '#2d2b43',
			position: 'absolute',
			left: 0,
			bottom: 0,
			right: 0,
			height: 100,
			alignItems: 'center',
			flexDirection: 'row',
		});
	});

	it('calls the onPress handlers of Preset and Settings tabs', async () => {
		const { getByTestId } = render(<Tabs />);

		const Presets = getByTestId('Presets');
		const Settings = getByTestId('Settings');

		await act(async () => {
			fireEvent.press(Presets);
		});

		expect(mockNavigate).toHaveBeenCalledTimes(1);
		expect(mockNavigate).toHaveBeenCalledWith('Presets');

		await act(async () => {
			fireEvent.press(Settings);
		});

		expect(mockNavigate).toHaveBeenCalledTimes(2);
		expect(mockNavigate).toHaveBeenCalledWith('Settings');
	});
});

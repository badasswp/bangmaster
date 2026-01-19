import * as React from 'react';
import {
	act,
	fireEvent,
	render,
	RenderOptions,
} from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';

import Button from '../../src/components/Button';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return <NavigationContainer>{children}</NavigationContainer>;
};

export const customRender = (
	ui: React.ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => {
	return render(ui, { ...options, wrapper: Providers });
};

describe('Button', () => {
	it('matches the snapshot', () => {
		const container = customRender(
			<Button id="btnSnapshot" text="Click Here" />
		);

		expect(container).toMatchSnapshot();
	});

	it('renders the children text', () => {
		const { getByText } = customRender(
			<Button id="btnText" text="Click Here" />
		);

		expect(getByText('Click Here')).toBeVisible();
	});

	it('uses the default styles', () => {
		const { getByTestId, getByText } = customRender(
			<Button id="btnDefault" text="Click Here" />
		);

		const buttonView = getByTestId('btnDefault');
		const buttonText = getByText('Click Here');

		expect(buttonView).toHaveStyle({
			borderRadius: '100%',
			width: 100,
			height: 100,
			alignItems: 'center',
		});
		expect(buttonText).toHaveStyle({
			textAlign: 'center',
			color: '#fff',
		});
	});

	it('overrides the default styles with custom border styles of the button', () => {
		const customStyles: object = { borderRadius: 10, borderWidth: 5 };
		const { getByTestId, getByText } = customRender(
			<Button id="btnSecondary" text="Click Here" style={customStyles} />
		);

		const buttonView = getByTestId('btnSecondary');
		const buttonText = getByText('Click Here');

		expect(buttonView).toHaveStyle({
			borderRadius: 10,
			borderWidth: 5,
			width: 100,
			alignItems: 'center',
		});
		expect(buttonText).toHaveStyle({
			textAlign: 'center',
			color: '#fff',
		});
	});

	it('calls the onPress handler', async () => {
		const handleClick = jest.fn();

		const { getByTestId } = customRender(
			<Button id="btnClick" text="Click Here" onClick={handleClick} />
		);

		await act(async () => {
			fireEvent.press(getByTestId('btnClick'));
		});

		expect(handleClick).toHaveBeenCalledTimes(1);
	});
});

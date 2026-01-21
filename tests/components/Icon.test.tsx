import { render } from '@testing-library/react-native';
import Icon from '../../src/components/Icon';

describe('Icon', () => {
	it('matches the snapshot', () => {
		const container = render(<Icon />);

		expect(container).toMatchSnapshot();
	});

	it('renders the icon name', () => {
		const { getByTestId } = render(<Icon name="play" />);

		expect(getByTestId('icon')).toBeVisible();
	});

	it('uses the default styles', () => {
		const { getByTestId } = render(<Icon name="play" />);

		const iconView = getByTestId('icon');

		expect(iconView).toHaveStyle({
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: -5,
		});
	});

	it('overrides the default styles with custom styles', () => {
		const customStyles: object = { borderRadius: 10, borderWidth: 5 };
		const { getByTestId } = render(
			<Icon name="play" containerStyles={customStyles} />
		);

		const IconView = getByTestId('icon');

		expect(IconView).toHaveStyle({
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: -5,
			borderRadius: 10,
			borderWidth: 5,
		});
	});
});

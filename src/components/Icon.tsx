import React, { JSX } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Svg, Path } from 'react-native-svg';

import { Play, Presets, Settings, Stop } from '../icons/All';

export interface IconProps {
	name?: string;
	color?: string;
	width?: number;
	height?: number;
	styles?: Object;
	containerStyles?: Object;
	weight?: number;
}

/**
 * Icon component.
 *
 * This component is used to display an Icon
 * on the current screen.
 *
 * It contains an SVG component that is used
 * to display the icon's PNG.
 *
 * @param {IconProps} props                 Icon props.
 * @param {string}    props.name            Name of the Icon.
 * @param {string}    props.color           Color of the Icon.
 * @param {width}     props.width           Width of the Icon.
 * @param {height}    props.height          Height of the Icon.
 * @param {Object}    props.styles          Styles specifically for the Icon.
 * @param {Object}    props.containerStyles Styles specifically for the Icon Container.
 *
 * @returns {JSX.Element | null} The Icon component.
 */
const Icon = ({
	name = '',
	color = '#000',
	width = 24,
	height = 24,
	styles = {},
	containerStyles = {},
	weight = 2,
}: IconProps): JSX.Element | null => {
	// Get Default styles.
	const containerDefaultStyles = {
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: -5,
	};

	const containerWrapperStyles = {
		...containerDefaultStyles,
		...containerStyles,
	};

	const {
		width: passedWidth,
		height: passedHeight,
		color: passedColor,
	} = styles as any;

	/**
	 * IconWrapper component.
	 *
	 * We use this component to return an icon
	 * template that we can reuse. Since this is specific
	 * to the Icon component, we are creating this here.
	 *
	 * @param string name Name of Icon.

	 * @returns {JSX.Element | null} The Icon Wrapper.
	 */
	const IconWrapper = ({ name = '' }: { name: string }): JSX.Element => {
		return (
			<View
				testID="icon"
				style={containerWrapperStyles as StyleProp<ViewStyle>}
			>
				<Svg
					viewBox="0 0 24 24"
					width={passedWidth || width}
					height={passedHeight || height}
					color={passedColor || color}
					fill="none"
				>
					<Path d={name} stroke={passedColor || color} strokeWidth={weight} />
				</Svg>
			</View>
		);
	};

	switch (name) {
		case 'play':
			return <IconWrapper name={Play} />;

		case 'presets':
			return <IconWrapper name={Presets} />;

		case 'settings':
			return <IconWrapper name={Settings} />;

		case 'stop':
			return <IconWrapper name={Stop} />;

		default:
			return null;
	}
};

export default Icon;

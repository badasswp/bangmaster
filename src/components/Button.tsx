import React, { JSX } from 'react';
import { Pressable, Text, Platform, StyleSheet } from 'react-native';

import Icon from './Icon';
import { getAppFont } from '../utils/fonts';
import { APP_FONT_SIZE } from '../utils/constants';

export interface ButtonProps {
	id?: string;
	text?: string;
	textStyles?: Object;
	onClick?: () => void;
	style?: Object;
	icon?: string;
	iconStyles?: Object;
}

/**
 * Button component.
 *
 * This component is used to display a Button
 * on the current screen.
 *
 * It contains a Pressable component that
 * handles the onPress event.
 *
 * @param {ButtonProps} props            Button props.
 * @param {string}      props.id         The test ID for the button.
 * @param {string}      props.text       The text to display on the button.
 * @param {Object}      props.textStyles The styles of the text.
 * @param {() => void}  props.onClick    The function to call when the button is pressed.
 * @param {Object}      props.style      The styles of the button.
 * @param {string}      props.icon       The icon that is displayed by side of the button label.
 * @param {Object}      props.iconStyles The styles of the icon.
 *
 * @returns {JSX.Element} The Button component.
 */
const Button = ({
	id = '',
	text = '',
	textStyles = {},
	onClick = () => {},
	style = {},
	icon = '',
	iconStyles = {},
}: ButtonProps): JSX.Element => {
	return (
		<Pressable
			style={{ ...styles.buttonStyles, ...style }}
			accessible={true}
			accessibilityRole="button"
			testID={id}
			onPress={onClick}
		>
			<Text style={{ ...styles.textStyles, ...textStyles }}>{text}</Text>
			{icon && (
				<Icon
					name={icon}
					width={16}
					height={16}
					color="#fff"
					styles={iconStyles}
				/>
			)}
		</Pressable>
	);
};

const styles = StyleSheet.create({
	buttonStyles: {
		width: 100,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: '100%',
		borderColor: '#000',
		borderWidth: 10,
		backgroundColor: '#222435',
		boxShadow:
			'0px 4px 8px rgba(0, 0, 0, 0.6), inset 0px 2px 3px rgba(255, 255, 255, 0.1)',
	},

	textStyles: {
		fontSize: APP_FONT_SIZE,
		fontFamily: getAppFont('400'),
		fontWeight: Platform.OS === 'ios' ? '400' : 'normal',
		textAlign: 'center',
		color: '#fff',
	},
});

export default Button;

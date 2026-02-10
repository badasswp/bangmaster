import React, { JSX } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from './Icon';
import { APP_FONT, APP_FONT_SIZE } from '../utils/constants';

type RootStackParamList = {
	SearchScreen: undefined;
};

type NotificationsScreenNavigationProp = NativeStackNavigationProp<
	RootStackParamList,
	'SearchScreen'
>;

/**
 * Header component.
 *
 * This component is used for displaying
 * the top view of the screens and views.
 *
 * It contains the Icon component displayed at the far right side.
 *
 * @returns {JSX.Element} The Header component.
 */
const Header = (): JSX.Element => {
	const navigation = useNavigation<NotificationsScreenNavigationProp>();

	return (
		<View style={styles.container} testID="headerContainer">
			<View>
				<Pressable onPress={() => navigation.goBack()} testID="searchButton">
					<Icon
						name="search"
						color="white"
						containerStyles={styles.navIcon}
						weight={2}
					/>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
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
	},

	navIcon: {
		alignItems: 'flex-end',
	},
});

export default Header;

import React, { JSX } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from './Icon';

type RootStackParamList = {
	Search: undefined;
};

type NotificationsScreenNavigationProp =
	NativeStackNavigationProp<RootStackParamList>;

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
			<View style={styles.navIcon}>
				<Pressable
					onPress={() => navigation.navigate('Search')}
					testID="searchButton"
				>
					<Icon
						name="search"
						color="#fff"
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
		alignItems: 'flex-end',
		position: 'absolute',
		paddingHorizontal: 25,
		top: 75,
		left: 0,
	},

	navIcon: {
		width: 30,
	},
});

export default Header;

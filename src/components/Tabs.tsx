import React, { JSX } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Icon from '../components/Icon';

type RootStackParamList = {
	Home: undefined;
	Presets: undefined;
	Settings: undefined;
};

type TabNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Tabs component.
 *
 * This component is used to display the tabs
 * for the home screen.
 *
 * @returns {JSX.Element} The Tabs component.
 */
const Tabs = (): JSX.Element => {
	const navigation = useNavigation<TabNavigationProp>();

	return (
		<View style={styles.tabs}>
			<Pressable
				style={styles.tab}
				onPress={() => navigation.navigate('Presets')}
			>
				<Icon name="presets" color="#fff"></Icon>
				<Text style={styles.tabText}>Presets</Text>
			</Pressable>
			<Pressable
				style={styles.tab}
				onPress={() => navigation.navigate('Settings')}
			>
				<Icon name="settings" color="#fff"></Icon>
				<Text style={styles.tabText}>Settings</Text>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	tabs: {
		backgroundColor: '#2d2b43',
		position: 'absolute',
		left: 0,
		bottom: 0,
		right: 0,
		height: 100,
		alignItems: 'center',
		flexDirection: 'row',
	},

	tab: {
		width: '50%',
	},

	tabText: {
		color: '#fff',
		textAlign: 'center',
	},
});

export default Tabs;

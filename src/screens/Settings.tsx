import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { APP_THEME_COLOR } from '../utils/constants';

type RootStackParamList = {
	Home: undefined;
};

type SettingsScreenNavigationProp =
	NativeStackNavigationProp<RootStackParamList>;

/**
 * Settings screen.
 *
 * This screen is used to display
 * the settings screen for the app.
 *
 * @returns {JSX.Element} The Settings screen.
 */
const Settings = (): JSX.Element => {
	const navigation = useNavigation<SettingsScreenNavigationProp>();

	return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: APP_THEME_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},
});

export default Settings;

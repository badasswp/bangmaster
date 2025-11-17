import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { APP_THEME_COLOR } from '../utils/constants';

type RootStackParamList = {
	Home: undefined;
};

type PresetsScreenNavigationProp =
	NativeStackNavigationProp<RootStackParamList>;

/**
 * Presets screen.
 *
 * This screen is used to display
 * the presets screen showing tracks for the app.
 *
 * @returns {JSX.Element} The Presets screen.
 */
const Presets = (): JSX.Element => {
	const navigation = useNavigation<PresetsScreenNavigationProp>();

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

export default Presets;

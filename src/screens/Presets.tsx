import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text, Pressable } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Track } from '../components/All';
import { APP_THEME_COLOR } from '../utils/constants';
import { tracks } from '../utils/data';

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

	return (
		<View style={styles.container}>
			<Pressable onPress={() => navigation.goBack()}>
				<Text>Back</Text>
			</Pressable>
			<ScrollView
				alwaysBounceVertical={true}
				showsVerticalScrollIndicator={false}
			>
				{tracks &&
					tracks.map(({ name, bpm }, index) => (
						<Track key={index} name={name} bpm={bpm}></Track>
					))}
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: APP_THEME_COLOR,
		gap: 20,
		paddingVertical: 100,
	},
});

export default Presets;

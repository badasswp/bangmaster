import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Track } from '../components/All';
import { APP_THEME_COLOR } from '../utils/constants';
import { tracks } from '../utils/data';
import { getAppFont } from '../utils/fonts';

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
			<View style={styles.header}>
				<Text style={styles.caption}>Presets</Text>
				<View style={styles.titleContainer}>
					<Text style={styles.title}>Select A Track</Text>
				</View>
			</View>
			<View style={styles.body}>
				<ScrollView
					alwaysBounceVertical={true}
					showsVerticalScrollIndicator={false}
				>
					{tracks &&
						tracks.map(({ name, bpm }, index) => (
							<Track key={index} idx={index} name={name} bpm={bpm}></Track>
						))}
				</ScrollView>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: APP_THEME_COLOR,
	},

	header: {
		flex: 0.5,
		backgroundColor: '#2d2b43',
		paddingTop: 75,
		paddingLeft: 20,
	},

	caption: {
		fontSize: 36,
		fontWeight: 700,
		fontFamily: getAppFont('400'),
		color: '#fff',
	},

	titleContainer: {
		position: 'absolute',
		right: 0,
		bottom: 10,
		left: 0,
	},

	title: {
		color: '#fff',
		textAlign: 'center',
		fontSize: 18,
	},

	body: {
		flex: 3,
	},
});

export default Presets;

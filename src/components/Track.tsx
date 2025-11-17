import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Pressable, Text } from 'react-native';

import { getAppFont } from '../utils/fonts';

interface TrackProps {
	name?: string;
	bpm?: number;
}

const Track = ({ name, bpm }: TrackProps): JSX.Element => {
	return (
		<Pressable style={styles.container} onPress={() => {}}>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.bpm}>Tempo: {bpm} bpm</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		borderBottomWidth: 1,
		borderBottomColor: '#302f47',
		borderTopWidth: 1,
		borderTopColor: '#504f65',
		padding: 20,
	},

	name: {
		color: '#fff',
		fontFamily: getAppFont('400'),
	},

	bpm: {
		color: '#fff',
		fontFamily: getAppFont('400'),
		opacity: 0.3,
	},
});

export default Track;

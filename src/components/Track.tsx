import React, { JSX } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, Pressable, View, Text } from 'react-native';

import Icon from './Icon';
import { getAppFont } from '../utils/fonts';
import useSelection from '../store/hooks/useSelection';

interface TrackProps {
	idx?: number;
	bpm?: number;
	name?: string;
}

type RootStackParamList = {
	Home: undefined;
};

type TrackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Track component.
 *
 * This component is used to display the track
 * shown on the scrollview list items in the Presets screen.
 *
 * @param {TrackProps} props      Track props.
 * @param {string}     props.name Name of the Track.
 * @param {number}     props.bpm  Beats per minute for track.
 *
 * @returns {JSX.Element} The Track component.
 */
const Track = ({ idx = 0, name, bpm }: TrackProps): JSX.Element => {
	const navigation = useNavigation<TrackNavigationProp>();
	const { setSelection } = useSelection();

	const handlePress = () => {
		setSelection(idx);
		navigation.goBack();
	};

	return (
		<Pressable style={styles.container} onPress={handlePress}>
			<Text style={styles.name}>{name}</Text>
			<View style={styles.details}>
				<Icon
					name="presets"
					height={18}
					weight={0.5}
					containerStyles={{ marginTop: 0 }}
					color="#fff"
				></Icon>
				<Text style={styles.bpm}>Tempo: {bpm} bpm</Text>
			</View>
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
		gap: 3,
	},

	name: {
		color: '#fff',
		fontSize: 18,
		fontFamily: getAppFont('400'),
		fontWeight: 400,
	},

	details: {
		flexDirection: 'row',
		alignItems: 'center',
	},

	bpm: {
		color: '#fff',
		fontSize: 16,
		fontFamily: getAppFont('400'),
		fontWeight: 400,
		opacity: 0.3,
	},
});

export default Track;

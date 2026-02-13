import React, { JSX, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text, TextInput } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Track } from '../components/All';
import { APP_THEME_COLOR } from '../utils/constants';
import { TrackProps, tracks } from '../utils/data';
import { getAppFont } from '../utils/fonts';

type RootStackParamList = {
	Home: undefined;
};

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Search screen.
 *
 * This screen is used to display
 * the search input for searching tracks for the app.
 *
 * @returns {JSX.Element} The Search screen.
 */
const Search = (): JSX.Element => {
	const navigation = useNavigation<SearchScreenNavigationProp>();

	const [filteredTracks, setFilteredTracks] = useState<TrackProps[]>(tracks);
	const [searchTrack, setSearchTrack] = useState('');

	const handleChange = (text: string): void => {
		setSearchTrack(text);
		const filteredTrackList = tracks.filter(track =>
			track.name.trim().toLowerCase().includes(text.toLowerCase())
		);
		setFilteredTracks(filteredTrackList);
	};

	return (
		<View style={styles.container} testID="searchView">
			<View style={styles.header} testID="searchHeader">
				<View>
					<Text style={styles.caption} testID="searchCaption">
						Search
					</Text>
					<TextInput
						testID="TrackInput"
						style={styles.input}
						value={searchTrack}
						placeholder="Type in the track name..."
						placeholderTextColor={'#666'}
						onChangeText={handleChange}
					/>
				</View>
			</View>
			<View style={styles.body} testID="tracksBody">
				<ScrollView
					alwaysBounceVertical={true}
					showsVerticalScrollIndicator={false}
				>
					{filteredTracks &&
						filteredTracks.map(({ name, bpm, trackId }, index) => (
							<Track key={index} trackId={trackId} name={name} bpm={bpm} />
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

	input: {
		borderColor: 'none',
		backgroundColor: 'transparent',
		fontSize: 18,
		paddingHorizontal: 0,
		paddingTop: 20,
		color: '#fff',
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

export default Search;

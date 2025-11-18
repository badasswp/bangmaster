import React, { JSX, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAudioPlayer } from 'expo-audio';
import Slider from '@react-native-community/slider';

import { Button, Tabs } from '../components/All';
import { getAppFont } from '../utils/fonts';
import { APP_BUTTON_COLOR, APP_THEME_COLOR } from '../utils/constants';
import { TrackProps, tracks } from '../utils/data';
import useSelection from '../store/hooks/useSelection';

type RootStackParamList = {
	Home: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/**
 * Home screen.
 *
 * This screen is used to display
 * the landing screen for the app.
 *
 * @returns {JSX.Element} The Home screen.
 */
const Home = (): JSX.Element => {
	const navigation = useNavigation<HomeScreenNavigationProp>();

	const { selection, setSelection } = useSelection();
	const [track, setTrack] = useState<TrackProps>(tracks[selection]);
	const [isPlaying, setIsPlaying] = useState(false);

	const player = useAudioPlayer(track.beat);
	const [bpm, setBpm] = useState(track.bpm);

	useEffect(() => {
		setTrack(tracks[selection]);
		setBpm(tracks[selection].bpm);
		stopPlay();
	}, [selection]);

	/**
	 * Start Play.
	 *
	 * This method resets the player to the
	 * starting point of the track and then proceeds
	 * to play the beat.
	 *
	 * @returns {void}
	 */
	const startPlay = (): void => {
		setIsPlaying(true);
		player.seekTo(0);
		player.play();
	};

	/**
	 * Stop Play.
	 *
	 * This method stops the player and
	 * updates the play state.
	 *
	 * @returns {void}
	 */
	const stopPlay = (): void => {
		setIsPlaying(false);
		player.pause();
	};

	/**
	 * Handle Play.
	 *
	 * This method handles the play/pause
	 * functionality of the play button.
	 *
	 * @returns {void}
	 */
	const handlePlay = (): void => {
		if (isPlaying) {
			stopPlay();
			return;
		}

		player.loop = true;
		player.setPlaybackRate(bpm / track.bpm, 'high');
		startPlay();
	};

	/**
	 * Next Selection.
	 *
	 * @returns {void}
	 */
	const handleNext = (): void => {
		const track = selection + 1;
		setSelection(track < tracks.length ? track : 0);
		stopPlay();
	};

	/**
	 * Previous Selection.
	 *
	 * @returns {void}
	 */
	const handlePrev = (): void => {
		const track = selection - 1;
		setSelection(track > -1 ? track : tracks.length - 1);
		stopPlay();
	};

	return (
		<View style={styles.container}>
			<View style={styles.trackDetails}>
				<Text style={styles.trackName}>{track.name}</Text>
				<Text style={styles.trackDuration}>{track.duration}</Text>
			</View>
			<View style={styles.trackButtons}>
				<Button text="-" onClick={handlePrev} />
				<Button
					text={isPlaying ? 'Stop' : 'Play'}
					iconStyles={styles.playIcon}
					style={styles.playButton}
					onClick={handlePlay}
				/>
				<Button text="+" onClick={handleNext} />
			</View>
			<View style={styles.trackDetails}>
				<Text style={styles.bpm}>{bpm} bpm</Text>
			</View>
			<View style={styles.trackTempo}>
				<Slider
					minimumValue={track.bpm - 100}
					maximumValue={track.bpm + 100}
					value={track.bpm}
					onValueChange={value => setBpm(value)}
					step={1}
					thumbTintColor={APP_BUTTON_COLOR}
					minimumTrackTintColor="red"
					maximumTrackTintColor="black"
				/>
			</View>
			<Tabs />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: APP_THEME_COLOR,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 20,
	},

	trackDetails: {
		gap: 5,
	},

	trackName: {
		fontFamily: getAppFont('400'),
		color: '#fff',
		fontSize: 32,
		fontWeight: 700,
		textAlign: 'center',
	},

	trackDuration: {
		fontFamily: getAppFont('400'),
		color: 'orange',
		fontSize: 20,
		textAlign: 'center',
	},

	trackButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},

	trackTempo: {
		width: '100%',
		paddingHorizontal: 50,
	},

	playIcon: {
		width: 50,
		height: 50,
	},

	playButton: {
		width: 160,
		height: 160,
	},

	bpm: {
		fontFamily: getAppFont('300'),
		color: '#fff',
		fontSize: 56,
		fontWeight: 300,
		textAlign: 'center',
	},
});

export default Home;

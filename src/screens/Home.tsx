import React, { JSX, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View, Text } from 'react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAudioPlayer } from 'expo-audio';

import { Button, Tabs } from '../components/All';
import { getAppFont } from '../utils/fonts';
import { APP_THEME_COLOR } from '../utils/constants';
import { tracks } from '../utils/data';
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
	const [isPlaying, setIsPlaying] = useState(false);
	const [track, setTrack] = useState<any>();
	const { selection, setSelection } = useSelection();
	const player = useAudioPlayer(track);

	useEffect(() => {
		const track = tracks[selection].beat;
		setTrack(track);
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

		player.playbackRate = 1.0;
		player.loop = true;
		player.volume = 1.0;

		startPlay();
	};

	/**
	 * Increment Selection.
	 *
	 * @returns {void}
	 */
	const handlePrev = (): void => {
		setSelection(selection - 1);
		stopPlay();
	};

	/**
	 * Decrement Selection.
	 *
	 * @returns {void}
	 */
	const handleNext = (): void => {
		setSelection(selection + 1);
		stopPlay();
	};

	return (
		<View style={styles.container}>
			<View style={styles.trackDetails}>
				<Text style={styles.trackName}>{tracks[selection].name}</Text>
				<Text style={styles.trackDuration}>{tracks[selection].duration}</Text>
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
				<Text style={styles.bpm}>{tracks[selection].bpm} bpm</Text>
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

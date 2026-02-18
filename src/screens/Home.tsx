import React, { JSX, useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useAudioPlayer } from 'expo-audio';
import Slider from '@react-native-community/slider';

import { Button, Header, Tabs } from '../components/All';
import { getAppFont } from '../utils/fonts';
import { APP_BUTTON_COLOR, APP_THEME_COLOR } from '../utils/constants';
import { TrackProps, tracks } from '../utils/data';
import { useSelection } from '../store/hooks';

/**
 * Home screen.
 *
 * This screen is used to display
 * the landing screen for the app.
 *
 * @returns {JSX.Element} The Home screen.
 */
const Home = (): JSX.Element => {
	const { selection, setSelection } = useSelection();
	const [isPlaying, setIsPlaying] = useState(false);
	const [track, setTrack] = useState<TrackProps>(tracks[0]);
	const [bpm, setBpm] = useState(track.bpm);

	// Set Audio Player.
	const player = useAudioPlayer(track.beat, {
		updateInterval: 1,
		keepAudioSessionActive: true,
	});

	/**
	 * Update to current track
	 * on new selection.
	 */
	useEffect(() => {
		// Get the right track position.
		const index = getTrackIndex();

		setTrack(tracks[index]);
		setBpm(tracks[index].bpm);
		stopPlay();
	}, [selection]);

	/**
	 * Set Player to loop.
	 */
	useEffect(() => {
		if (!player) return;
		player.loop = true;
	}, [player]);

	/**
	 * Get Track Index.
	 *
	 * @returns {number}
	 */
	const getTrackIndex = (): number => {
		return tracks.findIndex(({ trackId }) => trackId === selection);
	};

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
		player.setPlaybackRate(bpm / track.bpm, 'high');
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

		startPlay();
	};

	/**
	 * Handle Slide.
	 *
	 * This method handles the slide
	 * functionality of the slider.
	 *
	 * @param {number} tempo Track playing speed.
	 * @returns {void}
	 */
	const handleSlide = (tempo: number): void => {
		setBpm(tempo);
		player.setPlaybackRate(tempo / track.bpm, 'high');
	};

	/**
	 * Next Selection.
	 *
	 * @returns {void}
	 */
	const handleNext = (): void => {
		const index = getTrackIndex() + 1;
		setSelection(tracks[index] ? tracks[index].trackId : tracks[0].trackId);
		stopPlay();
	};

	/**
	 * Previous Selection.
	 *
	 * @returns {void}
	 */
	const handlePrev = (): void => {
		const index = getTrackIndex() - 1;
		const lastIndex = tracks.length - 1;
		setSelection(
			tracks[index] ? tracks[index].trackId : tracks[lastIndex].trackId
		);
		stopPlay();
	};

	return (
		<View testID="homeView" style={styles.container}>
			<Header />
			<View style={styles.trackDetails}>
				<Text style={styles.trackName}>{track.name}</Text>
				<Text style={styles.trackDuration}>{track.duration}</Text>
			</View>
			<View style={styles.trackButtons}>
				<Button
					id="prevBtn"
					text="-"
					onClick={handlePrev}
					textStyles={styles.trackButtonTempo}
				/>
				<Button
					id="playBtn"
					text={isPlaying ? 'Stop' : 'Play'}
					iconStyles={styles.playIcon}
					style={styles.playButton}
					onClick={handlePlay}
					textStyles={styles.playButtonText}
				/>
				<Button
					id="nextBtn"
					text="+"
					onClick={handleNext}
					textStyles={styles.trackButtonTempo}
				/>
			</View>
			<View testID="trackDetails" style={styles.trackDetails}>
				<Text style={styles.bpm}>{bpm} bpm</Text>
			</View>
			<View testID="slider" style={styles.trackTempo}>
				<Slider
					testID="trackSlider"
					minimumValue={track.bpm - 100}
					maximumValue={track.bpm + 100}
					value={track.bpm}
					onValueChange={value => handleSlide(value)}
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
		fontFamily: getAppFont('300'),
		color: '#fff',
		fontSize: 32,
		fontWeight: 700,
		textAlign: 'center',
	},

	trackDuration: {
		fontFamily: getAppFont('300'),
		color: 'orange',
		fontSize: 20,
		textAlign: 'center',
	},

	trackButtons: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},

	trackButtonTempo: {
		fontSize: 24,
		fontWeight: 700,
	},

	trackTempo: {
		width: '100%',
		paddingHorizontal: 50,
	},

	playIcon: {
		width: 75,
		height: 75,
	},

	playButton: {
		width: 160,
		height: 160,
	},

	playButtonText: {
		fontSize: 28,
		fontFamily: getAppFont('300'),
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

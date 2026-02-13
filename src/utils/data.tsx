export interface TrackProps {
	trackId: number;
	name: string;
	beat: string;
	bpm: number;
	duration: string;
	category: string;
}

export const tracks: TrackProps[] = [
	{
		trackId: 1,
		name: 'Worship Beat',
		beat: require('../../beats/worship.wav'),
		bpm: 140,
		duration: '00:03',
		category: 'Gospel',
	},
	{
		trackId: 2,
		name: '3/4 Time',
		beat: require('../../beats/3-4.wav'),
		bpm: 179,
		duration: '00:02',
		category: 'Gospel',
	},
	{
		trackId: 3,
		name: 'Praise Groove',
		beat: require('../../beats/praise-groove.wav'),
		bpm: 120,
		duration: '00:01',
		category: 'Gospel',
	},
	{
		trackId: 4,
		name: 'Rock Praise',
		beat: require('../../beats/rock-praise.wav'),
		bpm: 156,
		duration: '00:03',
		category: 'Gospel',
	},
];

import { render, act, fireEvent } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { store } from '../../src/store';
import { tracks } from '../../src/utils/data';
import Home from '../../src/screens/Home';

const mockNavigate = jest.fn();

jest.mock('@react-navigation/native', () => ({
	...jest.requireActual('@react-navigation/native'),
	useNavigation: () => ({
		navigate: mockNavigate,
	}),
	NavigationContainer: ({ children }: { children: React.ReactNode }) => (
		<>{children}</>
	),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: (selector: any) => selector({ track: { selection: 0 } }),
	useDispatch: () => mockDispatch,
}));

const mockPause = jest.fn();
const mockPlay = jest.fn();
const mockPlayBack = jest.fn();

jest.mock('expo-audio', () => ({
	useAudioPlayer: jest.fn(() => ({
		play: mockPlay,
		pause: mockPause,
		stop: jest.fn(),
		setPlaybackRate: mockPlayBack,
		seekTo: jest.fn(),
		loadAsync: jest.fn(),
		unloadAsync: jest.fn(),
		isPlaying: false,
	})),
}));

jest.mock('@react-native-community/slider', () => {
	const React = require('react');
	const { View } = require('react-native');

	return ({ onValueChange, testID }: any) => (
		<View testID={testID} onValueChange={onValueChange} />
	);
});

const renderWithRedux = (ui: React.ReactElement) => {
	return render(<Provider store={store}>{ui}</Provider>);
};
describe('Home Screen', () => {
	afterEach(() => jest.clearAllMocks());
	it('matches snapshot', () => {
		const container = renderWithRedux(<Home />);
		expect(container).toMatchSnapshot();
	});

	it('displays the Home Screen digital features', () => {
		const { getByText } = renderWithRedux(<Home />);

		const prevBtn = getByText('-');
		const nextBtn = getByText('+');
		const playBtn = getByText('Play');

		const trackNameLabel = getByText(tracks[0].name);
		const trackDurationLabel = getByText(`${tracks[0].bpm} bpm`);

		expect(prevBtn).toBeOnTheScreen();
		expect(nextBtn).toBeOnTheScreen();
		expect(playBtn).toBeOnTheScreen();
		expect(trackNameLabel).toBeOnTheScreen();
		expect(trackDurationLabel).toBeOnTheScreen();
	});

	it('displays the default styles in Home Screen', () => {
		const { getByText, getByTestId } = renderWithRedux(<Home />);

		const homeContainer = getByTestId('homeView');
		const playButton = getByTestId('playBtn');
		const prevButton = getByText('-');
		const nextButton = getByText('+');
		const trackDetailsLabel = getByTestId('trackDetails');
		const slider = getByTestId('slider');

		expect(homeContainer).toHaveStyle({
			flex: 1,
			alignItems: 'center',
			justifyContent: 'center',
			gap: 20,
		});

		expect(playButton).toHaveStyle({
			width: 160,
			height: 160,
		});
		expect(prevButton).toHaveStyle({ fontSize: 24, fontWeight: 700 });
		expect(nextButton).toHaveStyle({ fontSize: 24, fontWeight: 700 });
		expect(trackDetailsLabel).toHaveStyle({ gap: 5 });
		expect(slider).toHaveStyle({ width: '100%', paddingHorizontal: 50 });
	});

	it('mocks the handlers in Home Screen', async () => {
		const { getByText } = renderWithRedux(<Home />);

		expect(mockPause).toHaveBeenCalledTimes(1);

		const playBtn = getByText('Play');
		const prevBtn = getByText('-');

		await act(async () => {
			fireEvent.press(playBtn);
		});

		expect(mockPlay).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.press(prevBtn);
		});

		expect(mockPause).toHaveBeenCalledTimes(2);
	});

	it('mocks the dispatch action in the setSelector updater method and mocks the playback of the expo audio in Home Screen', async () => {
		const { getByText } = renderWithRedux(<Home />);

		expect(mockPause).toHaveBeenCalledTimes(1);

		const nextBtn = getByText('+');
		const playBtn = getByText('Play');

		await act(async () => {
			fireEvent.press(nextBtn);
		});

		expect(mockDispatch).toHaveBeenCalledTimes(1);

		await act(async () => {
			fireEvent.press(playBtn);
		});

		expect(mockPlayBack).toHaveBeenCalledTimes(1);
	});

	it('mocks the slider in the Home Screen', async () => {
		const { getByTestId, getByText } = renderWithRedux(<Home />);

		const trackSlider = getByTestId('trackSlider');

		await act(async () => {
			fireEvent(trackSlider, 'onValueChange', 140);
		});

		expect(getByText('140 bpm')).toBeOnTheScreen();
	});
});

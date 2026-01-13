# Screens

This section documents the reusable screens available in the project. Each screen is designed to be agnostic, modular, consistent, and easy to integrate into different parts of the project.

## Table of Contents

- [Home](#home)
- [Presets](#presets)

## Home

The **Home** screen serves as the application’s landing interface, providing a reusable and well-structured entry point. It utilizes React Native’s `useNavigation` hook with a custom, strongly typed configuration that extends `NativeStackNavigationProps` and is derived from a defined root stack parameter list. This approach ensures type-safe navigation by validating route names and parameters at compile time.

The screen leverages Expo’s native `useAudioPlayer` hook to power the audio playback experience for selected tracks. Track selection, state management, and updates are handled through a custom `useSelection` hook, which builds on react-redux’s `useSelector` and `useDispatch` hooks to provide a streamlined and predictable state flow.

Internally, the screen renders a digital audio control interface featuring interactive play/stop controls, skip-forward and skip-backward buttons for track navigation, and a native `Slider` component from the @react-native-community/slider library for tempo adjustment. All elements are composed within React Native `View` components, with styling applied using the React Native `StyleSheet` API.


### How To Use

```jsx
import { Home } from './src/screens/All';

const  HomeDemo = (): JSX.Element => {
  return (
    <View>
      <Home />
    </View>
  );
}

export default HomeDemo;

```
  <br/>

## Presets

The **Presets** screen provides an intuitive interface for browsing and selecting available tracks. Similar to the ``Home` screen, it leverages React Native’s `useNavigation` hook with a custom, strongly typed configuration that extends `NativeStackNavigationProps` and is derived from a predefined root stack parameter list. This ensures type-safe navigation by validating route names and parameters at compile time.

The screen renders a list of tracks sourced from a predefined data template, mapping each entry to a custom `Track` component. These components are nested within a React Native `ScrollView` to enable smooth vertical scrolling. Visual presentation and layout are handled using the React Native `StyleSheet` API.


### How To Use

```jsx
import { Presets } from './src/components/All';

const  PresetsDemo = (): JSX.Element => {
  return (
    <View>
      <Presets />
    </View>
  );
}

export default PresetsDemo;

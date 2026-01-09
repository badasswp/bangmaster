# Components

This section documents the reusable components available in the project. Each component is designed to be agnostic, modular, consistent, and easy to integrate into different parts of the project.

## Table of Contents

- [Button](#button)
- [Icon](#icon)
- [Tabs](#tabs)
- [Track](#track)

## Button

The **Button** component provides a reusable way to display an interactive button across the project. It supports `id`, `text`, `textStyles`, `style`, `icon`, `iconStyles`, and an `onClick` props. Under the hood, it uses the custom `Icon` component to display the button icon as well as the react-native `Pressable` and `Text` packages.

### How To Use

```jsx
import { Button } from './src/components/All';

const ButtonDemo = (): JSX.Element => {
  return (
    <View>
      <Button
        id="btn_hello"
        text="Hello World"
        icon="users"
        iconStyles={{padding: 10}}
        textStyles={{color: "red"}}
        style={{borderRadius: 10}}
        onClick={() => console.log("Hello World")}
      />
    </View>
  );
};

export default ButtonDemo;
```

**Props**
- id _`{string}`_ By default, this would be a string that represents an id key for the button (Optional).
- text _`{string}`_ By default, this would be a string that represents a text label displayed on the button (Optional).
- textStyles _`{Object}`_ By default, this would be an object that overrides the current inline styles of the native `Text` component in the button (Optional).
- style _`{Object}`_ By default, this would be an object that overrides the current inline styles of the native `Pressable` component in the button (Optional).
- icon _`{string}`_ By default, this would be the name of the icon of the `Icon` component in the button(Optional).
- iconStyles _`{Object}`_ By default, this would be an object that overrides the current inline styles of the `Icon` component in the button (Optional).
- onClick _`{function}`_ By default, this would be a callback function that is called whenever the clicked event is fired (Optional).
  <br/>

## Icon

The **Icon** component offers a reusable abstraction for rendering a variety of icons across the application. It supports the props `name`, `color`, `width`, `height`, `styles`, `containerStyles`, and `weight`, allowing for flexible customization and styling.
Internally, the component renders an Svg element wrapped within a React Native `View`, all encapsulated by a custom `IconWrapper` component. This structure ensures consistent layout, styling, and icon behavior throughout the application.

### How To Use

```jsx
import { Icon } from './src/components/All';

const  IconDemo = (): JSX.Element => {
  return (
    <View>
      <Icon
        name="play"
        color="black"
        width={24}
        height={24}
        styles={{borderRadius: 20}}
        containerStyles={{backgroundColor: ‘#fff’}}
        weight={2}
      />
    </View>
  );
}

export default IconDemo;
```

**Props**

- name _`{string}`_ This represents the name of the icon.
- color _`{string}`_ This represents the color of the icon.
- width _`{number}`_ This represents the width of the icon.
- height _`{number}`_ This represents the height of the icon.
- styles _`{Object}`_ This represents the inline styles that override the default styles of the icon.
- containerStyles _`{Object}`_ This represents the inline styles to override the styles of the icon container.
- weight _`{number}`_ This represents the weight of the icon.
  <br/>

## Tabs

The **Tabs** component provides a reusable interface for displaying and navigating between specific tabs—namely `Presets` and `Settings` — from the default `Home` screen. It uses React Native’s `useNavigation` hook with a custom, strongly typed parameter that extends `NativeStackNavigationProps` and is based on a defined root stack parameter list. This ensures type-safe navigation by validating route names and parameters at compile time.


Internally, the component is built using a custom `Icon` component alongside React Native’s `Text` and `Pressable` components, all wrapped within a `View` to create an interactive and accessible tab layout.

### How To Use

```jsx
import { Tabs } from './src/components/All';

const  TabsDemo = (): JSX.Element => {
  return (
    <View>
      <Tabs />
    </View>
  );
}

export default TabsDemo;
```

## Track

The **Track** component provides a reusable interface for displaying and selecting individual tracks from the track list on the `Presets` screen. It accepts the props `idx`, `name`, and `bpm`, which represent the track’s position in the list, its title, and its tempo (beats per minute), respectively.

Internally, the component is composed using a custom Icon component alongside React Native’s Text and View components, all wrapped within a Pressable. Styling is applied via the `StyleSheet` API to create an interactive, accessible, and visually consistent layout for track selection.

### How To Use

```jsx
import { Track } from './src/components/All';

interface TrackProps {
  idx?: number;
  bpm?: number;
  name?: string;
}

const  TrackDemo = ({idx=0, name, bpm}: TrackProps): JSX.Element => {
  return (
    <View>
      <Track idx={index} name={name} bpm={bpm} />
    </View>
  );
}

export default TrackDemo;
```

**Props**

- idx _`{number}`_ This represents the selected id/index of the track. By default, it is 0.
- bpm _`{number}`_ This represents the tempo or beats per minute of the track.
- name _`{string}`_ This represents the name of the track.
  <br/>

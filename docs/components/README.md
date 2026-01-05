# Components

This section documents the reusable components available in the project. Each component is designed to be agnostic, modular, consistent, and easy to integrate into different parts of the project.

## Table of Contents

- [Button](#button)

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
- weight _`{string}`_ By default, this would be a string that represents the weight of the button text (Optional).
  <br/>

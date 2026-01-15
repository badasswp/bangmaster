# Hooks

This section documents the reusable hooks available in the project. Each hook is designed to be agnostic, modular, consistent, and easy to integrate into different parts of the project.

## Table of Contents

- [useSelection](#useSelection)

## useSelection

The **useSelection** hook is a custom hook that returns and updates the track selection object data from the global redux store of the application with a setSelection updater method. Under the hood, it utilizes the built-in React Redux APIs `useSelector` and `useDispatch` hooks. The `useSelector` hook subscribes to the global redux store of the application to fetch the current track selection with a pure selector function passed as an argument. The `useDispatch` calls a dispatch method that updates the current track selection data based on action state objects passed as arguments.

### How To Use

```jsx
import { useSelection } from './src/store/hooks';

const useSelectionDemo = (): JSX.Element => {
  const { selection, setSelection } = useSelection();

  const handleNext = (): void => {
    const track = selection + 1;
    setSelection(track < tracks.length ? track : 0);
  };

  return (
    <View>
      <Text>`Track ${selection}`</Text>
      <Pressable onPress={handlePress}>
	     <Text>Next Track</Text>
      </Pressable>
    </View>
  );
};

export default useSelectionDemo;
```
  <br/>

# Slices

This section documents the reusable slices available in the project. Each slice is designed to be agnostic, modular, consistent, and easy to integrate into different parts of the project.

## Table of Contents

- [TrackSlice](#trackslice)

## TrackSlice

The **TrackSlice** is a Redux Toolkit slice responsible for managing track-related state within the global Redux store. It is created using Redux Toolkit’s native `createSlice` API and exported as a slice reducer to be registered under the track key in the store configuration.

Internally, `createSlice` accepts an object containing three required properties:

* name – Defines the slice name and determines the key under which the reducer is mounted in the Redux store.
* `initialState` – Specifies the default state returned before any actions are dispatched.
* `reducers` – Contains reducer functions that handle state updates and automatically generate corresponding action creators.
* 

For TrackSlice, the slice name is set to track, and the initial state is an object with a selection property initialized to 0. The slice defines a single reducer, `updateSelection`, which receives the current state and an action object, and updates the selection value with the provided payload.

The updateSelection reducer is automatically exported as an action creator, while the slice reducer itself is exported as the default export. Together, these exports enable internal track state management by allowing components and middleware to dispatch actions that update the track selection in a predictable and centralized manner.


### How To Use

```js

import { createSlice } from '@reduxjs/toolkit';

const trackSlice = createSlice({
  name: 'track',
  initialState: {
    selection: 0,
  },
  reducers: {
    updateSelection(state, action) {
      state.selection = action.payload;
    },
  },
});

export const { updateSelection } = trackSlice.actions;
export default trackSlice.reducer;

import { trackSlice } from './src/store/slices';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    track: trackReducer,
  },
});
```
  <br/>

import React, { JSX } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home, Presets, Settings } from '../screens/All';

/**
 * App component.
 *
 * This component represents the main entry
 * point of the application.
 *
 * It sets up the navigation container and
 * defines the stack navigator for the app.
 *
 * @returns {JSX.Element} The App component.
 */
const App = (): JSX.Element => {
	const Stack = createNativeStackNavigator();

	return (
		<NavigationContainer>
			<Stack.Navigator
				initialRouteName="Home"
				screenOptions={{
					headerShown: false,
				}}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Presets" component={Presets} />
				<Stack.Screen name="Settings" component={Settings} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;

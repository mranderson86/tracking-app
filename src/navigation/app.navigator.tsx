import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthNavigator} from './auth.navigator';
import {HomeNavigator} from './home.navigator';
import {AppRoute} from './app-routes';

const Stack = createStackNavigator();

export const AppNavigator = (props: any): React.ReactElement => (
  <Stack.Navigator {...props} headerMode="none">
    {props.Authentication.isLogged ? (
      <Stack.Screen name={AppRoute.HOME} component={HomeNavigator} />
    ) : (
      <Stack.Screen name={AppRoute.AUTH} component={AuthNavigator} />
    )}
  </Stack.Navigator>
);

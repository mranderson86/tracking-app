import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AppRoute} from './app-routes';
import {ProfileScreen} from '../scenes/profile';

import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

const Stack = createStackNavigator();

type ProfileNavigatorParams = {
  [AppRoute.PROFILE]: undefined;
};

export interface ProfileScreenProps {
  navigation: StackNavigationProp<ProfileNavigatorParams, AppRoute.PROFILE>;
  route: RouteProp<ProfileNavigatorParams, AppRoute.PROFILE>;
}

export const ProfileNavigator = (): React.ReactElement => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name={AppRoute.PROFILE} component={ProfileScreen} />
  </Stack.Navigator>
);

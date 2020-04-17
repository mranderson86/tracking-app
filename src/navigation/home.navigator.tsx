import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TodoNavigator} from './todo.navigator';
import {ProfileNavigator} from './profile.navigator';
import {AppRoute} from './app-routes';
import {HomeTabBar} from '../scenes/home';
import {LayoutIcon, PersonIcon} from '../assets/icons';

const BottomTab = createBottomTabNavigator();

export const HomeNavigator = (): React.ReactElement => (
  <BottomTab.Navigator tabBar={props => <HomeTabBar {...props} />}>
    <BottomTab.Screen
      name={AppRoute.TODO}
      component={TodoNavigator}
      options={{title: 'TODO', tabBarIcon: LayoutIcon}}
    />
    <BottomTab.Screen
      name={AppRoute.PROFILE}
      component={ProfileNavigator}
      options={{title: 'PROFILE', tabBarIcon: PersonIcon}}
    />
  </BottomTab.Navigator>
);

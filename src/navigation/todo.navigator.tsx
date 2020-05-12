import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {AppRoute} from './app-routes';
import {TodoTabBar} from '../scenes/todo';
import {
  TechnologyScreen,
  UserTechnologyScreen,
  TechnologyUserScreen,
} from '../scenes/technology';
import {DoneAllIcon, CodeOutlineIcon, PeopleOutlineIcon} from '../assets/icons';

const TopTab = createMaterialTopTabNavigator();

export const TodoNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={props => <TodoTabBar {...props} />}>
    <TopTab.Screen
      name={AppRoute.TECHNOLOGY}
      component={TechnologyScreen}
      options={{title: 'DO CHECK-IN', tabBarIcon: DoneAllIcon}}
    />
    <TopTab.Screen
      name={AppRoute.USERS_TECHNOLOGY}
      component={UserTechnologyScreen}
      options={{title: 'TECHNOLOGY', tabBarIcon: CodeOutlineIcon}}
    />
    <TopTab.Screen
      name={AppRoute.TECHNOLOGIES_USER}
      component={TechnologyUserScreen}
      options={{title: 'USERS', tabBarIcon: PeopleOutlineIcon}}
    />
  </TopTab.Navigator>
);

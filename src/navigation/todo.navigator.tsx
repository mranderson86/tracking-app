import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';

import {AppRoute} from './app-routes';
import {TodoTabBar} from '../scenes/todo';
import {
  TechnologyScreen,
  UserTechnologyScreen,
  TechnologyUserScreen,
} from '../scenes/technology';
import {DoneAllIcon, CodeOutlineIcon, PeopleOutlineIcon} from '../assets/icons';

const TopTab = createMaterialTopTabNavigator();

type TodoNavigatorParams = {
  [AppRoute.TECHNOLOGIES_USER]: undefined;
  [AppRoute.USERS_TECHNOLOGY]: undefined;
  [AppRoute.TECHNOLOGY]: undefined;
};

export interface TechnologiesUserScreenProps {
  navigation: StackNavigationProp<
    TodoNavigatorParams,
    AppRoute.TECHNOLOGIES_USER
  >;
  route: RouteProp<TodoNavigatorParams, AppRoute.TECHNOLOGIES_USER>;
}

export interface UsersTechnologyScreenProps {
  navigation: StackNavigationProp<
    TodoNavigatorParams,
    AppRoute.USERS_TECHNOLOGY
  >;
  route: RouteProp<TodoNavigatorParams, AppRoute.TECHNOLOGIES_USER>;
}

export interface TechnologyScreenProps {
  navigation: StackNavigationProp<TodoNavigatorParams, AppRoute.TECHNOLOGY>;
  route: RouteProp<TodoNavigatorParams, AppRoute.TECHNOLOGY>;
}

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

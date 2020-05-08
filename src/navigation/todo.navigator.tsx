import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {AppRoute} from './app-routes';
import {TodoTabBar, TodoInProgressScreen, TodoDoneScreen} from '../scenes/todo';
import {TechnologyScreen} from '../scenes/technology';
import {DoneAllIcon, GridIcon} from '../assets/icons';

const TopTab = createMaterialTopTabNavigator();

export const TodoNavigator = (): React.ReactElement => (
  <TopTab.Navigator tabBar={props => <TodoTabBar {...props} />}>
    <TopTab.Screen
      name={AppRoute.TECHNOLOGY}
      component={TechnologyScreen}
      options={{title: 'TECHNOLOGY', tabBarIcon: GridIcon}}
    />
    <TopTab.Screen
      name={AppRoute.TODO_IN_PROGRESS}
      component={TodoInProgressScreen}
      options={{title: 'IN PROGRESS', tabBarIcon: GridIcon}}
    />
    <TopTab.Screen
      name={AppRoute.TODO_DONE}
      component={TodoDoneScreen}
      options={{title: 'DONE', tabBarIcon: DoneAllIcon}}
    />
  </TopTab.Navigator>
);

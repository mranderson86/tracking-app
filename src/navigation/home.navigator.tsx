import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {RouteProp} from '@react-navigation/core';
import {DrawerNavigationProp} from '@react-navigation/drawer';

import {TodoNavigator} from './technology.navigator';
import {ProfileNavigator} from './profile.navigator';
import {AppRoute} from './app-routes';
import {
  HomeTabBar,
  HomeDrawer,
  AboutScreen,
  LogoutScreen,
} from '../scenes/home';
import {
  HomeIcon,
  InfoIcon,
  LayoutIcon,
  PersonIcon,
  LogoutIcon,
} from '../assets/icons';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

type HomeNavigatorParams = {
  [AppRoute.HOME]: undefined;
  [AppRoute.ABOUT]: undefined;
  [AppRoute.LOGOUT]: undefined;
};

export interface AboutScreenProps {
  navigation: DrawerNavigationProp<HomeNavigatorParams, AppRoute.ABOUT>;
  route: RouteProp<HomeNavigatorParams, AppRoute.ABOUT>;
}

export interface HomeScreenProps {
  navigation: DrawerNavigationProp<HomeNavigatorParams, AppRoute.HOME>;
  route: RouteProp<HomeNavigatorParams, AppRoute.HOME>;
}

const HomeBottomNavigator = (): React.ReactElement => (
  <BottomTab.Navigator tabBar={props => <HomeTabBar {...props} />}>
    <BottomTab.Screen
      name={AppRoute.TODO}
      component={TodoNavigator}
      options={{title: 'TECHNOLOGY', tabBarIcon: LayoutIcon}}
    />
    <BottomTab.Screen
      name={AppRoute.PROFILE}
      component={ProfileNavigator}
      options={{title: 'PROFILE', tabBarIcon: PersonIcon}}
    />
  </BottomTab.Navigator>
);

export const HomeNavigator = (): React.ReactElement => (
  <Drawer.Navigator drawerContent={props => <HomeDrawer {...props} />}>
    <Drawer.Screen
      name={AppRoute.HOME}
      component={HomeBottomNavigator}
      options={{title: 'Home', drawerIcon: HomeIcon}}
    />
    <Drawer.Screen
      name={AppRoute.ABOUT}
      component={AboutScreen}
      options={{title: 'About', drawerIcon: InfoIcon}}
    />
    <Drawer.Screen
      name={AppRoute.LOGOUT}
      component={LogoutScreen}
      options={{title: 'Logout', drawerIcon: LogoutIcon}}
    />
  </Drawer.Navigator>
);

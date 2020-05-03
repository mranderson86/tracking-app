import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {TodoNavigator} from './todo.navigator';
import {ProfileNavigator} from './profile.navigator';
import {AppRoute} from './app-routes';
import {HomeTabBar, HomeDrawer, AboutScreen} from '../scenes/home';
import {
  HomeIcon,
  InfoIcon,
  LayoutIcon,
  PersonIcon,
  LogoutIcon,
} from '../assets/icons';

const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();

const HomeBottomNavigator = (): React.ReactElement => (
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

const LogoutScreen = (): React.ReactElement => <React.Fragment />;

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

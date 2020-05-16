import React from 'react';
import {Drawer, DrawerElement, MenuItemType} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

export const HomeDrawer = (props): DrawerElement => {
  const onMenuItemSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
    props.navigation.closeDrawer();
  };

  const createNavigationItemForRoute = (
    route,
  ): MenuItemType & {routeName: string} => {
    const {options} = props.descriptors[route.key];
    return {
      routeName: route.name,
      title: options.title,
      icon: options.drawerIcon,
    };
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Drawer
        data={props.state.routes.map(createNavigationItemForRoute)}
        onSelect={onMenuItemSelect}
      />
    </SafeAreaLayout>
  );
};

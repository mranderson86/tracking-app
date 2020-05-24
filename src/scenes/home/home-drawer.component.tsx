import React from 'react';
import {
  Drawer,
  DrawerElement,
  DrawerItem,
  IndexPath,
} from '@ui-kitten/components';
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

  const createNavigationItemForRoute = route => {
    const {options} = props.descriptors[route.key];
    return (
      <DrawerItem
        key={route.key}
        title={options.title}
        accessoryLeft={options.drawerIcon}
      />
    );
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Drawer onSelect={(index: IndexPath) => onMenuItemSelect(index.row)}>
        {props.state.routes.map(createNavigationItemForRoute)}
      </Drawer>
    </SafeAreaLayout>
  );
};

import React from 'react';
import {TabBar, Tab, Divider, TabElement} from '@ui-kitten/components';
import {
  SafeAreaLayout,
  SaveAreaInset,
  SafeAreaLayoutElement,
} from '../../components/safe-area-layout.component';
import {Toolbar} from '../../components/toolbar.component';
import {MenuIcon} from '../../assets/icons';

/**
 * Navega para tela ao clicar em cada aba
 */
export const TechnologyTabBar = (props): SafeAreaLayoutElement => {
  const onTabSelect = (index: number): void => {
    const selectedTabRoute: string = props.state.routeNames[index];
    props.navigation.navigate(selectedTabRoute);
  };

  /**
   * Cria aba no topo da tela
   *  */

  const createNavigationTabForRoute = (route): TabElement => {
    const {options} = props.descriptors[route.key];
    return (
      <Tab
        {...props}
        key={route.key}
        title={options.title}
        icon={options.tabBarIcon}
      />
    );
  };

  return (
    <SafeAreaLayout insets={SaveAreaInset.TOP}>
      <Toolbar
        title="Tracking of Technology"
        backIcon={MenuIcon}
        onBackPress={props.navigation.toggleDrawer}
      />
      <TabBar selectedIndex={props.state.index} onSelect={onTabSelect}>
        {props.state.routes.map(createNavigationTabForRoute)}
      </TabBar>
      <Divider />
    </SafeAreaLayout>
  );
};

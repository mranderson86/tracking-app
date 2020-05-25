import React from 'react';
import {ImageProps} from 'react-native';
import {
  OverflowMenu,
  StyleType,
  TopNavigation,
  TopNavigationAction,
  TopNavigationActionElement,
  TopNavigationProps,
  IndexPath,
  IconElement,
} from '@ui-kitten/components';
import {BackIcon, MenuIcon, MoreVerticalIcon} from '../assets/icons';

export type ToolbarMenu = [];

export interface ToolbarProps extends TopNavigationProps {
  menu?: ToolbarMenu;
  backIcon?: (style) => IconElement;
  menuIcon?: (style) => IconElement;
  onMenuItemSelect?: (index: number) => void;
  onBackPress?: () => void;
}

export const Toolbar = (props: ToolbarProps): TopNavigationActionElement => {
  const {
    menu,
    backIcon,
    menuIcon,
    onMenuItemSelect,
    onBackPress,
    ...topNavigationProps
  } = props;
  const [menuVisible, setMenuVisible] = React.useState(false);

  const onMenuSelect = (index: number) => {
    setMenuVisible(false);
    onMenuItemSelect && onMenuItemSelect(index);
  };

  const onMenuActionPress = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = (): TopNavigationActionElement => (
    <OverflowMenu
      anchor={() => <React.Fragment />}
      visible={menuVisible}
      placement="bottom end"
      onSelect={(index: IndexPath) => onMenuSelect(index.row)}
      onBackdropPress={onMenuActionPress}>
      <TopNavigationAction
        icon={props.menuIcon || MoreVerticalIcon}
        onPress={onMenuActionPress}
      />
    </OverflowMenu>
  );

  const renderBackAction = (): TopNavigationActionElement => (
    <TopNavigationAction
      icon={props.backIcon || BackIcon}
      onPress={onBackPress}
    />
  );

  return (
    <React.Fragment>
      <TopNavigation
        {...topNavigationProps}
        alignment="center"
        accessoryLeft={onBackPress && renderBackAction}
        accessoryRight={menu && renderMenuAction}
      />
    </React.Fragment>
  );
};

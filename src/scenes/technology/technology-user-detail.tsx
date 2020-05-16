import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Text,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

import {TodoInProgressScreenProps} from '../../navigation/todo.navigator';

import {Technology} from '../../store/ducks/technology/types';
import {User} from '../../store/ducks/technologies-user/types';

const TechnologyUserDetailScreenComponent = (
  props: TodoInProgressScreenProps & ThemedComponentProps,
): ListElement => {
  /**
   * Renderiza cada item da lista de tecnologia
   * @param item
   */
  const renderTechnology = ({
    item,
  }: ListRenderItemInfo<Technology>): ListItemElement => (
    <ListItem style={props.themedStyle.item}>
      <Text category="h6">{item.technology}</Text>
    </ListItem>
  );

  /**
   * Renderiza cada item da lista de usuário
   * @param item
   */
  const renderUser = ({item}: ListRenderItemInfo<User>): ListItemElement => (
    <ListItem style={props.themedStyle.item}>
      <Text category="h6">{item.username}</Text>
      <Text appearance="hint" category="s1">
        {item.email}
      </Text>
    </ListItem>
  );

  return (
    <Layout style={props.themedStyle.container}>
      <List
        style={props.themedStyle.list}
        data={[]}
        renderItem={renderTechnology}
      />
    </Layout>
  );
};

export const TechnologyUserDetailScreen = withStyles(
  TechnologyUserDetailScreenComponent,
  theme => ({
    container: {
      flex: 1,
    },
    filterInput: {
      marginTop: 16,
      marginHorizontal: 8,
    },
    list: {
      flex: 1,
      backgroundColor: theme['background-basic-color-1'],
    },
    item: {
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingHorizontal: 12,
      marginHorizontal: 12,
    },
    itemProgressBar: {
      width: '50%',
      marginVertical: 12,
    },
    fab: {
      position: 'absolute',
      margin: 20,
      right: 0,
      bottom: 0,
      borderRadius: 50,
      width: 70,
      height: 70,
    },
  }),
);

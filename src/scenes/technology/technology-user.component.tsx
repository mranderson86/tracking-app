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

import {AppRoute} from '../../navigation/app-routes';

import {TodoInProgressScreenProps} from '../../navigation/todo.navigator';

import {ApplicationState} from '../../store';
import {
  TechnologiesUserTypes,
  TechnologiesUser,
} from '../../store/ducks/technologies-user/types';

import {connect} from 'react-redux';

// Integrando State em Props
const mapStateToProps = ({
  TechnologiesUser,
  Authentication,
}: ApplicationState) => ({
  TechnologiesUser,
  Authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  technologiesUserRequest: (token: string) => ({
    type: TechnologiesUserTypes.TECHNOLOGIES_USER_REQUEST,
    payload: token,
  }),
};
/**
 * Redux Action Register Request
 */
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps &
  DispatchProps &
  TodoInProgressScreenProps &
  ThemedComponentProps;

const TechnologyUserScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {technologiesUser} = props.TechnologiesUser;
    const {token} = props.Authentication;

    React.useEffect(() => {
      // Consulta todas as tecnologias
      props.technologiesUserRequest(token);
    }, []);

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<TechnologiesUser>): ListItemElement => (
      <ListItem style={props.themedStyle.item}>
        <Text category="s1">{item.username}</Text>
        <Text appearance="hint" category="c1">
          {item.technologies.length.toString()} Technologies
        </Text>
      </ListItem>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <List
          style={props.themedStyle.list}
          data={technologiesUser}
          renderItem={renderTechnology}
        />
      </Layout>
    );
  },
);

export const TechnologyUserScreen = withStyles(
  TechnologyUserScreenComponent,
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

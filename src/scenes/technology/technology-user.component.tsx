import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  Divider,
  Text,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

import {TechnologiesUserScreenProps} from '../../navigation/todo.navigator';

import {PeopleOutlineIcon, CodeOutlineIcon} from '../../assets/icons';

import {ApplicationState} from '../../store';
import {
  TechnologiesUserTypes,
  TechnologiesUser,
  Technology,
} from '../../store/ducks/technologies-user/types';

import {connect} from 'react-redux';

// Integrando State em Props
const mapStateToProps = ({
  TechnologiesUser,
  Authentication,
  Technology,
}: ApplicationState) => ({
  TechnologiesUser,
  Authentication,
  Technology,
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
  TechnologiesUserScreenProps &
  ThemedComponentProps;

const TechnologyUserScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {technologiesUser} = props.TechnologiesUser;
    const {technologies} = props.Technology;
    const {token} = props.Authentication;

    React.useEffect(() => {
      // Consulta todas as tecnologias
      props.technologiesUserRequest(token);
    }, [technologies]);

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<Technology>): ListItemElement => (
      <ListItem icon={CodeOutlineIcon} style={props.themedStyle.item}>
        <Text appearance="hint" category="s2">
          {item.technology}
        </Text>
      </ListItem>
    );

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderUser = ({
      item,
    }: ListRenderItemInfo<TechnologiesUser>): ListItemElement => (
      <React.Fragment>
        <ListItem icon={PeopleOutlineIcon} style={props.themedStyle.item}>
          <Text category="h6">{item.username}</Text>
          <Text appearance="hint" category="s1">
            {item.technologies.length.toString()} Technologies
          </Text>
          <List
            style={props.themedStyle.list}
            data={item.technologies}
            renderItem={renderTechnology}
          />
        </ListItem>
        <Divider />
      </React.Fragment>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <Text
          appearance="hint"
          style={[props.themedStyle.title, props.themedStyle.item]}
          category="h5">
          Technologies x User
        </Text>
        <List
          style={props.themedStyle.list}
          data={technologiesUser}
          renderItem={renderUser}
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
    title: {
      marginTop: 10,
    },
  }),
);

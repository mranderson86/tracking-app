import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  CheckBox,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';

import {AppRoute} from '../../navigation/app-routes';
import {Todo} from '../../data/todo.model';

import {TodoInProgressScreenProps} from '../../navigation/todo.navigator';

import {ApplicationState} from '../../store';
import {TechnologyTypes, Technology} from '../../store/ducks/technology/types';

import {connect} from 'react-redux';

const allTodos: Todo[] = [
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
  Todo.mocked0(),
  Todo.mocked1(),
  Todo.mocked2(),
];

// Integrando State em Props
const mapStateToProps = ({Technology, Authentication}: ApplicationState) => ({
  Technology,
  Authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  technologyRequest: (token: string) => ({
    type: TechnologyTypes.TECHNOLOGY_REQUEST,
    payload: token,
  }),

  technologyChecking: (technology: Technology, checked: boolean) => ({
    type: TechnologyTypes.TECHNOLOGY_CHECKED,
    payload: {technology},
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

const TechnologyScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {technologies} = props.Technology;
    const {token} = props.Authentication;

    React.useEffect(() => {
      props.technologyRequest(token);
    }, []);

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<Technology>): ListItemElement => (
      <ListItem style={props.themedStyle.item}>
        <CheckBox
          text={item.technology}
          checked={item.checked}
          onChange={checked => props.technologyChecking({...item, checked})}
        />
      </ListItem>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <List
          style={props.themedStyle.list}
          data={technologies}
          renderItem={renderTechnology}
        />
      </Layout>
    );
  },
);

export const TechnologyScreen = withStyles(
  TechnologyScreenComponent,
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
      flexDirection: 'row',
      paddingHorizontal: 12,
      marginHorizontal: 10,
    },
    itemProgressBar: {
      width: '50%',
      marginVertical: 12,
    },
  }),
);

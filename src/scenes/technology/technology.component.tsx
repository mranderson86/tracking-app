import React from 'react';
import {ListRenderItemInfo} from 'react-native';
import {
  CheckBox,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  Text,
  ThemedComponentProps,
  withStyles,
} from '@ui-kitten/components';
import {TodoInProgressScreenProps} from '../../navigation/todo.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {Todo} from '../../data/todo.model';

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

const TechnologyScreenComponent = (
  props: TodoInProgressScreenProps & ThemedComponentProps,
): ListElement => {
  const [todos, setTodos] = React.useState<Todo[]>(allTodos);
  const [query, setQuery] = React.useState<string>('');

  const onChangeQuery = (query: string): void => {
    const nextTodos: Todo[] = allTodos.filter(
      (todo: Todo): boolean => {
        return todo.title.toLowerCase().includes(query.toLowerCase());
      },
    );

    setTodos(nextTodos);
    setQuery(query);
  };

  const navigateTodoDetails = (todoIndex: number): void => {
    const {[todoIndex]: todo} = todos;
    props.navigation.navigate(AppRoute.TODO_DETAILS, {todo});
  };

  /**
   * Renderiza cada item da lista de tecnologia
   * @param item
   */
  const renderTechnology = ({
    item,
  }: ListRenderItemInfo<Todo>): ListItemElement => (
    <ListItem style={props.themedStyle.item}>
      <CheckBox text={item.title} />
    </ListItem>
  );

  return (
    <Layout style={props.themedStyle.container}>
      <List
        style={props.themedStyle.list}
        data={todos}
        renderItem={renderTechnology}
      />
    </Layout>
  );
};

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

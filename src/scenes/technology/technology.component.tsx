import React from 'react';
import {ListRenderItemInfo, View} from 'react-native';
import {
  Text,
  Button,
  CheckBox,
  Layout,
  List,
  ListElement,
  ListItem,
  ListItemElement,
  ThemedComponentProps,
  withStyles,
  Spinner,
} from '@ui-kitten/components';

import {TechnologyScreenProps} from '../../navigation/technology.navigator';

import {ApplicationState} from '../../store';
import {
  TechnologyTypes,
  Technology,
  TechnologyState,
} from '../../store/ducks/technology/types';
import {DoneAllIcon} from '../../assets/icons';

import {connect} from 'react-redux';

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

  technologyChecked: (technology: Technology) => ({
    type: TechnologyTypes.TECHNOLOGY_CHECKED,
    payload: {technology},
  }),

  technologySave: (technologies: Technology[], token: string) => ({
    type: TechnologyTypes.TECHNOLOGY_SAVE,
    payload: {technologies, token},
  }),
};
/**
 * Redux Action Register Request
 */
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps &
  DispatchProps &
  TechnologyScreenProps &
  ThemedComponentProps;

const TechnologyScreenComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): ListElement => {
    const {technologies, loading}: TechnologyState = props.Technology;
    const {token} = props.Authentication;

    React.useEffect(() => {
      // Consulta todas as tecnologias
      props.technologyRequest(token);
    }, []);

    // Renderiza o botão FAB se houver tecnologias marcadas
    const showRenderFab = (): boolean => {
      const selected: Technology[] = technologies.filter(
        (item: Technology) => item.checked,
      );
      return selected.length > 0;
    };

    /**
     * Renderiza cada item da lista de tecnologia
     * @param item
     */
    const renderTechnology = ({
      item,
    }: ListRenderItemInfo<Technology>): ListItemElement => (
      <ListItem style={props.themedStyle.item} disabled>
        <CheckBox
          style={props.themedStyle.checkbox}
          checked={item.checked}
          onChange={(checked: boolean) =>
            props.technologyChecked({...item, checked})
          }
        />
        <Text category="h6">{item.technology}</Text>
      </ListItem>
    );

    return (
      <Layout style={props.themedStyle.container}>
        <Text
          appearance="hint"
          style={[props.themedStyle.title, props.themedStyle.item]}
          category="h6">
          Choose your technology below
        </Text>

        {loading ? (
          <View style={props.themedStyle.spinner}>
            <Spinner />
          </View>
        ) : (
          <React.Fragment>
            <List
              style={props.themedStyle.list}
              data={technologies}
              renderItem={renderTechnology}
            />
            {showRenderFab() && (
              <Button
                style={props.themedStyle.fab}
                icon={DoneAllIcon}
                onPress={() => props.technologySave(technologies, token)}
              />
            )}
          </React.Fragment>
        )}
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
    checkbox: {marginRight: 20},
    title: {
      marginTop: 10,
    },
    spinner: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);

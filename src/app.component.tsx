import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {AppNavigator} from './navigation/app.navigator';

import store, {ApplicationState} from './store';

import {Provider as ReduxProvider, connect} from 'react-redux';
import {default as theme} from './custom-theme.json';

export default (): React.ReactFragment => {
  // This value is used to determine the initial screen
  return (
    <React.Fragment>
      <ReduxProvider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={{...eva.light, ...theme}}>
          <SafeAreaProvider>
            <NavigationContainer>
              <AppRedux />
            </NavigationContainer>
          </SafeAreaProvider>
        </ApplicationProvider>
      </ReduxProvider>
    </React.Fragment>
  );
};

// Integrando State em Props
const mapStateToProps = ({Authentication}: ApplicationState) => ({
  Authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type Props = StateProps;

const AppRedux = connect(mapStateToProps)((props: Props) => {
  return <AppNavigator {...props} />;
});

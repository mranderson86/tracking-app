import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {light, mapping} from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {AppNavigator} from './navigation/app.navigator';
import {AppRoute} from './navigation/app-routes';

import store, {ApplicationState} from './store';

import {Provider as ReduxProvider, connect} from 'react-redux';

export default (): React.ReactFragment => {
  // This value is used to determine the initial screen
  const isAuthorized: boolean = false;

  return (
    <React.Fragment>
      <ReduxProvider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={light}>
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

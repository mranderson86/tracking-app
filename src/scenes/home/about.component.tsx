import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Divider, Layout, Text} from '@ui-kitten/components';
import {AboutScreenProps} from '../../navigation/home.navigator';
import {Toolbar} from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';

import {SvgComponent} from '../../components/svg-background.components';

export const AboutScreen = (props: AboutScreenProps): SafeAreaLayoutElement => (
  <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
    <Toolbar
      title="Tracking of Technology"
      onBackPress={props.navigation.goBack}
    />
    <Divider />
    <Layout style={styles.container}>
      <Text category="h3">Tracking of Technology</Text>
      <Text category="s1">Version 1.0</Text>
      <Text category="s1">Development by Anderson Gomes</Text>
      <Text category="s2">mr.anderson.brito@gmail.com</Text>
    </Layout>
    <View style={{flex: 1, margin: -20}}>
      <SvgComponent />
    </View>
  </SafeAreaLayout>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    margin: 10,
    //justifyContent: 'center',
    alignItems: 'center',
  },
});

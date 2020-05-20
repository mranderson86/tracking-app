import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, Spinner, Layout, LayoutElement} from '@ui-kitten/components';
import {Formik, FormikProps} from 'formik';
import {SignInScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {FormInput} from '../../components/form-input.component';
import {EyeIcon, EyeOffIcon} from '../../assets/icons';
import {SignInData, SignInSchema} from '../../data/sign-in.model';

import {connect} from 'react-redux';
import {ApplicationState} from '../../store';
import {LoginTypes} from '../../store/ducks/authentication/types';

import {SvgComponent} from '../../components/svg-background.components';

// Integrando State em Props
const mapStateToProps = ({Authentication}: ApplicationState) => ({
  Authentication,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  loadRequest: (user: SignInData) => ({
    type: LoginTypes.LOGIN_REQUEST,
    payload: user,
  }),
};
/**
 * Redux Action Login Request
 */
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps & DispatchProps & SignInScreenProps;

export const SignInScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): LayoutElement => {
    const [passwordVisible, setPasswordVisible] = React.useState<boolean>(
      false,
    );
    console.log(props);
    const {Authentication} = props;

    const onFormSubmit = (values: SignInData): void => {
      props.loadRequest(values);
    };

    const navigateSignUp = (): void => {
      props.navigation.navigate(AppRoute.SIGN_UP);
    };

    const onPasswordIconPress = (): void => {
      setPasswordVisible(!passwordVisible);
    };

    const renderForm = (
      props: FormikProps<SignInData>,
    ): React.ReactFragment => (
      <React.Fragment>
        <FormInput
          id="email"
          style={styles.formControl}
          placeholder="Email"
          keyboardType="email-address"
        />
        <FormInput
          id="password"
          style={styles.formControl}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          icon={passwordVisible ? EyeIcon : EyeOffIcon}
          onIconPress={onPasswordIconPress}
        />

        {Authentication.loading ? (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        ) : (
          <Button style={styles.submitButton} onPress={props.handleSubmit}>
            SIGN IN
          </Button>
        )}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <ImageBackground
          style={styles.appBar}
          source={require('../../assets/image_welcome.png')}
        />
        <Layout style={styles.formContainer}>
          <Formik
            validateOnChange={false}
            initialValues={SignInData.empty()}
            validationSchema={SignInSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
          <Button
            style={styles.noAccountButton}
            appearance="ghost"
            status="basic"
            onPress={navigateSignUp}>
            Don't have an account?
          </Button>
          <View style={{flex: 1, margin: -20}}>
            <SvgComponent />
          </View>
        </Layout>
      </React.Fragment>
    );
  },
);

const styles = StyleSheet.create({
  appBar: {
    height: 192,
  },
  formContainer: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  formControl: {
    marginVertical: 4,
  },
  submitButton: {
    marginVertical: 24,
  },
  noAccountButton: {
    alignSelf: 'center',
  },
  spinner: {
    alignSelf: 'center',
    marginVertical: 24,
    height: 42,
  },
});

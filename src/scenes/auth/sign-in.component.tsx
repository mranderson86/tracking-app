import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {Button, CheckBox, Layout, LayoutElement} from '@ui-kitten/components';
import {Formik, FormikProps, FormikHelpers, FormikErrors} from 'formik';
import {SignInScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {FormInput} from '../../components/form-input.component';
import {EyeIcon, EyeOffIcon} from '../../assets/icons';
import {SignInData, SignInSchema} from '../../data/sign-in.model';

import {connect} from 'react-redux';
import {ApplicationState} from '../../store';
import {LoginTypes} from '../../store/ducks/authentication/types';

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

    const onFormSubmit = (
      values: SignInData,
      formikHelpers: FormikHelpers<SignInData>,
    ): void => {
      // !values.email && formikHelpers.setFieldError('email', 'E-mail is empty');
      //!values.password &&
      //  formikHelpers.setFieldError('password', 'Password is empty');
      props.loadRequest(values);
    };

    const navigateHome = (): void => {
      props.navigation.navigate(AppRoute.HOME);
    };

    const navigateSignUp = (): void => {
      props.navigation.navigate(AppRoute.SIGN_UP);
    };

    const navigateResetPassword = (): void => {
      props.navigation.navigate(AppRoute.RESET_PASSWORD);
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
        <Button style={styles.submitButton} onPress={props.handleSubmit}>
          SIGN IN
        </Button>
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
  resetPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

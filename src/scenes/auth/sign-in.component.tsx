import React, {ReactFragment} from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {Button, Spinner, Layout, LayoutElement} from '@ui-kitten/components';
import {Formik, FormikProps} from 'formik';
import {SignInScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {FormInput} from '../../components/form-input.component';
import {ModalWithBackdrop} from '../../components/modal.component';
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

  failureRequest: () => ({
    type: LoginTypes.LOGIN_FAILURE_RESET,
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

    const onFailureRequest = () => {
      props.failureRequest();
    };

    const LoadingRender = () => (
      <View style={styles.spinner}>
        <Spinner />
      </View>
    );

    const ErrorRender = () => (
      <ModalWithBackdrop
        title={'Erro'}
        description={'User e/or Password is wrong!'}
        buttonTitle={'OK'}
        onClose={onFailureRequest}
      />
    );

    const SubmitRender = props => (
      <Button style={styles.submitButton} onPress={props.handleSubmit}>
        SIGN IN
      </Button>
    );

    const renderPassword = props => (
      <TouchableWithoutFeedback onPress={onPasswordIconPress}>
        {// <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye-off'} />
        passwordVisible ? <EyeIcon {...props} /> : <EyeOffIcon {...props} />}
      </TouchableWithoutFeedback>
    );

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
          accessoryRight={renderPassword}
        />
        {!Authentication.loading && <SubmitRender {...props} />}
        {Authentication.loading && <LoadingRender />}
        {Authentication.error && <ErrorRender />}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <ImageBackground
          {...props}
          style={styles.appBar}
          source={require('../../assets/1024x1024.png')}
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
    backgroundColor: '#FFF',
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
    height: '10%',
  },
});

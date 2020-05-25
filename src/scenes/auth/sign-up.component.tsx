import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {EdgeInsets, useSafeArea} from 'react-native-safe-area-context';
import {Formik, FormikProps} from 'formik';
import {Button, Spinner, Layout, LayoutElement} from '@ui-kitten/components';

import {SignUpScreenProps} from '../../navigation/auth.navigator';
import {AppRoute} from '../../navigation/app-routes';
import {Toolbar} from '../../components/toolbar.component';
import {FormInput} from '../../components/form-input.component';
import {SignUpData, SignUpSchema} from '../../data/sign-up.model';

import {RegisterTypes} from '../../store/ducks/register/types';
import {SvgComponent} from '../../components/svg-background.components';
import {ModalWithBackdrop} from '../../components/modal.component';

import {ApplicationState} from '../../store';

import {connect} from 'react-redux';

const mapStateToProps = ({Register}: ApplicationState) => ({Register});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  registerRequest: (register: SignUpData) => ({
    type: RegisterTypes.REGISTER_REQUEST,
    payload: register,
  }),

  registerFailure: () => ({
    type: RegisterTypes.REGISTER_FAILURE_RESET,
  }),
};

// Redux Action Register Request
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps & SignUpScreenProps & DispatchProps;

export const SignUpScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): LayoutElement => {
    const insets: EdgeInsets = useSafeArea();

    const onFormSubmit = (values: SignUpData): void => {
      props.registerRequest(values);
    };

    const navigateSignIn = (): void => {
      props.navigation.navigate(AppRoute.SIGN_IN);
    };

    const {Register} = props;

    console.log(props.Register);

    const ErrorRender = () => (
      <ModalWithBackdrop
        title={'Erro'}
        description={'Failure in to register!'}
        buttonTitle={'OK'}
        onClose={props.registerFailure}
      />
    );

    const LoadingRender = () => (
      <View style={styles.spinner}>
        <Spinner />
      </View>
    );

    const SubmitRender = props => (
      <Button style={styles.submitButton} onPress={props.handleSubmit}>
        SIGN UP
      </Button>
    );

    const renderForm = (
      props: FormikProps<SignUpData>,
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
        />
        <FormInput
          id="username"
          style={styles.formControl}
          placeholder="Username"
        />

        {!Register.loading && <SubmitRender {...props} />}
        {Register.loading && <LoadingRender />}
        {Register.error && <ErrorRender />}

        {/* {props.isSubmitting ? (
          <View style={styles.spinner}>
            <Spinner />
          </View>
        ) : (
          <Button style={styles.submitButton} onPress={props.handleSubmit}>
            SIGN UP
          </Button>
        )} */}
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <ImageBackground
          style={[styles.appBar, {paddingTop: insets.top}]}
          source={require('../../assets/image_welcome.png')}>
          <Toolbar appearance="control" onBackPress={props.navigation.goBack} />
        </ImageBackground>
        <Layout style={styles.formContainer}>
          <Formik
            validateOnChange={false}
            initialValues={SignUpData.empty()}
            validationSchema={SignUpSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
          <Button
            style={styles.haveAccountButton}
            appearance="ghost"
            status="basic"
            onPress={navigateSignIn}>
            Already have an account?
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
  haveAccountButton: {
    alignSelf: 'center',
  },
  spinner: {
    alignSelf: 'center',
    marginVertical: 24,
    height: '10%',
  },
});

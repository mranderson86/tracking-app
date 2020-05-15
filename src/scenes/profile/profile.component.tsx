import React from 'react';
import {StyleSheet} from 'react-native';
import {Divider, Layout, Text, Button} from '@ui-kitten/components';
import {ProfileScreenProps} from '../../navigation/profile.navigator';
import {Toolbar} from '../../components/toolbar.component';
import {
  SafeAreaLayout,
  SafeAreaLayoutElement,
  SaveAreaInset,
} from '../../components/safe-area-layout.component';
import {MenuIcon} from '../../assets/icons';
import {Formik, FormikProps} from 'formik';
import {FormInput} from '../../components/form-input.component';
import {ProfileData, ProfileDataSchema} from '../../data/profile.model';

import {RegisterTypes, Profile} from '../../store/ducks/register/types';
import {ApplicationState} from '../../store';

import {connect} from 'react-redux';

const mapStateToProps = ({Authentication, Register}: ApplicationState) => ({
  Authentication,
  Register,
});

type StateProps = ReturnType<typeof mapStateToProps>;

const mapDispatchToProps = {
  profileUpdateRequest: (token: string, profile: Profile) => ({
    type: RegisterTypes.PROFILE_UPDATE,
    payload: {
      token,
      profile,
    },
  }),
};

// Redux Action Register Request
type DispatchProps = typeof mapDispatchToProps;

type Props = StateProps & ProfileScreenProps & DispatchProps;

export const ProfileScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  (props: Props): SafeAreaLayoutElement => {
    const {token} = props.Authentication;
    const {profile} = props.Register;

    // console.log(profile);

    const onFormSubmit = ({username}: ProfileData): void => {
      props.profileUpdateRequest(token, {...profile, username});
    };

    const renderForm = (
      props: FormikProps<ProfileData>,
    ): React.ReactFragment => (
      <React.Fragment>
        <FormInput
          value={profile.email}
          id="email"
          style={styles.formControl}
          keyboardType="email-address"
          disabled
        />
        <FormInput
          value={profile.username}
          id="userNameLast"
          style={styles.formControl}
          placeholder="Password"
          disabled
        />
        <FormInput
          id="username"
          style={styles.formControl}
          placeholder="New Username"
        />
        <Button style={styles.submitButton} onPress={props.handleSubmit}>
          UPDATE
        </Button>
      </React.Fragment>
    );

    return (
      <SafeAreaLayout style={styles.safeArea} insets={SaveAreaInset.TOP}>
        <Toolbar
          title="Tracking of Technology"
          backIcon={MenuIcon}
          onBackPress={props.navigation.toggleDrawer}
        />
        <Divider />
        <Layout style={styles.formContainer}>
          <Text category="h5">PROFILE</Text>
          <Formik
            initialValues={ProfileData.empty()}
            validationSchema={ProfileDataSchema}
            onSubmit={onFormSubmit}>
            {renderForm}
          </Formik>
        </Layout>
      </SafeAreaLayout>
    );
  },
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

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
});

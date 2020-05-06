import React from 'react';
import {connect} from 'react-redux';

import {LogoutTypes} from '../../store/ducks/authentication/types';

// Integrando Action em Props
const mapDispatchToProps = {
  logoutRequest: () => ({
    type: LogoutTypes.LOGOUT_REQUEST,
  }),
};

type DispatchProps = typeof mapDispatchToProps;

interface OwnerProps {
  logout: boolean;
}

type Props = OwnerProps & DispatchProps;

// Logout de usuário
export const LogoutScreen = connect(
  null,
  mapDispatchToProps,
)((props: Props) => {
  props.logoutRequest();
  return <React.Fragment />;
});

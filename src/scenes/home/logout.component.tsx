import React from 'react';
import {connect} from 'react-redux';

import {LogoutTypes} from '../../store/ducks/authentication/types';
import {TechnologiesUserTypes} from '../../store/ducks/technologies-user/types';
import {UsersTechnologyTypes} from '../../store/ducks/users-technology/types';
import {TechnologyTypes} from '../../store/ducks/technology/types';

// Integrando Action em Props
const mapDispatchToProps = {
  logoutRequest: () => ({
    type: LogoutTypes.LOGOUT_REQUEST,
  }),

  clearTechnologiesUser: () => ({
    type: TechnologiesUserTypes.TECHNOLOGIES_USER_SUCCESS,
    payload: [],
  }),

  clearUsersTechnology: () => ({
    type: UsersTechnologyTypes.USERS_TECHNOLOGY_SUCCESS,
    payload: [],
  }),

  clearTechnologies: () => ({
    type: TechnologyTypes.TECHNOLOGY_SUCCESS,
    payload: [],
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
  props.clearTechnologiesUser();
  props.clearUsersTechnology();
  props.logoutRequest();
  return <React.Fragment />;
});

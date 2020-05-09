import {Reducer} from 'redux';

import {TechnologyState, TechnologyTypes, Technology} from './types';

const INITIAL_STATE: TechnologyState = {
  technologies: [],
  loading: false,
  error: false,
};

/**
 * Redux Technologies State
 */
const reducer: Reducer<TechnologyState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TechnologyTypes.TECHNOLOGY_REQUEST:
      return {...state, loading: true};
    case TechnologyTypes.TECHNOLOGY_SUCCESS: {
      const {technologies} = action.payload;

      return {...state, loading: false, technologies};
    }

    case TechnologyTypes.TECHNOLOGY_FAILURE:
      return {...state, loading: false, error: true};
    case TechnologyTypes.TECHNOLOGY_CHECKED: {
      // Tecnologia foi marcada / desmarcada
      const {technology} = action.payload;
      const {technologies} = state;

      return {
        ...state,
        technologies: technologies.map(item => {
          return item.id === (technology as Technology).id
            ? {
                ...technology,
              }
            : {...item};
        }),
      };
    }

    default:
      return state;
  }
};

export default reducer;

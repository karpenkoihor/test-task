import {
  ADD_SELECTION,
  CLEAR_SELECTIONS,
  UPDATE_SELECTION,
  LOAD_HISTORY,
  REMOVE_SELECTION,
} from '../actions/userActions';

const initialState = {
  selections: [],
  history: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SELECTION:
      return {
        ...state,
        selections: [
          ...state.selections,
          {
            ...action.payload,
            stake: 0,
          },
        ],
      };
    case REMOVE_SELECTION:
      return {
        ...state,
        selections: state.selections.filter(
          (selection) => selection.selection.id !== action.payload.selectionId
        ),
      };
    case UPDATE_SELECTION:
      return {
        ...state,
        selections: state.selections.map((selection) => {
          if (selection.selection.id === action.payload.selectionId) {
            selection.stake = action.payload.stake;
          }
          return selection;
        }),
      };
    case CLEAR_SELECTIONS:
      return {
        ...state,
        selections: [],
      };
    case LOAD_HISTORY:
      return {
        ...state,
        history: action.payload,
      };
    default:
      return state;
  }
};

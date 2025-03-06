export const ADD_SELECTION = 'ADD_SELECTION';
export const REMOVE_SELECTION = 'REMOVE_SELECTION';
export const CLEAR_SELECTIONS = 'CLEAR_SELECTIONS';
export const UPDATE_SELECTION = 'UPDATE_SELECTION';
export const LOAD_HISTORY = 'LOAD_HISTORY';

export const addSelection = ({ eventName, marketName, date, selection }) => ({
  type: ADD_SELECTION,
  payload: { eventName, marketName, date, selection },
});

export const removeSelection = ({ selectionId }) => ({
  type: REMOVE_SELECTION,
  payload: { selectionId },
});

export const updateSelection = ({ selectionId, stake }) => ({
  type: UPDATE_SELECTION,
  payload: { selectionId, stake },
});

export const clearSelections = () => ({
  type: CLEAR_SELECTIONS,
});

export const loadHistory = (history) => ({
  type: LOAD_HISTORY,
  payload: history,
});

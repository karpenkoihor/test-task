export const LOAD_EVENT = 'LOAD_EVENT';
export const UPDATE_EVENT = 'UPDATE_EVENT';

export const loadEvent = (event) => ({
  type: LOAD_EVENT,
  payload: event,
});

export const updateEvent = (event) => ({
  type: UPDATE_EVENT,
  payload: event,
});

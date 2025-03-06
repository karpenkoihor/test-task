import { LOAD_EVENT, UPDATE_EVENT } from '../actions/eventActions';

const initialState = {
  events: {},
};

export const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_EVENT:
      return {
        ...state,
        events: {
          ...state.events,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_EVENT: {
      const update = action.payload;
      const newEvents = {};

      for (const eventId in state.events) {
        const event = state.events[eventId];
        let eventUpdated = false;
        let newMarkets = event.markets;

        if (event.markets) {
          newMarkets = event.markets.map((market) => {
            let marketUpdated = false;
            const newSelections = market.selections.map((selection) => {
              if (selection.id === update.id) {
                marketUpdated = true;
                eventUpdated = true;
                return {
                  ...selection,
                  odds: update.odds,
                  description: update.description,
                };
              }
              return selection;
            });
            return marketUpdated
              ? { ...market, selections: newSelections }
              : market;
          });
        }

        newEvents[eventId] = eventUpdated
          ? { ...event, markets: newMarkets }
          : event;
      }

      return {
        ...state,
        events: newEvents,
      };
    }

    default:
      return state;
  }
};

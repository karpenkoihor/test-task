import { LOAD_COUPON, UPDATE_COUPON } from '../actions/couponActions';

const initialState = {
  coupons: {},
};

export const couponReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_COUPON:
      return {
        ...state,
        coupons: {
          ...state.coupons,
          [action.payload.id]: action.payload,
        },
      };

    case UPDATE_COUPON: {
      const update = action.payload;
      const newCoupons = {};

      for (const couponId in state.coupons) {
        const coupon = state.coupons[couponId];
        let couponUpdated = false;

        const newEvents = coupon.events?.map((event) => {
          let eventUpdated = false;

          const newMarkets = event.markets?.map((market) => {
            let marketUpdated = false;

            const newSelections = market.selections?.map((selection) => {
              if (selection.id === update.id) {
                marketUpdated = true;
                eventUpdated = true;
                couponUpdated = true;
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

          return eventUpdated ? { ...event, markets: newMarkets } : event;
        });

        newCoupons[couponId] = couponUpdated
          ? { ...coupon, events: newEvents }
          : coupon;
      }

      return {
        ...state,
        coupons: newCoupons,
      };
    }

    default:
      return state;
  }
};

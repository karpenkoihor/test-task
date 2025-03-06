export const LOAD_COUPON = 'LOAD_COUPON';
export const UPDATE_COUPON = 'UPDATE_COUPON';

export const loadCoupon = (coupon) => ({
  type: LOAD_COUPON,
  payload: coupon,
});

export const updateCoupon = (update) => ({
  type: UPDATE_COUPON,
  payload: update,
});

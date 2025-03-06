export const LOAD_SPORTS = 'LOAD_SPORTS';
export const LOAD_COUPONS = 'LOAD_COUPONS';

export const loadSports = (sports) => ({
    type: LOAD_SPORTS,
    payload: sports,
});

export const loadCoupons = (sportId, coupons) => ({
    type: LOAD_COUPONS,
    payload: {sportId, coupons},
});


import {combineReducers} from 'redux';
import {couponReducer} from './couponReducer';
import {sportReducer} from './sportReducer';
import {eventReducer} from './eventReducer';
import {userReducer} from './userReducer';

const rootReducer = combineReducers({
    coupon: couponReducer,
    sport: sportReducer,
    event: eventReducer,
    user: userReducer,
});

export default rootReducer;

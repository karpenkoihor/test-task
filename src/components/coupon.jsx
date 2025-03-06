import React, {useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {Link} from "react-router-dom";
import {Container, Row, Col} from "react-bootstrap";
import {loadCoupon} from "../store/actions/couponActions";
import {fetchDataFromServer, formatDate} from "../utils";
import {SelectionButton} from "./index";

const CouponHeader = ({markets}) => {
    return (
        <Row>
            <Col md={4}></Col>
            <Col md={6}>
                <Row>
                    {markets.map(({id: marketId, name}) => (
                        <Col key={marketId} md={6} className="px-1 text-center"><small>{name}</small></Col>
                    ))}
                </Row>
            </Col>
            <Col md={2}></Col>
        </Row>
    );
}

export const Coupon = ({couponId}) => {
    const dispatch = useDispatch();

    const coupons = useSelector((state) => state.coupon.coupons);

    const coupon = coupons[couponId];

    useEffect(() => {
        if (!coupon) {
            const getCoupon = async () => {
                const fetchedCoupon = await fetchDataFromServer(`/data/coupon/${couponId}.json`);
                if (fetchedCoupon) {
                    dispatch(loadCoupon(fetchedCoupon));
                }
            };
            getCoupon();
        }
    }, [dispatch, couponId, coupon, coupons]);

    if (!coupon) {
        return <div>Loading coupon...</div>;
    }

    return (
        <div className="p-4">
            <h2 className="h4 mb-3">{coupon.name}</h2>
            <Container className="border p-3 my-2">
                <CouponHeader markets={coupon.events[0].markets}/>
                {coupon.events.map((event) => (
                    <Row key={event.id} className="my-2 align-items-center">
                        <Col md={4}>
                            <Link to={`/${event.category}/event/${event.id}`} className="fw-bold">{event.name}</Link>
                            <br/>
                            <small className="text-muted">{formatDate(event.date)}</small>
                        </Col>
                        <Col md={6}>
                            <div className="d-flex">
                                {event.markets.slice(0, 3).map((market) => (
                                        <div key={market.id} className="d-flex flex-grow-1 px-1">
                                            {market.selections.slice(0, 2).map((selection) => (
                                                <SelectionButton key={selection.id} eventName={event.name}
                                                                 marketName={market.name} date={event.date}
                                                                 selection={selection} className="flex-grow-1 mx-1">
                                                    {parseFloat(selection.odds).toFixed(2)}
                                                </SelectionButton>
                                            ))}
                                        </div>
                                    )
                                )}
                            </div>
                        </Col>
                        <Col md={2} className="text-center fw-bold">
                            {event.markets.length}
                        </Col>
                    </Row>
                ))}
            </Container>
        </div>
    );
};

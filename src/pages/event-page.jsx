import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row, Col} from "react-bootstrap";
import {loadEvent} from "../store/actions/eventActions";
import {Scoreboard, SelectionButton} from "../components";
import {fetchDataFromServer} from "../utils";

export const EventPage = () => {
    const {eventId} = useParams();
    const dispatch = useDispatch();
    const event = useSelector((state) => state.event.events[eventId]);

    useEffect(() => {
        if (!event) {
            const getEvent = async () => {
                const fetchedEvent = await fetchDataFromServer(`/data/event/${eventId}.json`);
                if (fetchedEvent) {
                    dispatch(loadEvent(fetchedEvent));
                }
            };
            getEvent();
        }
    }, [dispatch, eventId, event]);

    if (!event) return <p>Loading events...</p>;

    return (
        <div className="p-4">
            <Scoreboard name={event.name} date={event.date}/>
            <Container>
                {event.markets.map((market) => (
                    <div key={market.id} className="border p-3 my-2">
                        <h5 className="fw-bold">{market.name}</h5>
                        <Row>
                            {market.selections.map((selection) => (
                                <Col key={selection.id} xs={6} className="d-flex justify-content-center">
                                    <SelectionButton eventName={event.name} marketName={market.name} date={event.date}
                                                     selection={selection} className="flex-grow-1">
                                        <span
                                            className="opacity-75">{selection.description}</span> {parseFloat(selection.odds).toFixed(2)}
                                    </SelectionButton>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Container>
        </div>
    );
};

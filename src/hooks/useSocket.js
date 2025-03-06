import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateCoupon } from '../store/actions/couponActions';
import { updateEvent } from '../store/actions/eventActions';

export const useSocket = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const wsHost = window.location.host;
    
    const socket = new WebSocket(`${wsProtocol}//${wsHost}`);

    socket.onopen = () => {
      console.log('WebSocket is connected');
    };

    socket.onmessage = (event) => {
      try {
        const oddsUpdates = JSON.parse(event.data);
        oddsUpdates.forEach((update) => {
          dispatch(updateCoupon(update));
          dispatch(updateEvent(update));
        });
      } catch (error) {
        console.error('Error while processing websocket data', error);
      }
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      socket.close();
    };
  }, [dispatch]);
};

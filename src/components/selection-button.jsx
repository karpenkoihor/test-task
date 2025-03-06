import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addSelection, removeSelection } from '../store/actions/userActions';

export const SelectionButton = ({
  eventName,
  marketName,
  date,
  selection,
  children,
  ...other
}) => {
  const dispatch = useDispatch();
  const selections = useSelector((state) => state.user.selections);
  const isSelected =
    selections.findIndex((s) => s.selection.id === selection.id) > -1;

  const handleClick = () => {
    if (isSelected) {
      dispatch(removeSelection({ selectionId: selection.id }));
    } else {
      dispatch(addSelection({ eventName, marketName, date, selection }));
    }
  };

  return (
    <Button
      {...other}
      variant={isSelected ? 'primary' : 'secondary'}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

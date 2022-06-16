import { Paper } from '@mui/material';
import React, { memo } from 'react';
import EventContent from './event-content';
import EventFooter from './event-footer';
import EventHeader from './event-header';
import _ from 'lodash';

const Event = ({ event, handleMenu }) => {
  return (
    <Paper sx={{ p: 1.5, my: 10, border: 1 }}>
      <EventHeader event={event} handleMenu={handleMenu} />
      <EventContent event={event} />
      <EventFooter event={event} />

    </Paper>
  );
};

const propsAreEqual = (prevProps, nextProps) => {
  return _.isEqual(prevProps.event, nextProps.event);
};

export default memo(Event, propsAreEqual);

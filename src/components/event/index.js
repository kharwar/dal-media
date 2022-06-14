import { Paper } from '@mui/material';
import React from 'react';
import EventContent from './event-content';
import EventFooter from './event-footer';
import EventHeader from './event-header';

const Event = () => {
  return (
    <Paper sx={{ p: 1.5, my: 10, border: 1 }}>
      <EventHeader />
      <EventContent />
      <EventFooter />

    </Paper>
  );
};

export default Event;

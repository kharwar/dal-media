import { Card, Container } from '@material-ui/core'
import React from 'react'
import GroupList from '../../components/group-list'

const Notifications = () => {
  return (
    <Container maxWidth='md'>
        <h2> Hi Kavya! Welcome back :) </h2>
        <GroupList />
    </Container>
  )
}

export default Notifications;